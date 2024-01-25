import React from "react";
import '../css/Car.css';
import seatBeltGrey from '../img/Vectorseat-belt-grey.png';
import seatBeltWhite from '../img/Vectorseat-belt-white.png';
import seatBeltRed from '../img/Vectorseat-belt-red.png';
import fuelWhite from '../img/Vectorfuel-white.png';
import fuelYellow from '../img/Vectorfuel-yellow.png';
import fuelRed from '../img/Vectorffuel-red.png';
import lightGrey from '../img/Vectorlight-grey.png';
import lightGreen from '../img/Vectorlight-green.png';
import lightBlue from '../img/Vectorlight-blue.png';
import lockOpen from '../img/Vectorlock-open.png';
import lockClose from '../img/Vectorlock-close.png';
import accumulatorGrey from '../img/Vectoraccumulator-grey.png';
import accumulatorWhite from '../img/Vectoraccumulator-white.png';
import soundUnfasten from '../sound/sound_seatbelt.mp3';
import fastenSeatBelt from '../sound/fasten_seatbelt.mp3';
import unfastenSeatBelt from '../sound/unfasten_seatbelt.mp3';
import EventManager from "../../../EventManager";



class CarIndicators extends React.Component{
    constructor(prop){
        super(prop) 
        this.state = { 
            show: true,
            speed: 0,
            transmissionNow: 'R',
            transmissionType: 'мкпп',
            transmissionBox: ['N', 1, 2, 3, 4, 5, 6, 7, 'R'], //скорости коробки передач
            light: 'further', //'nearly' 'further'
            accumulator: true,
            fasten: true,
            imgSeatBelt: seatBeltWhite,// 'done' 'undone' 'grey'
            fuel: 10,
            lock: 'close', //'close open'
            audio: new Audio(soundUnfasten)
        }
       
    }

    
    componentWillUnmount(){
        document.body.addEventListener('keydown', (e)=>{
            if(e.keyCode == 74){
                // key - j 
                let soundFasten = new Audio(fastenSeatBelt)
                let soundUnfasten = new Audio(unfastenSeatBelt)
                if(this.state.fasten == true){
                    this.setState({fasten: false})
                    soundUnfasten.play()
                }else{
                    this.setState({fasten: true})
                    console.log(this.state.fasten)
                    soundFasten.play()
                }

            }
        })
    }

