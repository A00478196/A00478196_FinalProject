import React, { useEffect, useState } from 'react'
import Input from '../components/common/Input'
import LinkButton from '../components/common/LinkButton'
import Button from '../components/common/Button'
import Radio from '../components/common/Radio'
import Container from "../components/Layout/Container"

import {validateForm} from '../helpers/validate'
import axios from 'axios'
import ErrorMessage from '../components/common/ErrorMessage'
import instance from '../components/auth/axiosConfig'
import { useNavigate } from "react-router-dom";
import AlertMessage from '../components/common/AlertMessage'
import { returnTimeOut } from '../helpers/common'
import Address from '../components/common/Address'



const Register = () => {
    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        username:"",
        email:"",
        password:"",
        mobile:"",
        country:'',
        province:'',
        city:'',
        postalCode:"",
        gender:"",
        birthDate: "2023-12-03T03:37:01.281Z",
        profilePictureUrl: "string",

    })

   
    const onChange = (e) => {
        let {name, value} = e?.target

        console.log(value)

        let data = {...formData}
        let errors = {...formErrors}

        data[name] = value
        errors[name] = ""


        setFormData(data)
        setFormErrors(errors)
    }

    const onSubmit = (e) =>{

        e.preventDefault()
        setLoading(true)

        console.log(validateForm(formData, setFormErrors))
        if(validateForm(formData, setFormErrors)){
            console.log(formData)

            instance.post('/User', formData)
            .then((res)=>{
                setSuccess(true)
                setLoading(false)

                setTimeout(()=>{
                    navigate('/login')
 
                },[2000])
                console.log(res)
            }).catch((err)=>{
                setLoading(false)

                console.log(err?.response?.data?.title)
            })
        }else{
            console.log("Error")
            setLoading(false)
        }

        returnTimeOut(setError, setSuccess)
    }
  return (
    <Container>
        <div className='row form-register mb-4'>
            <div className='col-lg-6 col-md-8 col-sm-12 mx-auto'>
                {
                    success && 

                    <AlertMessage message="User Created Sucessfully!"/>
                }

                {
                    error && <ErrorMessage message = {error}  className="my-2"/>
                }
            <div className='form-container mt-4 pt-4 border border-1 p-4 rounded-3'>
            <h4 className='mb-4 text-center title'>Register</h4>
            <form >
               <div className='row'>
                    <div className='col-lg-6'>
                        <Input 
                            type="text"
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            placeholder="John"
                            onChange={onChange}
                        />
                        {
                            formErrors?.firstName && <ErrorMessage message={formErrors?.firstName }/>
                        }
                    </div>

                    <div className='col-lg-6'>
                        <Input 
                        type="text"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        placeholder=" Doe"
                        onChange={onChange}

                    />
                     {
                            formErrors?.lastName && <ErrorMessage message={formErrors?.lastName }/>
                    }

                    </div>

                </div>    

                <div className='row'>
                    <div className='col-lg-6'>
                        <Input 
                        type="text"
                        id="username"
                        name="username"
                        label="Username"
                        placeholder="john.doe"
                        onChange={onChange}

                    />

{
                            formErrors?.username && <ErrorMessage message={formErrors?.username }/>
                        }
                    </div>

                    <div className='col-lg-6'>
                        <Input 
                        type="text"
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="john.doe@gmail.com"
                        onChange={onChange}

                    />
                     {
                            formErrors?.email && <ErrorMessage message={formErrors?.email }/>
                        }

                    </div>
                </div>    

                 <div className='row'>
                    <div className='col-lg-6'>
                            
                        <Input 
                        
                        type="text"
                        name="mobile"
                        id="mobile"
                        label="Mobile"
                        placeholder="7297743478"
                        onChange={onChange}

                    />
                     {
                            formErrors?.mobile && <ErrorMessage message={formErrors?.mobile }/>
                        }
                    </div>   

                    <div className='col-lg-6'>
                            
                        
                        <Input 
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                            placeholder="Password"
                            onChange={onChange}

                        />
 {
                            formErrors?.password && <ErrorMessage message={formErrors?.password }/>
                        }
                    </div>   
                </div>    


                <div className='row my-2'>
                <div className='col-lg-12'>
                <label  class="form-label text-muted mb-0 text-capitalize fw-bold me-3">Gender</label>

                    <Radio onChange={onChange} name="gender" value="male" label="Male" className="form-check-inline"/>
                    <Radio onChange={onChange} name="gender" value="female" label="Female"  className="form-check-inline"/>
                </div>
                <div className='col-lg-12'>
                    
                    </div>
                    </div>
               
                        <Address 
                            formData={formData}
                            setFormData={setFormData}
                            formErrors={formErrors}
                            setFormErrors={setFormErrors}
                            onChange={onChange}
                        
                        />

                <div className='text-center'>
                <Button 
                    text="Register" type="main" className="mt-4 text-center"
                    color="black"
                    textColor="white"
                    onClick={onSubmit}   
                    disabled={loading}
                />

                </div>
               
            </form>

            <div className='login-footer text-center  pt-3 border-top mt-4 justify-content-center align-items-center'>
                <span className='d-block mb-3'>Already have an account yet?</span>
                <LinkButton 
                    text="Login" type="main" className="mt-2" link="/login"
                    color="black" textColor="white"
                />
                {/* <a className=" bg-black text-white border-black p-2 text-decoration-none ">Sign up with us</a> */}
            </div>
            </div>
           
        </div>
        </div>
    </Container>
  )
}

export default Register