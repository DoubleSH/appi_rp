import React from "react";
import EventManager from "../../../EventManager";
import '../css/QuestTask.css';
import QuestTaskImg from '../img/Vectorquest-task.png';
import QuestTaskLDark from '../img/Vectorquest-task-dark.png';


class QuestTask extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            day: false,
            show: true,
            task: 'Чтобы завести или заглушить машину, нажмите клавишу В'
        }
    }
    componentDidMount(){
        EventManager.addHandler('handq', value =>{
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({day: value.day});
                this.setState({show: value.show});
                this.setState({task: value.task});
            } else return;
        })
    }
    componentWillUnmount(){
        EventManager.removeHandler('handq')
    }
    
    render(){
        const state = this.state
        return(
            <React.Fragment>
                { state.show &&
                <div className="quest-task-wrapper" style={{backgroundColor: state.day ? 'rgba(165, 92, 199, 0.6)':'rgba(93, 53, 112, 0.6)'}}>
                    <img src={state.day ? QuestTaskImg : QuestTaskLDark} className='quest-task-icon'/>
                    <div className="quest-task__box">
                    <p className="quest-task__title"
                       style={{color: state.day ? 'rgba(255, 255, 255, 0.75)' : '#CB83EE'}}>
                      квестовое задание
                    </p>
                    <p className="quest-task__text"
                       style={{color: '#FFFFFF'}}>
                      {state.task}
                    </p>
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}


export default QuestTask