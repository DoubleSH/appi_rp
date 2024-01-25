import React from "react";
import EventManager from "../../../EventManager";
import '../css/Hints.css';

class Hints extends React.Component{
    constructor(prop){
        super(prop)
        this.state ={
            show: false,
            hints:[
                {text: 'Главное меню', key: 'M'},
                {text: 'Курсор', key: 'F2'},
                {text: 'Телефон', key: 'O'},
                {text: 'Инвентарь', key: 'I'},
                {text: 'Предметы рядом', key: 'E'},
                {text: 'Голосовой чат', key: 'N'},
                {text: 'Убрать подсказки', key: '/'}
            ],

        }
    }

    componentDidMount(e){
        document.onkeydown = (e) => {
            this.buttonListner(e)
        }
        document.onkeyup = (e) => {
            this.buttonListner(e)
        }
        EventManager.addHandler('hudk', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({hints: value.hints});
            } else return;
        })
    }

    componentWillUnmount(){
        document.onkeydown = (e) => {
            this.buttonListner(e)
        }
        document.onkeyup = (e) => {
            this.buttonListner(e)
        }

        EventManager.removeHandler('hudk')
        
    }

    buttonListner(event){

        if(event.keyCode == 77){

            document.querySelector('#btn-M').childNodes[1].classList.toggle('hint-btn-active')

        } else if(event.keyCode == 191){
            document.querySelector('#btn-191').childNodes[1].classList.toggle('hint-btn-active')

        } else if(event.keyCode == 113){

            document.querySelector('#btn-F2').childNodes[1].classList.toggle('hint-btn-active')

        } else if(event.keyCode == 79){

            document.querySelector('#btn-O').childNodes[1].classList.toggle('hint-btn-active')

        } else if(event.keyCode == 73){

            document.querySelector('#btn-I').childNodes[1].classList.toggle('hint-btn-active')

        } else if(event.keyCode == 69){

            document.querySelector('#btn-E').childNodes[1].classList.toggle('hint-btn-active')

        } else if(event.keyCode == 78){

            document.querySelector('#btn-N').childNodes[1].classList.toggle('hint-btn-active')

        }
    }
    render(){
        const state = this.state;
        return(
            <React.Fragment>
                { state.show &&
                <ul className="hints-list">
                {
                    state.hints.map(item => 
                        <li key={Math.random()} className='hint-wrapper'
                            id={item.key === '/' ? 'btn-191' : 'btn-' + item.key}>
                            <p>
                             {item.text}
                            </p>
                            <div className="hint-btn">
                              {item.key}
                            </div>
                        </li>)
                }
                </ul>
                }
            </React.Fragment>
        )
    }
}


export default Hints