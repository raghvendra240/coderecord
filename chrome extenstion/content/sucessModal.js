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


