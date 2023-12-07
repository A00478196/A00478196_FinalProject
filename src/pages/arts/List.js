import React, { useEffect, useState } from 'react'
import Container from '../../components/Layout/Container'
import SectionHeader from '../../components/common/SectionHeader'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import LinkButton from '../../components/common/LinkButton';
import { FaCirclePlus } from "react-icons/fa6";
import instance from '../../components/auth/axiosConfig';
import { decoded, token } from '../../helpers/token';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button from '../../components/common/Button';
import SuccessMessage from '../../components/common/SuccessMessage';
import { returnTimeOut } from '../../helpers/common';




const List = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const [success, setSuccess] = useState("")
    const [allArts, setAllArts] = useState([ ])
    const [error, setError] = useState("")

    useEffect(()=>{
        setLoading(true)

        instance.post('/Artwork/filter', {
            sellerId:decoded?.id,
            
        }, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then((res)=>{
            setLoading(false)

            // setSuccess(true)
            if(res?.status===200){
                setAllArts(res?.data)
                
               console.log(res)
            }
          
            console.log(res)
        }).catch((err)=>{
            setLoading(false)
            setSuccess("")
            setError("Something went wrong")
            console.log(err)
        })
    },[])

    const [auctionStarted, setAuctionStarted] = useState({id:0, auctionStarted:false})
    const [auctionStopped, setAuctionStopped] = useState(false)

    const startAuction = (id) =>{
        console.log(id)
        instance.get(`/Artwork/startAuction/${id}`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res)
            setSuccess("You Art is live now! People can bid on it!")
                setError("")
            // setAuctionStarted(true)
            setAuctionStarted({id:id, auctionStarted:true})

        }).catch((err)=>{
            console.log(err)
        })

        returnTimeOut(setError, setSuccess)

    }

    const stopAuction = (id) =>{
        instance.get(`/Artwork/stopAuction/${id}`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res)
            setSuccess("People can no longer bid on your art.")
            setError("")
            setAuctionStopped({id:id, auctionStopped:true})
        }).catch((err)=>{
            console.log(err)
            setSuccess("")
            setError("Something went wrong")
        })

        setTimeout(()=>{
            setSuccess("")
            setError("")

        },[3000])
    }

    console.log(auctionStarted)
  return (
<>
    <Container>
        <div className='d-flex justify-content-between align-items-center mb-2'>
            {/* <h6>Arts you've Created</h6> */}
        <SectionHeader label={"All the arts you've created"} className={"align-self-center"}/>
        <LinkButton text={`Create`} icon={<FaCirclePlus />} type="main" color="black" textColor="white" link={"/arts/create"}/>

        </div>
        <ErrorMessage message={error}/>
        <SuccessMessage message={success}/>
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12'>
                <div class="table-responsive">

            <table class="table table-bordered mt-2 fw-9">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Art</th>
                    <th scope="col">Description</th>
                    <th scope="col">Uploaded Date</th>
                    {/* <td scope="col">Live</td> */}
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                <tr>
            {loading&&
            <div class="d-flex justify-content-center ">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
}
            </tr>
                    {
                        allArts?.map((art, index)=>{
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{art?.title}</td>
                                    <td><img src={art?.imageUrl} className='img-thumbnail' width={120} height={120}/></td>
                                    <td>{art?.description || "--"}</td>
                                    <td>{new Date(art?.createdOn).toLocaleString() || "--"}</td>
                                    {/* <td>{art?.live === "true"?'Live':'Inactive'}</td> */}
                                    <td>{art?.status!=="" && art?.status?.toLowerCase()==='draft'?'Visible':art?.status==='Active'?'Available':'Sold'}</td>
                                    <td className='d-flex flex-column justify-content-between'>
                                        {/* <Button color="success" className="my-2 rounded" textColor="white" text="Start Auction" disabled={auctionStarted} onClick={()=>startAuction(art?.id)} /> */}
                                        {/* <Button color="danger" textColor="white" text="Stop Auction" disabled={auctionStarted} onClick={()=>stopAuction(art?.id)} /> */}
                                        <button disabled={art?.status==='Active'?(auctionStarted?.id===art?.id?true:false):false} className='btn bg-success text-white p-2 my-2' onClick={()=>startAuction(art?.id)}>Start Auction</button>

                                        <button className='btn bg-danger text-white p-2' onClick={()=>stopAuction(art?.id)}>Stop Auction</button>
                                    </td>
                                    <td>
                                    <div class="btn-group dropend">
                                    <p  class="pe-auto" data-bs-toggle="dropdown" aria-expanded="false">
                                    <BsThreeDotsVertical />
                                    </p>
                                    <ul class="dropdown-menu p-2 fw-9 pe-auto">
                                        <li className='' onClick={()=>navigate('/arts/edit', {state:art?.id})}><FaEdit />  <span>Edit</span> </li>
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