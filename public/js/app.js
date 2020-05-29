const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  if (location) {
    messageTwo.textContent = 'loading...'
    messageOne.textContent = '';
// fetch api works in client side not provided by node but support by browser

    const url = `http://localhost:8080/weather?address=${location}`;
    fetch(url).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    });
  } else {
    messageOne.textContent = "Please enter location";
    messageTwo.textContent = "";
  }
});
