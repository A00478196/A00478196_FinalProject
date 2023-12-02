import React, { useState } from 'react'
import Input from './Input'
import { useNavigate } from 'react-router-dom'

const Modal = (props) => {
  const navigate = useNavigate()
  const [paymentDetail, setPaymentDetail] = useState(false)
    let {bidState} = props
  return (
   <>
   {
    paymentDetail?
    <>
    <button disabled={!bidState} type="button" class="btn bg-black text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Bid on Art
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Do you want to Bid on this Art?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
            <Input
                        type="number"
                        id="price"
                        name="price"
                        label={false}
                        placeholder="Enter the amount you want to bid"
                        className="mt-0 w-75 mx-auto"
                    />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn border-dark">Done</button>
          </div>
        </div>
      </div>
    </div>
    </>
    :
    <>
      <button disabled={bidState} type="button" class="btn bg-black text-white" onClick={()=>navigate('/payment-details')}>
      Bid on Art
      </button>
    </>
  }
   </>
  )
}

export default Modal