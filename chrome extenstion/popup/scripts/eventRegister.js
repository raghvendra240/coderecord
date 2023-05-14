
/*-----------FORM EVENT LISTENER------------ */

document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearError();
        formHandler[event.target.id](event.target);
    });
});


  /*-----------------CUSTOM EVENT LISTENER------------*/
  document.addEventListener('myCustomEvent', function(e) {
    console.log('Custom event triggered', e);
  });


    /*-----------------Dashboard BTN--------*/
    document.querySelector('.dashboard-btn').addEventListener('click', onDashboardClick);


    /*-----------------OTP to Signup--------*/
    document.querySelector('.otp-to-signup').addEventListener('click', switchToSignup);

    /*--------------Main Logo---------------*/
    document.querySelector('.main-logo-img').addEventListener('click', onLogoClick);

