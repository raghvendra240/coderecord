let problemObj = null;

function closePopup() {
    const popup = document.querySelector(".popup");
    popup.remove();
}

function setToaster(message = "Problem submitted successfully!", color = 'green') {
  // create the main container
  const toaster = document.createElement("div");
  toaster.classList.add("toaster", color);

  // create the message element
  const messageElement = document.createElement("p");
  messageElement.classList.add("message");
  messageElement.innerText = message;
  toaster.appendChild(messageElement);

  // create the close button
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  toaster.appendChild(closeButton);

  // add event listener to close the toaster when the close button is clicked
  closeButton.addEventListener("click", function() {
    toaster.remove();
  });

    // add the toaster to the DOM
    document.body.appendChild(toaster);

  // Remove the toaster
  setTimeout(function() {
    toaster.remove();
  }, 5000);
}

async function getToken() {
    let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
    localData = localData[LOCAL_STORAGE_KEY];
    if (!localData || !localData.token) {
        return;
    }
    return localData.token;
}

function getFormData(event) {
    event.preventDefault();
    document.querySelector('.button-text').classList.add('hidden');
    document.querySelector('.button-loader').classList.remove('hidden');
    const form = event.target;
    const formData = new FormData(form);
    let data = {};
    for (let [key, value] of formData) {
        data[key] = value;
    }
    return data;
}

