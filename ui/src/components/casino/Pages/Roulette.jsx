import React from 'react';
import EventManager from '../../../EventManager';
import '../css/roulette.css';
import Chips from "../img/chips.png";
import SaveButton from "../img/save_button.svg"
import EditButton from "../img/edit_button.svg"

const WaitingBlockColors = {
    Blue:  '#51B9F0',
    Orange: '#F96F22',
    Boxshadow: '0px 0px 50px 1px #51B9F0',
    Boxshadownone: '',
    White: 'rgba(255, 255, 255, 0.85)',
    GreyBorder: 'rgba(255, 255, 255, 0.35)'
}

const ROULETTE_STATES = {
    WAIT_FIRST_BET: 0,
    WAIT_TIME_START: 1,
    GAME_STARTED: 2,
    GAME_END: 3
}
  
class Roulette extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            casino_money_amount: 2000,
            chipsAmountToBid: '',
            chipsAmountToBidTemp: '',
            history_arr: [  //0-green; 1-red; 2-black
                {num: 23, color: 0},
                {num: 25, color: 0},
                {num: 26, color: 0},
                {num: 0, color: 0},
                {num: 13, color: 0},
                {num: 16, color: 0} 
            ],
            game_on: false,
            bid_win: false,
            bid_lost: false,
            current_bid: 1,
            current_state: ROULETTE_STATES.WAIT_FIRST_BET,
            current_waiting_block_color: WaitingBlockColors.Blue,
            current_waiting_block_box_shadow: WaitingBlockColors.Boxshadow,
            current_waiting_block_title: 'ожидание результата',
            current_waiting_block_title_color: WaitingBlockColors.Blue,
            current_waiting_time: 3,
            timer_loss: null,
            showDivChipsAmountToBid: true,
            bid_win_lost_show: false,
            timerInterval: null
        }
    }

    

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Roulette.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    setRouletteState(state=ROULETTE_STATES.WAIT_TIME_START, wait=0) {
        if(state == ROULETTE_STATES.WAIT_FIRST_BET) {
            this.setState({
                current_state: ROULETTE_STATES.WAIT_FIRST_BET,
                current_waiting_block_color: WaitingBlockColors.White,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadownone,
                current_waiting_block_title: 'Идет прием ставок',
                current_waiting_block_title_color: WaitingBlockColors.White
            })
        }
        if(state == ROULETTE_STATES.WAIT_TIME_START) {
            this.setState({
                current_waiting_time: (this.state.current_state != ROULETTE_STATES.WAIT_TIME_START && wait) ? wait : this.state.current_waiting_time,
                current_state: ROULETTE_STATES.WAIT_TIME_START,
                current_waiting_block_color: WaitingBlockColors.White,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadownone,
                current_waiting_block_title: 'Идет прием ставок. Старт через #timeStart секунд',
                current_waiting_block_title_color: WaitingBlockColors.White
            })
            this.StartTimer();
        }
        if(state == ROULETTE_STATES.GAME_STARTED) {
            this.setState({
                current_state: ROULETTE_STATES.GAME_STARTED,
                current_waiting_block_color: WaitingBlockColors.Blue,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadow,
                current_waiting_block_title: 'Прием ставок окончен. Игра началась',
                current_waiting_block_title_color: WaitingBlockColors.Blue
            })
        }
        if(state == ROULETTE_STATES.GAME_END) {
            this.setState({
                current_state: ROULETTE_STATES.GAME_END,
                current_waiting_block_color: WaitingBlockColors.Orange,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadownone,
                current_waiting_block_title: 'Игра окончена. Идет прием ставок',
                current_waiting_block_title_color: WaitingBlockColors.Orange
            })
        }
    }

    StartTimer() {
        if(!this.state.timerInterval) this.state.timerInterval = setInterval(this.countDown.bind(this), 1000);
    }

    countDown() {
        if (this.state.current_waiting_time > 0) {
            this.setState({current_waiting_time: this.state.current_waiting_time - 1 });
        }
        else {
            clearInterval(this.state.timerInterval)
            this.state.timerInterval = null
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
        // EventManager.addHandler('roulette', value => {
        //     if (value.type === 'show') {
        //         this.setState({show: true})
        //     } else if (value.type === 'hide') {
        //         this.setState({show: false})
        //     }
        //      else return;
        // })
        EventManager.addHandler('showCasinoRoulette', value => { 
            if (value.type === 'show') {
                this.setState({ show: true })
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if(value.type == 'update') {
                this.setState({
                    chipsAmountToBidTemp: value.chips_to_bid == undefined ? this.state.chipsAmountToBidTemp : value.chips_to_bid,
                    chipsAmountToBid: !this.state.chipsAmountToBid ? value.chips_to_bid || this.state.chipsAmountToBid : this.state.chipsAmountToBid,
                    current_bid: value.current_bid == undefined ? this.state.current_bid : value.current_bid,
                    casino_money_amount: value.casino_money == undefined ? this.state.casino_money_amount : value.casino_money,
                    history_arr: value.history == undefined ? this.state.history_arr : value.history,
                    bid_win: value.bid_win==undefined ? this.state.bid_win : value.bid_win,
                    bid_lost: value.bid_lost==undefined ? this.state.bid_lost : value.bid_lost
                })
                this.setRouletteState(value.state || ROULETTE_STATES.WAIT_FIRST_BET, value.current_waiting_time||0)
            }
            else return;
        })
        this.UpdateColorHistory();
        this.setRouletteState();
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
        EventManager.removeHandler('showCasinoRoulette');
    } 

    closeRoulette() {
        mp.trigger('roulette:table:close', true); // eslint-disable-line
        this.setState({ show: false })
    }





    UpdateColorHistory() {
        let history_Copy = [];
        history_Copy = [...this.state.history_arr];
        history_Copy.forEach((item) => {
            if ((item.num === 1) || (item.num === 3) || (item.num === 5) || (item.num === 9) || (item.num === 7) ||
               (item.num === 12) || (item.num === 14) || (item.num === 18) || (item.num === 16) || (item.num === 19) ||
               (item.num === 21) || (item.num === 23) || (item.num === 27) || (item.num === 25) || (item.num === 30) ||
               (item.num === 32) || (item.num === 34) || (item.num === 36)) {
                item.color = 1;
            } else {
                if ((item.num === 2) || (item.num === 4) || (item.num === 6) || (item.num === 8) || (item.num === 10) ||
                (item.num === 11) || (item.num === 13) || (item.num === 15) || (item.num === 17) || (item.num === 20) ||
                (item.num === 22) || (item.num === 24) || (item.num === 26) || (item.num === 25) || (item.num === 28) ||
                (item.num === 29) || (item.num === 31) || (item.num === 33) || (item.num === 35)) {
                    item.color = 2
                } else {
                    item.color = 0;
                }
            }
        })
        this.setState({history_arr: history_Copy})
    }

    getWinLostText(status) {//1-win 2-last
        if (status === 1) {
        return(
            <span className='BidWin'>+ {this.state.current_bid * 2}</span>
            )
        }
        else {
            if (status === 2) {
                return(
                <span className='BidLost'>- {this.state.current_bid}</span>
                )
            } 
        }
        if ((status === 1) || (status === 2)) {
            this.setBidWinLostStateTrue.bind(this)
        }
        else {
            this.setBidWinLostStateFalse.bind(this)
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            this.closeRoulette()
        } 
    }

    setBidWinLostStateFalse() {
        this.setState({bid_win_lost_show: false})
    }


    setBidWinLostStateTrue() {
        this.setState({bid_win_lost_show: true})
    }

    getBlockChipsAmountToBid = () => {
        if (this.state.showDivChipsAmountToBid) {
            return (
                <div className='your-bid' style={{paddingLeft: '25px', paddingRight: '25px'}} onClick={() => this.setState({showDivChipsAmountToBid: !(this.state.showDivChipsAmountToBid)})}>
                    <span>{`СТАВКА: ${this.state.chipsAmountToBidTemp}`}</span>
                    <svg className="edit_button" width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7335 1.79341C14.0145 0.512272 16.0914 0.512217 17.3726 1.79328C18.6535 3.07423 18.6535 5.15105 17.3727 6.43208L16.5552 7.24971L11.9162 2.61077L12.7335 1.79341ZM10.944 3.5831L1.77928 12.7489C1.40681 13.1214 1.14501 13.59 1.023 14.1024L0.0187081 18.3204C-0.0365852 18.5526 0.0325589 18.7969 0.201372 18.9658C0.370195 19.1346 0.614505 19.2038 0.846751 19.1485L5.06456 18.1442C5.57716 18.0222 6.04584 17.7603 6.41842 17.3877L15.583 8.222L10.944 3.5831Z" />
                    </svg>
                </div>
            )
        }
        else {
            return (
                <div className={this.state.chipsAmountToBid > this.state.casino_money_amount ? 'your-bid-disabled' : 'your-bid'} style={{ paddingRight: '25px'}}>
                    <input
                    onChange={this.handleInput.bind(this)}
                    className={this.state.chipsAmountToBid > this.state.casino_money_amount ? 'bid-input-disabled' : 'bid-input'}
                    maxLength="5"
                    value={this.state.chipsAmountToBid}
                    style={{width: '75%', height: '100%'}}
                    >
                    </input>
                    <svg className='save_button' onClick={this.UpdateCurrentBid.bind(this)}  width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.4375 0L2.52083 0C1.12862 0 0 1.12862 0 2.52083L0 13.9792C0 15.3714 1.12862 16.5 2.52083 16.5H2.75L2.75 11C2.75 9.86095 3.67341 8.9375 4.8125 8.9375L11.6875 8.9375C12.8266 8.9375 13.75 9.86095 13.75 11V16.5H13.9792C15.3714 16.5 16.5 15.3714 16.5 13.9792V4.84507C16.5 4.05495 16.1861 3.29719 15.6274 2.73849L13.7615 0.872575C13.2105 0.321558 12.4658 0.00868085 11.6875 0.000174185V4.125C11.6875 5.26409 10.7641 6.1875 9.625 6.1875H5.5C4.36091 6.1875 3.4375 5.26409 3.4375 4.125L3.4375 0ZM10.3125 0V4.125C10.3125 4.50469 10.0047 4.8125 9.625 4.8125H5.5C5.12031 4.8125 4.8125 4.50469 4.8125 4.125L4.8125 0L10.3125 0ZM12.375 16.5V11C12.375 10.6203 12.0672 10.3125 11.6875 10.3125L4.8125 10.3125C4.43281 10.3125 4.125 10.6203 4.125 11V16.5H12.375Z"/>
                    </svg>
                </div>
            )
        }
    }

    handleInput(event) {
        this.setState({chipsAmountToBid: Number(event.target.value.replace(/\D/,'')) || ''})
    }

    UpdateCurrentBid() {
        if (!(this.state.chipsAmountToBid === '')) {
            this.setState({showDivChipsAmountToBid: !(this.state.showDivChipsAmountToBid)}) 
            this.setState({chipsAmountToBidTemp: this.state.chipsAmountToBid})
            mp.trigger('roulette:table:set_bet', this.state.chipsAmountToBid);// eslint-disable-line
        } else {
            this.setState({showDivChipsAmountToBid: !(this.state.showDivChipsAmountToBid)}) 
        }
    }


    CancellButtonFunc() {
       mp.trigger('roulette:table:clear_bet'); // eslint-disable-line
    }

    RepeatButtonFunc() {
        mp.trigger('roulette:table:repeat_bet'); // eslint-disable-line
    }

    DoubleButtonFunc() {
        mp.trigger('roulette:table:x2_bet'); // eslint-disable-line
    }

 
    render() {
        if (!this.state.show) {
            return null;
        }


        return (
            <React.Fragment>
                <div className='game_container'>
                    <div className='active_bid_box'>
                        <div className='bid_param_block'>
                            <div className='param-cancell'>
                                <div className='param-cancell-img' onClick={this.CancellButtonFunc}></div>
                                <div className='param-cancell-text'>Отменить</div>
                            </div>
                            <div className='param-repeat'>
                                <div className='param-repeat-img' onClick={this.RepeatButtonFunc}></div>
                                <div className='param-repeat-text'>Повторить</div>
                            </div>
                            <div className='param-double'>
                                <div className='param-double-img' onClick={this.DoubleButtonFunc}></div>
                                <div className='param-double-text'>Удвоить</div>
                            </div>
                        </div>
                        {!(this.state.current_bid === 0) ?
                        <React.Fragment>
                            <div className='active_bid_block'>
                                <span className='active_bid_block_title'>АКТИВНАЯ СТАВКА</span>
                                <span className='active_bid_block_current_bid_text'><img src={Chips} style={{marginRight: '8px'}}/>{this.state.current_bid}</span>
                            </div>
                        </React.Fragment>
                        :
                        ''}
                    </div>
                    <div className='roulette_bottom_box'>
                        <div className='leave-roulette' onClick={() => this.closeRoulette()}>
                            <span>Покинуть стол</span>
                        </div>
                        <div className='roulette-game-box'>
                            {this.getBlockChipsAmountToBid()}
                            <div className={!this.state.bid_win_lost_show ? 'amount-of-chips-acc' : 'amount-of-chips-acc-bid-win-lost'}>
                                {this.getWinLostText(0)}
                                <div className={((this.state.bid_lost) || (this.state.bid_win)) ? 'block-of-chips-amount-acc-open-bid' : 'block-of-chips-amount-acc'}>
                                    <img src={Chips}/>
                                    <span className='text-amount-chips'>{this.state.casino_money_amount}</span>
                                </div>
                            </div>
                            <div className='your-move' style={{borderColor: this.state.current_waiting_block_color, boxShadow: this.state.current_waiting_block_box_shadow}}>
                                <span style={{color: this.state.current_waiting_block_title_color}}>{this.state.current_waiting_block_title.replace('#timeStart', this.state.current_waiting_time)}</span>
                            </div>
                            <div className='history-win'>
                            {this.state.history_arr.map((item, i) => {
                                return (
                                    <div key={i} className={item.color === 0 ? "last-win green" : item.color === 1 ? "last-win red" : "last-win black"}>
                                        <span>{item.num}</span>
                                    </div>  
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Roulette; 