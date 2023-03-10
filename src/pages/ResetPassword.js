// import { Field } from "formik";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../component/Footer";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import http from "../helpers/http";
import  Eye from "../assets/logo/eye.svg";
import  EyeOff from "../assets/logo/eye-off.svg";

YupPassword(Yup); // extend yup
const resetSchema = Yup.object().shape({
  code: Yup.string().required("Required"),
  newPassword: Yup.string()
    .required("Required")
    .min(6)
    .minUppercase(1)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1),

  confirmPassword: Yup.string()
    .required("Required")
    .min(6)
    .minUppercase(1)
    .minLowercase(1)
    .minNumbers(1)
    .minSymbols(1),
});

const ResetPassword = () => {
  const [message, setMessage] = useState("");

  const { state } = useLocation();

  const doReset = async (value) => {
    try {
      const form = new URLSearchParams({
        email: state.email,
        code: value.code,
        newPassword: value.newPassword,
        confirmNewPassword: value.confirmPassword,
      });
      const { data } = await http().post("/auth/reset-password", form);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const showPassword = (fieldId, eyeId , eyeoffId) =>{
    const field = document.getElementById(fieldId)
    const eye = document.getElementById(eyeId)
    const eyeoff = document.getElementById(eyeoffId)
    if(field.type === 'password'){
      eye.classList.add("hidden")
      eyeoff.classList.remove("hidden")
      field.type = 'text'
    }else{
      eye.classList.remove("hidden")
      eyeoff.classList.add("hidden")
      field.type = 'password'
    }
  }

  return (
    <div>
      <main className="relative">
        <img
          className="absolute z-[-1] w-[100%] min-h-[120vh] h-[100%]"
          src={require("../assets/images/pic.png")}
          alt=""
        />
        <div className="px-[10%] py-[10%] w-full flex flex-col justify-center items-center gap-5">
          <div className="text-white text-center mb-[40px]">
            <h2 className="text-[35px] font-bold">Reset your password ?</h2>
            <p className="text-[20px]">
              Enter your code that you have received
            </p>
            {message.includes("Password has been updated") ? (
              <div className="text-center mt-10">
                <p className="text-base font-semibold text-green-500 text-center">
                  {message}
                </p>
                <Link to="/login">
                  <h1 className="text-base font-semibold text-green-500">
                    Please relogin, click here!
                  </h1>
                </Link>
              </div>
            ) : (
              <div className="text-center mt-10 mr-40">
                <p className="text-base font-semibold text-red-500 text-center">
                  {message}
                </p>
              </div>
            )}
          </div>
          <Formik
            initialValues={{
              code: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={resetSchema}
            onSubmit={(value) => doReset(value)}
          >
            {({ errors, touched, dirty }) => (
              <Form>
                <div className="flex justify-center w-full">
                  <div className="w-[25rem]">
                    <label className="text-white font-semibold">
                      Code Confirm :{" "}
                    </label>
                    <Field
                      type="text"
                      name="code"
                      placeholder="Enter your code"
                      className="input focus:outline-white bg-white border-[#4F5665] mt-2 w-full rounded-2xl "
                    />
                    {errors.code && touched.code && (
                      <label className="label">
                        <span className="label-text-alt text-red-500 text-center">
                          {errors.code}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-[25rem]">
                    <label className="text-white font-semibold">
                      New Password :{" "}
                    </label>
                    <div className="relative">
                  <div className="absolute right-5 top-[45%]" onClick={() => showPassword("newPassword",'Show1',
                    'Hidden1')}>
                    <img src={Eye} alt='' id="Show1" className=" cursor-pointer w-[20px]"/>
                    <img src={EyeOff} alt='' id="Hidden1" className="hidden cursor-pointer w-[20px]"/>
                    </div>
                    <Field
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="Enter your new password"
                      className="input focus:outline-white bg-white border-[#4F5665] mt-2 w-full rounded-2xl "
                    />
                    </div>
                    {errors.newPassword && touched.newPassword && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.newPassword}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex justify-center w-full">
                  <div className="w-[25rem]">
                    <label className="text-white font-semibold">
                      Cofirm Password :{" "}
                    </label>
                    <div className="relative">
                  <div className="absolute right-5 top-[45%]" onClick={() => showPassword("confirmPassword",'Show2',
                    'Hidden2')}>
                    <img src={Eye} alt='' id="Show2" className=" cursor-pointer w-[20px]"/>
                    <img src={EyeOff} alt='' id="Hidden2" className="hidden cursor-pointer w-[20px]"/>
                    </div>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Enter your confirm password"
                      className="input focus:outline-white bg-white border-[#4F5665] mt-2 w-full rounded-2xl "
                    />
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.confirmPassword}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!dirty}
                  className="btn btn-accent btn-block mt-[50px]"
                >
                  Reset
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
