import React from 'react'
import '../css/general.css'
import ProgressBar from './ProgressBar'


const StatContainer = ({  title, value, maxvalue }) => {
    const elementStyleNotDone = {
        background: `linear-gradient(to right,  rgba(217, 217, 217, 0.1) ${value}%, transparent ${value}%)`,
        border: `2px solid #FFFFFF`
      };
    const elementStyleDone = {
      background: `linear-gradient(to right,  rgba(242, 201, 76, 0.15) ${value}%, transparent ${value}%)`,
      border: `2px solid #F2C94C`
    };
    const elementStyle = {
      border: `2px solid rgba(255, 255, 255, 0.1)`
    };
    const colorNotDone = {
        color: `rgba(255, 255, 255, 0.85)`
      };
    const colorDone = {
      color: `#F2C94C`
    };
    const color = {
        color: `rgba(255, 255, 255, 0.5)`
      };    
    return (
        <div className="accountmenu__cards__stats__item" style={(value > 0) && (value < 100) ? elementStyleNotDone : value == 100 ? elementStyleDone : elementStyle}>
            <span className="accountmenu__cards__stats__title">{title}</span>
            <span className="accountmenu__cards__stats__value" style={(value > 0) && (value < 100) ? colorNotDone : value == 100 ? colorDone : color}>{value}%</span>
        </div>
    )
}

export default StatContainer