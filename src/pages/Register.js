import React from 'react'
import Input from '../components/common/Input'
import LinkButton from '../components/common/LinkButton'
import Button from '../components/common/Button'
import Radio from '../components/common/Radio'

const Register = () => {
  return (
    <>
        <div className='form-register'>
            <div className='container'>
            <div className='form-container w-50 m-auto mt-4 pt-4 border border-1 p-4 rounded-3'>
            <h4 className='mb-4'>Register</h4>
            <form>
                <Input 
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    placeholder="Enter your Username"
                />

                <Input 
                    type="text"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your Email"
                />

                <Input 
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                />

                <>
                <label class="form-label text-muted mb-0">Register As</label>
                  <div className='d-flex justify-content-start'>
                  <Radio name="user" label="Buyer"/> 
                  <Radio name="user" label="Seller" className="ms-2"/>
                 </div>
                </>
                
                <Button 
                    text="Register" type="main" className="mt-4"
                    color="black"
                    textColor="white"
                    
                />

            </form>

            <div className='login-footer text-start  pt-3 border-top mt-4 justify-content-center align-items-center'>
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
    </>
  )
}

export default Register