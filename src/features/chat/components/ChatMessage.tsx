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
        <div className="flex flex-wrap pb-8 max-w-[100%] ">
        <Wrapper>
            <div className="flex flex-row items-center justify-end space-x-2 p-4">
            <div className="flex flex-row">
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
                <p className="text-sm font-semibold text-primary-light max-w-[70%] ml-3 rounded bg-[#fffbf3] p-3">{message}</p>
            </div>
            </div>
        </Wrapper>
        </div>
    )
}

export const ChatMessageMe: React.FC<ChatMessageProps> = ({ name, avatar, message }) => {
    return (
        <div className="flex flex-wrap pb-8 max-w-[100%] ">
        <Wrapper>
            <div className="space-x-2 p-4">
            <div className="flex flex-row-2 justify-end">
                <p className="text-sm font-semibold text-primary-light max-w-[70%] mr-3 rounded bg-[#fffbf3] p-3 col-span-5">{message}</p>
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full grid-cols-start-6" />
            </div>
            </div>
        </Wrapper>
        </div>
    )
}