import React from 'react';
import addPlayerIcon from '../../img/icon_add_player.svg'
import persPlaceholder from '../../img/pers1.png'

class BoxCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'BoxCreate.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    clickCreatePlayer() {
        mp.trigger('client:events:createNewPlayer'); // eslint-disable-line
    };

    render() {
        return (
            <React.Fragment>
                <div className="change-create-player-create">
                    <span
                        className="button size-m"
                        onClick={this.clickCreatePlayer.bind(this)}
                    >
                        Создать персонажа
                    </span>
                </div>
            </React.Fragment>
        )
    }
}

export default BoxCreate;
