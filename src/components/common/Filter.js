import React, { useEffect, useState } from 'react'
import Checkbox from './Checkbox'
import Button from './Button'
import SectionHeader from './SectionHeader'

const Filter = ({list, setFilteredList}) => {
    const [categories, setCategories] = useState([])
    const [catValue, setCatValue] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([{}])
    const [filterParams, setFilterParams] = useState(
      {
          category:[],
          price:"",
          live:false
      }
  )

    useEffect(()=>{
      let temp = list?.map((art, index)=>{
       
       return  art?.category
      })

    const uniqueCat = [...new Set(temp)];
    setCategories(uniqueCat)
    },[list])

    const onCategoryChange = (e) =>{
      const {name, checked} = e?.target
      // setFilterParams(filterParams=>({...filterParams,
      //   category:[...filterParams?.category, {name:name, value:checked}]
      // }))

      setSelectedCategories(selectedCategories=>[...selectedCategories, {name:name, value:checked}])
      setFilterParams(filterParams=>({...filterParams, category:selectedCategories}))
      // console.log(selectedCategories)
      //  setFilterParams(selectedCategories?.map((cat,index)=>{
      //     return cat?.value!==false
      //   }))
      // setFilterParams(filterParams=>({...filterParams,
      //   category:([...filterParams?.category, {name:name, value:checked}])
      // }))
      // console.log(e?.target?.checked)
    }

    const activetFilter = () =>{
        // setFilterParams(filterParams?.category?.map((cat,index)=>{
        //   return cat?.value!==false
        // }))

        // console.log(filterParams)
    }

  return (
    <>
        <div className='filter-category'>
          <SectionHeader label="Category: "/>
            {
              categories?.length>0 && categories?.map((cat, index)=>{
                return (
                  <Checkbox 
                  name={cat}
                  label={cat}
                  onChange={onCategoryChange}
                  />
                )
              })
            }
        </div>

        <div className='filter-price mt-4'>
        <SectionHeader label="Price: "/>

        <Checkbox 
                  name={"Lowest_to_Highest"}
                  label={"Lowest to Highest"}
                 
                  />

          {/* <Checkbox 
                  name={"highest_to_lowest"}
                  label={"Highest to Lowest"}
                  /> */}
        </div>

        <div className='filter-live mt-4'>
        <SectionHeader label="Live: "/>
          <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"  />
              <label class="form-check-label" for="flexSwitchCheckChecked">Live</label>
            </div>
          </div>

        <Button text="Filter" color="black" textColor="white" className="mt-4 align-self-center" onClick={activetFilter}/>
    </>
  )
}

export default Filter