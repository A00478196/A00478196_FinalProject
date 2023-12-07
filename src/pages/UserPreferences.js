import React, { useState } from 'react'
import SectionHeader from '../components/common/SectionHeader'
import Container from '../components/Layout/Container'
import Button from '../components/common/Button'
import instance from '../components/auth/axiosConfig'
import { decoded, token } from '../helpers/token'
import SuccessMessage from '../components/common/SuccessMessage'

const UserPreferences = () => {
    const [defaultCat, setDefaultCat] = useState(["Music", "Sculpture", "Painting", "Architecture","Conceptual", ])
 
    const [selectedItems, setSelectedItems] = useState([])
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")


    const handleSelection = (text) => {
        const isSelected = selectedItems.includes(text);
    const updatedSelection = isSelected
      ? selectedItems.filter((item) => item !== text)
      : [...selectedItems, text];

      setSelectedItems(updatedSelection);
      };

      const isItemSelected = (text) => selectedItems.includes(text);

      const textStyle = (text) => ({
        background: isItemSelected(text) ? '#F5CA5A' : '#efefef',
        cursor: 'pointer',
        
      });

      console.log(decoded)
      const onSubmit = (e) =>{
        e.preventDefault();
        selectedItems?.map((cat, index)=>{
            instance.post('/UserPreference', {
                categoryId:index,
                userId:decoded?.id
            }, {
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then((res)=>{
                setSuccess("Category Added Successfully")
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        })
      }

    return (
    <>
        <Container>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 form-container p-3 mx-auto'> 
                        {/* <SectionHeader label={"Set your Preference"}/> */}
                        <SuccessMessage />
                        <h5>Set your preferences</h5>
                        <p className='fw-9'>Set your preferred categories, author, art style to never miss them</p>
                        <div className='my-4 d-flex flex-wrap justify-content-between align-items-center'>
                            {
                                defaultCat?.length>0 && defaultCat?.map((cat, index)=>{
                                    return <>
                                        <p  style={textStyle(cat)} className='cat rounded py-2 px-4 fw-8 fw-bold' onClick={()=>handleSelection(cat)}>{cat}</p>
                                    </>
                                })
                            }
                        </div>
                        <Button text="Save" color="black" textColor="white" onClick = {onSubmit}/>
                </div>
            </div>
        </Container>
    </>
  )
}

export default UserPreferences