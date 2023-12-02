import React from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import LinkButton from '../components/common/LinkButton'

const Login = () => {
  return (
    <>
        <div className='container mt-4'>
            <div className='form-container w-50 m-auto mt-4 pt-4 border border-1 p-4 rounded-3'>
            <h4 className='mb-4'>Login</h4>
            <form>
                <Input 
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    placeholder="Enter your Username"
                />

                <Input 
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                />

                <Button 
                    text="Login" type="main" className="mt-2" color="black" textColor="white"
                />

            </form>

            <div className='login-footer text-start  pt-3 border-top mt-4 justify-content-center align-items-center'>
                <span className='d-block mb-3'>Don't have an account yet?</span>
                <LinkButton 
                 color="black" textColor="white"
                    text="Sign up with us" type="main" className="mt-2" link="/register"
                />
                {/* <a className=" bg-black text-white border-black p-2 text-decoration-none ">Sign up with us</a> */}
            </div>
            </div>
           
        </div>
    </>
  )
}

export default Login