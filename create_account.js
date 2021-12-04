window.addEventListener("load", function () {
  function sendData() {
    const sendRequest = new XMLHttpRequest();
    const signupInfo = new URLSearchParams(new FormData(form));
    sendRequest.addEventListener("error", function (event) {
      alert("Your account creation was unsuccessful, please try again.");
    });
    sendRequest.addEventListener("load", function (event) {
      alert("Your account has been created!");
    });
    sendRequest.open("POST", "http://localhost:5000/app/new/user");
    sendRequest.send(signupInfo);
    console.log(signupInfo);
  }
  const form = document.getElementById("signup");
  form.addEventListener("submit", function (event) {
    console.log(form);
    event.preventDefault();
    sendData();
  });
});
