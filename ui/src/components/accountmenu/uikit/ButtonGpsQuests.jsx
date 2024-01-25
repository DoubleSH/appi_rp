import React from 'react'
import '../css/quests.css'

const ButtonGpsQuests = ({ x, y }) => {
    return (
            <div className={((x === 0) && (y === 0)) ? "accountmenu__cards__btngpsquests none" : "accountmenu__cards__btngpsquests"} onClick={() => {
                try {
                    mp.trigger('client:mainMenu:sendPos', x, y); // eslint-disable-line
                }
                catch (e) {}
            }}/>
    )
}

export default ButtonGpsQuests