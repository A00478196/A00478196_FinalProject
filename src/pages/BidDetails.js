import React, { useEffect, useState } from "react";
import Container from "../components/Layout/Container";
import instance from "../components/auth/axiosConfig";
import { decoded, token } from "../helpers/token";
import LinkButton from "../components/common/LinkButton";
import { useNavigate } from "react-router-dom";

const BidDetails = () => {
  const [bidList, setBidList] = useState([{}]);
  const [data, setData] = useState({})

  useEffect(()=>{
    instance.post('/Bid/filter', {
      bidderId:decoded?.id,
      // artworkId:1,
      successful:"false"
    }, {
      headers:{
        "Authorization":`Bearer ${token}`
    }
    })
    .then((res)=>{
      console.log(res)
      setBidList(res?.data)
    }).catch((err)=>{
      console.log(err)
    })
    
    
  },[])

  const navigate = useNavigate()
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <table class="table table-bordered mt-2 fw-9">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Art</th>
                  <th scope="col">Bid Price</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  bidList?.map((bid, index)=>{
                    return(
                      <>
                      <tr>
                        <td>{index+1}</td>
                      <td>art 1</td>
                        {/* <td>{bid?.art}</td> */}
                        <td>{bid?.bidAmount}</td>
                        <td>{bid?.successful==="false"?<div>
                          <p>Congratulations! You've won the bid</p>
                          <p className="text-underline" onClick={()=>navigate('/payment-details', {state:bid})}>Proceed to Payment</p>
                        </div>:'Waiting for the decision!'}</td>
                      </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BidDetails;
