import React from 'react'

const LinkButton = (props) => {
    let {text, type, className, link, color, textColor, border, icon} = props
  return (
    <>
    <button  className={`btn px-4 rounded-0 ${!border && `border-${color}` } bg-${textColor}  ${className}` }><a href={link} className={`text-decoration-none text-${color}`}>{text} {icon && icon}</a></button>
    </>
  )
}

export default LinkButton