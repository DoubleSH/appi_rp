import React from 'react'
import styled from 'styled-components'
import '../css/stats.css'

const FlatButton = ({ text, isHide, onPress, btncolor, customStyle }) => {
    return (
        <span onClick={onPress} className={isHide ? 'hmenu__gunshop__hide' : 'hmenu__gunshop__stats__flatbtn'} style={text === "Оплатить картой" ? {background: '#2481B6'} : {background: '#219653'}}>
            {text}
        </span>
    )
}

export default FlatButton