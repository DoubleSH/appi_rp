import React from "react";
import EventMeneger from '../../../EventManager';
import '../css/Chat.css';

class Chat extends React.Component{
    constructor(){
        super()

        this.state = {
            messeges : [{ userName: 'Администратор Mathew',
                          messege:'Пиздец, блять!',
                          color:'255, 195, 13,',
                          colorOpacity:''},
                        { userName: 'Ⓖ Mathew Dragon (7171) / LSPD',
                          color: '48, 175, 242,',
                          messege: 'Пиздец, блять!'},
                        { userName: 'Ⓓ Mathew Dragon (7171) / LSPD, Captain 1)',
                          color: '218, 79, 79,',
                          messege: 'Пиздец, блять!'},
                        { userName: 'Ⓕ Mathew Dragon (7171) / Captain 1',
                          color: '48, 175, 242,',
                          messege: 'Пиздец, блять!'},
                        { userName: 'Mathew Dragon',
                          color:'205, 205, 205,',
                          messege: 'Пиздец, блять!'},
                        { userName: 'Mathew Dragon', 
                          color:'205, 205, 205,',
                          messege: 'Пиздец, блять!'},
                        { userName: 'Mathew Dragon', 
                          color:'205, 205, 205,',
                          messege: 'Пиздец, блять!'},
                        { userName: 'Life Invader / Tommy M.',
                          color:'205, 205, 205,',
                          messege: 'Пиздец, блять!'},
                        { userName: 'Игрок 9192', 
                          color: '48, 175, 242,',
                          messege: 'На улице сыро.'}],
            show: true
        }
    }
    componentDidMount(){
        EventMeneger.addHandler('hudc', value=>{
            if (value.type === 'show') {
                this.setState({show: true})
            } else if (value.type === 'hide') {
                this.setState({show: false})
            } else if (value.type === 'updateValues') {
                this.setState({show: value.show});
                this.setState({messeges: value.messeges});
            } else return;
        })
    }
    componentWillUnmount(){
        EventMeneger.removeHandler('hudc')
    }

    
    render(){

        return(
            <React.Fragment>
                { this.state.show &&
                <ul className="chat-wrapper">
                    {
                      this.state.messeges.map(item => 
                        <li key={Math.random()} className="chat__element"
                            style={{color: `rgba(${item.color} 0.55)`, fontWeight: '600'}}>
                        <span style={{color: `rgba(${item.color} 0.85)`, fontWeight: '500'}}>
                            {item.userName + ' : '}
                        </span>
                        {item.messege}
                       </li>)
                    }
                </ul>}
            </React.Fragment>
        )
    }
}


export default Chat