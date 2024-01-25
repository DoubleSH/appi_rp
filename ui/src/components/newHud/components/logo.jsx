import React from "react";
import logo from '../img/logo.png';
import Ammunition from '../img/Vectorammunition.png';
import AmmunitionRed from '../img/Vectorammunition-red.png';
import EventManager from "../../../EventManager";
import '../css/Logo.css';

class Logo extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            day: false,
            players: 561,
            maxPlayer: 1000,
            time: '16:31',
            date: '01/01/01',
            playerId: 5671,
            ammunitionAll: 0,
            ammunitionIntoWeapon: 0

        }
    }
    componentDidMount(){
        EventManager.addHandler('hudl', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({date: value.date});
                this.setState({time: value.time});
                this.setState({online: value.online});
                this.setState({maxPlayer: value.maxPlayer});
                this.setState({playerId: value.playerId});
                this.setState({showAmmo: value.showAmmo});
                this.setState({ammunitionAll: value.ammunitionAll});
                this.setState({ammunitionIntoWeapon: value.ammunitionIntoWeapon});
            } else return;
        })
    }
    
    componentWillUnmount() {
        EventManager.removeHandler('hudl');
    }

    render(){
        const state = this.state
        return(
            <React.Fragment>
                <div className="header-menu-wrapper">
                <div className="logo-wrapper">
                    <div className="logo-information">
                    <div className="logo-information__flex-box">
                        <span className="logo-information__red-span" style={{color: `rgba(255, 112, 112, ${state.day ? '1':'0.6'})`}}>
                            АДМИН-РЕЖИМ 
                        </span>
                        <span className="logo-information__span" style={{color: `rgba(255, 255, 255, ${state.day ? '0.8':'0.5'})`}}>
                            {state.time + ' '}
                        </span>
                        <span className="logo-information__span" style={{color: `rgba(255, 255, 255, ${state.day ? '0.8':'0.5'})`}}>
                            {state.date + ' '}
                        </span>
                        <span className="logo-information__span" style={{color: `rgba(255, 255, 255, ${state.day ? '0.8':'0.5'})`}}>
                            ID: {state.playerId + ' '}
                        </span>
                    </div>
                    <p className="logo-players" style={{color: `rgba(255, 255, 255, ${state.day ? '0.8':'0.5'})`}}>
                        ИГРОКОВ: {' ' + state.players + '/' + state.maxPlayer}
                    </p>
                    </div>
                    <img src={logo} className='logo-img' style={{filter: `brightness(${state.day ? '0.9':'0.6'})`}}/>
                 </div>
                  <div className="ammunition-wrapper">
                    <p className="ammunition-count" style={{color: 'rgba(255, 255, 255, 0.35)'}}>
                     <span style={{color: 'rgba(255, 255, 255, 0.85)'}}>
                        {state.ammunitionIntoWeapon}
                     </span>
                     /{state.ammunitionAll}
                    </p>
                    <img src={state.ammunitionAll == 0 && state.ammunitionIntoWeapon == 0 ? AmmunitionRed : Ammunition}
                         className='ammunition-icon' />
                  </div>
                </div>
                
            </React.Fragment>
        )
    }
}


export default Logo