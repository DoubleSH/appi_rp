import React from 'react';
class Logo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
        }
    }
    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Logo.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }
    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
                    <div className="logo-img-auth"></div>
            </React.Fragment>
        )
    }
}

export default Logo;
