import React from "react";
import "./authenticationForm.scss";
import "../../assets/styles/common.scss"
import PrimaryButton from "../primaryButton/primaryButton";
import miniLogo from "../../assets/images/logo_mini.png";
import closeBtn from "../../assets/images/close_btn.png";
export default function authenticationForm() {
   
  return (
    <div className="backdrop">
        <div className="authentication-form">
            <div>
                <div className="form-header">
                    <div>Sign Up</div>
                    <div className="close-btn-wrapper"><img className="close-btn-image" src={closeBtn} alt="" /></div>
                </div>
                <div>
                    <img className="watermark" src={miniLogo} alt="" />
                </div>
                <div className="input-field-wrappers">
                        <div className="cr-display-flex cr-space-between">
                            <input className="input" type="text" placeholder="First Name" />
                            <input className="input" type="text" placeholder="Second Name" />
                        </div>
                        <input className="input cr-margin-top-24" type="email" placeholder="Email" />
                        <input className="input cr-margin-top-24" type="password" placeholder="Password" />
                        <div className="cr-margin-top-24">
                            <PrimaryButton btnText='Continue'></PrimaryButton>
                        </div>
                </div>
            </div>
        </div>
    </div>
  );
}
