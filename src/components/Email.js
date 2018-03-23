import React from 'react';
import Labels from './Labels';

export default class Email extends React.Component {

    state = {
        showBody: false
    }

    toggleBody = (e) => {
        e.preventDefault()
        this.setState((prevState) => ({
            showBody: !prevState.showBody
        }))
        if (!this.props.email.read)
            this.props.markAsRead(this.props.email.id)
    }

    toggleStar = () => {
        this.props.toggleStar(this.props.email.id)
    }

    toggleSelect = () => {
        this.props.toggleSelect(this.props.email.id)
    }

    render() {
        return (
            <div className="col-md-12">
                <div className={this.props.email.read ?
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
                                {this.props.email.starred ?
                                    (<i onClick={this.toggleStar} className="star fa fa-star-o"></i>) :
                                    (<i onClick={this.toggleStar} className="star fa fa-star"></i>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <Labels labels={this.props.email.labels} />
                        <a href="" onClick={this.toggleBody}>{this.props.email.subject}</a>
                    </div>
                </div>
                {this.state.showBody &&
                    <div className="row message-body">
                        <div className="col-xs-11 col-xs-offset-1">
                            This is the body of the message.</div>
                    </div>
                }
            </div>
        )
    }
}