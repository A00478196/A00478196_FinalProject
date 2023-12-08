import React, { useEffect, useState } from "react";
import Container from "../components/Layout/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { useLocation } from "react-router";
import instance, { baseURL } from "../components/auth/axiosConfig";
import { decoded, token } from "../helpers/token";
import LinkButton from "../components/common/LinkButton";
import EmptyMessage from "../components/common/EmptyMessage";
import { FaEye } from "react-icons/fa";


const ArtDetail = () => {
  const [art, setArt] = useState({});
  const [personalBids, setPersonalBids] = useState([]);
  const [cat, setCat] = useState("");
  const [tempBidState, setTempBidSTate] = useState("");
  const [bidState, setBidState] = useState(art?.live);
  const [soldStatus, setSoldStatus] = useState(false);
  let startDateTime = art?.startFrom;
  let endDateTime = art?.endTo;

  const location = useLocation();
  const artId = location.state;

  useEffect(() => {
    instance
      .get(`/Artwork/${artId}`)
      .then((res) => {
        // setSuccess(true)
        if (res?.status === 200) {
          setArt(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [artId]);

  useEffect(() => {
    if (Object.keys(art).length !== 0) {
      instance
        .get(`/Category/${art?.categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res) {
            console.log(res);
            setCat(res?.data?.title);
            // setArt(art=>({...art, categoryId:res?.data?.tile}))
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [art]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("DEcoded", decoded?.id);
    console.log("art", art?.sellerId);
    if (Object?.keys(art)?.length !== 0) {
      if (decoded?.id === art?.sellerId) {
        setLoading(true);
        instance
          .post(
            "/Bid/filter",
            {
              // bidderId: decoded?.id,
              artworkId: art?.id,
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
            console.log(res);
            setPersonalBids(res?.data);
            // console.log(res);
            // setBidList(res?.data);
            // getArt(res?.data)
          })
          .catch((err) => {
            setLoading(false);

            console.log(err);
          });
      }
    }
  }, [art]);

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-7 text-center">
            <div className="art-image mt-4 mb-4">
              {art?.imageUrl && (
                <img
                  src={`${baseURL}/${art?.imageUrl}`}
                  className="mx-auto"
                  style={{
                    width: "80%",
                    height: "100%",
                    display: "block",
                    padding: "7px",
                  }}
                />
              )}
            </div>
          </div>

          <div className="col-lg-8 col-md-8 col-sm-5 mt-4">
            <h5 className="mt-3 ">{art?.title}</h5>
            <span className=" fw-bold fw-9 text-muted mb-2">
              {art?.description || "--"}
            </span>

            <p className="mt-4">
              <span className=" fw-bold fw-9">Category: </span>
              {art?.categoryName || "--"}
            </p>
            <p>
              <span className=" fw-bold fw-9">Minimum Bid Price: </span>$
              {art?.minimumBid || "--"}
            </p>

            <p>
              <span className=" fw-bold fw-9">Current Highest Bid: </span>$
              {art?.currentHighestBid || "--"}
            </p>
            <p>
              <span className=" fw-bold fw-9">Auction Status: </span>
              {
                art?.status==="Sold" ?
              
              <span class="badge rounded-pill bg-danger text-dark text-white">
                {" "}
                {art?.status}
              </span>

              :
              <span class="badge rounded-pill bg-warning text-dark">
              {" "}
              {art?.status}
            </span>
}
            </p>

            <Modal bidState={art?.live === "true"} art={art} />

            <div className="mt-4">
              <LinkButton
                text="Continue Browsing"
                color="black"
                textColor="white"
                link="/browse-arts"
              />
              <LinkButton
                className="ms-2"
                text="See Your Bids"
                color="black"
                textColor="white"
                link="/bid-details"
              />
            </div>
          </div>

          {art?.sellerId === decoded?.id && (
            <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
              <SectionHeader
                label={`Bids made on ${art?.title}`}
                className={"text-center"}
              />
              <table class="table table-sm table-bordered mt-2 fw-9">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Bid By</th>
                    <th scope="col">Bid Amount</th>
                    <th scope="col">Bid Made On</th>
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
                  ) : personalBids?.length > 0 ? (
                    personalBids?.map((bid, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{bid?.bidBy}</td>
                            <td>{bid?.bidAmount}</td>
                            <td>{bid?.createdOn && new Date(bid?.createdOn)?.toLocaleString()}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr className="border text-center w-100 ">
                      <EmptyMessage title="bids" className="w-100" />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ArtDetail;
