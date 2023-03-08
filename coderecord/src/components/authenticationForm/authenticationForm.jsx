import React from "react";
import "./authenticationForm.scss";

export default function authenticationForm() {
  return (
    <div className="authentication-form">
      <div class="form-wrapper">
        <form class="form-container">
          <span class="form-title">Sign In</span>
          <div
            class="form-input-wrapper validate-input m-b-16"
            data-validate="Please enter username"
          >
            <input
              class="form-input"
              type="text"
              name="username"
              placeholder="Username"
            />
            <span class="focus-input"></span>
          </div>
          <div
            class="form-input-wrapper validate-input"
            data-validate="Please enter password"
          >
            <input
              class="form-input"
              type="password"
              name="pass"
              placeholder="Password"
            />
            <span class="focus-input"></span>
          </div>
          <div class="text-right p-t-13 p-b-23">
            <span class="txt1">Forgot</span>
            <a href="#" class="txt2">
              Username / Password?
            </a>
          </div>
          <div class="container-login-form-btn">
            <button class="login100-form-btn">Sign in</button>
          </div>
          <div class="flex-col-c p-t-170 p-b-40">
            <span class="txt1 p-b-9">Don’t have an account?</span>
            <a href="#" class="txt3">
              Sign up now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
