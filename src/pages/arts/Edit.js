import React from 'react'
import Container from '../../components/Layout/Container'
import SectionHeader from '../../components/common/SectionHeader'
import Input from '../../components/common/Input'
import TextArea from '../../components/common/TextArea'
import Button from '../../components/common/Button'

const Edit = () => {
  return (
    <>
        <Container>
        <div className='row'>
                <div className='col-lg-6 col-md-8 col-sm-12 mx-auto'>   
                    <SectionHeader label="Edit your Art Details" className={"pb-4"}/>
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

                            <div className='btn-group my-2  '>

                                <Button text="Cancel" color="secondary" textColor="white"/>

                                <Button text="Edit" color="black" textColor="white" className="ms-2"/>
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