import React from "react";
import EventManager from "../../../EventManager";
import '../css/Dying.css';

class Dying extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            show: false,
            time: 10,
            playerWhoSaved: {userName: 'игрок', userId: 8181},
            dying: false, 
            ambulance: false 
        }
    }

    componentDidMount(){
            setInterval(()=>{
                if(this.state.time > 0){
            this.setState({time: this.state.time - 1})
                }else if(this.state.time === 0 && this.state.dying){
                    this.setState({show: false})
                }
        }, 1000)
         
        EventManager.addHandler('hudd', value=>{
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({show: value.isShow});
                this.setState({time: value.time});
                this.setState({dying: value.dying});
                this.setState({ambulance: value.ambulance});
                this.setState({playerWhoSaved: value.playerWhoSaved});
            } else return;
        })
    }

    componentWillUnmount(){
        EventManager.removeHandler('hudd')
    }

    handlingBtn(){
        console.log(this.state.ambulance)
        
        this.setState({ ambulance: true})
        
    }

    render(){
        const state = this.state
        return(
            <React.Fragment>
                {state.show &&
                <div className={!state.dying ? "dying-wrapper__recovery" : "dying-wrapper__dying" }>
                    {!state.dying ?
                    <div className="dying-body-recovery">
                        <h5 className="body-recovery__title">
                            РЕАНИМАЦИЯ
                        </h5>
                        <p className="body-recovery__text">
                            {state.playerWhoSaved.userName + ' ' + state.playerWhoSaved.userId + ' пытается вас спасти.'}
                        </p>
                        <svg className="body-recovery__svg" xmlns="http://www.w3.org/2000/svg"
                         width='1920px' height='831px' version='1.1'>
                            <path d="M 0 415 L 700 415 Q 740 415 760 365 L 900 0 L 1000 830 L 1130 495 Q 1150 420 1200 415 L 1920 415"
                                  fill='none' strokeWidth='10px' 
                                  className="body-recovery__svg__path"
                                   stroke="url(#gradient)"
                                  strokeDasharray={'0 2920'}
                                  strokeDashoffset='-2650'/>
                                
                              <linearGradient spreadMethod="pad" id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0" style={{stopColor: "rgba(81, 185, 240, 0.04)", stopOpacity:"0.24"}} />
                                <stop offset="1%" style={{stopColor: "rgba(81, 185, 240, 0.05)", stopOpacity:"0.25"}} />
                                <stop offset="49%" style={{stopColor: "rgba(81, 185, 240, 0.15)", stopOpacity:"0.74"}} />
                                <stop offset="100%" style={{stopColor: "rgba(81, 185, 240, 0.05)", stopOpacity:"0.18"}} />
                             </linearGradient>
                        </svg>
                    </div>
                    :
                    <div className="dying-body">
                        <svg className="dying-svg" xmlns="http://www.w3.org/2000/svg"
                         width='874px' height='874px' version='1.1'>
                            <circle r='433px' cx='437px' cy='437px'
                            stroke="rgba(194, 40, 38, 0.25)" strokeWidth='10px' fill="none"
                            strokeDasharray={2719.24 / 120 * state.time + ' 2719.24'}
                            strokeDashoffset='0 ' 
                            className="dying-svg__circle"/>
                            
                        </svg>
                        <div className="dying-info">
                            <h5 className="dying-info__title">
                                КЛИНИЧЕСКАЯ СМЕРТЬ
                            </h5>
                            <p className="dying-info__text">
                                {state.ambulance ? 
                                <React.Fragment>
                                <p>Вам вызвали скорую.</p> 
                                <p>{" У неё есть " + state.time + ' сек., чтобы спасти вас'}</p>
                                </React.Fragment>
                                :
                                'Вы умрёте окончательно через ' + state.time + ' сек.'
                                }
                            </p>
                            { !state.ambulance &&
                            <button className="dying-info__btn" onPointerDown={()=>this.handlingBtn()}>
                            ДОЖДАТЬСЯ ВРАЧЕЙ
                            </button>
                            }
                        </div>
                    </div>
                    }
                </div>}
            </React.Fragment>
        )
    }
}


export default Dying
//stroke="rgba(81, 185, 240, 0.15)" 