import React from 'react'
import Container from '../components/Layout/Container'
import paymentDone from  '../assets/payment-done.png'
import LinkButton from '../components/common/LinkButton'

const PaymentSuccessful = () => {
  return (
    <>
    <Container>
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12'>
                    <img 
                    src={paymentDone}
                    />

                    <LinkButton text="Browse More Arts" color="black" textColor="white" link="/browse-arts"/>
            </div>
        </div>
    </Container>
    </>
  )
}

export default PaymentSuccessful