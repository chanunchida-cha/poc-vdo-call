import React, { ReactElement } from 'react'


//กำหนดค่าและรับค่าจากหน้า Doctor
interface Props {
    name: string
    avatar: string
    message: string
    newMessage?: number
    isActive?: boolean
    onClick: () => void
}


function ChatChannel({name, avatar, message, newMessage, isActive, onClick}: Props): ReactElement {
    return (
        <div className={`
            cursor-pointer
            ${isActive
                ?'bg-[#fffbf3] border-l-4 border-secondary-light drop-shadow-lg'
                : ''
            }`}
            onClick={onClick}
        >
            <div className={`
                flex flex-row justify-between items-center px-4 py-2 space-x-4
                ${isActive
                    ? ''
                    : 'border-b-2 border-gray-200'
                }
            `}>
            <div className="flex-shrink-0">
                
                <img className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" src={avatar}  /> 
            </div>
            <div className="flex-1 hidden sm:block">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col justify-center">
                        <p className="text-md font-semibold text-primary-light">{name}</p>
                        <p className="text-sm text-gray-500">{message}</p>
                    </div>
                </div>
            </div>
       
            </div>
        </div>
    )
}

export default ChatChannel