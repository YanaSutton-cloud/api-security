const imgTag = document.querySelector("img");
const formTag = document.querySelector("form");
const outputTag = document.querySelector("output");
formTag.onsubmit = handleSubmit;

const apiKey = sessionStorage.getItem("apiKey");
const isInvalid = apiKey === null;
if (isInvalid) {
  console.log("There is no valid API key.");
} else {
  displayImage(apiKey);
}
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const apiKey = form.elements.apiKey.value;
  displayImage(apiKey);
}

async function displayImage(apiKey) {
  const data = {
    "api-key": apiKey,
  };
  const dataString = new URLSearchParams(data);
  const response = await fetch(
    "https://api.humorapi.com/memes/random" + "?" + dataString,
  );
  const result = await response.json();
  const message = result.message;
  const isInvalid =
    message ===
    "You are not authorized. Please read https://humorapi.com/docs/#Authentication";

  if (isInvalid) {
    sessionStorage.removeItem("apiKey");
    outputTag.innerText = "The API key you entered is invalid.";
    imgTag.src = "";
  } else {
    outputTag.innerText = "";
    imgTag.src = result.url;
    sessionStorage.setItem("apiKey", apiKey);
  }
}
