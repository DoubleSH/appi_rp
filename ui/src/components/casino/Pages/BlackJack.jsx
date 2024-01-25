import React from 'react';
import EventManager from '../../../EventManager';
import '../css/blackJack.css';
import Chips from "../img/chips.png";
import ButtonInc from "../uibuttons/ButtonInc";
import ButtonDec from "../uibuttons/ButtonDec"
import CloseFaq from "../img/close_faq.png"
import ArrowRightFaq from "../img/arrow_right_faq.png"
import ArrowLeftFaq from "../img/arrow_left_faq.png"
import FaqIcon from "../img/faq-icon.png"
import CardsIcon from "../img/cards-icon.png"


const WaitingBlockColors = {
    Blue:  '#51B9F0',
    Orange: '#F96F22',
    Boxshadow: '0px 0px 50px 1px #51B9F0',
    Boxshadownone: '',
    White: 'rgba(255, 255, 255, 0.85)',
    GreyBorder: 'rgba(255, 255, 255, 0.35)'
}

const BLACKJACK_STATES = {
    WAIT_FIRST_BET: 0,
    WAIT_TIME_START: 1,
    GAME_STARTED: 2,
    GAME_END: 3,
    GAME_PLAYER_MOVE: 4
}




class BlackJack extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            casino_money_amount: 20000,
            chipsAmountToBid: 0,
            chipsAmountToBidTemp: 0,
            BidWin: false,
            BidLost: false,
            currentCenterView: 0, //0-yourbidpage 1-waitingpage 2-morebidpage
            show_faq_conteiner: false,
            faq_page: 1, //1-first 2-second page
            current_state: BLACKJACK_STATES.WAIT_FIRST_BET,
            current_waiting_block_color: WaitingBlockColors.Blue,
            current_waiting_block_box_shadow: WaitingBlockColors.Boxshadow,
            current_waiting_block_title: 'ожидание результата',
            current_waiting_block_title_color: WaitingBlockColors.Blue,
            current_waiting_time: 15,
            showDivChipsAmountToBid: true,
            showCancelAndX2: false,
            showCanEditBit: false,
            currentNoteForCancel: 'Отменить',
            currentNoteForX2: 'Удвоить',
            current_bid: 1,
            cardValues: [
                // {cards: 20, x: 20, y: 20},
                // {cards: 22, x: 100, y: 30}
            ],
            timer: null,
            visible_cancel_and_x2: false
        }
    }

    

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'BlackJack.jsx', error, errorInfo); // eslint-disable-line
    }

    componentDidMount() {
        EventManager.addHandler('updateCardsBlackjack', (c) => {
            if(!c) return
            this.setState({
                cardValues: c
            })
        })


        EventManager.addHandler('showCasinoBlackjack', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if(value.type == 'update') {
                this.setState({
                    chipsAmountToBidTemp: value.chips_to_bid == undefined ? this.state.chipsAmountToBidTemp : value.chips_to_bid,
                    chipsAmountToBid: !this.state.chipsAmountToBid ? value.chips_to_bid || this.state.chipsAmountToBid : this.state.chipsAmountToBid,
                    current_bid: value.current_bid == undefined ? this.state.current_bid : value.current_bid,
                    casino_money_amount: value.casino_money == undefined ? this.state.casino_money_amount : value.casino_money,
                    cardValues: value.card_values,
                    visible_cancel_and_x2: value.visible_cancel_and_x2
                    // history_arr: value.history == undefined ? this.state.history_arr : value.history,
                    // bid_win: value.bid_win==undefined ? this.state.bid_win : value.bid_win,
                    // bid_lost: value.bid_lost==undefined ? this.state.bid_lost : value.bid_lost
                })
                this.setBlackjackState(value.state || BLACKJACK_STATES.WAIT_FIRST_BET, value.current_waiting_time||0)
            }
             else return;
        })
        // this.IncreaseChips();
        this.StartTimer();
        this.setBlackjackState();
    }

    componentWillUnmount() {
        EventManager.removeHandler('updateCardsBlackjack');
        EventManager.removeHandler('blackjack');

        if(this.state.timer) clearInterval(this.state.timer)
    } 

    setBlackjackState(state=BLACKJACK_STATES.WAIT_FIRST_BET, wait=0) {
        if(state == BLACKJACK_STATES.WAIT_FIRST_BET) {
            this.setState({
                current_state: BLACKJACK_STATES.WAIT_FIRST_BET,
                current_waiting_block_color: WaitingBlockColors.White,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadownone,
                current_waiting_block_title: 'Идет прием ставок',
                current_waiting_block_title_color: WaitingBlockColors.White,
                currentNoteForCancel: 'Отменить',
                currentNoteForX2: 'Удвоить',
                showCancelAndX2: true,
                showCanEditBit: true,
                currentCenterView: 0
            })
        }
        if(state == BLACKJACK_STATES.WAIT_TIME_START) {
            this.setState({
                current_waiting_time: (!this.state.current_waiting_time && wait) ? wait : this.state.current_waiting_time,
                current_state: BLACKJACK_STATES.WAIT_TIME_START,
                current_waiting_block_color: WaitingBlockColors.White,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadownone,
                current_waiting_block_title: 'Идет прием ставок. Старт через #timeStart секунд',
                current_waiting_block_title_color: WaitingBlockColors.White,
                currentNoteForCancel: 'Отменить',
                currentNoteForX2: 'Удвоить',
                showCancelAndX2: true,
                showCanEditBit: true,
                currentCenterView: 0
            })
        }
        if(state == BLACKJACK_STATES.GAME_STARTED) {
            this.setState({
                current_state: BLACKJACK_STATES.GAME_STARTED,
                current_waiting_block_color: WaitingBlockColors.Blue,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadow,
                current_waiting_block_title: 'Идет игра',
                current_waiting_block_title_color: WaitingBlockColors.Blue,

                showCancelAndX2: false,
                showCanEditBit: false,
                currentCenterView: 1
            })
        }
        if(state == BLACKJACK_STATES.GAME_PLAYER_MOVE) {
            this.setState({
                current_waiting_time: (!this.state.current_waiting_time && wait) ? wait : this.state.current_waiting_time,
                current_state: BLACKJACK_STATES.GAME_STARTED,
                current_waiting_block_color: WaitingBlockColors.Blue,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadow,
                current_waiting_block_title: 'Ваш ход. Осталось #timeStart секунд',
                current_waiting_block_title_color: WaitingBlockColors.Blue,
                currentNoteForCancel: 'Сдаться',
                currentNoteForX2: 'Дабл',
                showCancelAndX2: this.state.visible_cancel_and_x2,
                showCanEditBit: false,
                currentCenterView: 2
            })
        }
        if(state == BLACKJACK_STATES.GAME_END) {
            this.setState({
                current_state: BLACKJACK_STATES.GAME_END,
                current_waiting_block_color: WaitingBlockColors.Orange,
                current_waiting_block_box_shadow: WaitingBlockColors.Boxshadownone,
                current_waiting_block_title: 'Игра окончена. Идет прием ставок',
                current_waiting_block_title_color: WaitingBlockColors.Orange,
                currentNoteForCancel: 'Отменить',
                currentNoteForX2: 'Удвоить',
                showCancelAndX2: true,
                showCanEditBit: true,
                currentCenterView: 0
            })
        }
    }

    StartTimer() {
        let t = setInterval(() => {
            if (this.state.current_waiting_time > 0) {
                this.setState({current_waiting_time: this.state.current_waiting_time - 1 });
            }
        }, 1000)
        this.setState({timer: t})
    }


    closeBJ() {
        mp.trigger('blackjack:table:close', true); // eslint-disable-line
        this.setState({ show: false })
    }

    IncreaseChips(){
        this.setState({chipsAmountToBid: this.state.chipsAmountToBid + 1})
    }

    DecreaseChips(){
        if (this.state.chipsAmountToBid != 0)
        this.setState({chipsAmountToBid: this.state.chipsAmountToBid - 1})
    }


    getWinLostText = () => {
        if (this.state.BidWin) {
        return(
            <span className='bj-BidWin'>+ {this.state.chipsAmountToBid * 2}</span>
            )
        }
        else {
            if (this.state.BidLost) {
                return(
                <span className='bj-BidLost'>- {this.state.chipsAmountToBid}</span>
                )
            } 
        }
    }

    GoToWaitingPage = () => { // Кнопка: сделать ставку
        if(!this.state.showDivChipsAmountToBid) return this.UpdateCurrentBid()
        mp.trigger('blackjack:table:push_bet', this.state.chipsAmountToBidTemp);// eslint-disable-line
       // this.setState({currentCenterView: 1})
    }

    getBlockChipsAmountToBid = () => {
        if (this.state.showDivChipsAmountToBid) {
            return (
                <div className='your-bid-bj' style={{paddingLeft: '25px', paddingRight: '25px'}} onClick={() => this.setState({showDivChipsAmountToBid: !(this.state.showDivChipsAmountToBid)})}>
                    <span>{`СТАВКА: ${this.state.chipsAmountToBidTemp}`}</span>
                    <svg className="edit_button" width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7335 1.79341C14.0145 0.512272 16.0914 0.512217 17.3726 1.79328C18.6535 3.07423 18.6535 5.15105 17.3727 6.43208L16.5552 7.24971L11.9162 2.61077L12.7335 1.79341ZM10.944 3.5831L1.77928 12.7489C1.40681 13.1214 1.14501 13.59 1.023 14.1024L0.0187081 18.3204C-0.0365852 18.5526 0.0325589 18.7969 0.201372 18.9658C0.370195 19.1346 0.614505 19.2038 0.846751 19.1485L5.06456 18.1442C5.57716 18.0222 6.04584 17.7603 6.41842 17.3877L15.583 8.222L10.944 3.5831Z" />
                    </svg>
                </div>
            )
        }
        else {
            return (
                <div className={this.state.chipsAmountToBid > this.state.casino_money_amount ? 'your-bid-bj-disabled' : 'your-bid-bj'} style={{ paddingRight: '25px'}}>
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
            mp.trigger('blackjack:table:set_bet', this.state.chipsAmountToBid);// eslint-disable-line
        } else {
            this.setState({showDivChipsAmountToBid: !(this.state.showDivChipsAmountToBid)}) 
        }
    }

    moreButton = () => {
        mp.trigger('blackjack:table:clickMoreButton'); // eslint-disable-line
    }

    enoughButton = () => {
        mp.trigger('blackjack:table:clickEnoughButton'); // eslint-disable-line
    }


    closeFaqCont() {
        this.setState({show_faq_conteiner: false })
    }

    slideFaqToSecond() {
        this.setState({faq_page: 2})
    }

    slideFaqToFirst() {
        this.setState({faq_page: 1})
    }

    openFaq() {
        this.setState({show_faq_conteiner: true})
    }

    CancellButtonFunc() {
        mp.trigger('blackjack:table:clear_bet'); // eslint-disable-line
     }
 
 
     DoubleButtonFunc() {
        mp.trigger('blackjack:table:x2_bet'); // eslint-disable-line
     }
    

 
    render() {
        if (!this.state.show) {
            return null;
        }


        return (
            <React.Fragment>
                <div className='bj-game-conteiner'>
                    {this.state.cardValues.map((item, index) => (
                        <div className='other_player_block' key={index.toString()} style={{marginLeft: `${item.x}px`, marginTop: `${item.y}px`}}>
                            <span style={{marginRight: '12px'}}><img src={CardsIcon}/></span>
                            <span>{item.cards}</span>
                    </div>
                    ))}
                    {this.state.show_faq_conteiner ?
                        <React.Fragment>
                            {this.state.faq_page === 1 ?
                                <React.Fragment>
                                    <div className='faq_conteiner_first_page'>
                                        <div className='faq_conteiner_header_close_first_page'>
                                            <img src={CloseFaq} className="faq_conteiner_header_close_img_first_page" onClick={() => this.closeFaqCont()}/>
                                        </div>
                                        <div className='faq_page_first_page_info'>
                                            <p><span style={{fontWeight: '700'}}>Цель игры:</span> выиграть дилера, чтобы число игрока было ближе к 21, чем число дилера, но не больше 21. Если игрок собирает больше 21, он «сгорает». В случае ничьей игрок и дилер остаются при своих.<br/>
                                                Когда наступает ваш ход, у вас есть три основных варианта действий:<br/><br/>
                                                <span style={{fontWeight: '700'}}>&nbsp;&bull;&nbsp;Еще:</span> взять еще одну карту. Карты можно брать, пока не соберете больше 21;<br/><br/>
                                                <span style={{fontWeight: '700'}}>&nbsp;&bull;&nbsp;Хватит:</span> сохранить карты и ничего не брать;<br/><br/>
                                                <span style={{fontWeight: '700'}}>&nbsp;&bull;&nbsp;Удвоение:</span> вы удваиваете ставку и получаете еще только одну карту. Обычно удвоение используется, если сумма ваших первых двух карт равна от 8 до 11, а в случае «мягкой руки» — от 12 до 19.
                                            </p>
                                        </div>
                                        <div className='faq_slide_conteiner_first_page'>
                                            <img src={ArrowRightFaq} className="faq_slide_conteiner_img_first_page"  onClick={() => this.slideFaqToSecond()}/>
                                        </div>
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className='faq_conteiner_second_page'>
                                        <div className='faq_page_second_page_info'>
                                            <div className='first_stroke_blocks'>
                                                <div className='first_block'>
                                                    <p className='blocks_header'>
                                                        Ход игры:
                                                    </p>
                                                    <p className='blocks_info'>
                                                        Дилер спрашивает игроков по очереди, пока все не скажут «хватит». 
                                                        Затем он играет собственную руку, тогда и определяется исход игры. 
                                                        Каждый участник соревнуется с дилером отдельно.
                                                    </p>
                                                </div>
                                                <div className='first_block'>
                                                    <p className='blocks_header'>
                                                        Дилер:
                                                    </p>
                                                    <p className='blocks_info'>
                                                        Дилер берет дополнительные карты, пока сумма очков не будет 17 или выше.
                                                        Если количество очков дилера превысит 21, то оставшиеся игроки выигрывают, независимо от количества очков.
                                                    </p>
                                                </div>
                                                <div className='first_block'>
                                                    <p className='blocks_header'>
                                                        Победитель:
                                                    </p>
                                                    <p className='blocks_info'>
                                                        &nbsp;&bull;&nbsp;Сумма очков у игрока больше, чем у дилера: выплата 1 к 1 от своей ставки;<br/>
                                                        &nbsp;&bull;&nbsp;Суммы очков равны: ничья (игроку возвращается его ставка);<br/>
                                                        &nbsp;&bull;&nbsp;Дилер набрал больше очков: проигрыш.<br/>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='second_stroke_blocks'>
                                                <div className='second_block'>
                                                    <p className='blocks_header'>
                                                        BlackJack
                                                    </p>
                                                    <p className='blocks_info'>
                                                        &nbsp;&bull;&nbsp;Комбинация блэкджек: если первые две карты в сумме дают 21 очко;<br/>
                                                        &nbsp;&bull;&nbsp;Если дилер собрал блэкджек, то все игроки проигрывают;<br/>
                                                        &nbsp;&bull;&nbsp;Если игрок собрал блэкджек, а дилер нет, то игрок выигрывает и получает выплату 3 к 2 от своей ставки.
                                                    </p>
                                                </div>
                                                <div className='second_block'>
                                                    <p className='blocks_header'>
                                                        Номинальное значение карт
                                                    </p>
                                                    <p className='blocks_info'>
                                                    &nbsp;&bull;&nbsp;От 2 до 10 оцениваются по своему числу;<br/>
                                                    &nbsp;&bull;&nbsp;10 баллами оцениваются валет, дама и король;<br/>
                                                    &nbsp;&bull;&nbsp;Туз оцениваеся 1 или 11 баллами.  Обычно считается за 11, но если при таком подсчете сумма очков игрока превышает 21, то туз считается за 1.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='faq_conteiner_header_close_second_page'>
                                            <img src={CloseFaq} onClick={() => this.closeFaqCont()} style={{marginLeft: '14px'}}/>
                                            <img src={ArrowLeftFaq} onClick={() => this.slideFaqToFirst()}/>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    :
                        ''
                    }
                    <div className='game_container-bj'>
                        <div className='active_bid_box-bj'>
                            {!(this.state.current_bid === 0) ?
                            <React.Fragment>
                                <div className='active_bid_block' style={{marginLeft: '0px'}}>
                                    <span className='active_bid_block_title'>АКТИВНАЯ СТАВКА</span>
                                    <span className='active_bid_block_current_bid_text'><img src={Chips} style={{marginRight: '8px'}}/>{this.state.current_bid}</span>
                                </div>
                            </React.Fragment>
                            :
                            ''}
                        </div>
                        <div className='bj_bottom_box'>
                            <img src={FaqIcon} className="open_faq_icon" onClick={() => this.openFaq()}/>
                            <div 
                            className='leave-bj'
                            onClick={() => this.closeBJ()}>
                                <span>Покинуть стол</span>
                            </div>
                            <div className='bj-game-box'>
                                <div className={this.state.showCancelAndX2 ? 'bid_param_block-bj' : 'bid_param_block_go_down'} style={{marginLeft: '30px'}}>
                                    <div className='param-cancell'>
                                        <div className='param-cancell-img' onClick={this.CancellButtonFunc}></div>
                                        <div className='param-cancell-text'>{this.state.currentNoteForCancel}</div>
                                    </div>
                                    <div className='param-double' style={{marginLeft: '30px'}}>
                                        <div className='param-double-img' onClick={this.DoubleButtonFunc}></div>
                                        <div className='param-double-text'>{this.state.currentNoteForX2}</div>
                                    </div>
                                </div>
                                {this.state.showCanEditBit ?
                                    this.getBlockChipsAmountToBid()
                                :
                                    ''
                                }
                                <div 
                                className={this.state.currentCenterView === 0 ? 'bj-do-bid' : 'bj-do-bid-waiting-page-active'}
                                onClick={
                                    this.GoToWaitingPage.bind(this)
                                }>
                                    <span>СДЕЛАТЬ СТАВКУ</span>
                                </div>
                                {this.state.currentCenterView === 2 ?
                                <React.Fragment>
                                    <div 
                                    className={this.state.currentCenterView === 2 ? 'bj-more-button' : 'bj-more-button-down'}
                                    onClick={this.moreButton.bind(this)}>
                                        <span className='bj-text-more-button'>ЕЩЁ!</span>
                                    </div>
                                    <div 
                                    className={this.state.currentCenterView === 2 ? 'bj-enough-button' : 'bj-enough-button-down'}
                                    onClick={this.enoughButton.bind(this)}>
                                        <span className='bj-text-enough-button'>ХВАТИТ</span>
                                    </div>
                                </React.Fragment>
                                : 
                                    ''
                                }
                                <div className='bj-amount-of-chips-acc'>
                                    <div className={((this.state.BidLost) || (this.state.BidWin)) ? 'bj-block-of-chips-amount-acc-open-bid' : 'bj-block-of-chips-amount-acc'}>
                                        <img src={Chips}/>
                                        <span className='bj-text-amount-chips'>{this.state.casino_money_amount}</span>
                                    </div>
                                </div>
                                <div className='bj-your-move' style={{borderColor: this.state.current_waiting_block_color, boxShadow: this.state.current_waiting_block_box_shadow}}>
                                    <span style={{color: this.state.current_waiting_block_title_color}}>{this.state.current_waiting_block_title.replace('#timeStart', this.state.current_waiting_time)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default BlackJack; 