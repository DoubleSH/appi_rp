import React from "react";
import Arrow from '../img/Vectorarrow.png';
import '../css/CarMenu.css';

class CarMenu extends React.Component{
    constructor(prop){
        super(prop)
        this.state ={
            show: false,
            klaxon:[
                {text: 'Обычный', chose: true},
                {text: 'Клаксон 1', chose: false}
            ],
            centralLocking:['Открыт', 'Закрыт'],
            btnArrow: {left: false, right: true}
            
        }
    }
    focusOnElem(e, state){
        let elem = e.target

        elem.classList.toggle('on-focus')

        document.onkeydown = (e) =>{
           if(e.keyCode == 13){
            let arr = state.klaxon;
            arr.forEach((item, ind, arr)=>{
                if(item.chose === true ){
                arr[ind].chose = false }
                else if(item.text == elem.childNodes[0].innerText){
                    arr[ind].chose = true
                }
            }) 
            this.setState({klaxon: arr})
            
           }
        }
    }
    handlingArroqBtn(e){
       if(e.target.classList.contains('central-locking__selector__arrow-left')){
            document.querySelector('.central-locking__selector-scroll-line').style.left = 0 +'px';
            console.log(document.querySelector('.central-locking__selector-scroll-line'))
       } else if(e.target.classList.contains('central-locking__selector__arrow-right')){
        document.querySelector('.central-locking__selector-scroll-line').style.left = -118 +'px'
        console.log(document.querySelector('.central-locking__selector-scroll-line'))

       }
    }
    render(){
        const state = this.state;
        
        return(
            <React.Fragment>
               {state.show && <div className="car-menu__wrapper">
                    <div className="car-menu__title">
                    <span> Управление <br/>
                     транспортом </span>
                     <div></div>
                    </div>
                    <div>
                        <div className="car-menu__block central-locking__wrapper">
                          <p className="central-locking__title">
                            Центральный замок
                          </p>
                          <ul className="central-locking__list">
                            <li className="central-locking__list__elem">
                                <p>Состояние</p>
                                <div className='central-locking__selector'>
                                <img src={Arrow} className='central-locking__selector__arrow-left'
                                     onClick={this.handlingArroqBtn}/>
                                <div className="central-locking__selector-scroll">
                                  <div className="central-locking__selector-scroll-line">
                                    {
                                        state.centralLocking.map(item =>
                                        <span key={Math.random()}>{item}</span>)
                                    }
                                   </div>
                                </div>
                                <img src={Arrow}  className='central-locking__selector__arrow-right'
                                      onClick={this.handlingArroqBtn}/>
                                </div>
                            </li>
                            <li className="central-locking__list__elem">
                                <p>
                                    Снять замок
                                </p>
                            </li>
                          </ul>
                        </div>
                        <div className="car-menu-block klaxon-wrapper">
                          <p className="klaxon__title">
                            Клаксон
                          </p>
                          <ul className="klaxon__list">
                            {
                                state.klaxon.map(item => 
                                    <li className="klaxon__list__elem" 
                                        tabIndex='1' onFocus={(e)=>this.focusOnElem(e, state)} onBlur={this.focusOnElem}>
                                        <p>
                                            {item.text}
                                        </p>
                                        <svg  xmlns="http://www.w3.org/2000/svg" width='16px'
                                              height='16px' version='1.1'
                                              className="klaxon-svg">
                                                <circle r='6.5px' cx='8' cy='8'
                                                  strokeDasharray='47,1'
                                                  className="klaxon__circle-wrapper" strokeWidth='2px'
                                                  fill='none' />
                                               {item.chose == true && <circle r='4.5px' cx='8' cy='8'
                                                  strokeDasharray='47,1' 
                                                  className="klaxon__circle-interior" /> }
                                        </svg>
                                    </li>)
                            }
                          </ul>
                        </div>
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}


export default CarMenu