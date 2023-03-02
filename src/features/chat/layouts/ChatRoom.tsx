import React, { ReactElement } from 'react'

function ChatRoom({children, title}: any): ReactElement {

    
    return (
        <div className="flex-1 h-full overflow-hidden mt-14 lg:mt-0 flex flex-col bg-white lg:rounded-[2rem] shadow-lg ">
            <div className="p-4 pb-0">
                <div className="border-b-2 border-primary pb-2">
                    <h1 className="text-md sm:text-xl font-bold text-primary">{title}</h1>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    )
}

export default ChatRoom