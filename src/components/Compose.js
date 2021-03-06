import React from 'react';

import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { connect } from 'react-redux';

class Compose extends React.Component {
    render() {
        return (
            <form
                onSubmit={e => {
                    this.props.actions.sendMessage(
                        e.target.subject.value,
                        e.target.body.value
                    )
                    e.preventDefault()
                    e.target.reset()
                    e.target.focus()
                }}
                className="form-horizontal well">
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        <textarea name="body" id="body" className="form-control"></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input type="submit" value="Send" className="btn btn-primary" />
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Compose)