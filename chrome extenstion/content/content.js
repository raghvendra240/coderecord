
const LOCAL_STORAGE_KEY = 'coderecordUserData';
const BASE_URL = "https://rich-elk-top-coat.cyclic.app/api";
// const BASE_URL = "http://localhost:5000/api";

let currentPlatform = null;

const platforms = {
  leetcode: "https://leetcode.com",
  gfg: "https://practice.geeksforgeeks.org"
}

function checkIfLeetcodeSubmitBtnClicked(el) {
  const isSubmitButton =
    el &&
    el.tagName === "BUTTON" &&
    (el.innerText.toLowerCase().includes("submit") ||
      el.outerText.toLowerCase().includes("submit"));
  const isDisabled =
    el && el.classList && el.classList.contains("cursor-not-allowed");

  return isSubmitButton;
}

function checkIfGfgBtnClicked(el) {
  return el && el.tagName === "BUTTON" 
    && (el.innerText.toLowerCase().includes("submit") || el.outerText.toLowerCase().includes("submit"));
}

function getProblemUrl(problemId) {
  const problemUrl = `${platforms[currentPlatform]}/problems/${problemId}`;
  if (currentPlatform === "gfg") {
    return `${problemUrl}/1`;
  }
  return problemUrl;
}
function getProblemName(problemId) {
  const lastChunk = problemId.split("-").pop();
  //check last chunk is number or not
  if (!isNaN(lastChunk)) {
    problemId = problemId.slice(0, -lastChunk.length - 1);
  }
  return problemId
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function getProblemId() {
  if (currentPlatform === "leetcode") {
    return window.location.pathname.split("/")[2];
  } else {
    return window.location.pathname.split("/")[2];
  }
}

function submittedProblemHandler(userData) {
  const problemId = getProblemId();
  const problemUrl = getProblemUrl(problemId);
  const problemName = getProblemName(problemId);
  const platformName  = currentPlatform;
  const problem = {
    problemId,
    problemUrl,
    problemName,
    platformName
  };
  chrome.runtime.sendMessage({ 
    type: 'SHOW_POPUP', 
    problem: problem, 
    isSilentMode: userData.silentMode,
    tabUrl: window.location.href,
  });
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

function addLeetcodeSubmitListener(userData) {
  document.addEventListener("click", function (e) {
    const oldPath = window.location.pathname;
    if (e && e.target && checkIfLeetcodeSubmitBtnClicked(e.target)) {
      let targetNode = e.target;
      const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            observer.disconnect();
            setTimeout(() => {
              const currentPath = window.location.pathname;
              const submissionId = currentPath.split("submissions")[1];
              if (!submissionId) return;
              submittedProblemHandler(userData);
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

function addGFGSubmitListener(userData) {

  document.addEventListener("click", function (e) {
    if (e && e.target && checkIfGfgBtnClicked(e.target)) {
       const targetNode = document.querySelector(".problems_content_pane__nexJa h3");
       const observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
              // console.log(789, mutation);
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                  const problemSolved  = mutation.addedNodes[0].textContent == "Problem Solved Successfully";
                  const wrongAnswer = mutation.addedNodes[0].textContent == "Wrong Answer. !!!"; 
                  const runtimeError = mutation.addedNodes[0].textContent == "Runtime Error "; 
                  
                  if (problemSolved || wrongAnswer || runtimeError) {
                    observer.disconnect();
                  }
                  if (problemSolved) {
                    submittedProblemHandler(userData);
                  }
                }
            }
       });
        const config =  { characterData: true, subtree: true, characterDataOldValue: true, childList: true, };
        observer.observe(targetNode, config);
    }
  });

}


function addSubmitListener(userData) {
  if (window.location.origin == platforms.leetcode) {
    currentPlatform = "leetcode";
    addLeetcodeSubmitListener(userData);
  } else {
    addGFGSubmitListener(userData);
    currentPlatform = "gfg";
  }
}

async function onLoad() {
  const authObject = await getAuthObject();
  if (authObject) {
    addSubmitListener(authObject.user)
  }
}

onLoad();