    componentDidMount(){
        
        setInterval(()=>{
            if(this.state.fasten == true){

                this.setState({imgSeatBelt: seatBeltWhite})

            } else {
                
                if(this.state.imgSeatBelt == seatBeltWhite || this.state.imgSeatBelt == seatBeltGrey){
                   this.setState({imgSeatBelt: seatBeltRed})
                } else if(this.state.imgSeatBelt == seatBeltRed){
                   this.setState({imgSeatBelt: seatBeltGrey})
                }
            }
            

           }, 1000)


        EventManager.addHandler('hudc', value=>{
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({speed: value.speed});
                this.setState({show: value.show});
                this.setState({transmissionNow: value.transmissionNow});
                this.setState({transmissionBox: value.transmissionBox});
                this.setState({transmissionType: value.transmissionType});
                this.setState({light: value.light});
                this.setState({accumulator: value.accumulator});
                this.setState({fasten: value.fasten});
                this.setState({fuel: value.fuel});
                this.setState({lock: value.lock});


            } else return;
        })
            }
        

    showSpeedTransmission(){

       if(this.state.transmissionNow == 1){

            return  4

        } else if(this.state.transmissionNow == 2){

            return -13

        }else if(this.state.transmissionNow == 3){

            return -31

        }else if(this.state.transmissionNow == 4){

            return -51

        }else if(this.state.transmissionNow == 5){

            return -69

        }else if(this.state.transmissionNow == 6){

            return -87

        }else if(this.state.transmissionNow == 7){

            return -106

        }else if(this.state.transmissionNow == 'R'){

            return -123

        }else{
            return null
        }
                
    }


    render(){
        const state = this.state
        return(
            <React.Fragment>
                { state.show &&
                    <div className="car-indicator-wrapper">
                    <div className="car-indicator-speed">
                        <svg className="indicator-speed-svg" xmlns="http:www.w3.org/2000/svg" width='189px'
                            height='189px' version='1.1'>
                                
                            <circle r='93px' cy='93px' cx='93px'
                                    strokeWidth='4px' strokeDasharray={(438 / 400 * state.speed) + ' 584' }
                                    strokeDashoffset={'0'}
                                    stroke='rgba(255, 255, 255, 1)'
                                    fill="none" transform="translate(158 0) rotate(90 15 15)"/>
                            
                            <circle r='93px' cy='94px' cx='94px'
                                    strokeWidth='4px' strokeDasharray='438 438'
                                    strokeDashoffset={'0'}
                                    stroke='rgba(255, 255, 255, 0.25)'
                                    fill="none" transform="translate(158 0) rotate(90 15 15)"/>
                            
                            <text className="indicator-speed__text-speed" x='30px' y='120px' >
                                {String(state.speed).length < 3 ? 
                                   String(state.speed).length < 2 ? <tspan fill="rgba(255, 255, 255, 1)">
                                                                        <tspan fill='rgba(255, 255, 255, 0.25)'>00</tspan> 
                                                                         {state.speed}
                                                                    </tspan> 
                                                                 : <tspan fill="rgba(255, 255, 255, 1)">
                                                                        <tspan fill='rgba(255, 255, 255, 0.25)'>0</tspan>
                                                                         {state.speed}
                                                                   </tspan>
                                :
                                <tspan fill="rgba(255, 255, 255, 1)">{state.speed}</tspan>}
                            </text>
                        </svg>
                        <div className="indicator-speed__number-transmission">
                            <div className="number-transmission__wrapper-span" style={{left: this.showSpeedTransmission() +'px'}}>
                            {   
                                state.transmissionBox.map(item => item == state.transmissionNow ?
                                <span className="span-speed active-speed" id={'speed-'+ item}>{item}</span>
                                :
                                <span className={"span-speed "} id={'speed-'+ item}>{item}</span>)
                            }
                            {
                                this.showSpeedTransmission()
                            }
                            </div>
                        </div>
                        <span className="indicator-transmission-type">
                             {state.transmissionType}
                        </span>
                    </div>
                    <div className="car-indicators">
                        <img height='15px' className="car-indicators-img" src={state.imgSeatBelt} />
                        {(!state.fasten && state.speed > 0) && <audio src={soundUnfasten} loop preload="auto" autoPlay={true}></audio>}
                        <img height='13px' className="car-indicators-img"src={state.light === 'none' ? lightGrey : state.light === 'nearly' ? lightGreen : lightBlue} />
                        <img height='15px' className="car-indicators-img" src={state.accumulator ? accumulatorWhite : accumulatorGrey} />
                        <div>
                        <img height='17px' className="car-indicators-img-last" src={state.lock === 'open' ? lockOpen : lockClose} />
            
                        <svg className=" indicator" xmlns="http:www.w3.org/2000/svg" width='30px'
                            height='30px' version='1.1'>
                        
                         <circle  r='15px' cx='15px' cy='15px'
                             strokeWidth='4px' 
                             stroke={state.fuel > 25 ? "rgba(255, 255, 255, 1)": state.fuel == 0 ? 'rgba(235, 87, 87, 1)' :'rgba(242, 201, 76, 0.85)'} 
                             fill='none'
                             strokeDashoffset={'0' } strokeDasharray={state.fuel !== 0 ? (94.2 / 100 * state.fuel) + ' 94 ' : '2 4'}
                             transform="translate(0) rotate(-90 15 15)"
                         ></circle>
                         <image href={state.fuel > 25 ? fuelWhite : state.fuel > 1 ? fuelYellow : fuelRed}
                          width='12.32px' height='13px' x='9px' y='10px'
                           className='car-indicator-fuel-icon'/>
                       
                       </svg>
                        </div>
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}


export default CarIndicators

