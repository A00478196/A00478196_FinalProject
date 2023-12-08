import React, { useEffect, useState } from "react";
import Container from "../components/Layout/Container";
import instance from "../components/auth/axiosConfig";
import { decoded, token } from "../helpers/token";
import LinkButton from "../components/common/LinkButton";
import { useNavigate } from "react-router-dom";
import EmptyMessage from "../components/common/EmptyMessage";
import SectionHeader from "../components/common/SectionHeader";

const BidDetails = () => {
  const [bidList, setBidList] = useState([{}]);
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    instance
      .post(
        "/Bid/filter",
        {
          bidderId: decoded?.id,
          // artworkId:1,
          // successful: "false",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);

        // console.log(res);
        setBidList(res?.data);
        // getArt(res?.data)
      })
      .catch((err) => {
        setLoading(false);

        console.log(err); 
      });
  }, []);

  const getArt = (id) => {
    // console.log(bidList);
    let returnMsg = "";
    if (bidList) {
      instance
        .get(`/Artwork/${id}`)
        .then((res) => {
          console.log(res);
          setArt(art=>([...art, {bidId:id, title: res?.data?.title}]));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return art;
  };

  useEffect(()=>{
      bidList?.map((bid, index)=>{
        return getArt(bid?.artworkId)
      })
  },[bidList])

  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-12">
            <SectionHeader
              label={"All the bids you've made"}
              className={"text-center"}
            />
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
                {loading ? (
                  <tr className="border">
                    <div class="d-flex justify-content-center ">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </tr>
                ) : bidList?.length > 0 ? (
                  bidList?.map((bid, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{art[index]?.title}</td>
                          {/* <td>{bid?.art}</td> */}
                          <td>{bid?.bidAmount}</td>
                          <td>
                            {bid?.successful === "true" ? (
                              <div>
                                <p>Congratulations! You've won the bid</p>
                              </div>
                            ) : (
                              "Waiting for the decision!"
                            )}
                          </td>
                          <td>
                            {bid?.successful === "true" && (
                              <p
                                style={{
                                  width: "fit-content",
                                  cursor: "pointer",
                                }}
                                className="text-underline bg-black text-white p-2 rounded"
                                onClick={() =>
                                  navigate("/payment-details", { state: bid })
                                }
                              >
                                Proceed to Payment
                              </p>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <tr className="border text-center w-100 ">
                    <EmptyMessage title="bids" className="w-100" />
                    <a
                      href="/browse-arts "
                      className="text-decoration-underline p-0 text-primary c-pointer pe-2"
                    >
                      Browse our Arts
                    </a>{" "}
                     to make your bid!
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BidDetails;