async function submitProblem(event) {
    let formData = {};
    if (event) {
      formData = getFormData(event);
    }
    const data = { ...formData, ...problemObj, submittedDate: new Date() };
    const token = await getToken();
    if (!token) {
        return;
    }
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data || {}),
    };
    try {
        const response = await fetch(`${BASE_URL}/solved-problems`, config);
        const result = await response.json();
        if(!result.success) {
           throw new Error(result.message);
        }
        setToaster();
    } catch (error) {
        console.log(error);
        setToaster(error.message, 'red')
    } finally {
      document.querySelector('.button-text').classList.remove('hidden');
      document.querySelector('.button-loader').classList.add('hidden');
      closePopup();
    }
  
}

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
  
    const mainLogo = document.createElement("img");
    mainLogo.classList.add("main-logo");
    const logoSvg = `
      <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg618359" viewBox="286.99 355.16 450.02 57.91" version="1.1">
          <metadata id="metadata618365" fill="#FFFFFF">
            <rdf:rdf fill="#FFFFFF">
              <cc:work rdf:about="" fill="#FFFFFF">
                <dc:format fill="#FFFFFF">image/svg+xml</dc:format>
                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" fill="#FFFFFF"></dc:type>
              </cc:work>
            </rdf:rdf>
          </metadata>
          <defs id="defs618363"></defs>
          <linearGradient spreadMethod="pad" y2="30%" x2="-10%" y1="120%" x1="30%" id="3d_gradient2-logo-110f1f38-ea91-4239-84b7-49f55c0408f7" fill="#FFFFFF">
            <stop id="stop618340" stop-opacity="1" stop-color="#ffffff" offset="0%" fill="#FFFFFF"></stop>
            <stop id="stop618342" stop-opacity="1" stop-color="#000000" offset="100%" fill="#FFFFFF"></stop>
          </linearGradient>
          <linearGradient gradientTransform="rotate(-30)" spreadMethod="pad" y2="30%" x2="-10%" y1="120%" x1="30%" id="3d_gradient3-logo-110f1f38-ea91-4239-84b7-49f55c0408f7" fill="#FFFFFF">
            <stop id="stop618345" stop-opacity="1" stop-color="#ffffff" offset="0%" fill="#FFFFFF"></stop>
            <stop id="stop618347" stop-opacity="1" stop-color="#cccccc" offset="50%" fill="#FFFFFF"></stop>
            <stop id="stop618349" stop-opacity="1" stop-color="#000000" offset="100%" fill="#FFFFFF"></stop>
          </linearGradient>
          <g id="logo-group" fill="#FFFFFF">
            <image xlink:href="" id="container" x="488" y="360" width="48" height="48" transform="translate(0 0)" style="display: none;" fill="#FFFFFF"></image>
            <g id="logo-center" fill="#FFFFFF" transform="translate(-1.1368683772161603e-13 0)">
              <image xlink:href="" id="icon_container" style="display: none;" fill="#FFFFFF"></image>
              <g id="slogan" style="font-style:normal;font-weight:400;font-size:32px;line-height:1;font-family:Farsan;font-variant-ligatures:none;text-align:center;text-anchor:middle" transform="translate(0 0)" fill="#FFFFFF"></g>
              <g id="title" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" transform="translate(0 0)" fill="#FFFFFF">
                <path id="path618368" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 313.98594,0.72 q -7.704,0 -14.112,-3.816 -6.336,-3.816 -10.008,-10.44 -3.672,-6.624 -3.672,-14.616 0,-7.92 3.672,-14.472 3.672,-6.624 10.008,-10.44 6.408,-3.888 14.112,-3.888 5.472,0 9.432,1.44 4.032,1.44 8.136,4.752 0.864,0.648 1.152,1.368 0.288,0.648 0.288,1.584 0,1.44 -1.08,2.376 -1.008,0.936 -2.376,0.936 -1.368,0 -2.52,-0.936 -2.952,-2.52 -5.76,-3.6 -2.808,-1.152 -7.272,-1.152 -5.616,0 -10.368,2.952 -4.68,2.952 -7.488,8.064 -2.736,5.04 -2.736,11.016 0,6.048 2.736,11.088 2.808,5.04 7.488,7.992 4.752,2.952 10.368,2.952 6.912,0 13.248,-4.752 1.224,-0.864 2.376,-0.864 1.368,0 2.232,1.008 0.936,0.936 0.936,2.52 0,1.512 -1.152,2.664 -7.776,6.264 -17.64,6.264 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(286.9904400000001 50) scale(1) translate(-286.19394 56.952)"></path>
                <path id="path618370" style="font-style: normal; font-weight: 700; font-size: 72px; line-height: 1; font-family: Comfortaa; font-variant-ligatures: none; text-align: center; text-anchor: middle; display: none;" d="m 359.07819,0.288 q -5.76,0 -10.296,-2.52 -4.536,-2.592 -7.056,-7.128 -2.52,-4.536 -2.52,-10.296 0,-5.832 2.52,-10.368 2.52,-4.536 7.056,-7.056 4.536,-2.592 10.296,-2.592 5.688,0 10.152,2.592 4.536,2.52 7.056,7.056 2.592,4.536 2.592,10.368 0,5.76 -2.52,10.296 -2.52,4.536 -7.056,7.128 -4.464,2.52 -10.224,2.52 z m 0,-6.48 q 3.672,0 6.552,-1.728 2.952,-1.728 4.536,-4.752 1.656,-3.096 1.656,-6.984 0,-3.888 -1.656,-6.984 -1.584,-3.096 -4.536,-4.824 -2.88,-1.728 -6.552,-1.728 -3.672,0 -6.624,1.728 -2.88,1.728 -4.536,4.824 -1.656,3.096 -1.656,6.984 0,3.888 1.656,6.984 1.656,3.024 4.536,4.752 2.952,1.728 6.624,1.728 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909"></path>
                <path id="path618372" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 423.86244,-56.232 q 1.656,0 2.664,1.008 1.008,1.008 1.008,2.664 v 32.832 q 0,5.616 -2.664,10.224 -2.592,4.536 -7.128,7.2 -4.464,2.592 -10.008,2.592 -5.544,0 -10.152,-2.592 -4.536,-2.664 -7.128,-7.2 -2.592,-4.608 -2.592,-10.224 0,-5.616 2.376,-10.152 2.448,-4.608 6.624,-7.2 4.248,-2.592 9.432,-2.592 4.176,0 7.776,1.728 3.6,1.728 6.12,4.824 v -19.44 q 0,-1.656 1.008,-2.664 1.08,-1.008 2.664,-1.008 z m -16.128,50.04 q 3.6,0 6.48,-1.728 2.952,-1.8 4.608,-4.896 1.656,-3.096 1.656,-6.912 0,-3.816 -1.656,-6.84 -1.656,-3.096 -4.608,-4.824 -2.88,-1.8 -6.48,-1.8 -3.6,0 -6.552,1.8 -2.88,1.728 -4.608,4.824 -1.656,3.024 -1.656,6.84 0,3.816 1.656,6.912 1.728,3.096 4.608,4.896 2.952,1.728 6.552,1.728 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(388.94694000000004 50.72) scale(1) translate(-387.86244 56.232)"></path>
                <path id="path618374" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 475.85544,-20.304 q 0,1.368 -0.936,2.304 -0.936,0.864 -2.376,0.864 h -27.36 q 0.792,5.04 4.536,8.136 3.816,3.096 9.288,3.096 2.16,0 4.464,-0.792 2.376,-0.792 3.888,-1.944 1.008,-0.792 2.376,-0.792 1.368,0 2.16,0.72 1.296,1.08 1.296,2.448 0,1.296 -1.152,2.16 -2.448,1.944 -6.12,3.168 -3.6,1.224 -6.912,1.224 -5.904,0 -10.584,-2.52 -4.68,-2.592 -7.344,-7.128 -2.592,-4.536 -2.592,-10.296 0,-5.76 2.448,-10.296 2.52,-4.608 6.912,-7.128 4.464,-2.592 10.08,-2.592 5.544,0 9.576,2.448 4.032,2.448 6.192,6.84 2.16,4.392 2.16,10.08 z m -17.928,-13.176 q -5.256,0 -8.568,2.88 -3.24,2.88 -4.104,7.704 h 23.976 q -0.648,-4.824 -3.6,-7.704 -2.952,-2.88 -7.704,-2.88 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(439.57194000000004 67.28) scale(1) translate(-438.48744 39.672)"></path>
                <path id="path618376" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 522.44619,-5.76 q 0.72,1.152 0.72,2.376 0,1.44 -1.008,2.448 -0.936,0.936 -2.592,0.936 -2.088,0 -3.24,-1.8 l -12.384,-19.872 h -1.296 -9.216 v 17.928 q 0,1.584 -1.08,2.664 -1.008,1.08 -2.664,1.08 -1.584,0 -2.664,-1.08 -1.08,-1.08 -1.08,-2.664 v -48.744 q 0,-1.656 1.08,-2.664 1.08,-1.08 2.664,-1.08 h 12.96 q 5.328,0 9.504,2.232 4.248,2.232 6.552,6.264 2.376,4.032 2.376,9.216 0,5.112 -2.592,9.072 -2.592,3.96 -7.056,5.976 z m -19.8,-22.824 q 4.896,0 8.064,-2.736 3.168,-2.808 3.168,-7.2 0,-4.752 -3.168,-7.776 -3.168,-3.024 -8.064,-3.024 h -9.216 v 20.736 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(487.02669000000003 50.72) scale(1) translate(-485.94219 56.232)"></path>
                <path id="path618378" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 566.13669,-20.304 q 0,1.368 -0.936,2.304 -0.936,0.864 -2.376,0.864 h -27.36 q 0.792,5.04 4.536,8.136 3.816,3.096 9.288,3.096 2.16,0 4.464,-0.792 2.376,-0.792 3.888,-1.944 1.008,-0.792 2.376,-0.792 1.368,0 2.16,0.72 1.296,1.08 1.296,2.448 0,1.296 -1.152,2.16 -2.448,1.944 -6.12,3.168 -3.6,1.224 -6.912,1.224 -5.904,0 -10.584,-2.52 -4.68,-2.592 -7.344,-7.128 -2.592,-4.536 -2.592,-10.296 0,-5.76 2.448,-10.296 2.52,-4.608 6.912,-7.128 4.464,-2.592 10.08,-2.592 5.544,0 9.576,2.448 4.032,2.448 6.192,6.84 2.16,4.392 2.16,10.08 z m -17.928,-13.176 q -5.256,0 -8.568,2.88 -3.24,2.88 -4.104,7.704 h 23.976 q -0.648,-4.824 -3.6,-7.704 -2.952,-2.88 -7.704,-2.88 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(529.85319 67.28) scale(1) translate(-528.76869 39.672)"></path>
                <path id="path618380" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 591.95319,0.288 q -5.688,0 -10.224,-2.592 -4.536,-2.592 -7.128,-7.128 -2.52,-4.608 -2.52,-10.224 0,-5.76 2.448,-10.296 2.52,-4.608 6.984,-7.128 4.464,-2.592 10.08,-2.592 8.496,0 14.112,6.48 0.72,0.792 0.72,1.872 0,1.584 -1.584,2.664 -0.72,0.504 -1.656,0.504 -1.656,0 -2.808,-1.296 -1.8,-1.944 -3.96,-2.808 -2.088,-0.936 -4.824,-0.936 -5.544,0 -9,3.744 -3.456,3.672 -3.456,9.792 0,3.888 1.584,6.984 1.656,3.024 4.536,4.752 2.952,1.728 6.696,1.728 4.896,0 7.92,-2.52 1.368,-1.008 2.664,-1.008 1.008,0 1.872,0.648 1.368,1.152 1.368,2.592 0,1.08 -0.864,1.944 -5.184,4.824 -12.96,4.824 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(573.16569 67.28) scale(1) translate(-572.08119 39.672)"></path>
                <path id="path618382" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 635.26569,0.288 q -5.76,0 -10.296,-2.52 -4.536,-2.592 -7.056,-7.128 -2.52,-4.536 -2.52,-10.296 0,-5.832 2.52,-10.368 2.52,-4.536 7.056,-7.056 4.536,-2.592 10.296,-2.592 5.688,0 10.152,2.592 4.536,2.52 7.056,7.056 2.592,4.536 2.592,10.368 0,5.76 -2.52,10.296 -2.52,4.536 -7.056,7.128 -4.464,2.52 -10.224,2.52 z m 0,-6.48 q 3.672,0 6.552,-1.728 2.952,-1.728 4.536,-4.752 1.656,-3.096 1.656,-6.984 0,-3.888 -1.656,-6.984 -1.584,-3.096 -4.536,-4.824 -2.88,-1.728 -6.552,-1.728 -3.672,0 -6.624,1.728 -2.88,1.728 -4.536,4.824 -1.656,3.096 -1.656,6.984 0,3.888 1.656,6.984 1.656,3.024 4.536,4.752 2.952,1.728 6.624,1.728 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(616.47819 67.28) scale(1) translate(-615.39369 39.672)"></path>
                <path id="path618384" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 685.36194,-39.816 q 3.816,0 5.976,1.152 2.16,1.152 2.16,2.88 0,0.504 -0.072,0.72 -0.648,2.304 -2.88,2.304 -0.36,0 -1.08,-0.144 -2.88,-0.504 -4.68,-0.504 -5.184,0 -8.352,2.376 -3.168,2.376 -3.168,6.408 V -3.6 q 0,1.728 -0.936,2.664 -0.864,0.936 -2.664,0.936 -1.728,0 -2.664,-0.864 -0.936,-0.936 -0.936,-2.736 v -32.184 q 0,-1.728 0.936,-2.664 0.936,-0.936 2.664,-0.936 3.6,0 3.6,3.6 v 1.368 q 2.16,-2.52 5.328,-3.96 3.168,-1.44 6.768,-1.44 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(667.15044 67.136) scale(1) translate(-666.06594 39.816)"></path>
                <path id="path618386" style="font-style:normal;font-weight:700;font-size:72px;line-height:1;font-family:Comfortaa;font-variant-ligatures:none;text-align:center;text-anchor:middle" d="m 732.25306,-56.232 q 1.656,0 2.664,1.008 1.008,1.008 1.008,2.664 v 32.832 q 0,5.616 -2.664,10.224 -2.592,4.536 -7.128,7.2 -4.464,2.592 -10.008,2.592 -5.544,0 -10.152,-2.592 -4.536,-2.664 -7.128,-7.2 -2.592,-4.608 -2.592,-10.224 0,-5.616 2.376,-10.152 2.448,-4.608 6.624,-7.2 4.248,-2.592 9.432,-2.592 4.176,0 7.776,1.728 3.6,1.728 6.12,4.824 v -19.44 q 0,-1.656 1.008,-2.664 1.08,-1.008 2.664,-1.008 z m -16.128,50.04 q 3.6,0 6.48,-1.728 2.952,-1.8 4.608,-4.896 1.656,-3.096 1.656,-6.912 0,-3.816 -1.656,-6.84 -1.656,-3.096 -4.608,-4.824 -2.88,-1.8 -6.48,-1.8 -3.6,0 -6.552,1.8 -2.88,1.728 -4.608,4.824 -1.656,3.024 -1.656,6.84 0,3.816 1.656,6.912 1.728,3.096 4.608,4.896 2.952,1.728 6.552,1.728 z" stroke-width="0px" stroke-linejoin="miter" stroke-miterlimit="2" fill="#090909" stroke="#090909" transform="translate(0 305.164) translate(697.33756 50.72) scale(1) translate(-696.25306 56.232)"></path>
              </g>
              <image xlink:href="data:image/png;base64,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" id="icon" x="339" y="-39" width="39.96" height="39.96" fill="#FFFFFF" transform="translate(0 305.164) translate(340.0026900000001 67.28) scale(1) translate(-339.20619 39.672)"></image>
            </g>
          </g>
      </svg>
     ` 
    const mainLogoBlob = new Blob([logoSvg], {type: 'image/svg+xml'});
    const mainLogoUrl = URL.createObjectURL(mainLogoBlob);
    mainLogo.src = mainLogoUrl;
    // const heading = document.createElement("h2");
    // heading.innerText = "Success!";
    popupHeader.appendChild(mainLogo);
  
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", closePopup);
    popupHeader.appendChild(closeButton);
  
    const popupBody = document.createElement("div");
    popupBody.classList.add("popup-body");
    popupContent.appendChild(popupBody);
  
    const successIconContainer = document.createElement("div");
    successIconContainer.classList.add("success-icon-container");
    popupBody.appendChild(successIconContainer);
  
    const svgContent  = `
    <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet">
        <g fill="none" stroke="#F27C0F" stroke-width="4">
          <circle cx="32" cy="32" r="30" opacity="0">
            <animate attributeName="opacity" from="0" to="1" begin="0s" dur="0.3s" fill="freeze"></animate>
          </circle>
          <path d="M23,32 28,40 41,22" stroke-dasharray="50 50" opacity="0">
            <animate attributeName="opacity" from="0" to="1" begin="0.1s" dur="0.3s" fill="freeze"></animate>
            <animate attributeName="stroke-dashoffset" from="50" to="0" begin="0.1s" dur="0.3s" fill="freeze"></animate>
          </path>
        </g>
    </svg>`;
  
    const blob = new Blob([svgContent], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const successIcon = document.createElement('img');
    successIcon.src = url;
    successIconContainer.appendChild(successIcon);
  
    const messageHeading = document.createElement("h3");
    messageHeading.innerText = "Question Solved";
    popupBody.appendChild(messageHeading);
  
    const messageText = document.createElement("p");
    messageText.innerText =
      "Now you can set reminder and additional hints to help you remember the solution.";
    popupBody.appendChild(messageText);
  
    const form = document.createElement("form");
    const label = document.createElement("label");
    label.setAttribute("for", "hint");
    label.textContent = "Additional Notes:";

    //Create lable and input of type date
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date");
    dateLabel.textContent = "Set Reminder Date:";

    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "date");
    dateInput.setAttribute("name", "reminderDate");
    form.appendChild(dateLabel);
    form.appendChild(dateInput);

    // create textarea element
    const textarea = document.createElement("textarea");
    textarea.setAttribute("id", "hint");
    textarea.setAttribute("name", "problemHint");
    textarea.setAttribute("spellcheck", "false");
  
    // create button element
    const button = document.createElement("button");
    button.style.width = "106px";
    button.setAttribute("type", "submit");
    const buttonContent = document.createElement("div");
    const buttonText = document.createElement("span");
    buttonText.classList.add("button-text");
    buttonText.textContent = "Submit";
    const buttonLoader = document.createElement("div");
    buttonLoader.classList.add('loader', 'button-loader', 'hidden');
    buttonContent.appendChild(buttonText);
    buttonContent.appendChild(buttonLoader);
    button.appendChild(buttonContent);

  
    // append label, textarea, and button to form
    form.appendChild(label);
    form.appendChild(textarea);
    form.appendChild(button);
    popupBody.appendChild(form);

    form.addEventListener("submit", submitProblem);
  
    const notesLabel = document.createElement;
    return popup;
  }
  const css = `
  .popup {
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
    background-color: rgba(0, 0, 0, 0.5);
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
    text-align: center;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup-body {
    padding: 24px 40px;
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
  .main-logo {
    width: 40%;
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
    position: relative;
    top: -2px;
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
  }
  
  .popup-body h3 {
    margin: 0;
    font-size: 2.5em;
    font-weight: normal;
    margin-bottom: 12px;
  }
  .success-icon-container {
    display: flex;
    justify-content: center;
  }
  
  .popup-body p {
    margin: 0;
    font-size: 16px;
    margin-bottom: 24px;
  }
  
  .popup-body form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .popup-body form label {
    align-self: self-start;
    margin-bottom: 4x;
    font-size: 12px;
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
    cursor: default;
    color: #1a1a1a;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5), 0px 0px 10px rgba(26, 26, 26, 0.5);
    transition: color 0.3s ease, text-shadow 0.3s ease;
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
  
  
  .popup-header:hover .close-button:hover {
    background-color: rgba(26, 26, 26, 0.2);
  }
  
  .success-icon {
    fill: #00cc00; /* change the fill color to whatever you want */
  }

  input[type="date"]{
    background-color: #f05d23;
    padding: 10px 15px;
    font-family: "Roboto Mono",monospace;
    color: #ffffff;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 5px;
  }  
  input[type="date"]::-webkit-calendar-picker-indicator{
      padding: 5px;
      cursor: pointer;
  }

  .loader, .loader:after {
  border-radius: 50%;
  width: 28px;
  height: 28px;
}
.loader {
  margin: 0 auto;
  font-size: 10px;
  text-indent: -9999em;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  border-left: 2px solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
  .hidden {
    display: none;
  }

  .toaster {
    display: flex;
    gap: 10px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: #2ecc71;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 9999;
  }
  .toaster.red {
    background-color: #ff3d00
  }
  
  .toaster .message {
    margin: 0;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
  }
  
  .toaster .close-button {
    background-color: #ffffff;
    border: none;
    color: #2ecc71;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    position: relative;
    right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .toaster.show {
    display: block;
    animation: slide-in 0.5s ease-in-out forwards;
  }
  
  @keyframes slide-in {
    0% {
      transform: translateY
  
 
  `;


function insertStyle() {
  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

async function insertPopupDom({problem}) {
  const modal = getModal(problem);
  document.body.appendChild(modal);
}

const clearOtherPopups = () => {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => popup.remove());
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type == "SHOW_POPUP") {
        clearOtherPopups();
        insertStyle();
        problemObj = message.problem;
        if (message.isSilentMode) {
          submitProblem();
        } else {
          insertPopupDom(message);
        }
    }
  });