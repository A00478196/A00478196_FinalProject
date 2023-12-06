import React, { useEffect, useState } from 'react'
import Checkbox from './Checkbox'
import Button from './Button'
import SectionHeader from './SectionHeader'
import instance from '../auth/axiosConfig'
import { token } from '../../helpers/token'
import EmptyMessage from './EmptyMessage'

const Filter = ({list, setFilteredList}) => {
    const [categories, setCategories] = useState([])
    const [catValue, setCatValue] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedStatus, setSelectedStatus] = useState(0)
    const [filterParams, setFilterParams] = useState(
      {
          category:[],
          price:"",
          live:false
      }
  )
  

  useEffect(()=>{
      // setLoading(true)
      instance.get('/Category', {
          headers:{
              "Authorization":`Bearer ${token}`
          }
      }).then((res)=>{
          if(res?.status===200){
              res?.data && setCategories(res?.data)
              // setLoading(false)
          }
          console.log(res)
      }).catch((err)=>{
          // setLoading(false)
          console.log(err)
      })
  },[])

    // useEffect(()=>{
    //   let temp = list?.map((art, index)=>{
       
    //    return  art?.category
    //   })

    // const uniqueCat = [...new Set(temp)];
    // setCategories(uniqueCat)
    // },[list])

    const onCategoryChange = (e) =>{
      const {name, checked} = e?.target
      let catId = name && parseInt(name)
      if (selectedCategories.includes(catId)) {
        // If selected, remove it from the array
        setSelectedCategories((prevSelected) =>
          prevSelected.filter((checkboxValue) => checkboxValue !== catId)
        );
      } else {
        // If not selected, add it to the array
        setSelectedCategories((prevSelected) => [...prevSelected, catId]);
      }
      // setSelectedCategories(([...selectedCategories, name && parseInt(name)]))
      // setFilterParams(filterParams=>({...filterParams,
      //   category:[...filterParams?.category, {name:name, value:checked}]
      // }))

      // setSelectedCategories(selectedCategories=>[...selectedCategories, {name:name, value:checked}])
      // setFilterParams(filterParams=>({...filterParams, category:selectedCategories}))
      // console.log(selectedCategories)
      //  setFilterParams(selectedCategories?.map((cat,index)=>{
      //     return cat?.value!==false
      //   }))
      // setFilterParams(filterParams=>({...filterParams,
      //   category:([...filterParams?.category, {name:name, value:checked}])
      // }))
      // console.log(e?.target?.checked)
    }

    console.log(selectedCategories)
        const activateFilter = () =>{
          instance.post('/Artwork/filter', {
            categoryIds:selectedCategories,
            status:selectedStatus
            
        }, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then((res)=>{
            // setSuccess(true)
            if(res?.status===200){
              console.log(res)
              setFilteredList(res?.data)
                // setAllArts(res?.data)
              console.log(res)
            }
          
            
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
        // setFilterParams(filterParams?.category?.map((cat,index)=>{
        //   return cat?.value!==false
        // }))

        // console.log(filterParams)
    }

    const statusChange = (e) =>{
      console.log(e.target.checked)
      e.target.checked?setSelectedStatus(1):setSelectedStatus(0)
    }

  return (
    <>
        <div className='filter-category'>
          <SectionHeader label="Category: "/>
            {
              categories?.length>0 ? categories?.map((cat, index)=>{
                return (
                  <Checkbox 
                  name={cat?.id}
                  label={cat?.title}
                  onChange={onCategoryChange}
                  />
                )
              })
              :
              <EmptyMessage title="categories"/>
            }
        </div>

       

        <div className='filter-live mt-4'>
        <SectionHeader label="Live: "/>
          <div class="form-check form-switch" onChange={statusChange}>
              <input class="form-check-input" name={"status"} type="checkbox" role="switch" id="flexSwitchCheckChecked"  />
              <label class="form-check-label" for="flexSwitchCheckChecked">Live</label>
            </div>
          </div>

        <Button text="Filter" color="black" textColor="white" className="mt-4 align-self-center" onClick={activateFilter}/>
    </>
  )
}

export default Filter