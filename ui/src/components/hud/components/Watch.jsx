import React from 'react';
import EventManager from "../../../EventManager";

import Draggable from '../Draggable'

class Watch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true,
            showGreen: true,
            showYellow: false,
            isTextStroke: true,
            time: '14:37',
            date: '16/07/2010',
            temp: '+29°C',
            color: '#48B9F2',
            background: 0.1,
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Watch.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    componentDidMount() {
        EventManager.addHandler('hudw', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({show: value.isShow});
                this.setState({time: value.time});
                this.setState({date: value.date});
                this.setState({temp: value.temp});
                this.setState({showGreen: value.showGreen});
                this.setState({showYellow: value.showYellow});
                this.setState({background: value.background});
                this.setState({isTextStroke: value.isTextStroke});
            } else return;
        })
    }

    componentWillUnmount() {
        EventManager.removeHandler('hudw');
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
                    <Draggable id="zone" className="zone-box">
                        <div className={this.state.showGreen ? 'time-img-greenzone' : 'hide'}>Green Zone</div>
                        <div className={this.state.showYellow ? 'time-img-yellowzone' : 'hide'}></div>
                    </Draggable>
                    <Draggable id="watch" className={`watch-main${this.state.isTextStroke ? ' text-stroke' : ''}`}>
                        <div className="time-img-watch"></div>
                        <div className="time-box">
                            <div className="time">{this.state.time}
                            </div>
                            <div className="date">{this.state.date}</div>
                        </div>
                        <div className="degrees">{this.state.temp}</div>
                    </Draggable>
            </React.Fragment>
        )
    }
}

export default Watch;
