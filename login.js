const curUser = 0;

window.addEventListener("load", function () {
  function sendData() {
    const sendRequest = new XMLHttpRequest();
    const loginInfo = new URLSearchParams(new FormData(form));
    console.log(loginInfo);
    sendRequest.addEventListener("error", function (event) {
      alert("Incorrect username or password");
    });
    sendRequest.addEventListener("load", function (event) {
      alert("successfully logged in");
    });
    sendRequest.open("GET", "http://localhost:5000/app/user/auth");
    sendRequest.send(loginInfo);
    var result = sendRequest.response;
    console.log(result);
  }
  const form = document.getElementById("login");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});
