import React from "react";
import '../css/Notification.css';
import msgBank from '../img/msg-bank.png';
import msgHelper from '../img/msg-helper.png';
import msgHelperLight from '../img/msg-helper-light.png';
import msgGood from '../img/msg-good.png';
import msgGoodLight from '../img/msg-good-light.png';
import msgBad from '../img/msg-bad.png';
import msgBadLight from '../img/msg-bad-light.png';
import msgAttention from '../img/msg-attention.png';
import msgAttentionLight from '../img/msg-attention-light.png';


class Notification extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            day: false,
            show: true,
            notifications: [],
            messeges: [
                      {type:'bank', 
                      title: 'Операция подтверждена', 
                      messege: 'Покупки в магазине Продукты 7/10\n на сумму $5,007 успешно оплачены'},
                      {type:'helper',
                      messege: 'Чтобы завести или заглушить машину, нажмите клавишу В'},
                      {type:'attention',
                      messege: 'Администратор Mathew выдал вам мут голосового чата на 10 минут. Причина: Громкие звуки'},
                      {type:'good',
                      messege: 'Ремень безопасности пристегнут!'},
                      {type:'bad',
                        messege: 'Нельзя выполнить это действие'}
                      
                       ],
            icon: {
                bad: msgBad,
                good: msgGood,
                helper: msgHelper,
                attention: msgAttention,
                bank: msgBank
            },
            iconLight: {
                bad: msgBadLight,
                good: msgGoodLight,
                helper: msgHelperLight,
                attention: msgAttentionLight
            }
        }

    }

    componentWillMount(){
      
          setInterval(()=>{
            if(this.state.messeges.length > 0){

              if(this.state.notifications.length <= 0){
                let newMesseges = [...this.state.messeges];
                newMesseges.splice(0, 2)

                this.setState({notifications: [this.state.messeges[0], this.state.messeges[1]],
                               messeges: newMesseges})

                }else if(this.state.notifications.length > 0){

                let newMesseges = [...this.state.messeges];
                    newMesseges.shift()
                    
                  this.setState({notifications: [this.state.notifications[1], this.state.messeges[0]],
                                 messeges: newMesseges})

                }

            }else if(this.state.messeges.length == 0){

              if(this.state.notifications.length > 0){
                let newNotification = [...this.state.notifications];
                    newNotification.shift()
                this.setState({notifications: newNotification})
              
              }

            }
          }, 2000)
        }


    showMessege(elem){
       
        
        switch (elem.type) {
            case 'bad':
            return (<div className={`messege-notification ${this.state.day ? '__bad-light' : '__bad'}`} key={Math.random()}>
                          <img src={this.state.day ? this.state.iconLight.bad : this.state.icon.bad} className='icon-notification-messege' />
                          <p className='text-notification-messege'>
                            {elem.messege}
                          </p>
                        </div>)
                        
            case 'good':
            return (<div className={` messege-notification ${this.state.day ? '__good-light' : '__good'}`} key={Math.random()}>
                            <img src={this.state.day ? this.state.iconLight.good : this.state.icon.good} className='icon-notification-messege' />
                            <p className="text-notification-messege">{elem.messege}</p>
                        </div>)
                        
            case 'attention':
            return (<div className={`messege-notification ${this.state.day ? '__attention-light' : '__attention'}`} key={Math.random()}>
                            <img src={this.state.day ? this.state.iconLight.attention : this.state.icon.attention} className='icon-notification-messege' />
                           <div className="flex-box-notification-messege">
                            <p className="title-notification-messege">
                              ВНИМАНИЕ!
                            </p>
                            <p className="text-notification-messege">{elem.messege}</p>
                           </div>
                        </div>)
                        
            case 'helper':
            return (<div className={`messege-notification ${this.state.day ? '__helper-light' : '__helper'}`} key={Math.random()}>
                            <img src={this.state.day ? this.state.iconLight.helper : this.state.icon.helper} className='icon-notification-messege' />
                           <div className="flex-box-notification-messege">
                            <p className="title-notification-messege">
                            ПОДСКАЗКА
                            </p>
                            <p className="text-notification-messege">{elem.messege}</p>
                           </div>
                        </div>)
                        
            case 'bank':
             return (<div className={`messege-notification ${this.state.day ? '__bank-light' : '__bank'}`} key={Math.random()}>
                            <img src={this.state.icon.bank} className='icon-notification-messege' />
                          <div className="flex-box-notification-messege">
                            <p className="title-notification-messege">
                             FLEECE BANK
                            </p>
                            <p className="title-text-notification-messege">
                            Операция подтверждена
                            </p>
                            <p className="text-notification-messege">{elem.messege}</p>
                          </div>
                        </div>)
                        

            default:
                return null
        }

       
      }
    
    
    render(){
        return(
            <React.Fragment>
              { this.state.show &&
                <div className="notification-wrapper" >
                    {
                      this.state.notifications.map(item => this.showMessege(item))
                    }
                </div>}
            </React.Fragment>
        )
    }
}


export default Notification;

