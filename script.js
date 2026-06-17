const imgTag = document.querySelector("img");
const formTag = document.querySelector("form");
formTag.onsubmit = handleSubmit;

const apiKey = sessionStorage.getItem("apiKey");
debugger;
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const apiKey = form.elements.apiKey.value;
  const data = {
    "api-key": apiKey,
  };
  const dataString = new URLSearchParams(data);
  const response = await fetch(
    "https://api.humorapi.com/memes/random" + "?" + dataString,
  );
  const result = await response.json();
  imgTag.src = result.url;
  sessionStorage.setItem("apiKey", apiKey);
}
