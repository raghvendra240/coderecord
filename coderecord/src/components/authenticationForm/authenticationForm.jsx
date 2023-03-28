import {React } from "react";
import {useState} from "react";
import "./authenticationForm.scss";
import "../../assets/styles/common.scss";
import PrimaryButton from "../primaryButton/primaryButton";
import CloseButton from "../closeButton/closeButton";
import miniLogo from "../../assets/images/logo_mini.png";
import '../../assets/styles/common.scss'

import {login} from "../../services/userService";

const formStates = {
    SIGN_UP: "SIGN_UP",
    SIGN_IN: "SIGN_IN",
    OTP: "OTP",
}

function getFormHeading(formState) {
  switch (formState) {
    case formStates.SIGN_UP:
      return "Sign Up";
    case formStates.SIGN_IN:
      return "Sign In";
    case formStates.OTP:
      return "Enter OTP";
    default:
      return "Sign In";
  }
}

function getButtonText(formState) {
  switch (formState) {
    case formStates.SIGN_UP:
      return "Continue";
    case formStates.SIGN_IN:
      return "Sign In";
    case formStates.OTP:
      return "Verify OTP";
    default:
      return "Sign In";
  }
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

function getSignInFields(handleInputChange) {
  return (
    <div>
      <input
        className="input cr-big cr-margin-top-24"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input
        className="input cr-big cr-margin-top-24"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
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

async function loginHandler(setFormState, formFields) {
  const userData = formFields;
  const isLoginSuccess = await login(userData);
  return isLoginSuccess
}

function primaryBtnClickHandler(event, formState, setFormState, formFields) {
    event.preventDefault();
    if (formState === formStates.SIGN_IN) {
        return loginHandler(setFormState, formFields);
    } else if (formState === formStates.SIGN_UP) {
        setFormState(formStates.OTP);
    } else if (formState === formStates.OTP) {
        //TODO: Call API to verify OTP
    }
}

export default function AuthenticationForm({currentFormState, closeModalFn, setAuthenticatedCB}) {
//   const userEmail = "dashjv@gmai.com";
 
  const [formState, setFormState] = useState(currentFormState || formStates.SIGN_IN);
  const [formFields, setFormFields] = useState({});
  async function primaryBtnClickHandlerWrapper(event) {
    const isOperationSuccessful = await primaryBtnClickHandler(event, formState, setFormState, formFields);
    closeModalFn();
    isOperationSuccessful && setAuthenticatedCB(true);
  }
  // eslint-disable-next-line no-func-assign
  primaryBtnClickHandlerWrapper = primaryBtnClickHandlerWrapper.bind(this);
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  } 
  return (
    <div className="backdrop">
      <div className="authentication-form">
        <div>
          <div className="form-header">
            <div>{getFormHeading(formState)}</div>
            <CloseButton clickHandlerCB={closeModalFn} ></CloseButton>
          </div>
          <div>
            <img className="watermark" src={miniLogo} alt="" />
          </div>
          <div className="input-field-wrappers">
            {formState === formStates.OTP ? getOTPFields(handleInputChange) : ''}
            {formState === formStates.SIGN_IN ? getSignInFields(handleInputChange) : ''}
            {formState === formStates.SIGN_UP ? getSignUpFields(handleInputChange) : ''}
            <div className="cr-margin-top-24">
              <PrimaryButton btnText={getButtonText(formState)} clickHandlerCB={primaryBtnClickHandlerWrapper} ></PrimaryButton>
            </div>
            <div className="cr-margin-top-12">
              <a href="" className="download-link">Download Chrome Extension</a> to register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
