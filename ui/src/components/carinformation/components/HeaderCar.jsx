import React from 'react'
import '../css/headercarinfo.css'
import closeMenu from '../icons/header/close_menu.png'

const Header = ({carname, setHide}) => {
    return (
        <div className='carinfo__header'>
            <span className='carinfo__header_text'><p className='carinfo__header_text_subtitle'>Информация о&nbsp;</p><p className='carinfo__header_text_carname'>{carname}</p></span>
            <span onClick={setHide} className="accountmenu__topdata__close_menu">
                    <img src={closeMenu} className="accountmenu__topdata__close_menu_img"/>
            </span>
        </div>
    )
}

export default Header