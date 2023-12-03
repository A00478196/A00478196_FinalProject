import React from 'react'

const AlertMessage = (props) => {
    let {message} = props
  return (
    <>
    <p className='text-success fw-bold fw-8 my-2'>{message}</p>
    </>
  )
}

export default AlertMessage