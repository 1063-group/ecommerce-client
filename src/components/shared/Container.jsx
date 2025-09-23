import React from 'react'

const Container = ({children}) => {
  return (
    <div className='max-w-[95%] mx-auto container'>{children}</div>
  )
}

export default Container