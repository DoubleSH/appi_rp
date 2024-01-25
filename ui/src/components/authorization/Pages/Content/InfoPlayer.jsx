import React from 'react';

class InfoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            img: ''
        }
    }

    selectChar(name, spawnName) {
        mp.trigger('client:events:selectPlayer', // eslint-disable-line
            name, spawnName);
    }

    changeImg() {
        if (this.props.info_player[this.props.index].player.sex === "w") {
            return "player_women";
        } else {
            if (this.props.info_player[this.props.index].player.old > 100) {
                return "player_old";
            } else {
                return "player_young";
            }
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'InfoPlayer.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    render() {
        return (
            <React.Fragment>
                <div className={`change-create-player-create ${this.props.index === 0 ? 'change-create-player-center' : ''}`}>
                    <div className="info-player">
                        <div className="accinfo__container">
                            <span className="accinfo__nickname">
                                {this.props.name}
                            </span>
                            <div className="text-box__container">
                                <div className="text-box">
                                    <span className="title-info-text">{this.props.old}ч.</span>
                                </div>
                                <div className="text-box">
                                    <span className="title-info-text">$ {this.props.money}</span>
                                </div>
                                <div className="select-slider-wrap">
                                    <div className="select-slider">
                                        <span className="prev"
                                            onClick={() => this.props.clickLeftArrow(this.props.index)}></span>
                                        <span className="select-slider-label"><span>{this.props.spawn[this.props.index_spawn]}</span></span>
                                        <span className="next"
                                            onClick={() => this.props.clickRightArrow(this.props.index)}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="button blue" onClick={() => this.selectChar(this.props.name, this.props.spawn[this.props.index_spawn])}>
                            Войти
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default InfoPlayer;
