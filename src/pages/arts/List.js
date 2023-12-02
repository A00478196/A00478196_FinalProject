import React, { useState } from 'react'
import Container from '../../components/Layout/Container'
import SectionHeader from '../../components/common/SectionHeader'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import LinkButton from '../../components/common/LinkButton';
import { FaCirclePlus } from "react-icons/fa6";




const List = () => {
    const navigate = useNavigate();
    const [allArts, setAllArts] = useState([
        {
            
            image:  "https://previews.123rf.com/images/alfazetchronicles/alfazetchronicles2306/alfazetchronicles230626692/207297608-abstract-colorful-projection-on-a-wall-created-with-generative-ai.jpg",
            name:"Modern Art",
            category:"mordern",
            author:"Mary Sue",
            price:"",
            status:"sold",
            desc:"this is a sample description",
            date:"2023-11027"
        },
        {
            image:  "https://previews.123rf.com/images/julianpetersphotography/julianpetersphotography1611/julianpetersphotography161100097/65909520-bogota-colombia-on-december-15-2015-collage-of-street-art-by-various-artists-including-toximano.jpg",
            name:"Graffiti",
            category:"modern",
            author:"Bob Jack",
            price:"",
            status:"live",
            desc:"this is a sample description"

        }
    ])
  return (
<>
    <Container>
        <div className='d-flex justify-content-between align-items-center mb-2'>
            {/* <h6>Arts you've Created</h6> */}
        <SectionHeader label={"All the arts you've created"} className={"align-self-center"}/>
        <LinkButton text={`Create`} icon={<FaCirclePlus />} type="main" color="black" textColor="white" link={"/arts/create"}/>

        </div>
        <div className='row'>
            <div className='col-lg-12'>
                <div class="table-responsive">

            <table class="table table-bordered mt-2 fw-9">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Art</th>
                    <th scope="col">Description</th>
                    <th scope="col">Uploaded Date</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        allArts?.map((art, index)=>{
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{art?.name}</td>
                                    <td><img src={art?.image} className='img-thumbnail' width={120} height={120}/></td>
                                    <td>{art?.desc || "--"}</td>
                                    <td>{art?.date || "--"}</td>
                                    <td>{art?.status}</td>
                                    <td>
                                    <div class="btn-group dropend">
                                    <p  class="pe-auto" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BsThreeDotsVertical />

                                    </p>
                                    <ul class="dropdown-menu p-2 fw-9 pe-auto">
                                        <li className='' onClick={()=>navigate('/arts/edit')}><FaEdit />  <span>Edit</span> </li>
                                        <li className=''  data-bs-toggle="modal" data-bs-target="#deleteModal"><MdDelete /> <span>Delete</span></li>
                                    </ul>
                                    </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
            </div>
        </div>

        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="exampleModalLabel">Are you sure you want to delete this art?</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Yes</button>
                </div>
                </div>
            </div>
        </div>
    </Container>
</>
  )
}

export default List