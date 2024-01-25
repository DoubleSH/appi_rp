
import React from 'react';
import './css/radialmenu.css';
import audioClick from './audio/mouse-click.mp3';
import openMenu from './audio/open-menu.mp3';
import hideMenu from './audio/hide-menu.mp3';
import backImg from './img/back.svg';

import EventManager from "../../EventManager";
let em = EventManager;

let storage = {
    btns:
        [
            { id: 'giveMoney', title: 'Передать деньги' },
            { id: 'dating', title: 'Познакомиться' },
            { id: 'unTieById', title: 'Снять стяжки' },
            { id: 'inCarById', title: 'Затащить в ближайшее авто' },
            { id: 'taskFollowById', title: 'Вести за собой' },
            { id: 'taskRemoveMaskById', title: 'Снять маску с игрока' },
            {
                id: 'showPlayerDoсMenu', title: 'Документы', items: [
                    { id: 'card_id', title: 'Паспорт', icon: 'cardid' },
                    { id: 'work_lic', title: 'Разрешение на работу' },
                    {
                        id: 'showLic', title: 'Лицензии', items: [
                            { id: 'a_lic', title: 'Лицензия категории `А`' },
                            { id: 'b_lic', title: 'Лицензия категории `B`', icon: 'driveB' },
                            { id: 'c_lic', title: 'Лицензия категории `C`' },
                            { id: 'air_lic', title: 'Лицензия на авиатранспорт' },
                            { id: 'ship_lic', title: 'Лицензия на водный транспорт' },
                            { id: 'gun_lic', title: 'Лицензия на оружие' },
                            { id: 'taxi_lic', title: 'Лицензия на перевозку пассажиров' },
                            { id: 'law_lic', title: 'Лицензия юриста' },
                            { id: 'biz_lic', title: 'Лицензия на предпринимательство' },
                            { id: 'fish_lic', title: 'Разрешение на рыболовство' },
                            { id: 'marg_lic', title: 'Разрешение на употребление марихуаны' },]
                    },
                    { id: 'med_lic', title: 'Мед. страховка' },
                ]
            },
            { id: 'gos_lic', title: 'Удостоверение', icon: 'ident'},
            { id: 'cuffItemById', title: 'Надеть наручники' },
            { id: 'unCuffById', title: 'Снять наручники' },
            { id: 'getInvById', title: 'Изъять конфискат' },
            { id: 'getInvById2', title: 'Обыскать', icon: 'frisk'},
            { id: 'getPassById', title: 'Установить личность' }
        ]
}

