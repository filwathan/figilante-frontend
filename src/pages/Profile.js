import React from "react";
import Footer from "../component/Footer";
import NavCust from "../component/NavCust";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { profileAction } from "../redux/action/profile";
import { logout } from "../redux/reducers/auth";
import http from "../helpers/http";

const EditProfileSchema = Yup.object().shape({
  nickName: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

const Profile = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [isError, setIsError] = React.useState(false);
  const [uploadAlert, setUploadAlert] = React.useState("");

  const handleSubmit = async (values) => {
    try {
      await http(token).patch(`${process.env.REACT_APP_URL_BACKEND}/profile`, {
        ...values,
      });
      dispatch(profileAction());
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const uploadImage = async (event) => {
    // file size limit 2MB
    if (event.target.files[0].size > 2000000) {
      setUploadAlert("File size is too big!");
      return;
    }
    // file type limit
    if (
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      setUploadAlert("File type is not supported!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("picture", event.target.files[0]);
      await http(token).patch(
        `${process.env.REACT_APP_URL_BACKEND}/profile`,
        formData
      );
      dispatch(profileAction());
      setUploadAlert("Upload success!");
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setUploadAlert("Upload failed!");
    }
  };

  return (
    <>
      <NavCust />
      <main className="relative">
        <img
          className="absolute z-[-1] w-[100%] h-[100%]"
          src={require("../assets/images/bg-coffee.jpg")}
          alt=""
        />
        <div className="px-[10%] py-[5%]">
          <div>
            <h3 className="text-white text-[30px] font-bold font-sans mb-[20px]">
              User Profile
            </h3>
            <Formik
              enableReinitialize={true}
              initialValues={{
                nickName: user?.nickName || "",
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                address: user?.address || "",
                datebirth: moment(user?.datebirth) || moment(),
                gender: user?.gender || "",
              }}
              validationSchema={EditProfileSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched, dirty }) => (
                <Form>
                  <section className="flex gap-5 mb-[30px]">
                    <div className="border-b-[10px] border-[#e9d8a6] w-[30%] bg-white rounded-[8px] p-5 text-center">
                      {user?.picture ? (
                        <img
                          src={process.env.REACT_APP_IMG_URL + user?.picture}
                          alt="ProfilePicture"
                          className="w-[100px] h-[100px] rounded-full mx-auto mb-2 object-cover"
                        />
                      ) : (
                        <img
                          src={require("../assets/images/avatar.png")}
                          alt="ProfilePicture"
                          className="w-[100px] h-[100px] rounded-full mx-auto mb-2 object-cover"
                        />
                      )}
                      <input
                        type="file"
                        className="file-input w-full max-w-xs"
                        name="picture"
                        onChange={(event) => uploadImage(event)}
                      />
                      {uploadAlert && (
                        <div className="label w-full justify-center">
                          <span className="label-text-alt text-center text-red-500">
                            {uploadAlert}
                          </span>
                        </div>
                      )}
                      <h4 className="text-[20px] font-bold">
                        {user?.nickName}
                      </h4>
                      <p className="text-[13px] mb-[30px]">{user?.email}</p>
                      <span className="text-[18px]">Never Ordered</span>
                    </div>
                    <div className="border-b-[10px] border-[#e9d8a6] w-[70%] bg-white rounded-[8px] p-5">
                      <h3 className="text-[25px] text-[#4F5665] font-bold tracking-[1px]">
                        Contacts
                      </h3>
                      <main className="grid grid-cols-2 mt-[30px]">
                        <div className="mb-[30px]">
                          <span className="text-[18px] text-[#aeaeae] font-semibold block mb-2">
                            Email address :
                          </span>
                          <Field
                            type="email"
                            name="email"
                            className="w-[90%] outline-none border-b-[1px] border-black text-[18px] font-semibold"
                          />
                          {errors.email && touched.email && (
                            <label className="label">
                              <span className="label-text-alt text-red-500">
                                {errors.email}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="mb-[30px]">
                          <span className="text-[18px] text-[#aeaeae] font-semibold block mb-2">
                            Mobile Number :
                          </span>
                          <Field
                            type="number"
                            name="phoneNumber"
                            className="w-[90%] outline-none border-b-[1px] border-black text-[18px] font-semibold"
                          />
                          {errors.phoneNumber && touched.phoneNumber && (
                            <label className="label">
                              <span className="label-text-alt text-red-500">
                                {errors.phoneNumber}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="mb-[30px]">
                          <span className="text-[18px] text-[#aeaeae] font-semibold block mb-2">
                            Delivery address :
                          </span>
                          <Field
                            type="text"
                            name="address"
                            rows="1"
                            cols="5"
                            className="w-[90%] outline-none border-b-[1px] border-black text-[18px] font-semibold"
                          />
                          {errors.address && touched.address && (
                            <label className="label">
                              <span className="label-text-alt text-red-500">
                                {errors.address}
                              </span>
                            </label>
                          )}
                        </div>
                      </main>
                    </div>
                  </section>
                  <section className="flex gap-5">
                    <div className="border-b-[10px] border-[#e9d8a6] w-[70%] bg-white rounded-[8px] p-5">
                      <h3 className="text-[25px] text-[#4F5665] font-bold tracking-[1px]">
                        Details
                      </h3>
                      <main className="flex mt-[30px]">
                        <section className="w-[60%]">
                          <div className="mb-[30px]">
                            <span className="text-[18px] text-[#aeaeae] font-semibold block mb-2">
                              Display Name :
                            </span>
                            <Field
                              type="text"
                              name="nickName"
                              className="w-[90%] outline-none border-b-[1px] border-black text-[18px] font-semibold"
                            />
                            {errors.nickName && touched.nickName && (
                              <label className="label">
                                <span className="label-text-alt text-red-500">
                                  {errors.nickName}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="mb-[30px]">
                            <span className="text-[18px] text-[#aeaeae] font-semibold block mb-2">
                              First Name :
                            </span>
                            <Field
                              type="text"
                              name="firstName"
                              className="w-[90%] outline-none border-b-[1px] border-black text-[18px] font-semibold"
                            />
                            {errors.firstName && touched.firstName && (
                              <label className="label">
                                <span className="label-text-alt text-red-500">
                                  {errors.firstName}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="mb-[30px]">
                            <span className="text-[18px] text-[#aeaeae] font-semibold block mb-2">
                              Last Name:
                            </span>
                            <Field
                              type="text"
                              name="lastName"
                              className="w-[90%] outline-none border-b-[1px] border-black text-[18px] font-semibold"
                            />
                            {errors.lastName && touched.lastName && (
                              <label className="label">
                                <span className="label-text-alt text-red-500">
                                  {errors.lastName}
                                </span>
                              </label>
                            )}
                          </div>
                        </section>
                        <section className="w-[40%]">
                          <div className="mb-[30px]">
                            <span className="text-[18px] text-[#aeaeae] font-semibold block mb-2">
                              Date of Birth:
                            </span>
                            <Field
                              type="date"
                              name="birthdate"
                              className="w-[90%] outline-none border-b-[1px] border-black text-[18px] font-semibold"
                            />
                            {errors.datebirth && touched.datebirth && (
                              <label className="label">
                                <span className="label-text-alt text-red-500">
                                  {errors.datebirth}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="w-[50%]">
                            <div className="flex items-center">
                              <label className="label cursor-pointer">
                                <Field
                                  type="radio"
                                  name="gender"
                                  className="radio checked:bg-[#8b5e34]"
                                  value="Male"
                                />
                                <span className="label-text text-[18px] ml-[20px] text-[#8b5e34] font-semibold">
                                  Male
                                </span>
                              </label>
                            </div>
                            <div className="flex items-center">
                              <label className="label cursor-pointer">
                                <Field
                                  type="radio"
                                  name="gender"
                                  className="radio checked:bg-[#8b5e34]"
                                  value="Female"
                                />
                                <span className="label-text text-[18px] ml-[20px] text-[#8b5e34] font-semibold">
                                  Female
                                </span>
                              </label>
                            </div>
                            {errors.gender && touched.gender && (
                              <label className="label">
                                <span className="label-text-alt text-red-500">
                                  {errors.gender}
                                </span>
                              </label>
                            )}
                          </div>
                        </section>
                      </main>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-5">
                      <h3 className="font-bold text-white text-[20px] text-center">
                        Do you want to save the change?
                      </h3>
                      {isError && (
                        <label className="label">
                          <span className="label-text-alt text-red-500">
                            Update Profile Failed!!!
                          </span>
                        </label>
                      )}
                      <button
                        type="submit"
                        className="btn btn-block btn-accent"
                        disabled={!dirty}
                      >
                        Save Change
                      </button>
                      <button
                        className="btn btn-block btn-warning"
                        type="reset"
                      >
                        Cancel
                      </button>
                      <div className="flex-1" />
                      <label className="btn btn-block flex justify-start">
                        Edit Password
                      </label>
                      <button
                        type="button"
                        className="btn btn-block btn-error flex justify-start"
                        onClick={() => dispatch(logout())}
                      >
                        Log out
                      </button>
                    </div>
                  </section>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
