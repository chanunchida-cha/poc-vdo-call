import React from 'react'

interface ChatMessageProps {
    name: string
    avatar: string
    message: string
}

//export const ทำให้ export ได้หลายครั้งใน Folder เดียว



export const ChatMessageOther: React.FC<ChatMessageProps> = ({ name, avatar, message }) => {
    return (
        <div className="flex flex-row items-center justify-start space-x-2 p-4 ">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            <p className="text-sm font-semibold text-primary-light">{message}</p>
        </div>
    )
}

export const ChatMessageMe: React.FC<ChatMessageProps> = ({ name, avatar, message }) => {
    return (
        <div className="flex flex-row items-center justify-end space-x-2 p-4 ">
            <p className="text-sm font-semibold text-primary-light">{message}</p>
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
        </div>
    )
}