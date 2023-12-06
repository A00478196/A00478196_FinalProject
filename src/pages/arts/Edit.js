import React, { useEffect, useState } from 'react'
import Container from '../../components/Layout/Container'
import SectionHeader from '../../components/common/SectionHeader'
import Input from '../../components/common/Input'
import TextArea from '../../components/common/TextArea'
import Button from '../../components/common/Button'
import { useLocation, useNavigate } from 'react-router'
import instance from '../../components/auth/axiosConfig'
import SuccessMessage from '../../components/common/SuccessMessage'
import ErrorMessage from '../../components/common/ErrorMessage'
import { generalForm } from '../../helpers/validate'
import { token } from '../../helpers/token'
import { returnTimeOut } from '../../helpers/common'

const Edit = () => {
    const [art, setArt] = useState({})
    const location = useLocation();
    
    const artId = location.state;

    useEffect(()=>{
        instance.get(`/Artwork/${artId}`)
        .then((res)=>{
            // setSuccess(true)
            if(res?.status===200){
                setArt(res?.data)
               console.log(res)
            }
          
            
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },[artId])

    console.log(art)

    const [formErrors, setFormErrors] = useState({})
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")


    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        id:0,
        title:"",
        description:"",
        minimumBid:0,
        imageUrl:"https://www.shutterstock.com/shutterstock/photos/2060087966/display_1500/stock-photo-abstract-contemporary-art-collage-portrait-of-young-woman-with-flowers-on-face-hides-her-eyes-2060087966.jpg",
        "categoryId": 1
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
        fData["title"] = art?.title
        fData["id"] = art?.id
        fData["description"] = art?.description
        fData["minimumBid"] = art?.minimumBid
        fData["categoryId"] = art?.categoryId
    
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
      },[art])


      const onSubmit = (e) =>{
        e.preventDefault()

        setLoading(true)

        if(generalForm(formData, setFormErrors)){
            instance.put('/Artwork', formData, {
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then((res)=>{
                if(res?.status===200){
                    setSuccess("Art Edited Successfully!")
                }
                setFormData({})
                setFormErrors({})
                setLoading(false)
                setError("")
                console.log(res)
            }).catch((err)=>{
                setError("Something went wrong")
                setSuccess("")

                console.log(err)
            })
        }else{
            setLoading(false)
        }
        returnTimeOut(setError, setSuccess)

    }
  
    const navigate = useNavigate()
  return (
    <>
        <Container>
        <div className='row'>
                <div className='col-lg-6 col-md-8 col-sm-12 mx-auto'>   
                    <SectionHeader label="Edit your Art Details" className={"pb-4"}/>
                    <div className='mt-2'>
                        <ErrorMessage message={error}/>
                        <form className='border py-3 px-3 rounded'>
                        <SuccessMessage message = {success}  className="my-2"/>

                            <Input
                                type="text"
                                id="title"
                                name="title"
                                label={false}
                                placeholder="Enter the art title"
                                value={formData?.title}
                                onChange={onChange}

                            />
                             {
                            formErrors?.title && <ErrorMessage message={formErrors?.title } className="mb-2"/>
                            }
                            <Input
                                type="number"
                                id="minimumBid"
                                name="minimumBid"
                                value={formData?.minimumBid}
                                label={false}
                                placeholder="Enter the mininum bid price"
                                onChange={onChange}

                            />

{
                            formErrors?.minimumBid && <ErrorMessage message={formErrors?.minimumBid } className="mb-2"/>
                        }
                            <TextArea placeholder='Enter the Art Desription' value={formData?.description} name='description' onChange={onChange}/>
                            {
                            formErrors?.description && <ErrorMessage message={formErrors?.description } className="mb-2"/>
                        }


{/* 
                            <Input 
                                type="file"
                                name="Art"
                            /> */}

                            <div className='btn-group my-2  '>

                                <Button text="Cancel" color="secondary" textColor="white" onClick={()=>{navigate('/arts/view')}}/>

                                <Button text="Edit" color="black" textColor="white" className="ms-2" onClick={onSubmit} disabled={loading}/>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
        </Container>
    </>
  )
}

export default Edit