import React, { useEffect, useState } from 'react'
import Container from '../components/Layout/Container'
import SectionHeader from '../components/common/SectionHeader'
import visa from "../assets/visa.jpg"
import mastercard from "../assets/mastercard.png"
import amex from "../assets/amex.png"
import Input from '../components/common/Input'
import Button from '../components/common/Button'


const PaymentDetails = () => {

    const [cardType, setCardType] = useState("")
    const [errorMsg, setErrorMsg] = useState({
        numberError:"",
        dateError:"",
        cvvError:""
    })
    const [cardDetails, setCardDetails] = useState("")
    const [pattern, setPattern] = useState([
        {
            card:"mastercard",
            prefix:[51,52,53,54,55],
            length:16
        },
        {
            card:"visa",
            prefix:[4],
            length:16
        },
        {
            card:"amex",
            prefix:[34,37],
            length:15
        }
    ])
    
    useEffect(()=>{
        if(cardType!==""){

        }
    },[cardType])

    const validateExpirationDate = (expirationMonth, expirationYear) => {
        console.log(expirationMonth)
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // January is 0
    
        if (expirationYear > currentYear) {
            return true;
        } else if (expirationYear === currentYear && expirationMonth >= currentMonth) {
            return true;
        }
    
        return false;
    }

    const validateCVV = (cvv) => {
        const cvvPattern = /^[0-9]{3,4}$/;
        return cvvPattern.test(cvv);
    }
    
    const validateCardNumber=(cardNumber) =>{
        let sum = 0;
        let isEven = false;

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i), 10);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        console.log(cardNumber?.length)
        detectCardType(cardNumber);
        return sum % 10 === 0
    }

    function detectCardType(cardNumber) {
        const patterns = {
            visa: /^4[0-9]{15}$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
        };
    
        for (const type in patterns) {
            if (patterns[type].test(cardNumber)) {
                console.log(cardNumber)

                return type;
            }
        }
    
        return "Unknown";
    }

    const onNumberChange = (e) =>{
        
        if (!validateCardNumber(e.target.value)) {
            setErrorMsg(errorMsg=>({...errorMsg, numberError:"Invalid card number"}))

        } else {
            setErrorMsg(errorMsg=>({...errorMsg, numberError:""}))
        }
    }

    const onDateChange = (e) =>{
        console.log(e?.target?.value)
        const dateExpression = new RegExp("^([0-9]{4})\-?(0[1-9]|1[0-2])$");
        
        if (dateExpression.test(e.target.value)) {
            setErrorMsg(errorMsg=>({...errorMsg, dateError:""}))
            let data = e.target.value.split("-");
            let expirationMonth = data[1];
            let expirationYear = data[0];
            // Validate expiration date
            if (!validateExpirationDate(expirationMonth, expirationYear)) {
                setErrorMsg(errorMsg=>({...errorMsg, dateError:"Card has expired. You cannot use this card"}))

                // setErrorMsg("Card has expired. You cannot use this card")
                
            } else {
                setErrorMsg(errorMsg=>({...errorMsg, dateError:""}))

            }
        } else {
            setErrorMsg(errorMsg=>({...errorMsg, dateError:""}))

        }
    }

    const onCvvChange = (e) =>{
        if (!validateCVV(e.target.value)) {
            setErrorMsg(errorMsg=>({...errorMsg, cvvError:"Invalid CVV"}))

        }else{
            setErrorMsg(errorMsg=>({...errorMsg, cvvError:""}))

        }
    }
  return (
    <>
        <Container>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className='header text-center'>
                        <h5>Want to Bid on a Art?</h5>
                        <p>You need to add your payment details before that.</p>
                    </div>
                   
                    {/* <SectionHeader c/> */}
                    <form className='border p-3 rounded'>
                        <div className='d-flex justify-content-between border-bottom'>
                            <div>
                                <p className='fw-9 fw-bold mb-0 d-block'>Supported cards</p>
                                <div class="d-flex align-items-center cardImages">
                                    <img src={visa} alt="Visa"  onClick={()=>setCardType("visa")}/>
                                    <img src={mastercard} alt="Mastercard " className='px-2' onClick={()=>setCardType("mastercard")} />
                                    <img src={amex} alt="American Express"  onClick={()=>setCardType("amex")}/>
                                
                                </div>
                            </div>
                            <div className='w-100 border-start ps-3'>
                                <p className='fw-9 fw-bold mb-0'>Selected card</p>
                                <div class="">

                                {
                                    cardType==="visa"?
                                    <img src={visa} alt="Visa" width={50}/>
                                    :
                                    cardType==="mastercard"?
                                    <img src={mastercard} alt="Mastercard" width={50} />
                                    : cardType==="amex"?
                                    <img src={amex} alt="American Express" width={40}/>
                                    :
                                    "None"
                                
                                }
                                </div>
                            </div>

                        </div>
                        

                        <div className='pt-2'>
                            <label for="card_number" class="form-label fw-bold mb-0">Card Number</label>
                            <Input 
                                type="text"
                                name="card_number"
                                id="card_numeber"
                                placeholder="0000 0000 0000 0000"
                                className="mt-0"
                                onChange={onNumberChange}
                                disabled={cardType===""?true:false}
                            />
                            {
                                errorMsg?.numberError &&  <p>{errorMsg?.numberError}</p>
                            }
                           
                        </div>

                        <div>
                            <label for="expiry_date" class="form-label fw-bold mb-0">Expiry Date</label>
                            <Input 
                                type="month"
                                name="expiry_date"
                                id="expiry_date"
                                placeholder="MM/YY"
                                className="mt-0"
                                onChange={onDateChange}
                                disabled={cardType===""?true:false}
                            />
                             {
                                errorMsg?.dateError &&  <p>{errorMsg?.dateError}</p>
                            }
                        </div>

                        <div>
                            <label for="cvv" class="form-label fw-bold mb-0">CVC/CVV</label>
                            <Input 
                                type="text"
                                name="cvv"
                                id="cvv"
                                placeholder="0000"
                                className="mt-0"
                                onChange={onCvvChange}
                                disabled={cardType===""?true:false}
                            />
                             {
                                errorMsg?.cvvError &&  <p>{errorMsg?.cvvError}</p>
                            }
                        </div>

                        <Button text="Save" color="black" textColor="white" />
                    </form>
                </div>
            </div>
        </Container>
    </>
  )
}

export default PaymentDetails   