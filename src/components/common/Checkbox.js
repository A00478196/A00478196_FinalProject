import React from 'react'

const Checkbox = ({name, label, onChange}) => {
  return (
    (
        <>
        <div class="form-check" onChange={onChange}>
            <input class="form-check-input" type="checkbox" value="" id={name} name={name} />
            <label class="form-check-label" for={name}>
            {label}
            </label>
        </div>
        </>
    )
  )
}

export default Checkbox