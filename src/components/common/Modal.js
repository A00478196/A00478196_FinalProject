import React, { useState } from 'react'
import Input from './Input'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'
import instance from '../auth/axiosConfig'
import { decoded, token } from '../../helpers/token'
import SuccessMessage from './SuccessMessage'
import Button from './Button'

const Modal = (props) => {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()
  const [paymentDetail, setPaymentDetail] = useState(true)
    let {bidState, art} = props

    console.log(art?.minimumBid)

    const [formErrors, setFormErrors] = useState({})
    const [formData, setFormData] = useState({
      bidAmount:0,
    })


    const onChange = (e) =>{
      let {name, value} = e?.target

      let data = {...formData}
      let errors = {...formErrors}

      data[name] = value
      errors[name] = ""

      setFormData(data)
      setFormErrors(errors)
    }

    const onSubmit = (e) =>{
      e.preventDefault();
      setLoading(true)
      let bidAmt = formData?.bidAmount && parseInt(formData?.bidAmount)
      if(bidAmt<=0){
        console.log("0")

        setFormErrors({bidAmount:"Bid amount should be greater than 0"})
      }else if(bidAmt<=art?.minimumBid){
        console.log("less")
        setFormErrors({bidAmount:`Bid amount should be greater then minimum Bid amount i.e. ${art?.minimumBid}`})
      }else{
        let data={
          bidAmount:bidAmt,
          bidderId:decoded?.id,
          artworkId:art?.id
        }
        instance.post('/Bid', data,  {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        .then((res)=>{
          console.log(res)
          if(res?.status===200){
            setSuccess("Bid Added Successfully!")
        }
        setFormData({bidAmount:""})
        setFormErrors({})
        setError("")
        setLoading(false)
        }).catch((err)=>{
          setLoading(false)
                setError("Something went wrong")
                setSuccess("")
                setLoading(false)
                console.log(err)
        })
      }
      setTimeout(()=>{
        setSuccess("")
        setError("")
    },[2000])
    }

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
            <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to bid on this art?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <SuccessMessage message = {success}  className="my-2"/>
                        <ErrorMessage message = {error}  className="my-2"/>


            <form>
            <Input
                        type="number"
                        id="bidAmount"
                        name="bidAmount"
                        label={false}
                        placeholder="Enter the amount you want to bid"
                        className="mt-0 w-75 mx-auto"
                        onChange={onChange}
                        value={formData?.bidAmount  }
                    />

  {
                            formErrors?.bidAmount && <ErrorMessage message={formErrors?.bidAmount }/>
                        }
            </form>
          </div>
          <div class="modal-footer">
            {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn border-dark" onClick={(e)=>onSubmit(e)}>Done</button> */}
            {/* <Button  text="Cancel" color="secondary" textColor="white" onClick={()=>navigate('/browse-arts')} className="me-3" /> */}
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

<Button text="Bid" color="black" textColor="white"       disabled={loading}               onClick={onSubmit}   
/>
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