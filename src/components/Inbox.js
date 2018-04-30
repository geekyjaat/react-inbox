import React from 'react';
import Toolbar from './Toolbar';
import Email from './Email';
import Compose from './Compose';
import Spinner from './Spinner';

import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { connect } from 'react-redux';

const Inbox = ({
    emails,
    showSpinner,
    showCompose
}) => {
    
    const emailItems =
        emails.map((email) => {
            return <Email
                key={email.id}
                email={email}
            />
        })

    return (
        <div className="container" >
            <Toolbar />
            {showSpinner ?
                <Spinner />
                :
                <div>
                    {showCompose && <Compose />}
                    {emailItems}
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    emails: state.inbox.emails,
    showSpinner: state.inbox.showSpinner,
    showCompose: state.compose.showCompose
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Inbox)