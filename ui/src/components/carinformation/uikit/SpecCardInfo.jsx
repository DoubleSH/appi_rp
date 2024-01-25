import React from 'react'
import '../css/specification_card.css'

const SpecCardInfo = ({ title, info }) => {

    return (
        <React.Fragment>
            <div className='spec_card_info_container'>
                <span className='spec_card_info_titile'>
                    {title}
                </span>
                <span className='spec_card_info_text'>
                    {info}
                </span>
            </div>
        </React.Fragment>
    )
}

export default SpecCardInfo