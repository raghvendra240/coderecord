
const LOCAL_STORAGE_KEY = 'coderecordUserData';
const BASE_URL = "http://localhost:5000/api";

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
  return `https://leetcode.com/problems/${problemId}`;
}
function getProblemName(problemId) {
  return problemId
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function submittedProblemHandler(problemId, userData) {
  const problemUrl = getProblemUrl(problemId);
  const problemName = getProblemName(problemId);
  const problem = {
    problemId,
    problemUrl,
    problemName,
  };
  chrome.runtime.sendMessage({ type: 'SHOW_POPUP', problem: problem, isSilentMode: userData.silentMode });
}

const getAuthObject = async () => {
  let localData = await chrome.storage.local.get(LOCAL_STORAGE_KEY);
    localData = localData[LOCAL_STORAGE_KEY];
    if (!localData || !localData.token) {
       return;
    }

    const config = {
      headers: { Authorization: `Bearer ${localData.token}` }
    };
    let response = await fetch(`${BASE_URL}/users/me`, config);
    response = await response.json();
    if(!response.success) {
      return;
    }
    return {
      token: localData.token,
      user: response.data
    }
}

function addSubmitListener(userData) {
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
              const currentPath = window.location.pathname;
              const submissionId = currentPath.split("submissions")[1];
              if (!submissionId) return;
              submittedProblemHandler(problemId, userData);
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
}

async function onLoad() {
  const authObject = await getAuthObject();
  if (authObject) {
    addSubmitListener(authObject.user)
  }
}

onLoad();

