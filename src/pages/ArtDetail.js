import React, { useEffect, useState } from "react";
import Container from "../components/Layout/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { useLocation } from "react-router";
import instance from "../components/auth/axiosConfig";
import { token } from "../helpers/token";
import LinkButton from "../components/common/LinkButton";

const ArtDetail = () => {
  const [art, setArt] = useState({});
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
    if (art) {
      console.log(art);
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

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-7 text-center">
            <div className="art-image mt-4 mb-4">
              {art?.imageUrl && (
                <img
                  src={art?.imageUrl}
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
              <span className=" fw-bold fw-9 text-muted mb-2">{art?.description || "--"}</span>
              
            <p className="mt-4">
              <span className=" fw-bold fw-9">Category: </span>
              {cat || "--"}
            </p>
            <p>
              <span className=" fw-bold fw-9">Minimum Bid Price: </span>$
              {art?.minimumBid || "--"}
            </p>
            <p>
              <span className=" fw-bold fw-9">Auction Status: </span>
              {art?.live === "false" ? "Not Started Yet" : "Live"}
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
        </div>
      </Container>
    </>
  );
};

export default ArtDetail;
