import React from 'react';

import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { connect } from 'react-redux';
import { processSelectState } from '../actions';

const Toolbar = ({
    emails,
    actions,
    noOfunread
}) => {

    const allSelected = processSelectState(emails, true, false)
    const noneSelected = processSelectState(emails, false, true)

    const manageLabels = (e, isAdd) => {
        actions.manageLabels(e.target.value, isAdd)
        e.preventDefault()
        e.target.value = ''
    }

    return (

        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{noOfunread}</span>
                    unread messages</p>
                <button className="btn btn-danger" onClick={actions.toggleCompose}>
                    <i className="fa fa-plus"></i>
                </button>
                <button className="btn btn-default" onClick={actions.toggleSelectAll}>
                    {noneSelected ?
                        <i className="fa fa-square-o"></i> :
                        (allSelected ?
                            <i className="fa fa-check-square-o"></i> :
                            <i className="fa fa-minus-square-o"></i>
                        )
                    }
                </button>

                <button
                    onClick={() => actions.toggleReadState(true)}
                    className="btn btn-default"
                    disabled={noneSelected}
                >
                    Mark As Read</button>

                <button
                    onClick={() => actions.toggleReadState(false)}
                    className="btn btn-default"
                    disabled={noneSelected}
                >
                    Mark As Unread</button>

                <select
                    id="labelPlus"
                    className="form-control label-select"
                    disabled={noneSelected}
                    onChange={(e) => manageLabels(e, true)}
                >
                    <option value=''>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select
                    id="labelMinus"
                    className="form-control label-select"
                    disabled={noneSelected}
                    onChange={(e) => manageLabels(e, false)}
                >
                    <option value=''>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button
                    onClick={actions.deleteEmails}
                    className="btn btn-default"
                    disabled={noneSelected}
                >
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ inbox }) => ({
    emails: inbox.emails,
    noOfunread: inbox.emails.filter((email) => !email.read).length
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar)