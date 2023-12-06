import React from 'react'

const EmptyMessage = (props) => {
    let {title} = props
  return (
    <p className='fw-9 mt-2 mb-0'>Sorry, no {title} found.</p>
  )
}

export default EmptyMessage