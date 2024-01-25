import React from 'react';
import EventManager from "../../EventManager";
import Header from './components/HeaderCar';
import Content from './components/ContentCar';
import "./css/maincarinfo.css"

class CarInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            panels: [
                {name: 'Технические характеристики', id: 'carinfo-spec'},
                {name: 'Состояние внутренних элементов', id: 'carinfo-enternal-el'},
                {name: 'Состояние кузова', id: 'carinfo-body-condition'},
                {name: 'Тюнинг', id: 'carinfo-tuning'}
            ],
            activePage: 0,
            car_name: 'Porshe',
            type: 0, //0-2axiscar 1-3axiscar 2-moto
            battery_info: 90,
            oil: 30,
            mileage: 10000,
            factory_info: [
                {title: 'Марка', subtitle: 'Porshe'},
                {title: 'Модель', subtitle: '911 turbo s'},
                {title: 'Класс', subtitle: 'Спорткар'}
            ],
            penalties : [
                {
                    title: 'Превышение скорости',
                    date: '13.12.2022 14:50',
                    author: 'Mathew',
                    sum: 100,
                    paid: true
                }
            ],
            tech_info : [
                {title: 'Максимальная скорость', subtitle: 341},
                {title: 'Тип топлива', subtitle: 'Бензин'},
                {title: 'Вместимость топливного бака', subtitle: 90},
                {title: 'Расход топлива', subtitle: 11.5},
                {title: 'Объем багажника', subtitle: 90}

            ],
            law_info: [
                {title: 'Гос. номерной знак', subtitle: 'MM 999 MM'},
                {title: 'Гос. стоимость', subtitle: 150000},
                {title: 'Требуемая категория прав', subtitle: 'C DL'}
            ],
            tuning: [
                /*{title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер1', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер2', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер3', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер4', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер5', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер6', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер7', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер8', subtitle: 'Windshield 300 R'},
                {title: 'Спойлер9', subtitle: 'Windshield 300 R'}*/
            ],
            body_cond: [
                /*{title: 'Задняя правая дверь1', condition: 1},
                {title: 'Задняя правая дверь2', condition: 2},
                {title: 'Задняя правая дверь3', condition: 1},
                {title: 'Задняя правая дверь4', condition: 1},
                {title: 'Задняя правая дверь5', condition: 2}, //1-not broke 2-broke
                {title: 'Задняя правая дверь6', condition: 1},
                {title: 'Задняя правая дверь7', condition: 1},
                {title: 'Задняя правая дверь8', condition: 2},
                {title: 'Задняя правая дверь9', condition: 1},
                {title: 'Задняя правая дверь1', condition: 1},
                {title: 'Задняя правая дверь2', condition: 2},
                {title: 'Задняя правая дверь3', condition: 1},
                {title: 'Задняя правая дверь4', condition: 1},
                {title: 'Задняя правая дверь5', condition: 2}, //1-not broke 2-broke
                {title: 'Задняя правая дверь6', condition: 1},
                {title: 'Задняя правая дверь7', condition: 1},
                {title: 'Задняя правая дверь8', condition: 2},
                {title: 'Задняя правая дверь9', condition: 1},
                {title: 'Задняя правая дверь1', condition: 1},
                {title: 'Задняя правая дверь2', condition: 2},
                {title: 'Задняя правая дверь3', condition: 1},
                {title: 'Задняя правая дверь4', condition: 1},
                {title: 'Задняя правая дверь5', condition: 2}, //1-not broke 2-broke
                {title: 'Задняя правая дверь6', condition: 1},
                {title: 'Задняя правая дверь7', condition: 1},
                {title: 'Задняя правая дверь8', condition: 2},
                {title: 'Задняя правая дверь9', condition: 1},
                {title: 'Задняя правая дверь1', condition: 1},
                {title: 'Задняя правая дверь2', condition: 2},
                {title: 'Задняя правая дверь3', condition: 1},
                {title: 'Задняя правая дверь4', condition: 1},
                {title: 'Задняя правая дверь5', condition: 2}, //1-not broke 2-broke
                {title: 'Задняя правая дверь6', condition: 1},
                {title: 'Задняя правая дверь7', condition: 1},
                {title: 'Задняя правая дверь8', condition: 2},
                {title: 'Задняя правая дверь9', condition: 1},
                {title: 'Задняя правая дверь1', condition: 1},
                {title: 'Задняя правая дверь2', condition: 2},
                {title: 'Задняя правая дверь3', condition: 1},
                {title: 'Задняя правая дверь4', condition: 1},
                {title: 'Задняя правая дверь5', condition: 2}, //1-not broke 2-broke
                {title: 'Задняя правая дверь6', condition: 1},
                {title: 'Задняя правая дверь7', condition: 1},
                {title: 'Задняя правая дверь8', condition: 2},
                {title: 'Задняя правая дверь9', condition: 1},
                {title: 'Задняя правая дверь1', condition: 1},
                {title: 'Задняя правая дверь2', condition: 2},
                {title: 'Задняя правая дверь3', condition: 1},
                {title: 'Задняя правая дверь4', condition: 1},
                {title: 'Задняя правая дверь5', condition: 2}, //1-not broke 2-broke
                {title: 'Задняя правая дверь6', condition: 1},
                {title: 'Задняя правая дверь7', condition: 1},
                {title: 'Задняя правая дверь8', condition: 2},
                {title: 'Задняя правая дверь9', condition: 1},
                {title: 'Задняя правая дверь1', condition: 1},
                {title: 'Задняя правая дверь2', condition: 2},
                {title: 'Задняя правая дверь3', condition: 1},
                {title: 'Задняя правая дверь4', condition: 1},
                {title: 'Задняя правая дверь5', condition: 2}, //1-not broke 2-broke
                {title: 'Задняя правая дверь6', condition: 1},
                {title: 'Задняя правая дверь7', condition: 1},
                {title: 'Задняя правая дверь8', condition: 2},
                {title: 'Задняя правая дверь9', condition: 1} */
            ],
            enternal_cond: [ //1-great 2-normal 3-bad 4-destroyed
                {
                    left_1_wheel: 1,
                    left_2_wheel: 2,
                    left_3_wheel: 3,
                    right_1_wheel: 3,
                    right_2_wheel: 4,
                    right_3_wheel: 3,
                    engine: 2,
                    electronic: 3,
                    fuel_generator: 2,
                    transmition: 1,
                    brake: 4,
                    top_wheel_moto: 1,
                    bottom_wheel_moto: 2
                }
            ],
            show_left_1_wheel: false,
            show_left_2_wheel: false,
            show_left_3_wheel: false,
            show_right_1_wheel: false,
            show_right_2_wheel: false,
            show_right_3_wheel: false,
            show_top_wheel_moto: false,
            show_bottom_wheel_moto: false,
            show_engine: false,
            show_electronic: false,
            show_fuel_generator: false,
            show_transmition: false,
            show_brake: false
        }
    }

    show_left_1_wheel_funct = () => {
        this.setState({show_left_1_wheel: !this.state.show_left_1_wheel})
    }

    show_left_2_wheel_funct = () => {
        this.setState({show_left_2_wheel: !this.state.show_left_2_wheel})
    }

    show_left_3_wheel_funct = () => {
        this.setState({show_left_3_wheel: !this.state.show_left_3_wheel})
    }

    show_right_1_wheel_funct = () => {
        this.setState({show_right_1_wheel: !this.state.show_right_1_wheel})
    }

    show_right_2_wheel_funct = () => {
        this.setState({show_right_2_wheel: !this.state.show_right_2_wheel})
    }

    show_right_3_wheel_funct = () => {
        this.setState({show_right_3_wheel: !this.state.show_right_3_wheel})
    }

    show_engine_funct = () => {
        this.setState({show_engine: !this.state.show_engine})
    }

    show_electronic_funct = () => {
        this.setState({show_electronic: !this.state.show_electronic})
    }

    show_fuel_generator_funct = () => {
        this.setState({show_fuel_generator: !this.state.show_fuel_generator})
    }

    show_transmition_funct = () => {
        this.setState({show_transmition: !this.state.show_transmition})
    }

    show_brake_funct = () => {
        this.setState({show_brake: !this.state.show_brake})
    }

    show_top_wheel_moto_funct = () => {
        this.setState({show_top_wheel_moto: !this.state.show_top_wheel_moto})
    }

    show_bottom_wheel_moto_funct = () => {
        this.setState({show_bottom_wheel_moto: !this.state.show_bottom_wheel_moto})
    }

    componentDidCatch(error, errorInfo) {
        mp.trigger('client:ui:debug', 'Carmneu.jsx', error.toString(), errorInfo.toString()); // eslint-disable-line
    }

    componentDidMount() {
        EventManager.addHandler('carinfo', value => {
            if (value.type === 'show') {
                this.setState({show: true})
            }
            else if (value.type === 'hide') {
                this.setState({show: false})
            }
            else if (value.type === 'updateMainInfo') {
                this.setState({panels: value.panels});
                this.setState({car_name: value.car_name});
                this.setState({vtype: value.type});
                this.setState({battery_info: value.battery_info});
                this.setState({oil: value.oil});
                this.setState({mileage: value.mileage});
                this.setState({factory_info: value.factory_info});
            }
            else if (value.type === 'updatePenaltiesInfo') {
                this.setState({penalties: value.penalties});
            }
            else if (value.type === 'updateTechInfo') {
                this.setState({tech_info: value.tech_info});
            }
            else if (value.type === 'updateLawInfo') {
                this.setState({law_info: value.law_info});
            }
            else if (value.type === 'updateTuningInfo') {
                this.setState({tuning: value.tuning});
            }
            else if (value.type === 'updateBodyCondInfo') {
                this.setState({body_cond: value.body_cond});
            }
            else if (value.type === 'updateExternalCondInfo') {
                this.setState({enternal_cond: value.enternal_cond});
            }
        })
    }

    componentWillUnmount() {
        EventManager.removeHandler('carinfo');
    }

    setHide = () => {
        this.setState({
            show: false
        });
        mp.trigger('client:carmenu:hide'); // eslint-disable-line
    }


    onChangePage = (page) => {
        this.setState({
            activePage: page
        })
    }

    setActivePage = (name, type) => {
        const page = this.state.panels.findIndex(val => val.id === name)
        this.setState({
            activePage: page
        })
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <div className="carmenu-bg">
                <div className="carmenu">
                    <Header
                        carname={this.state.car_name}
                        setHide={this.setHide}
                    />
                    <Content
                        setActivePage={this.setActivePage}
                        panels={this.state.panels}
                        page={this.state.panels[this.state.activePage]}
                        onChangePage={this.onChangePage}
                        activeIndex={this.state.activePage}
                        factoryInfo={this.state.factory_info}
                        Penalties={this.state.penalties}
                        techIndicators={this.state.tech_info}
                        lawInfo={this.state.law_info}
                        tuning={this.state.tuning}
                        body_cond={this.state.body_cond}
                        enternal_cond={this.state.enternal_cond[0]}
                        showElements={this.state.showElements}
                        show_left_1_wheel_funct={this.show_left_1_wheel_funct}
                        show_left_1_wheel={this.state.show_left_1_wheel}
                        show_left_2_wheel_funct={this.show_left_2_wheel_funct}
                        show_left_2_wheel={this.state.show_left_2_wheel}
                        show_left_3_wheel_funct={this.show_left_3_wheel_funct}
                        show_left_3_wheel={this.state.show_left_3_wheel}
                        show_right_1_wheel_funct={this.show_right_1_wheel_funct}
                        show_right_1_wheel={this.state.show_right_1_wheel}
                        show_right_2_wheel_funct={this.show_right_2_wheel_funct}
                        show_right_2_wheel={this.state.show_right_2_wheel}
                        show_right_3_wheel_funct={this.show_right_3_wheel_funct}
                        show_right_3_wheel={this.state.show_right_3_wheel}
                        show_electronic_funct={this.show_electronic_funct}
                        show_electronic={this.state.show_electronic}
                        show_fuel_generator_funct={this.show_fuel_generator_funct}
                        show_fuel_generator={this.state.show_fuel_generator}
                        show_transmition_funct={this.show_transmition_funct}
                        show_transmition={this.state.show_transmition}
                        show_engine_funct={this.show_engine_funct}
                        show_engine={this.state.show_engine}
                        show_brake_funct={this.show_brake_funct}
                        show_brake={this.state.show_brake}
                        oil={this.state.oil}
                        mileage={this.state.mileage}
                        battery_info={this.state.battery_info}
                        type={this.state.type}
                        show_bottom_wheel_moto={this.state.show_bottom_wheel_moto}
                        show_top_wheel_moto={this.state.show_top_wheel_moto}
                        show_top_wheel_moto_funct={this.show_top_wheel_moto_funct}
                        show_bottom_wheel_moto_funct={this.show_bottom_wheel_moto_funct}
                    />
                </div>
            </div>
        )
    }
}

export default CarInformation;
