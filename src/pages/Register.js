import React, { useEffect, useState } from 'react'
import Input from '../components/common/Input'
import LinkButton from '../components/common/LinkButton'
import Button from '../components/common/Button'
import Radio from '../components/common/Radio'
import Container from "../components/Layout/Container"
import { Country, State, City} from 'country-state-city';
import ReactSelect from '../components/common/ReactSelect'
import {validateForm} from '../helpers/validate'
import axios from 'axios'
import ErrorMessage from '../components/common/ErrorMessage'
import instance from '../components/auth/axiosConfig'
import { useNavigate } from "react-router-dom";
import AlertMessage from '../components/common/AlertMessage'



const Register = () => {
    const navigate = useNavigate();

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
    const [data, setData] = useState({
        countries:[],
        states:[],
        cities:[],
        country:'',
        state:'',
        city:'',
        
    })
    useEffect(()=>{
        let allCountries = Country.getAllCountries();

        // { value: 'chocolate', label: 'Chocolate' },
        let options = []

        allCountries?.length>0 &&
            allCountries?.map((country, index)=>{
            options.push({value:country?.isoCode, label:country?.name})
            })

        options && options?.length>0 && setData(data=>({...data, countries:options}))
    },[])

    const onCountryChange = (val) =>{
        if(val!=="")
        setData(data=>({...data, country:val?.value, states:[], cities:[]}))
        setFormData(formData=>({...formData, country:val?.value}))

        setFormErrors(formErrors=>({...formErrors, country:""}))

    }
    const onStateChange = (val) =>{
        if(val!=="")
        setData(data=>({...data, state:val?.value, cities:[]}))
        setFormData(formData=>({...formData, province:val?.value}))
        setFormErrors(formErrors=>({...formErrors, state:""}))

    }
    const onCityChange = (val) =>{
        if(val!=="")
        setData(data=>({...data, city:val?.value}))
        setFormData(formData=>({...formData, city:val?.value}))
        setFormErrors(formErrors=>({...formErrors, city:""}))

    }
    
    

    useEffect(()=>{
        let allStates = State.getStatesOfCountry(data?.country)       

         let options = []

         allStates?.length>0 &&
         allStates?.map((state, index)=>{
            options.push({value:state?.isoCode, label:state?.name})
            })

        options && options?.length>0 && setData(data=>({...data, states:options}))

    }, [data?.country])

    
    useEffect(()=>{
        let allCities = City.getCitiesOfState(data?.country, data?.state)       
        let options = []

         allCities?.length>0 &&
         allCities?.map((city, index)=>{
            options.push({value:city?.name, label:city?.name})
        })

        options && options?.length>0 && setData(data=>({...data, cities:options}))

    }, [data?.state])
   
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
        console.log(validateForm(formData, setFormErrors))
        if(validateForm(formData, setFormErrors)){
            console.log(formData)

            instance.post('/User', formData)
            .then((res)=>{
                setSuccess(true)
                setTimeout(()=>{
                    navigate('/login')
 
                },[2000])
                console.log(res)
            }).catch((err)=>{
                console.log(err?.response?.data?.title)
            })
        }else{
            console.log("Error")
        }
        
    }
  return (
    <Container>
        <div className='row form-register mb-4'>
            <div className='col-lg-6 col-md-8 col-sm-12 mx-auto'>
                {
                    success && 

                    <AlertMessage message="User Created Sucessfully!"/>
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
               
                <div className='row'>
                <div className='col-lg-12'>
                <ReactSelect 
                    options={data?.countries}
                    onChange={onCountryChange}
                    name="country"

                />
                 {
                            formErrors?.country && <ErrorMessage message={formErrors?.country }/>
                        }
                </div>
                </div>

                
              
                <div className='row'>
                    <div className='col-lg-6'>
                    <ReactSelect 
                    options={data?.states}
                    onChange={onStateChange}
                    name="state"

                />
                 {
                            formErrors?.state && <ErrorMessage message={formErrors?.state }/>
                        }
                    </div>
                    <div className='col-lg-6'>
                    <ReactSelect 
                    options={data?.cities}
                    onChange={onCityChange}
                    name="city"

                />
                 {
                            formErrors?.city && <ErrorMessage message={formErrors?.city }/>
                        }
                    </div>
                </div>
               
                <div className='row'>
                <div className='col-lg-6'>
                        
                    <Input 
                    
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    label="Postal Code"
                    placeholder="B3k 2P1"
                    onChange={onChange}
                    

                />
                 {
                            formErrors?.postalCode && <ErrorMessage message={formErrors?.postalCode }/>
                        }

           
                </div>
                </div>
              

                <div className='text-center'>
                <Button 
                    text="Register" type="main" className="mt-4 text-center"
                    color="black"
                    textColor="white"
                    onClick={onSubmit}   
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