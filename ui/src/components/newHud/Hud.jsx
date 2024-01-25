import React from "react";
import CarIndicators from "./components/CarIndicators";
import CarMenu from "./components/CarMenu";
import Chat from "./components/Chat";
import Dying from "./components/Dying";
import Gps from "./components/Gps";
import Hints from "./components/Hints";
import Logo from "./components/logo";
import Notification from "./components/Notification";
import Player from "./components/Player";
import QuestTask from "./components/QuestTask";
import './css/Hud.css';


class Hud extends React.Component{
    constructor(prop){
        super(prop)

    }



    render(){
        return(
        <React.Fragment>
            <section className="hud-main">
                <Dying />
                <div className="hud-position-leftTop">
                    <Chat />
                    
                </div>
                <div className="hud-position-leftBottom">
                    <Notification />
                    <Gps />
                    <Player />
                </div>
                <div className="hud-position-rightTop">
                    <Logo />
                    <QuestTask />
                    <Hints />
                    <CarMenu />
                </div>
                <div className="hud-position-rightBottom">
                   <CarIndicators />
                </div>
            </section>
        </React.Fragment>
        )
    }
}

export default Hud