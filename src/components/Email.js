import React from 'react';
import Labels from './Labels';

import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { connect } from 'react-redux';

const Email = ({
    email,
    actions
}) => {

    return (
        <div className="col-md-12">
            <div className={email.read ?
                (email.selected ?
                    'row message read selected' :
                    'row message read'
                ) :
                (email.selected ?
                    'row message unread selected' :
                    'row message unread'
                )}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input
                                id="selected"
                                type="checkbox"
                                checked={email.selected ? true : false}
                                onChange={() => actions.toggleSelect(email.id)}
                            />
                        </div>
                        <div className="col-xs-2"
                            onClick={() => actions.toggleStar(email.id, email.starred)}>
                            {email.starred ?
                                (<i className="star fa fa-star"></i>) :
                                (<i className="star fa fa-star-o"></i>)
                            }
                        </div>
                    </div>
                </div>
                <div className="col-xs-11" onClick={() => actions.toggleBody(email.id)}>
                    <Labels labels={email.labels} />
                    <a href="" onClick={(e) => {
                        e.preventDefault();
                    }}>{email.subject}</a>
                </div>
            </div>
            {email.showBody &&
                <div className="row message-body">
                    <div className="col-xs-11 col-xs-offset-1">
                        {email.body}</div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Email)