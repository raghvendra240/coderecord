

function checkIfSubmitButton(el) {
  const isSubmitButton =
    el &&
    el.tagName === "BUTTON" &&
    (el.innerText.toLowerCase().includes("submit") ||
      el.outerText.toLowerCase().includes("submit"));
  const isDisabled =
    el && el.classList && el.classList.contains("cursor-not-allowed");

  return isSubmitButton;
}

function getProblemUrl(problemId) {
  return `leetcode.com/problems/${problemId}`;
}
function getProblemName(problemId) {
  return problemId
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function submittedProblemHandler(problemId) {
  const problemUrl = getProblemUrl(problemId);
  const problemName = getProblemName(problemId);
  const problem = {
    problemId,
    problemUrl,
    problemName,
  };
  // chrome.runtime.sendMessage({ type: 'submittedProblem', problem });
  chrome.runtime.sendMessage({ type: 'SHOW_POPUP', problem: problem });
  //     const link = document.createElement('link');
  //     link.type = 'text/css';
  //     link.rel = 'stylesheet';
  //     link.href = 'style.css';

  // // Append the link element to the head section of the HTML document
  // document.head.appendChild(link);
 
}

document.addEventListener("click", function (e) {
  const oldPath = window.location.pathname;
  if (e && e.target && checkIfSubmitButton(e.target)) {
    const problemId = window.location.pathname.split("/")[2];
    // const submissionUrl  = `/problems/${submissionID}/submissions`;
    // const submissionButton = document.querySelector(`a[href="${submissionUrl}"] div`);
    let targetNode = e.target;
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          observer.disconnect(); // Disconnect the observer since we no longer need it
          console.log("Mutated");
          setTimeout(() => {
            // debugger;
            const currentPath = window.location.pathname;
            const submissionId = currentPath.split("submissions")[1];
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
});

// const style = document.createElement("style");
// style.type = "text/css";
// style.appendChild(document.createTextNode(css));
// document.head.appendChild(style);
// const modal = getModal();
// document.body.appendChild(modal);
// console.log("Mesage sent")
