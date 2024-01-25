import React from 'react';
import ReactCompass from './ReactCompass';

class CompassPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            direction: 0
        }
    }

    // componentDidCatch(error, errorInfo) {
    //     mp.trigger('client:ui:debug', 'AuthMain.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    // }

    // componentDidMount() {
    //     EventManager.addHandler('authMain', value => {
    //         if (value.type === 'show') {
    //             this.setState({show: true})
    //         } else if (value.type === 'hide') {
    //             this.setState({show: false})
    //         } else if (value.type === 'switch') {
    //             this.setState({show: !this.state.show})
    //         } else if (value.type === 'showCreatePage') {
    //             this.setState({path: '/create'})
    //         } else return;
    //     })
    // }

    // componentWillUnmount() {
    //     EventManager.removeHandler('authMain');
    // }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
                <div>
                <ReactCompass direction={this.state.direction} />
                </div>
            </React.Fragment>
        )
    }
}

export default CompassPage;