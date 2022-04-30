const weatherForm = document.querySelector("form");
const locationInput = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (event) => {
  msg1.textContent = "fetching data....";
  msg2.textContent = "";
  event.preventDefault();
  const location = locationInput.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(function (
    response
  ) {
    if (!response.ok) {
      msg1.textContent = response.statusText;
    } else {
      response.json().then((data) => {
        if (data.error) {
          msg1.textContent = data.error;
        } else {
          msg1.textContent = data.location;
          msg2.textContent = data.temperature;
        }
      });
    }
  });
});
