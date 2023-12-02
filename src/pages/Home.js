import React, { useEffect } from 'react'
import LinkButton from '../components/common/LinkButton'
import shape1 from '../assets/blob.svg'
import shape3 from '../assets/blob-2.svg'

const Home = () => {
  // useEffect(()=>{
  //   fetch('/artwork/2')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error fetching data:', error));
  // },[])
  return (
    <>
      <div className='landingPage'>
        <div class="container-fluid text-center">
          <div class="row">
            <div class="col bg-white vh-100 text-start postion-relative overflow-hidden p-0">
              
              <div className='details'>
                <span className='text-left text-muted'>Come explore with us</span>
                <h1 className='main-heading'>
                  Art Gallery
                </h1>
                <div className='d-flex justify-content-between mt-4 pt-4'>
                  <div className='first'>
                    <span>BROWSE</span>
                        <p className='text-muted pt-1'>Browse The Art</p>
                  </div>
                  <div className='first'>
                    <span >BID</span>
                    <p className='text-muted  pt-1'>Bid on the Art</p>
                  </div>
                  <div className='first'>
                  <span >WIN</span>
                        <p className='text-muted pt-1'>Get The Art</p>
                  </div>
                </div>
                <LinkButton text="Browse Arts" type="main" className="mt-4" color="black" textColor="white" link={"/browse-arts"}/>
              </div>
              <div className='shape1'>
                <img src={shape1}/>
              </div>
            
            </div>
            <div class="col container-right  position-relative overflow-hidden p-0 ">
              <div className='shape2'></div>
              <div className='shape3'><img src={shape3}/></div>
              <div className='btns'>
                  <div className='text'>
                  <h5 className='fw-bold'>Inspired?</h5>
                  <span className='text-muted'>Want to create your own gallery?</span>
                  </div>
                
                  <LinkButton text="Upload your Art" type="main" className="mt-4" color="white" textColor="black" link={" /arts/create"}/>

                </div>
              
            </div>
          
          </div>
        </div>
      </div>
    </>
  )
}

export default Home