import React from 'react';

class Monopoly extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
        }
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
}

export default Monopoly;
