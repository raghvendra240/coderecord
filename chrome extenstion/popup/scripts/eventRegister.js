
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


    /*-----------------Switch between login and signup--------*/

