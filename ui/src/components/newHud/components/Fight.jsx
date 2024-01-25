import React from "react";
import EventManager from "../../../EventManager";
import '../css/Fight.css';
import imgEnemy from '../img/Vectorknife.png';
import imgMyTeam from '../img/Vectorsheild.png';

class Fight extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            show: true,
            myTeam: 'MG-13',
            countMyTeam: 175,
            enemyTeam: 'LSV',
            countEnemyTeam: 170,
            maxTime: 999,
            time: 999, //max 999
            eventСancellation: false
        }
    }
    componentDidMount(){
        EventManager.addHandler('hudf', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({show: value.isShow});
                this.setState({myTeam: value.myTeam});
                this.setState({enemyTeam: value.enemyTeam});
                this.setState({countEnemyTeam: value.countEnemyTeam});
                this.setState({countMyTeam: value.countMyTeam});
                this.setState({time: value.time});
                this.setState({eventСancellation: value.eventСancellation});
            } else return;
        })


            setInterval(()=>{
                if(this.state.time >= 0){
            this.setState({time: this.state.time - 1})}
        }, 1000)

    
    }
    render(){
        const state = this.state
        return(
            <React.Fragment>
                {this.state.show &&
                <div className="fight-wrapper">
                 { state.eventСancellation ?
                   <div className="fight-none">
                    <p className="fight-none-title">
                    Мероприятие отменено
                    </p>
                   </div>
                   :
                   <React.Fragment>
                    { state.time <= 0 ?
                     state.countEnemyTeam < state.countMyTeam ?
                     <div className="fight-my-team-win">
                     <p className="my-team__title-win">
                         Территория защищена!
                     </p>
                     <p className="fight__count-win">
                         {'Победа ' + state.myTeam}
                     </p>
                     <img  src={imgMyTeam}/>
                    </div> 
                    :
                    <div className="fight-enemy-team-win">
                        <p className="enemy-team-title-win">
                            Территория захваченна!
                        </p>
                        <p className="fight__count-win">
                            {'Победа ' + state.enemyTeam}
                        </p>
                        <img  src={imgEnemy}/>
                    </div>
                    :
                    <React.Fragment>
                    <div className="fight-my-team">
                        <p className="my-team__title">
                            {state.myTeam}
                        </p>
                        <p className="fight__count">
                            {state.countMyTeam}
                        </p>
                        <img  src={imgMyTeam}/>
                    </div>
                    <div className="fight-indicator">
                        <svg  xmlns="http://www.w3.org/2000/svg" width='50px'
                            height='50px' version='1.1'>
                            {state.time > 10 ?
                             <circle r='23px' cx='25px' cy='25px' 
                             fill='none'                                   //999 это время таймера
                             strokeDashoffset={'0' } strokeDasharray={(144.44 / 999 * state.time) + ' 144.44'}
                             stroke='rgba(255, 255, 255, 0.85)' strokeWidth='2px'
                             transform="translate(38px 6px) rotate(90 5 5)"
                             className="fight-circle-indicator"/>
                             : state.time <= 3 ? 
                             <circle r='23px' cx='25px' cy='25px' 
                             fill='rgba(255, 230, 0, 1)'                                   
                              strokeWidth='2px'
                             transform="translate(38px 6px) rotate(90 5 5)"
                             className="fight-circle-indicator"/>
                             : 
                             <circle r='23px' cx='25px' cy='25px' 
                             fill='rgba(217, 217, 217, 1)'                                   
                              strokeWidth='2px'
                             transform="translate(38px 6px) rotate(90 5 5)"
                             className="fight-circle-indicator"/>
                             }
                        </svg>
                        { state.time > 10 ?
                        <span className="fight-text-indicator">
                                {state.time}
                        </span>
                        : 
                        <span className="fight-text-indicator" style={{color: "rgba(30, 30, 30, 1)"}}>
                                {state.time}
                        </span>
                        }
                    </div>
                    <div className="fight-enemy-team">
                        <p className="enemy-team-title">
                            {state.enemyTeam}
                        </p>
                        <p className="fight__count">
                            {state.countEnemyTeam}
                        </p>
                        <img  src={imgEnemy}/>
                    </div>
                    </React.Fragment>
                    }
                    </React.Fragment>
                    }
                </div>
                }
            </React.Fragment>
        )
    }
}


export default Fight