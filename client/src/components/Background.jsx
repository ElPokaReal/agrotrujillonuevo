import React from 'react'

const Background = ({ children }) => {
    return <div className='bg-white dark:bg-[#121212] w-full min-h-screen'>{children}</div>
}

export default Background