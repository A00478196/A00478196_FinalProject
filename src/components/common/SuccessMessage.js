import React, { useState } from 'react'

const SuccessMessage = (props) => {
    let {message, className} = props
  return (
    <>
        <p className={`error-message fw-bold text-success fw-8 m-0 ${className}`}>{message}</p>
    </>
  )
}

export default SuccessMessage