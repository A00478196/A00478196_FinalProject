import React, { useEffect, useState } from 'react'
import Container from '../components/Layout/Container'
import SectionHeader from '../components/common/SectionHeader'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import { useLocation } from 'react-router'
import instance from '../components/auth/axiosConfig'

const ArtDetail = () => {

    const [art, setArt] = useState({})


    const [tempBidState, setTempBidSTate] = useState("")
    const [bidState, setBidState] = useState(art?.live)
    const [soldStatus, setSoldStatus] = useState(false)
    let startDateTime = art?.startFrom;
    let endDateTime = art?.endTo;

    const location = useLocation()
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
    
  return (
    <>
        <Container>
            <div className='row'>
                <div className='col-lg-4'>
                <div className='art-image'>
                    <img src={art?.imageUrl} className='' style={{width: "100%", height:"100%", display: "block", padding:"7px"}}/>
                </div>
                </div>

                <div className='col-lg-8'>
                    {
                        bidState?<span className='liveBtn live py-2 px-4 rounded-pill text-white fw-8'>Live</span>:<span className='liveBtn offline p-2 rounded-pill text-white fw-8'>Offline</span>
                    }
                    <h3 className='mt-3'>{art?.title}</h3>
                    <p><span className=' fw-bold fw-9'></span>{art?.description}</p>
                    <p><span className=' fw-bold fw-9'>Category: </span>{art?.category}</p>
                    <p><span className=' fw-bold fw-9'>Min Bid Price: </span>${art?.minimumBid}</p>
                    <p><span className=' fw-bold fw-9'>Live Status: </span>{art?.live===false?'Not Yet':'Live'}</p>

                    <Modal bidState={!bidState} art={art}/>
                </div>
            </div>
            <div className='row mt-4'>
                {
                    soldStatus===false?
                <>
                    <SectionHeader label={"Details of Highest Bidder"} className={"ms-0 ps-0 pt-4 pb-3 fw-9 "}/>
                    <table class="table table-bordered table-sm fw-9">
                        <thead>
                            <tr className=''>
                            <th scope="col">#</th>
                            <th scope="col">Highest Bid Made By</th>
                            <th scope="col">Highest Bid Price</th>
                            <th scope="col">Bid Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>$4000</td>
                            <td>2023/11/26 6:38 PM</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </>
                    :
                    <>
                    <SectionHeader label={"Details of Buyer"} className={"ms-0 ps-0 pt-4 pb-3 fw-9 "}/>
                    <table class="table table-bordered table-sm fw-9">
                        <thead>
                            <tr className=''>
                            <th scope="col">#</th>
                            <th scope="col">Bought By</th>
                            <th scope="col"> Sold Price</th>
                            <th scope="col">Bough Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>$4000</td>
                            <td>2023/11/28 6:38 PM</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    </>
                }
            </div>
            
        </Container>
    </>
  )
}

export default ArtDetail