const audio = new Audio(audioClick)
const openAudio = new Audio(openMenu)
const hideAudio = new Audio(hideMenu)
audio.volume = 1
openAudio.volume = 1
hideAudio.volume = 1
export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            playerName: 'Oleg Arbuzyan',
            playerId: 'A4',
            blockBtns: this.completion(storage.btns),
            backBtn: false,
            currentPage: 1,
            currentElement: null,
            oldCurrentElemetn: [],
            oldPaginatorData: this.paginator(storage.btns),
        };
    }
    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'PrefenceSelector.jsx', error, errorInfo); // eslint-disable-line
    }
    componentDidMount() {
        em.addHandler('radial', value => {
            if (value.type === 'show') {
                this.setState({ show: true })
            } else if (value.type === 'hide') {
                hideAudio.play()
                this.setState({ show: false })
            } else if (value.type === 'updateData') {
                storage.btns = value.choiceData
                this.setState({
                    playerName: value.playerName,
                    playerId: value.playerId,
                    blockBtns: this.completion(value.choiceData),
                    backBtn: false,
                    currentPage: 1,
                    currentElement: null,
                    oldCurrentElemetn: [],
                    oldPaginatorData: this.paginator(storage.btns)
                })
            } else return;
        })
    }
    componentWillUnmount() {
        em.removeHandler('radial');
    }
    paginator = (data) => {
        if (data.length > 8) {
            let newData = data.slice(7, data.length)
            data = data.slice(0, 7)
            let newItem = { id: 'run', title: 'Ещё', items: newData }
            data.push(newItem)
            this.setState({ oldPaginatorData: data })
        } return data
    }
    menuClick = e => {
        console.log(this.state.currentElement)
        e.preventDefault();
        audio.play()
        if (this.state.currentPage === 1) {
            if (e.target.dataset.name === 'run') {
                let data = this.state.oldPaginatorData[7].items
                let arr = this.state.oldCurrentElemetn
                arr[0] = this.paginator(storage.btns)
                this.setState({
                    blockBtns: this.completion(data),
                    backBtn: true,
                    currentPage: this.state.currentPage + 1,
                    currentElement: data,
                    oldCurrentElemetn: arr
                });

            } else if (storage.btns[e.target.id].items !== undefined) {
                let data = storage.btns[e.target.id].items
                data = this.paginator(data)
                let arr = this.state.oldCurrentElemetn
                arr[0] = storage.btns
                this.setState({
                    blockBtns: this.completion(data),
                    backBtn: true,
                    currentPage: this.state.currentPage + 1,
                    currentElement: data,
                    oldCurrentElemetn: arr
                });
            } else {
                try {
                    mp.trigger('client:radialMenu:item', // eslint-disable-line
                        e.target.dataset.name);
                }
                catch (f) {
                    console.log(f)
                    console.log('Нажата клавиша ' + storage.btns[e.target.id].title + ' id кнопки:' + e.target.dataset.name);
                }
            }
        }
        if (this.state.currentPage > 1) {
            if (e.target.dataset.name === 'run') {
                let data = this.state.oldPaginatorData[7].items
                let arr = this.state.oldCurrentElemetn
                arr[this.state.currentPage - 1] = this.state.oldPaginatorData

                this.setState({
                    blockBtns: this.completion(data),
                    backBtn: true,
                    currentPage: this.state.currentPage + 1,
                    oldCurrentElemetn: arr
                });
            } else if (this.state.currentElement[e.target.id].items !== undefined) {
                let data = this.state.currentElement[e.target.id].items
                data = this.paginator(data)
                let arr = this.state.oldCurrentElemetn
                arr[this.state.currentPage - 1] = this.state.currentElement
                this.setState({
                    blockBtns: this.completion(data),
                    backBtn: true,
                    currentPage: this.state.currentPage + 1,
                    currentElement: data,
                    oldCurrentElemetn: arr
                });
            } else {
                try {
                    mp.trigger('client:radialMenu:item', // eslint-disable-line
                        e.target.dataset.name);
                }
                catch (f) {
                    console.log(f)
                    console.log('Нажата клавиша ' + this.state.currentElement[e.target.id].title + ' id кнопки:' + e.target.dataset.name);
                }
            }
        }
    }
    show = () => {
        this.setState({ show: true })
    }
    hide = e => {
        hideAudio.play()
        //========= Анимации===========
        setTimeout(() => {
            // let elems = document.querySelectorAll('.menu-item')
            // elems.forEach.call(elems, function (el) {
            //     el.classList.add("no-active-item");
            // });
            // document.querySelector('.circle').classList.add("no-active");
            // document.querySelector('.close').classList.add("no-active");
            this.setState({ show: false })
            try {
                mp.trigger('client:radialMenu:close'); // eslint-disable-line
            }
            catch (e) { }
        }, 400);

    }
    goBack = e => {
        audio.play()
        if (this.state.currentPage === 2) {
            this.setState({
                blockBtns: this.completion(this.state.oldCurrentElemetn[this.state.currentPage - 2]),
                backBtn: false,
                currentPage: this.state.currentPage - 1
            });
            console.log('Нажата клавиша c back');
        }
        if (this.state.currentPage > 2) {
            this.setState({
                blockBtns: this.completion(this.state.oldCurrentElemetn[this.state.currentPage - 2]),
                backBtn: true,
                currentPage: this.state.currentPage - 1
            });
            console.log('Нажата клавиша c back');
        }

    }
    completion(data) {
        data = this.paginator(data)
        return data.map((item, i) => (<div key={item.id} className={'menu-item item-' + i} id={i} data-name={item.id} onClick={this.menuClick}><img src={`https://dead-life.ru/server/client/images/icons/radial/${item.icon}.png`} alt="" />{item.title}</div>));
    }

    animation() {
        return (
            setTimeout(() => {
                openAudio.play()
                let elems = document.querySelectorAll('.menu-item')
                elems.forEach.call(elems, function (el) {
                    el.classList.remove("no-active-item");
                });
                document.querySelector('.circle').classList.remove("no-active");
                document.querySelector('.close').classList.remove("no-active");
                return null
            }, 200)
        )
    }

    render() {
        if (this.state.show) {
            return (
                <div className="radialmenu__container">
                    <React.Fragment>
                        <div className="menu-block">
                            <div className="circle" >
                                Взаимодействие с 
                                <span className='player_name'>{this.state.playerName}</span>
                                <span className='player_id'>#{this.state.playerId}</span>
                                <div className='rotate_buttons'>
                                    {(() => {
                                        if (this.state.backBtn) {
                                        return <div id='back' onClick={this.goBack}></div>
                                    }
                                    })()}
                                    <div className="close" id='close' onClick={this.hide}></div>
                                </div>
                            </div>
                            <div className="btns">
                                {this.state.blockBtns}
                            </div>
                        </div>
                    </React.Fragment>
                    {/* <div className="no-active"><this.animation/></div> */}
                </div>
            )
        } else {
            return null
        }
    }
}