import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import instance from '../../components/auth/axiosConfig';
import { decoded, token } from '../../helpers/token';
import Button from '../../components/common/Button'
import { generalForm } from '../../helpers/validate'
import ErrorMessage from '../../components/common/ErrorMessage'
import SuccessMessage from '../../components/common/SuccessMessage'
import Container from '../../components/Layout/Container';
import Input from '../../components/common/Input';
import { returnTimeOut } from '../../helpers/common';

const Edit = () => {

    const navigate = useNavigate();

    const location = useLocation();
    
  const data = location.state;

  console.log(data)


    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")


    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false)


    const [formData, setFormData] = useState({
        title:"",
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

  useEffect(()=>{
    let fData = {...formData}
    fData["title"] = data?.title
    fData["id"] = data?.id

    setFormData(fData)
    // if(data!==""){
    //     instance.get(`/Category/${data}`, {
    //         headers:{
    //             "Authorization":`Bearer ${token}`
    //         }
    //     }).then((res)=>{
    //         if(res?.status===200){
    //             res?.data && setCategory(res?.data)

    //         }
    //         console.log(res)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }
  },[data])

  const onSubmit = (e) =>{
    e.preventDefault();
    setLoading(true)

    if(generalForm(formData, setFormErrors)){
        instance.put(`/Category`, formData, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then((res)=>{
            if(res?.status===200){
                setSuccess("Category edited Successfully!")
            }
            setFormData({})
            setFormErrors({})
            setLoading(false)
            console.log(res)
        }).catch((err)=>{
            setLoading(false)
            setError("Something went wrong!")
            console.log(err)
        })
    }
    returnTimeOut(setError, setSuccess)

  }

  return (
    <>
            <Container>
            <div className='row'>
            <div className='row form-register mb-4'>
            <div className='col-lg-6 col-md-8 col-sm-12 mx-auto'>
            <div className='form-container mt-4 pt-4 border border-1 p-4 rounded-3'>
                <SuccessMessage message = {success}  className="mb-2"/>
                <ErrorMessage message = {error}  className="mb-2"/>

            <h4 className='mb-4 title'>Edit Category</h4>
            <form >
                <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Category Title"
                    onChange={onChange}
                    value={formData?.title||""}
                />
                {
                            formErrors?.title && <ErrorMessage message={formErrors?.title } className="mb-2"/>
                        }

                <div className='my-4'>
                <Button text="Cancel" color="secondary" textColor="white" onClick={()=>navigate('/category')}  className="me-3" />

                <Button text="Edit" color="black" textColor="white" onClick={onSubmit}  disabled={loading}  />

                </div>

            </form>
            </div>

            </div>
            </div>
            </div>
        </Container> 
    </>
  )
}

export default Edit