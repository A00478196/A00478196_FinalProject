import React, { useEffect, useState } from "react";
import Container from "../../components/Layout/Container";
import SectionHeader from "../../components/common/SectionHeader";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import TextArea from "../../components/common/TextArea";
import LinkButton from "../../components/common/LinkButton";
import bg1 from "../../assets/art-bg-1.jpg";
import { generalForm, validateForm } from "../../helpers/validate";
import instance from "../../components/auth/axiosConfig";
import ErrorMessage from "../../components/common/ErrorMessage";
import { decoded, token } from "../../helpers/token";
import ReactSelect from "react-select";
import SuccessMessage from "../../components/common/SuccessMessage";
import { useNavigate } from "react-router";
import FormHeader from "../../components/common/FormHeader";
import { returnTimeOut } from "../../helpers/common";

const Create = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minimumBid: 0,
    imageUrl:
      "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=600",
    sellerId: decoded?.id,
    categoryId: 1,
  });

  const onChange = (e) => {
    let { name, value } = e?.target;

    let data = { ...formData };
    let errors = { ...formErrors };

    data[name] = value;
    errors[name] = "";

    setFormData(data);
    setFormErrors(errors);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (generalForm(formData, setFormErrors)) {
      instance
        .post("/Artwork", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // setSuccess(true)
          setSuccess("Art uploaded Successfully!");

          setFormData({});
          setFormErrors({});
          setError("");
          setLoading(false);

          setTimeout(() => {
            navigate("/arts/view");
          }, [900]);
        })
        .catch((err) => {
          setLoading(false);
          setError(err?.response?.data);
          //   setError("Something went wrong");
          setSuccess("");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    returnTimeOut(setError, setSuccess);
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let options = [];

    instance
      .get("/Category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          console.log(res);
          res?.data?.length > 0 &&
            res?.data?.map((cat, index) => {
              options.push({ value: cat?.id, label: cat?.title });
            });

          options && options?.length > 0 && setCategories(options);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onCatChange = (val) => {
    let data = { ...formData };
    data["categoryId"] = val?.value;
    setFormData(data);
  };

  const onImageChange = () => {};

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row ">
          <div className="col-lg-6 col-md-8 col-sm-12 p-5 pb-0">
            {/* <SectionHeader label="Upload your Art" className={"pb-4"}/> */}
            <div className="mt-2 form-container p-4">
              <FormHeader message={"Upload your Art"} className="mb-2" />
              <form className="mt-2">
                <SuccessMessage message={success} className="my-2" />
                <ErrorMessage message={error} className="my-2" />

                <Input
                  type="text"
                  id="title"
                  name="title"
                  label={true}
                  placeholder="Enter the art title"
                  onChange={onChange}
                />
                {formErrors?.title && (
                  <ErrorMessage message={formErrors?.title} className="mb-2" />
                )}

                <Input
                  type="number"
                  id="minimumBid"
                  name="minimumBid"
                  label={true}
                  placeholder="Enter the mininum bid price"
                  onChange={onChange}
                />
                {formErrors?.minimumBid && (
                  <ErrorMessage
                    message={formErrors?.minimumBid}
                    className="mb-2"
                  />
                )}

                <label class="form-label text-muted mb-0 text-capitalize fw-bold">
                  Description
                </label>

                <TextArea
                  placeholder="Enter the Art Desription"
                  name="description"
                  onChange={onChange}
                />
                {formErrors?.description && (
                  <ErrorMessage
                    message={formErrors?.description}
                    className="mb-2"
                  />
                )}

                <label class="form-label text-muted mb-0 text-capitalize fw-bold mt-2">
                  Categories
                </label>

                <ReactSelect
                  options={categories}
                  onChange={onCatChange}
                  name="categoryId"
                />
                {/* <textarea className='form-control' ></textarea> */}
                {/* <div className='my-3'>
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
                            /> */}
                <div>
                  <Input
                    type="file"
                    name="Art"
                    accept="image/*"
                    onClick={onImageChange}
                  />
                </div>

                <div className="my-4">
                  <Button
                    text="Cancel"
                    color="secondary"
                    textColor="white"
                    onClick={() => navigate("/arts/view")}
                    className="me-3"
                  />

                  <Button
                    text="Upload"
                    color="black"
                    textColor="white"
                    disabled={loading}
                    onClick={onSubmit}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6 col-md-4 display-sm-none">
            <div className="bg-image ">
              <img src={bg1} className="w-100" />
              <div className="btns">
                <div className="text">
                  <h5 className="fw-bold">Confused?</h5>
                  <span className="text-muted">
                    Check these for inspirations.
                  </span>
                </div>

                <LinkButton
                  text="Browse All Arts"
                  type="main"
                  className="mt-4"
                  color="white"
                  textColor="black"
                  link={"/browse-arts"}
                />
                <LinkButton
                  text="Check your own Arts"
                  type="main"
                  className="mt-4 ms-3"
                  color="white"
                  textColor="black"
                  link={"/arts/view"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
