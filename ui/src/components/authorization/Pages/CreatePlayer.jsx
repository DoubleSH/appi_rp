import React from 'react';
import Title from '../uikit/Title';
import ChangePlayer from './Content/ChangePlayer';

class CreatePlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'CreatePlayer.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    render() {
        return (
            <React.Fragment>
                <div className="reg-main">
                    <div className="create-content">
                        <ChangePlayer/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CreatePlayer;
