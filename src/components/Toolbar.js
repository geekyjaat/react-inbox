import React from 'react';

const Toolbar = ({
    noOfunread,
    toggleSelection,
    allSelected,
    noneSelected,
    markAsRead,
    markAsUnread,
    addLabel,
    removeLabel,
    deleteEmails
}) => {
    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{noOfunread}</span>
                    unread messages</p>
                <a className="btn btn-danger">
                    <i className="fa fa-plus"></i>
                </a>
                <button className="btn btn-default" onClick={toggleSelection}>
                    {noneSelected ?
                        <i className="fa fa-square-o"></i> :
                        (allSelected ?
                            <i className="fa fa-check-square-o"></i> :
                            <i className="fa fa-minus-square-o"></i>
                        )
                    }
                </button>

                <button
                    onClick={markAsRead}
                    className="btn btn-default"
                    disabled={noneSelected}
                >
                    Mark As Read</button>

                <button
                    onClick={markAsUnread}
                    className="btn btn-default"
                    disabled={noneSelected}
                >
                    Mark As Unread</button>

                <select
                    id="labelPlus"
                    className="form-control label-select"
                    disabled={noneSelected}
                    onChange={addLabel}
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
                    onChange={removeLabel}
                >
                    <option value=''>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button
                    onClick={deleteEmails}
                    className="btn btn-default"
                    disabled={noneSelected}
                >
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default Toolbar