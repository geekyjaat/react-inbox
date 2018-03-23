import React from 'react';

export default class Toolbar extends React.Component {

    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.props.noOfunread}</span>
                        unread messages</p>
                    <a className="btn btn-danger">
                        <i className="fa fa-plus"></i>
                    </a>
                    <button className="btn btn-default">
                        {this.props.allSelected &&
                            <i onClick={this.props.toggleSelection}
                                className="fa fa-check-square-o"></i>
                        }
                        {this.props.noneSelected &&
                            <i onClick={this.props.toggleSelection}
                                className="fa fa-square-o"></i>
                        }
                        {!this.props.noneSelected && !this.props.allSelected &&
                            <i onClick={this.props.toggleSelection}
                                className="fa fa-minus-square-o"></i>
                        }

                    </button>

                    <button
                        onClick={this.props.markAsRead}
                        className="btn btn-default"
                        disabled={this.props.noneSelected}
                    >
                        Mark As Read</button>

                    <button
                        onClick={this.props.markAsUnread}
                        className="btn btn-default"
                        disabled={this.props.noneSelected}
                    >
                        Mark As Unread</button>

                    <select
                        id="labelPlus"
                        className="form-control label-select"
                        disabled={this.props.noneSelected}
                        onChange={this.props.addLabel}
                    >
                        <option value=''>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select
                        id="labelMinus"
                        className="form-control label-select"
                        disabled={this.props.noneSelected}
                        onChange={this.props.removeLabel}
                    >
                        <option value=''>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button
                        onClick={this.props.deleteEmails}
                        className="btn btn-default"
                        disabled={this.props.noneSelected}
                    >
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}