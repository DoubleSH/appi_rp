import React from 'react';
import EventManager from '../../../EventManager';
import Button from '../../authorization/uikit/Button';
import '../css/currencyExchange.css';
import Chips from "../img/chips.png";
import Money from "../img/money.png";
import arrowRight from "../img/arrow-right.png"

class CurrencyExchange extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            moneyAmount: 100,
            casinoMoney: 200,
            casinoMoneyToBuy: '',
            casinoMoneyToSell: '',
            casinoMoneyBuyCost: 100,
            casinoMoneySellCost: 95
        }
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'CurrencyExchange.jsx', error, errorInfo); // eslint-disable-line
    }

    handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            this.closeInventory()
        } 
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);

        EventManager.addHandler('showCasinoMoney', value => { 
            if (value.type === 'show') {
                this.setState({show: true, moneyAmount:value.money, casinoMoney:value.casino_money, casinoMoneyBuyCost:value.buyCasinoMoneyCost, casinoMoneySellCost:value.sellCasinoMoneyCost})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if(value.type == 'update') {
                this.setState({moneyAmount:value.money, casinoMoney:value.casino_money, casinoMoneyBuyCost:value.buyCasinoMoneyCost, casinoMoneySellCost:value.sellCasinoMoneyCost})
            }
             else return;
        })
    } 

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);


        EventManager.removeHandler('showCasinoMoney');
    } 

    closeInventory() {
        mp.trigger('client:shopMenu:hide', false); // eslint-disable-line
        this.setState({ show: false })
    }

    handleInputBuyCasinoMoney(e){ 
        this.setState({ casinoMoneyToBuy: e.target.value.replace(/\D/,'') * 1 || '' })
    }

    handleInputSellCasinoMoney(e) {
        this.setState({casinoMoneyToSell: e.target.value.replace(/\D/,'') * 1 || ''})
    }
    
    buyCasinoMoney(){
        this.setState({moneyAmount: (this.state.moneyAmount - (this.state.casinoMoneyToBuy * this.state.casinoMoneyBuyCost))})
        this.setState({casinoMoney: (this.state.casinoMoney + parseInt(this.state.casinoMoneyToBuy))})
        mp.trigger('client:casino:buyCasinoMoney', this.state.casinoMoneyToBuy) // eslint-disable-line
    }

    sellCasinoMoney(){
        this.setState({moneyAmount: this.state.moneyAmount + (this.state.casinoMoneyToSell * this.state.casinoMoneySellCost)})
        this.setState({casinoMoney: this.state.casinoMoney - parseInt(this.state.casinoMoneyToSell)})
        mp.trigger('client:casino:sellCasinoMoney', this.state.casinoMoneyToSell) // eslint-disable-line
    }


    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="exchange_box">
                    <div className='exchange_main'>
                        <div className='close_exchange'>
                            <div
                            className="close-casino"
                            onClick={() => this.closeInventory()}
                            />
                        </div>
                        <div className='exchange_value_block'>
                            <div className='price-list-block'>
                                <div className='price-list-title'>
                                    <span className='price-list-title-text'>Баланс</span>
                                </div>
                                <div className='price-list'>
                                    <div className='chips-money-block'>
                                        <div className='chips-box'>
                                            <span className='chips-title-box'>Фишки</span>
                                            <div className='chips-acc'>
                                                <img src={Chips}/>
                                                <span className='chips-amount-acc'>{this.state.casinoMoney.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className='AmountOfMoney_box'>
                                            <span className='money-title-box'>Деньги</span>
                                            <div className='money-acc'>
                                                <img src={Money}/>
                                                <span className='money-amount-acc'>{this.state.moneyAmount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='exchange-rate-box'>
                                        <span className='ex-money-chips-title'>Курс обмена</span>
                                        <div className='money-to-chips'>
                                            <img src={Chips}/>
                                            <span className='much_money'>100</span>
                                            <img src={arrowRight} className="arrow-img"/>
                                            <img src={Money} className="money-img"/>
                                            <span className='much_chip'>1</span>
                                        </div>
                                        <div className='chips-to-money'>
                                            <img src={Chips}/>
                                            <span className='much_money'>1</span>
                                            <img src={arrowRight} className="arrow-img"/>
                                            <img src={Money} className="money-img"/>
                                            <span className='much_money'>{this.state.casinoMoneySellCost}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='exchanger-block'>
                                <div className='title-buy-chips'>
                                    <span className='ex-block-buy-chips-title-text'>Покупка фишек</span>
                                </div>
                                <div className='ex-buy-chips-input'>
                                    <input
                                    className={((Number(this.state.casinoMoneyToBuy) * this.state.casinoMoneyBuyCost) > this.state.moneyAmount)  ? 'chips-input-error' : 'chips-input'}
                                    id='input'
                                    maxLength="5"
                                    placeholder='Введите кол-во фишек'
                                    value={this.state.casinoMoneyToBuy}
                                    onChange={this.handleInputBuyCasinoMoney.bind(this)}
                                    />
                                </div>
                                <div className={this.state.casinoMoneyToBuy === '' ? 'ex-buy-chips-button-nwork' : ((Number(this.state.casinoMoneyToBuy) * this.state.casinoMoneyBuyCost) > this.state.moneyAmount) ? 'ex-buy-chips-button-error' : 'ex-buy-chips-button' } onClick={this.buyCasinoMoney.bind(this)}>
                                    <span className={this.state.casinoMoneyToBuy === '' ? 'button-buy-nwork' : 'button-buy'}>
                                        {((Number(this.state.casinoMoneyToBuy) * this.state.casinoMoneyBuyCost) <= this.state.moneyAmount) ? 
                                        <React.Fragment>
                                        КУПИТЬ ЗА&nbsp;<p className="casinoMoneyToBuy-text">{Number(this.state.casinoMoneyToBuy) * this.state.casinoMoneyBuyCost} $</p>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                        <p className="casinoMoneyToBuy-text-error">НЕДОСТАТОЧНО СРЕДСТВ</p>
                                        </React.Fragment>} 
                                    </span>
                                    <span className={this.state.casinoMoneyToBuy === '' ? 'dis-button-buy' : 'dis-button-buy-nwork'}>ВВЕДИТЕ ЗНАЧЕНИЕ ВЫШЕ</span>
                                </div>
                                <div className='title-sell-chips'>
                                    <span className='ex-block-sell-chips-title-text'>Продажа фишек</span>
                                </div>
                                <div className='ex-sell-chips-input'>
                                    <input
                                    className={(this.state.casinoMoney < this.state.casinoMoneyToSell) ? 'chips-input-error' : 'chips-input'}
                                    maxLength="5"
                                    placeholder='Введите кол-во фишек'
                                    value={this.state.casinoMoneyToSell}
                                    onChange={this.handleInputSellCasinoMoney.bind(this)}
                                    />
                                </div>
                                <div className={this.state.casinoMoneyToSell === '' ? 'ex-sell-chips-button-nwork' : (this.state.casinoMoney < this.state.casinoMoneyToSell) ? 'ex-sell-chips-button-error' : 'ex-sell-chips-button'} onClick={this.sellCasinoMoney.bind(this)}>
                                    <span className={this.state.casinoMoneyToSell === '' ? 'button-sell-nwork' : 'button-sell'}>
                                        {(this.state.casinoMoney < this.state.casinoMoneyToSell) ?
                                        <React.Fragment>
                                            У ВАС НЕТ СТОЛЬКО ФИШЕК
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            ПОЛУЧИТЬ&nbsp;{Number(this.state.casinoMoneyToSell) * this.state.casinoMoneySellCost} $
                                        </React.Fragment>}
                                    </span>
                                    <span className={this.state.casinoMoneyToSell === '' ? 'dis-button-sell' : 'dis-button-sell-nwork'}>
                                        ВВЕДИТЕ ЗНАЧЕНИЕ ВЫШЕ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CurrencyExchange; 