import React from 'react';
import Labels from './Labels';

export default class Email extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            showBody: false
        }
    }

    toggleBody = async (e) => {
        e.preventDefault();
        if (!this.state.showBody) {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/` + this.state.email.id)
            const message = await response.json()
            this.setState({
                ...this.state,
                email: {
                    ...this.state.email,
                    body: message.body
                }
            })
        }
        this.setState({
            ...this.state,
            showBody: !this.state.showBody
        })
    }

    async flipStar(id, star) {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages/`, {
            method: 'PATCH',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

    toggleStar = () => {
        this.props.patch({
            messageIds: [this.state.email.id],
            command: 'star',
            star: !this.state.email.starred
        })
        this.setState({
            ...this.state,
            email: {
                ...this.state.email,
                starred: !this.state.email.starred
            }
        })
    }

    toggleSelect = () => {
        this.props.toggleSelect(this.state.email.id)
    }

    render() {
        return (
            <div className="col-md-12">
                <div className={this.state.email.read ?
                    (this.props.email.selected ?
                        'row message read selected' :
                        'row message read'
                    ) :
                    (this.props.email.selected ?
                        'row message unread selected' :
                        'row message unread'
                    )}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input
                                    id="selected"
                                    type="checkbox"
                                    checked={this.props.email.selected ? true : false}
                                    onChange={this.toggleSelect}
                                />
                            </div>
                            <div className="col-xs-2">
                                {this.state.email.starred ?
                                    (<i onClick={this.toggleStar} className="star fa fa-star"></i>) :
                                    (<i onClick={this.toggleStar} className="star fa fa-star-o"></i>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11" onClick={this.toggleBody}>
                        <Labels labels={this.state.email.labels} />
                        <a href="">{this.state.email.subject}</a>
                    </div>
                </div>
                {this.state.showBody &&
                    <div className="row message-body">
                        <div className="col-xs-11 col-xs-offset-1">
                            {this.state.email.body}</div>
                    </div>
                }
            </div>
        )
    }
}