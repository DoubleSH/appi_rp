import React from 'react'
import '../css/content.css'

const ButtonNav = ({ name, img1, img2 }) => {
    return (
        <div className="nav__button">
            <img src={img1}/>
            <span className="nav__button__name">{name}</span>
            <img src={img2}/>
        </div>
    )
}

export default ButtonNav