import React from 'react';
import EventManager from "../../../EventManager";

import Draggable from '../Draggable'

class Gps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            district: 'Дель-Перро',
            street: 'Саут-Рокфорд-драйв / Норт-Рокфорд-драйв',
            showGang: false,
            showMafia: false,
            isTextStroke: true,
            att: 0,
            def: 0,
            tre: 0,
            timer: 0,
            color: '#fff',
            background: 0.1,
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Gps.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    componentDidMount() {
        EventManager.addHandler('hudg', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({show: value.isShow});
                this.setState({district: value.district});
                this.setState({street: value.street});
                this.setState({background: value.background});
                this.setState({isTextStroke: value.isTextStroke});
            }
            else if (value.type === 'updateGangInfo') {
                this.setState({att: value.top1});
                this.setState({def: value.top2});
                this.setState({timer: value.timerCounter});
            }
            else if (value.type === 'showGangInfo') {
                this.setState({showGang: true});
            }
            else if (value.type === 'hideGangInfo') {
                this.setState({showGang: false});
            }
            else if (value.type === 'updateMafiaInfo') {
                this.setState({att: value.top1});
                this.setState({def: value.top2});
                this.setState({tre: value.top3});
                this.setState({timer: value.timerCounter});
            }
            else if (value.type === 'showMafiaInfo') {
                this.setState({showMafia: true});
            }
            else if (value.type === 'hideMafiaInfo') {
                this.setState({showMafia: false});
            }
            else return;
        })
    }

    componentWillUnmount() {
        EventManager.removeHandler('hudg');
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>

                <Draggable id="gps" className="gps-main">
                    <div className="gps-icon"></div>
                    <div className={`gps-address-wrap${this.state.isTextStroke ? ' text-stroke' : ''}`}>
                        <div className="gps-title">{this.state.district}</div>
                        <div className="gps-txt">{this.state.street}</div>
                    </div>
                </Draggable>

                <Draggable id="gang" className={this.state.showGang ? 'gang-war-info' : 'hide'} style={{backgroundColor: 'rgba(255, 255, 255, ' + this.state.background + ')'}}>
                    <div className="war-att war-title" style={this.state}>Война за территорию</div>
                    <div className="war-att war-list-item">Атака: {this.state.att}</div>
                    <div className="war-def war-list-item">Оборона: {this.state.def}</div>
                    <div className="war-timer war-list-item">Таймер: {this.state.timer} сек</div>
                </Draggable>

                <Draggable id="mafia" className={this.state.showMafia ? 'gang-war-info' : 'hide'} style={{backgroundColor: 'rgba(255, 255, 255, ' + this.state.background + ')'}}>
                    <div className="war-att war-title" style={this.state}>Война за территорию</div>
                    <div className="war-att war-list-item">Cosa Nostra: {this.state.att}</div>
                    <div className="war-def war-list-item">Russian Mafia: {this.state.def}</div>
                    <div className="war-def war-list-item">Yakuza: {this.state.tre}</div>
                    <div className="war-timer war-list-item">Таймер: {this.state.timer} сек</div>
                </Draggable>

            </React.Fragment>
        )
    }
}

export default Gps;
