
function getModal() {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.style.display = "block";

  const popupOverlay = document.createElement("div");
  popupOverlay.classList.add("popup-overlay");
  popup.appendChild(popupOverlay);

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");
  popup.appendChild(popupContent);

  const popupHeader = document.createElement("div");
  popupHeader.classList.add("popup-header");
  popupContent.appendChild(popupHeader);

  const heading = document.createElement("h2");
  heading.innerText = "Success!";
  popupHeader.appendChild(heading);

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  popupHeader.appendChild(closeButton);

  const popupBody = document.createElement("div");
  popupBody.classList.add("popup-body");
  popupContent.appendChild(popupBody);

  const successIconContainer = document.createElement("div");
  popupBody.appendChild(successIconContainer);

  const successIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  successIcon.classList.add("success-icon");
  successIcon.setAttribute("width", "64");
  successIcon.setAttribute("height", "64");
  successIcon.setAttribute("viewBox", "0 0 64 64");
  successIcon.setAttribute("preserveAspectRatio", "xMidYMid meet");

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", "32");
  circle.setAttribute("cy", "32");
  circle.setAttribute("r", "30");
  circle.setAttribute("opacity", "0");

  const circleAnimation = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  circleAnimation.setAttribute("attributeName", "opacity");
  circleAnimation.setAttribute("from", "0");
  circleAnimation.setAttribute("to", "1");
  circleAnimation.setAttribute("begin", "0s");
  circleAnimation.setAttribute("dur", "0.3s");
  circleAnimation.setAttribute("fill", "freeze");

  circle.appendChild(circleAnimation);
  successIcon.appendChild(circle);

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M23,32 28,40 41,22");
  path.setAttribute("stroke-dasharray", "50 50");
  path.setAttribute("opacity", "0");

  const pathAnimation1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  pathAnimation1.setAttribute("attributeName", "opacity");
  pathAnimation1.setAttribute("from", "0");
  pathAnimation1.setAttribute("to", "1");
  pathAnimation1.setAttribute("begin", "0.1s");
  pathAnimation1.setAttribute("dur", "0.3s");
  pathAnimation1.setAttribute("fill", "freeze");

  const pathAnimation2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate"
  );
  pathAnimation2.setAttribute("attributeName", "stroke-dashoffset");
  pathAnimation2.setAttribute("from", "50");
  pathAnimation2.setAttribute("to", "0");
  pathAnimation2.setAttribute("begin", "0.1s");
  pathAnimation2.setAttribute("dur", "0.3s");
  pathAnimation2.setAttribute("fill", "freeze");

  path.appendChild(pathAnimation1);
  path.appendChild(pathAnimation2);
  successIcon.appendChild(path);

  successIconContainer.appendChild(successIcon);

  const messageHeading = document.createElement("h3");
  messageHeading.innerText = "Message Sent";
  popupBody.appendChild(messageHeading);

  const messageText = document.createElement("p");
  messageText.innerText =
    "Thank you for sending your message. Our team will respond to you as soon as possible.";
  popupBody.appendChild(messageText);

  const form = document.createElement("form");
  popupBody.appendChild(form);

  const notesLabel = document.createElement;
  return popup;
}
const css =`.popup {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  max-width: 90%;
  background-color: #1a1a1a;
  color: white;
  padding: 40px;
  text-align: center;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.popup-header h2 {
  margin: 0;
  font-size: 3em;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 900;
  color: #f05d23;
  text-shadow: 0px 0px 10px rgba(240, 93, 35, 0.5);
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  font-size: 2em;
  cursor: pointer;
  color: #fff;
  transition: color 0.3s ease;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.close-button:hover {
  color: #f05d23;
  background-color: rgba(255, 255, 255, 0.2);
}

.close-button svg {
  width: 100%;
  height: 100%;
}

.popup-body img {
  max-width: 100px;
  margin-bottom: 30px;
}

.popup-body h3 {
  margin: 0;
  font-size: 2.5em;
  font-weight: normal;
  margin-bottom: 20px;
}

.popup-body p {
  margin: 0;
  font-size: 1.5em;
  margin-bottom: 30px;
}

.popup-body form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-body form label {
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #f05d23;
}

.popup-body form textarea {
  width: 100%;
  height: 120px;
  margin-bottom: 30px;
  padding: 10px;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  background-color: #262626;
  color: #fff;
}

.popup-body form button[type="submit"] {
  background-color: #f05d23;
  color: #fff;
  padding: 10px 20px;
  font-size: 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popup-body form button[type="submit"]:hover {
  background-color: #ff6f3d;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f05d23;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
}

.popup-header h2 {
  margin: 0;
  font-size: 3em;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 900;
  color: white;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
  cursor: default;
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  font-size: 2em;
  cursor: pointer;
  color: white;
  transition: color 0.3s ease;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.close-button:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
}

.close-button svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.popup-header:hover {
  background-color: #ff6f3d;
}

.popup-header:hover h2 {
  color: #1a1a1a;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5), 0px 0px 10px rgba(26, 26, 26, 0.5);
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.popup-header:hover .close-button {
  color: #1a1a1a;
  transition: color 0.3s ease;
}

.popup-header:hover .close-button:hover {
  background-color: rgba(26, 26, 26, 0.2);
}

.success-icon {
  fill: #00cc00; /* change the fill color to whatever you want */
}

`

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
    // chrome.runtime.sendMessage({ type: 'submittedProblem', problem });
    console.log('789 problem', problem);
//     const link = document.createElement('link');
//     link.type = 'text/css';
//     link.rel = 'stylesheet';
//     link.href = 'style.css';

// // Append the link element to the head section of the HTML document
// document.head.appendChild(link);
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
    const modal = getModal(problem);
    document.body.appendChild(modal);
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


