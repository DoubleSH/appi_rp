import React from "react"
import "./Messages.scss"

const MessageCancelled = () => (
    <div className="MessageCancelled">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="white"/>
        </svg>
        <span>Вы отказались от скорой помощи</span>
    </div>
)

export default MessageCancelled