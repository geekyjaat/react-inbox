import React from 'react';
import Toolbar from './Toolbar';
import Email from './Email';
import Compose from './Compose';

export default class Inbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            emails: this.props.emails
        }
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
        this.setState((prevState) => ({
            emails: prevState.emails.map((email) => {
                email.selected = selectFlag
                return email
            })
        }))
    }

    toggleSelect = (id) => {
        this.setState((prevState) => ({
            emails: prevState.emails.map((email) => {
                if (email.id === id) {
                    email.selected = !email.selected
                }
                return email
            }),
            allSelected: this.processSelectState(this.state.emails, true, false),
            noneSelected: this.processSelectState(this.state.emails, false, true)
        }))
    }

    toggleStar = (id) => {
        this.setState((prevState) => ({
            emails: prevState.emails.map((email) => {
                if (email.id === id) {
                    email.starred = !email.starred
                }
                return email
            })
        }))
    }

    markAsRead = (id) => {
        this.toggleReadState(true, id)
    }

    markAsUnread = () => {
        this.toggleReadState(false)
    }

    toggleReadState = (readState, id) => {
        this.setState((prevState) => ({
            emails: prevState.emails.map((email) => {
                if (email.id === id || (id === undefined && email.selected)) {
                    email.read = readState
                }
                return email
            })
        }))
    }

    deleteEmails = () => {
        this.setState((prevState) => ({
            emails: prevState.emails.filter((email) => !email.selected)
        }))
    }

    manageLabel = (e, isAdd) => {
        const label = e.target.value
        this.setState((prevState) => ({
            emails: prevState.emails.map((email) => {
                if (email.selected
                    && Array.isArray(email.labels)) {
                    const index = email.labels.indexOf(label);
                    if (isAdd) {
                        if (index === -1)
                            email.labels.push(label);
                    } else {
                        email.labels.splice(index, 1)
                    }
                }
                return email
            })
        }))
        e.preventDefault()
        e.target.value = ''
    }

    addLabel = (e) => {
        this.manageLabel(e, true)
    }

    removeLabel = (e) => {
        this.manageLabel(e, false)
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
                />
                <Compose />
                {emailItems}
            </div>
        )
    }
}