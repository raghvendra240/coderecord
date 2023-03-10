// if (typeof jQuery === 'undefined')  {
//     // Load jQuery into the page
//     var script = document.createElement('script');
//     script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
//     document.head.appendChild(script);
//     console.log("Jquery loaded");
// }   

// const $submitBtn = $("button:contains('submit')");
// //click event
// $submitBtn.click(function() {
//     console.log("submit button clicked");
// });


const submitButton = document.querySelector('button[type="submit"]:contains("submit")');
console.log(789, submitButton);
//click handler
submitButton.addEventListener('click', function() {
    console.log("submit button clicked");
});

