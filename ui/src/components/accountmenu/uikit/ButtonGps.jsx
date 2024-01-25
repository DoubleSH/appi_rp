import React from 'react'
import '../css/property.css'

const ButtonGps = ({ x, y }) => {
    return (
            <div className={((x === 0) && (y === 0)) ? "accountmenu__cards__btngps none" : "accountmenu__cards__btngps"} 
             onClick={() => {
                try {
                    mp.trigger('client:mainMenu:sendPos', x, y); // eslint-disable-line
                }
                catch (e) {}
            }} />
    )
}

export default ButtonGps