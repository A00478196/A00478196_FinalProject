import React from 'react'

const Radio = (props) => {
    let{name, label, className} = props
  return (
    <>
    <div class={`form-check ${className}`}>
  <input class="form-check-input" type="radio" name={name} id={name} />
  <label class="form-check-label" for={name}>
    {label}
  </label>
</div>
    </>
  )
}

export default Radio