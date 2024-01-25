import React from "react";
import '../css/Persone.css';
import EventManager from "../../../EventManager";


import sun from '../img/Vectorsun.png';
import sunCloud from '../img/Vectorsun-cloud.png';
import sunCloudRain from '../img/Vectorsun-cloud-rain.png';
import sunCloudStrongRain from '../img/Vectorsun-cloud-strong-rain.png';
import snow from '../img/Vectorsnow.png';
import moon from '../img/Vectormoon.png';
import moonCloud from '../img/Vectormoon-cloud.png';
import moonCloudRain from '../img/Vectormoon-cloud-rain.png';
import cloud from '../img/Vectorcloud.png'
import cloudRain from '../img/Vectorcloud-rain.png'
import cloudLightning from '../img/Vectorcloud-lightning.png'
import cloudDown from '../img/Vectorcloud-down.png'
import eatGrey from '../img/Vectoreat-grey.png'
import eatYellow from '../img/Vectoreat-yellow.png'
import eatRed from '../img/Vectoreat-red.png'
import blodGrey from '../img/Vectorblod-grey.png'
import blodYellow from '../img/Vectorblod-yellow.png'
import blodRed from '../img/Vectorblod-red.png'
import microGrey from '../img/Vectormicro-grey.png'
import microWhite from '../img/Vectormicro-white.png'
import microRed from '../img/Vectormicro-red.png'
import location from '../img/Vectorlocation.png'
import clock from '../img/Vectorclock.png'
import cash from '../img/Vectorcash.png'
import card from '../img/Vectorcard.png'
import blodNull from '../img/Subtractblod-nulll.png'
import eatNull from '../img/Subtracteat-null.png'










