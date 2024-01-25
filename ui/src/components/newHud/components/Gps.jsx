import React from "react";
import '../css/Gps.css';
import Fight from "./Fight";

class Gps extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            show: true
        }
    }
    
    render(){
        return(
            <React.Fragment>
                { this.state.show &&
                <div className="gps-wrapper">
                    <div className="gps-map">
                        <Fight />
                    </div>
                    <div className="gps-indicator-box">
                        <div className="gps-indicator-health"></div>
                        <div className="gps-indicator-stamina"></div>
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}


export default Gps