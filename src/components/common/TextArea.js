import React from 'react'

const TextArea = (props) => {
    let {children, className, placeholder} = props
  return (
    <textarea 
    className={`form-control ${className}`}
    placeholder={placeholder}
    >
        {children}
    </textarea>
  )
}

export default TextArea