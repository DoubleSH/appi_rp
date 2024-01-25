import React from 'react'
import '../css/auto.css'

const Title = ({ text, size }) => (
    <span className={`dednet__title-${size}`} dangerouslySetInnerHTML={{ __html: text }}></span>
)

export default Title