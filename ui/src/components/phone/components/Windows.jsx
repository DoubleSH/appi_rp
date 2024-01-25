import React from 'react';

class Windows extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Windows.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}

export default Windows;
