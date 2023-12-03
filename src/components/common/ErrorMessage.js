import React, { useState } from 'react'

const ErrorMessage = (props) => {
    let {message} = props
  return (
    <>
        <p className='error-message fw-bold text-danger fw-8 m-0'>{message}</p>
    </>
  )
}

export default ErrorMessage