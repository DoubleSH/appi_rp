import React from 'react';
import EventManager from "../../../EventManager";

class Logo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            showAmmo: false,
            showQuest: false,
            isAnimatedLogo: false,
            isTextStroke: true,
            questTitle: 'Квестовое задание',
            questText: 'Устроиться на работу садовника или строителя в здании правительства',
            questDesc: 'Мертвый минори',
            ammoCount: 0,
            ammoMode: 'single',
            date: '14/07',
            time: '14:18',
            online: '1',
            max_player: '1000',
            id: '0',
            color: '#48B9F2',
            background: 0.1,
            isDarkBackground: false
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Logo.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    componentDidMount() {
        EventManager.addHandler('hudl', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({date: value.date});
                this.setState({time: value.time});
                this.setState({online: value.online});
                this.setState({max_player: value.max_player});
                this.setState({id: value.id});
                this.setState({showAmmo: value.showAmmo});
                this.setState({ammoCount: value.ammoCount});
                this.setState({ammoMode: value.ammoMode});
                this.setState({background: value.background});
                this.setState({isDarkBackground: value.isDarkBackground});
                this.setState({isAnimatedLogo: value.isAnimatedLogo});
                this.setState({isTextStroke: value.isTextStroke});
            } else if (value.type === 'updateQuest') {
                this.setState({showQuest: value.showQuest});
                this.setState({questTitle: value.questTitle});
                this.setState({questText: value.questText});
            } else return;
        })
    }

    componentWillUnmount() {
        EventManager.removeHandler('hudl');
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="logo-main">
                    <div className={`logo-info${this.state.isTextStroke ? ' text-stroke' : ''}`}>
                        <div className="span-bold">ИГРОКОВ: {this.state.online}/{this.state.max_player} · <span>ID: {this.state.id}</span></div>
                        <div>{this.state.date} {this.state.time}</div>
                    </div>
                    <div className={`logo-img ${this.state.isAnimatedLogo ? ' animated' : ''}`}></div>
                    <div style={{backgroundColor: `rgba(${this.state.isDarkBackground ? '0,0,0' : '255,255,255'}, ${this.state.background})`}}
                         className={this.state.showAmmo ? 'logo-ammo' : 'hide'}>
                        <div className={'logo-ammo-img ammo-' + this.state.ammoMode}></div>
                        {this.state.ammoCount}
                    </div>
                    <div style={{backgroundColor: `rgba(${this.state.isDarkBackground ? '0,0,0' : '255,255,255'}, ${this.state.background})`}}
                         className={this.state.showQuest ? 'logo-quest' : 'hide'}>
                        <h2 className="quest-title">{this.state.questTitle}</h2>
                        <div className="quest-text">{this.state.questText}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Logo;
