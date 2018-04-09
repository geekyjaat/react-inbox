import React from 'react';
import Toolbar from './Toolbar';
import Email from './Email';
import Compose from './Compose';
import Spinner from './Spinner';

export default class Inbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            showCompose: false,
            showSpinner: false
        }
    }

    async componentDidMount() {
        // show spinner
        this.setState({
            ...this.state,
            showSpinner: true
        })
        // fetch items
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages?delay=1000`)
        const json = await response.json()
        const emails = await json._embedded.messages

        // set state and hide spinner
        this.setState({
            ...this.state,
            emails: emails.map(email => {
                email.selected = false;
                return email;
            }),
            showSpinner: false
        })
    }

    processSelectState = (emails, firstArg, secArg) => {
        return emails.every((email) => email.selected ? email.selected === firstArg : secArg)
    }

    toggleSelection = () => {
        let selectFlag = false;
        const allSelected = this.processSelectState(this.state.emails, true, false)
        const noneSelected = this.processSelectState(this.state.emails, false, true)
        if (allSelected)
            selectFlag = false;
        else if (noneSelected)
            selectFlag = true;
        else
            selectFlag = true
        this.setState({
            ...this.state,
            emails: this.state.emails.map((email) => {
                email.selected = selectFlag
                return email
            })
        })
    }

    toggleSelect = (id) => {
        this.setState({
            emails: this.state.emails.map((email) => {
                if (email.id === id) {
                    email.selected = !email.selected
                }
                return email
            }),
            allSelected: this.processSelectState(this.state.emails, true, false),
            noneSelected: this.processSelectState(this.state.emails, false, true)
        })
    }

    markAsRead = () => {
        this.toggleReadState(true)
    }

    markAsUnread = () => {
        this.toggleReadState(false)
    }

    toggleReadState = (readState) => {
        const selectedIds = this.getSelectedIds();
        this.patch({
            messageIds: selectedIds,
            command: "read",
            read: readState
        })
        const emails = this.state.emails.map((email) => {
            if (email.selected) {
                email.read = readState
            }
            return email
        })
        this.setState({
            ...this.state,
            emails: emails
        })
    }

    getSelectedIds() {
        const ids = this.state.emails.filter(e => e.selected).map(e => e.id);
        return ids;
    }

    patch = async (patch) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/messages/`, {
            method: 'PATCH',
            body: JSON.stringify(patch),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

    deleteEmails = () => {
        const selectedIds = this.getSelectedIds();
        this.patch({
            messageIds: selectedIds,
            command: 'delete'
        });
        this.setState({
            emails: this.state.emails.filter((email) => !email.selected)
        })
    }

    manageLabel = (e, isAdd) => {
        const label = e.target.value
        const selectedIds = this.getSelectedIds();
        this.patch({
            messageIds: selectedIds,
            command: isAdd ? 'addLabel' : 'removeLabel',
            label: label
        });
        this.setState({
            emails: this.state.emails.map((email) => {
                if (email.selected
                    && Array.isArray(email.labels)) {
                    const index = email.labels.indexOf(label);
                    if (isAdd) {
                        if (index === -1)
                            email.labels.push(label);
                    } else {
                        if (index > -1)
                            email.labels.splice(index, 1)
                    }
                }
                return email
            })
        })
        e.preventDefault()
        e.target.value = ''
    }

    addLabel = (e) => {
        this.manageLabel(e, true)
    }

    removeLabel = (e) => {
        this.manageLabel(e, false)
    }

    toggleCompose = () => {
        this.setState({
            ...this.state,
            showCompose: !this.state.showCompose
        })
    }

    post = async (message) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/`, {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const email = await response.json()
        this.setState({
            ...this.state,
            showCompose: false,
            emails: this.state.emails.concat(email)
        })
    }

    addNewMessage = (message) => {
        this.post(message);
    }

    render() {

        const noOfunread = this.state.emails.filter((email) => !email.read).length
        const allSelected = this.processSelectState(this.state.emails, true, false)
        const noneSelected = this.processSelectState(this.state.emails, false, true)

        const emailItems = this.state.emails.map((email) => {
            return <Email
                key={email.id}
                email={email}
                toggleSelect={this.toggleSelect}
                toggleStar={this.toggleStar}
                markAsRead={this.markAsRead}
                patch={this.patch}
            />
        })

        return (
            <div className="container" >
                <Toolbar
                    toggleSelection={this.toggleSelection}
                    allSelected={allSelected}
                    noneSelected={noneSelected}
                    markAsRead={this.markAsRead}
                    markAsUnread={this.markAsUnread}
                    noOfunread={noOfunread}
                    deleteEmails={this.deleteEmails}
                    addLabel={this.addLabel}
                    removeLabel={this.removeLabel}
                    toggleCompose={this.toggleCompose}
                />
                {this.state.showSpinner ?
                    <Spinner />
                    :
                    <div>
                        {this.state.showCompose && <Compose addNewMessage={this.addNewMessage} />}
                        {emailItems}
                    </div>
                }
            </div>
        )
    }
}