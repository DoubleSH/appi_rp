import React from 'react'
import Cards from '../uikit/Cards'
import NavigationPanel from '../uikit/NavigationPanelCar'
const Content = (props) => {
    
    return (
        <div className="carinfo__content">
            <NavigationPanel
                panels={props.panels}
                activePage={props.activeIndex}
                onChangePage={props.onChangePage}
                oil={props.oil}
                battery_info={props.battery_info}
                mileage={props.mileage}
            />
            <Cards
                {...props}
            />
        </div>
    )
}

export default Content