class Player extends React.Component{
    constructor(prop){
        super(prop)

        this.state ={
            day: false,
            show: true,

            iconWeather:{
                sun: sun,
                sunCloud: sunCloud,
                sunCloudRain: sunCloudRain,
                sunCloudStrongRain: sunCloudStrongRain,
                snow: snow,
                moon: moon,
                moonCloud: moonCloud,
                moonCloudRain: moonCloudRain,
                cloud: cloud,
                cloudDown: cloudDown,
                cloudLightning: cloudLightning,
                cloudRain: cloudRain
            },
            iconStatus:{
                microGrey: microGrey,
                microWhite: microWhite,
                microWhite: microWhite,
                microRed: microRed,
                eatGrey: eatGrey,
                eatYellow: eatYellow,
                eatRed: eatRed,
                blodGrey: blodGrey,
                blodYellow: blodYellow,
                blodRed: blodRed
            },
            time: '19:30', 
            date: '19.09.1990',
            location: 'Альта-стрит',
            temperature: 21.5,
            precipitation: 'cloud-rain', // осадки, облочность, молнии
            statusPersone:'Персонажу тепло',
            cash: 12000,
            card: 10000, 
            voice: 'off', //состояния микрофона on off active
            zone: 'peaceful', 
            water: 50,
            eate: 30

        }

    }
    componentDidMount(){
        EventManager.addHandler('hudp', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({show: value.isShow})
                this.setState({day: value.day})
                this.setState({cash: value.cash})
                this.setState({card: value.card})
                this.setState({zone: value.zone})
                this.setState({water: value.water})
                this.setState({eate: value.eate})
                this.setState({voice: value.voice})
                this.setState({precipitation: value.precipitation})
                this.setState({temperature: value.temperature})
                this.setState({statusPersone: value.statusPersone})
                this.setState({location: value.location})
                this.setState({date: value.date})
                this.setState({time: value.time})
            }else return;
        })
    }
    componentWillUnmount(){
        EventManager.removeHandler('hudp')
    }
    showIconWeather(){
        switch (this.state.precipitation) {
            case 'sun-cloud':
                return this.state.day ? this.state.iconWeather.sunCloud : this.state.iconWeather.moonCloud
            case 'cloud-rain': 
                return this.state.day ? this.state.iconWeather.cloudRain : this.state.iconWeather.moonCloudRain 
            case 'cloud-down':
                return this.state.iconWeather.cloudDown 
            case 'cloud-lightning':
                return this.state.iconWeather.cloudLightning  
            case 'sun-cloud-rain':
                return this.state.day ? this.state.iconWeather.sunCloudRain : this.state.iconWeather.moonCloudRain
            case 'sun-cloud-strong-rain':
                return this.state.iconWeather.sunCloudStrongRain
            case 'clear-sky':
                return this.state.day ? this.state.iconWeather.sun : this.state.iconWeather.moon
            case 'snow':
                return this.state.iconWeather.snow
            case 'cloud':
                return this.state.iconWeather.cloud
            case 'cloud-rain':
                return this.state.iconWeather.cloudRain
        
            default:  break;
        }
    }
    
    render(){
        const state = this.state;
        
        return(
            <React.Fragment>
                { state.show &&
                <div className="persone-wrapper">
                    <div className="persone-voice-zone persone-block">
                        <img src={state.voice === 'active' ? 
                                state.iconStatus.microWhite
                                 : 
                                state.voice === 'on' ? state.iconStatus.microGrey : state.iconStatus.microRed} 
                             className='persone-icon'/>
                        { state.zone === 'peaceful' &&     
                        <p className="persone-zone">
                              Мирная зона
                        </p>}
                    </div>
                    <div className="persone-indicators persone-block">
                    { state.water > 0 ?
                       <svg className=" indicator" xmlns="http://www.w3.org/2000/svg" width='30px'
                            height='30px' version='1.1'>
                        
                         <circle  r='15px' cx='15px' cy='15px'
                             strokeWidth='4px' 
                             stroke={state.water > 50 ?"rgba(255, 255, 255, 0.5)": state.water > 25 ?'rgba(242, 201, 76, 0.85)':'rgba(235, 87, 87, 0.85)'} 
                             fill='none'
                             strokeDashoffset='0' strokeDasharray={94.2 / 100 * state.water + ' 94,2 '}
                             transform="translate(0) rotate(-90 15 15)"
                         ></circle>
                         <image href={state.water > 50 ? blodGrey : state.water > 25 ? blodYellow : blodRed}
                          width='13.67px' height='19.67px' x='8px' y='7px'
                           className='persone-indicator-icon'/>
                       
                       </svg>
                       :
                       <img className='persone-indicator-icon' src={blodNull}/>}
                       { state.eate > 0 ?
                       <svg className=" indicator" xmlns="http://www.w3.org/2000/svg" width='30px'
                            height='30px' version='1.1'>
                        
                         <circle  r='15px' cx='15px' cy='15px'
                             strokeWidth='4px' fill="none"
                             stroke={state.eate > 50 ?"rgba(255, 255, 255, 0.5)": state.eate > 25 ?'rgba(242, 201, 76, 0.85)':'rgba(235, 87, 87, 0.85)'}
                             strokeDashoffset='0' strokeDasharray={-94.2 / 100 * state.eate + ' 94,2'}
                             transform="translate(0) rotate(-90 15 15)"
                         ></circle>
                         <image href={state.eate > 50 ? eatGrey : state.eate > 25 ? eatYellow : eatRed}
                          width='13.67px' height='19.67px' x='8px' y='7px'
                           className='persone-indicator-icon'/>
                       
                       </svg>
                       :
                       <img className='persone-indicator-icon' src={eatNull}/>}
                    </div>
                    <div className="persone-location persone-block">
                        <img src={location} />
                        <p>
                          {state.location}
                        </p>
                    </div>
                    <div className="persone-time-date persone-block">
                        <img src={clock} className='persone-icon'/>
                        <p>
                            <span>
                                {state.time + ' '}
                            </span>
                             {state.date}
                        </p>
                    </div>
                    <div className="persone-weather-temperature persone-block">
                        <img src={this.showIconWeather()} className='persone-icon'/>
                        <p>
                            <span>
                                {state.temperature + ' '}
                            </span>
                            {state.statusPersone}
                        </p>
                    </div>
                    <div className="persone-block-money persone-block">
                        <div className="persone-block">
                            <img src={cash} className='persone-icon'/>
                            <p>
                            {'$ ' + state.cash}
                            </p>
                        </div>
                        <div className="persone-block">
                            <img src={card} className='persone-icon'/>
                            <p>
                            {'$ ' + state.card}
                            </p>
                        </div>
                    </div>
                </div>}
                
            </React.Fragment>
        )
    }
}


export default Player