import React, { useEffect, useState } from 'react'
import Container from '../components/Layout/Container'
import SectionHeader from '../components/common/SectionHeader'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'

const ArtDetail = () => {
    
    let art = 
        {
            image:  "https://previews.123rf.com/images/alfazetchronicles/alfazetchronicles2306/alfazetchronicles230626692/207297608-abstract-colorful-projection-on-a-wall-created-with-generative-ai.jpg",
            name:"Modern Art",
            category:"mordern",
            author:"Mary Sue",
            price:2000,
            live:true,
            startFrom:"2023-11-22T12:09",
            endTo:"2023-11-22T12:25"
        }

    const [tempBidState, setTempBidSTate] = useState("")
    const [bidState, setBidState] = useState(art?.live)
    const [soldStatus, setSoldStatus] = useState(false)
    let startDateTime = art?.startFrom;
    let endDateTime = art?.endTo;

    useEffect(() => {
        console.log("bidState", bidState)
        // if(bidState===false){
        if(art?.live===false){
        const updateInterval = calculateUpdateInterval();
        console.log("time interval", updateInterval)

        const intervalId = setInterval(() => {
            const currentDateTime = new Date();
            const startDateTimeObj = new Date(startDateTime);
            const endDateTimeObj = new Date(endDateTime);

      
            // Calculate the update interval based on the time difference

            const isWithinTimeFrame = currentDateTime >= startDateTimeObj && currentDateTime <= endDateTimeObj;

            console.log("timeframe", isWithinTimeFrame)
            // Change the button color based on whether the current date and time are within the specified time frame
            setBidState(isWithinTimeFrame ? true : false);
            setTempBidSTate(isWithinTimeFrame ? true : false)
        }, updateInterval); // Update every second
    

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }else{
        const intervalId = setInterval(() => {
        const currentDateTime = new Date();
        const endDateTimeObj = new Date(endDateTime);

        const isWithinTimeFrame = currentDateTime <= endDateTimeObj;
        setBidState(isWithinTimeFrame ? true : false);
    }, 1000); 
    return () => clearInterval(intervalId);

    }
    // }
        }, [startDateTime, endDateTime]);

        const calculateUpdateInterval = () => {
            const currentDateTime = new Date();
            const startDateTimeObj = new Date(startDateTime);
            const endDateTimeObj = new Date(endDateTime);
            // Calculate the time difference in milliseconds
            const timeDifference = Math.abs(currentDateTime - startDateTimeObj);

        
            // Set a base interval of 1000 milliseconds (1 second)
            // Increase the interval as the time difference increases
            // The maximum interval is set to 60000 milliseconds (60 seconds) for practicality
            const updateInterval = Math.min(1000 + timeDifference, 60000);
            // let updateInterval = Math.max(1000, Math.min(timeDifference, 60000));

        
            return updateInterval;
          };


        
  return (
    
    <>
        <Container>
            <div className='row'>
                <div className='col-lg-4'>
                <div className='art-image'>
                    <img src={art?.image} className='' style={{width: "100%", height:"100%", display: "block", padding:"7px"}}/>
                </div>
                </div>

                <div className='col-lg-8'>
                    {
                        bidState?<span className='liveBtn live py-2 px-4 rounded-pill text-white fw-8'>Live</span>:<span className='liveBtn offline p-2 rounded-pill text-white fw-8'>Offline</span>
                    }
                    <h3 className='mt-3'>{art?.name}</h3>
                    <p><span className=' fw-bold fw-9'>By: </span>{art?.author}</p>
                    <p><span className=' fw-bold fw-9'>Categories: </span>{art?.category}</p>
                    <p><span className=' fw-bold fw-9'>Min Bid Price: </span>${art?.price}</p>
                    <p><span className=' fw-bold fw-9'>Live from: </span>{art?.startFrom}:{art?.endTo}</p>

                    
                    <Modal bidState={bidState}/>
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