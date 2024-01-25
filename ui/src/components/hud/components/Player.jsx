import React from 'react';
import EventManager from "../../../EventManager";

import Draggable from '../Draggable'

class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            microphone: true,
            drink: 100,
            eat: 100,
            wallet: "$131,100,500",
            card: "$13,100,500",
            color: '#48B9F2',
            background: 0.1,
            isDarkBackground: false
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Player.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    componentDidMount() {
        EventManager.addHandler('hudp', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({microphone: value.microphone});
                this.setState({drink: value.drink});
                this.setState({eat: value.eat});
                this.setState({wallet: value.wallet});
                this.setState({card: value.card});
                this.setState({background: value.background});
                this.setState({isDarkBackground: value.isDarkBackground});
            } else return;
        })
    }

    componentWillUnmount() {
        EventManager.removeHandler('hudp');
    }

    formatCurrency(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="player-hud">

                        <Draggable id="player-mic" className="phud-mic" style={{background: `rgba(${this.state.isDarkBackground ? '0,0,0' : '255,255,255'}, ${this.state.background})`}}>
                            <div className={this.state.microphone ? 'mic-img active' : 'mic-img'}></div>
                        </Draggable>
                    
                        <Draggable id="player-needs" className="phud-needs" style={{background: `rgba(${this.state.isDarkBackground ? '0,0,0' : '255,255,255'}, ${this.state.background})`}}>
                            <div className="needs-box">
                                <div className="img-drink"></div>
                                <div className="line-scale liner-needs">
                                    <div className="line-scale-active color-liner"
                                        style={{width: this.state.drink + '%', background: this.state.color}}></div>
                                </div>
                            </div>
                            <div className="needs-box">
                                <div className="img-eat"></div>
                                <div className="line-scale liner-needs">
                                    <div className="line-scale-active color-liner"
                                        style={{width: this.state.eat + '%', background: this.state.color}}></div>
                                </div>
                            </div>
                        </Draggable>
                    
                        <Draggable id="player-money" className="phud-money" style={{background: `rgba(${this.state.isDarkBackground ? '0,0,0' : '255,255,255'}, ${this.state.background})`}}>
                            <div className="money-box">
                                <div className="img-wallet"></div>
                                <div className="wallet-text">{this.state.wallet}</div>
                            </div>
                            <div className="money-box">
                                <div className="img-credit-card"></div>
                                <div className="credit-text">{this.state.card}</div>
                            </div>
                        </Draggable>
                    
                </div>
            </React.Fragment>
        )
    }
}

export default Player;
