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


// const submitButton = document.querySelector('button[type="submit"]:contains("submit")');
// console.log(789, submitButton);
// //click handler
// submitButton.addEventListener('click', function() {
//     console.log("submit button clicked");
// });

function checkIfSubmitButton(el) {
   const isSubmitButton = el && el.tagName === 'BUTTON' &&( el.innerText.toLowerCase().includes('submit') || el.outerText.toLowerCase().includes('submit'));
   const isDisabled = el && el.classList && el.classList.contains('cursor-not-allowed');
   
   return isSubmitButton;
}

function getProblemUrl (problemId) {
   return `leetcode.com/problems/${problemId}`;
}
function getProblemName (problemId) {
    return problemId.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

function submittedProblemHandler (problemId) {
    const problemUrl = getProblemUrl(problemId);
    const problemName = getProblemName(problemId);
    const problem = {
      problemId,
      problemUrl,
      problemName,
    };
    chrome.runtime.sendMessage({ type: 'submittedProblem', problem });
}

document.addEventListener('click', function(e) {
    const oldPath = window.location.pathname;
   if (e && e.target && checkIfSubmitButton(e.target)) {
    const problemId = window.location.pathname.split('/')[2];
    // const submissionUrl  = `/problems/${submissionID}/submissions`;
    // const submissionButton = document.querySelector(`a[href="${submissionUrl}"] div`);
    let targetNode = e.target
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          observer.disconnect(); // Disconnect the observer since we no longer need it
          console.log("Mutated");
          setTimeout(() => {
            // debugger;
             const currentPath = window.location.pathname;
             const submissionId = currentPath.split('submissions')[1];
             if (!submissionId) return;
            submittedProblemHandler(problemId);
          }, 0);
          break;
        }
      }
    });
    console.log("Observer added");
    const config = { attributes: true };
    observer.observe(targetNode, config);
      
   }
})
