import React from 'react'
import '../css/general.css'

const ProgressBar = ({  value, maxvalue }) => {
    return (
        <React.Fragment>
        <div
            className="accountmenu__cards__stats__progressbar"
            //style={{width: `${maxvalue / (value / 100)}%`}}
        >
            <div className="wrapper__progress">
                <div style={value !== maxvalue ?
                {
                    width: `${(value/maxvalue) * 100}%`,
                    background: `#fff`,
                    height: '4px',
                    position: 'absolute',
                    borderRadius: '50px',
                    boxShadow: '0px 0px 20px #FFFFFF'
                } 
                :
                {
                    width: `${(value/maxvalue) * 100}%`,
                    background: `#6FCF97`,
                    height: '4px',
                    position: 'absolute',
                    borderRadius: '50px',
                    boxShadow: '0px 0px 20px #6FCF97'  
                }}/>
            </div>
        </div>
        </React.Fragment>
    )
}

export default ProgressBar