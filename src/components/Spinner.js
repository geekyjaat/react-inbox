import React from 'react';
import spinner from '../img/loading.gif';

export default class Spinner extends React.Component {

    static defaultProps = {
        width: '100',
        height: '100'
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <img alt="spinner"
                    width={this.props.width}
                    height={this.props.height}
                    src={spinner} />
            </div>
        )
    }
}