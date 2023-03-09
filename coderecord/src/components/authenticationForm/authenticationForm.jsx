import {React } from "react";
import {useState} from "react";
import "./authenticationForm.scss";
import "../../assets/styles/common.scss";
import PrimaryButton from "../primaryButton/primaryButton";
import CloseButton from "../closeButton/closeButton";
import miniLogo from "../../assets/images/logo_mini.png";

const formStates = {
    SIGN_UP: "SIGN_UP",
    SIGN_IN: "SIGN_IN",
    OTP: "OTP",
}

function getSignUpFields() {
  return (
    <div>
      <div className="cr-display-flex cr-space-between">
        <input className="input" type="text" placeholder="First Name" />
        <input className="input" type="text" placeholder="Second Name" />
      </div>
      <input
        className="input cr-margin-top-24"
        type="email"
        placeholder="Email"
      />
      <input
        className="input cr-margin-top-24"
        type="password"
        placeholder="Password"
      />
    </div>
  );
}

function getSignInFields() {
  return (
    <div>
      <input
        className="input cr-big cr-margin-top-24"
        type="email"
        placeholder="Email"
      />
      <input
        className="input cr-big cr-margin-top-24"
        type="password"
        placeholder="Password"
      />
    </div>
  );
}

function getOTPFields(userEmail = '') {
  return (
    <div>
      <div className="cr-text-align-center">
        <p>
          One Time Password has been sent to your email, <b>{userEmail}</b>,
          please enter the same here to login.
        </p>
        <p> Valid for 10 minutes.</p>
        <input
          className="input cr-big cr-margin-top-24 cr-margin-auto"
          type="text"
          placeholder="Enter OTP"
        />
      </div>
    </div>
  );
}

function getForm(formState) {
  switch (formState) {
    case formStates.SIGN_UP:
      return getSignUpFields();
    case formStates.SIGN_IN:
      return getSignInFields();
    case formStates.OTP:
      return getOTPFields();
    default:
      return getSignInFields();
  }
}

function primaryBtnClickHandler(formState, setFormState) {
    if (formState === formStates.SIGN_IN) {
        //TODO: Call API to verify user
    } else if (formState === formStates.SIGN_UP) {
        setFormState(formStates.OTP);
    } else if (formState === formStates.OTP) {
        //TODO: Call API to verify OTP
    }
}

export default function AuthenticationForm({currentFormState, closeModalFn}) {
//   const userEmail = "dashjv@gmai.com";
 
  const [formState, setFormState] = useState(currentFormState || formStates.SIGN_UP);
  function primaryBtnClickHandlerWrapper() {
    primaryBtnClickHandler(formState, setFormState);
  }
  // eslint-disable-next-line no-func-assign
  primaryBtnClickHandlerWrapper = primaryBtnClickHandlerWrapper.bind(this);
  return (
    <div className="backdrop">
      <div className="authentication-form">
        <div>
          <div className="form-header">
            <div>Sign Up</div>
            <CloseButton clickHandlerCB={closeModalFn} ></CloseButton>
          </div>
          <div>
            <img className="watermark" src={miniLogo} alt="" />
          </div>
          <div className="input-field-wrappers">
            {formState === formStates.OTP ? getOTPFields() : ''}
            {formState === formStates.SIGN_IN ? getSignInFields() : ''}
            {formState === formStates.SIGN_UP ? getSignUpFields() : ''}
            <div className="cr-margin-top-24">
              <PrimaryButton btnText="Continue" clickHandlerCB={primaryBtnClickHandlerWrapper} ></PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
