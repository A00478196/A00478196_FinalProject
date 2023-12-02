import React from 'react'
import Container from '../../components/Layout/Container'
import SectionHeader from '../../components/common/SectionHeader'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import TextArea from '../../components/common/TextArea'
import LinkButton from '../../components/common/LinkButton'
import bg1 from "../../assets/art-bg-1.jpg"

const Create = () => {
  return (
    <>
        <div className='container-fluid p-0'>
            
            <div className='row'>
                <div className='col-lg-6 col-md-8 col-sm-12 p-5 pb-0'>   
                    <SectionHeader label="Upload your Art" className={"pb-4"}/>
                    <div className='mt-2'>
                        <form className='border py-3 px-3 rounded'>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                label={false}
                                placeholder="Enter the art name"
                            />
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                label={false}
                                placeholder="Enter the mininum bid price"
                            />

                            <TextArea placeholder='Enter the Art Desription' name='description'/>
                            {/* <textarea className='form-control' ></textarea> */}
                            <div className='my-3'>
                            <label class="form-label text-muted mb-0 text-capitalize">Choose the date your art goes live</label>

                            <Input type="datetime-local"  name="start_date" className="mt-0"/>
                            </div>

                            <div>
                           
                            <label class="form-label text-muted mb-0 text-capitalize">Choose the date your art stops going live</label>
                            <Input type="datetime-local"  name="end_date"  className="mt-0" />
                            </div>


                            <Input 
                            type="file"
                            
                            name="Art"
                            />
                            <Button text="Upload" color="black" textColor="white"/>
                        </form>
                    </div>
                </div>

                <div className='col-lg-6 col-md-4 display-sm-none'>
                    <div className='bg-image '>
                        <img src={bg1} className='w-100'/>
                        <div className='btns'>
                            <div className='text'>
                            <h5 className='fw-bold'>Confused?</h5>
                            <span className='text-muted'>Check these for inspirations.</span>
                            </div>
                         
                        <LinkButton text="Browse All Arts" type="main" className="mt-4" color="white" textColor="black" link={"/browse-arts"}/>
                        <LinkButton text="Check your own Arts" type="main" className="mt-4 ms-3" color="white" textColor="black" link={"/arts/view"}/>

                    </div>
                        
                    </div>
                  
                </div>
            </div>
        </div>
    </>
  )
}

export default Create