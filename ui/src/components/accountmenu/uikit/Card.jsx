import React from 'react'
import '../css/general.css'

const Card = ({ icon, title, subtitle }) => {
    return (
        <div className="accountmenu__content__cards__finance__card" style={icon === 'card' ? {background: '#236991'} : {background: '#368959'}}  >
            <span className="accountmenu__content__cards__finance__card__title">
            <div className={icon === 'card' ? "accountmenu__card__icon" : "accountmenu__money__icon"} />
                {title}
            </span>
            <span className="accountmenu__content__cards__finance__card__subtitle">
                {subtitle}
            </span>
        </div>
    )
}

export default Card