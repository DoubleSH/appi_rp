import React from 'react';

class Role extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            img: 'player_role'
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Role.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    selectChar(index) {
        mp.trigger('client:events:custom:choiceRole', index) // eslint-disable-line
    }

    render() {
        return (
            <div className={`change-create-player ${this.props.customClassName}`}>
                <div className="role-custom">
                    <div className="role-custom-label"></div>
                    <span className="role-custom-description">{this.props.description}</span>
                    <div className="button" onClick={() => this.selectChar(this.props.index)}>{this.props.buttonLabel}</div>
                </div>
            </div>
        )
    }
}

export default Role;
