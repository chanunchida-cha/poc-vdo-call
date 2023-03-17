import React from 'react'
import styled from 'styled-components';

interface ChatMessageProps {
    name: string
    avatar: string
    message: string
}

const Wrapper = styled.div`
  font-size: 15px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.0;
  }
`;

//export const ทำให้ export ได้หลายครั้งใน Folder เดียว

export const ChatMessageOther: React.FC<ChatMessageProps> = ({ name, avatar, message }) => {
    return (
        <div className="container ">
        <Wrapper>
            <div className="flex flex-row items-center justify-start space-x-2 p-4">
            <div className="flex flex-row">
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
                <p className="text-sm font-semibold text-primary-light message from">{message}</p>
            </div>
            </div>
        </Wrapper>
        </div>
    )
}

export const ChatMessageMe: React.FC<ChatMessageProps> = ({ name, avatar, message }) => {
    return (
        <div className="container">
        <Wrapper>
            <div className="space-x-2 p-4">
            <div className="flex flex-row-2 justify-end">
                <p className="text-sm font-semibold text-primary-light message to">{message}</p>
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            </div>
            </div>
        </Wrapper>
        </div>
    )
}