window.addEventListener("load", function () {
  function sendData() {
    var sendRequest = new XMLHttpRequest();
    const loginInfo = new URLSearchParams(new FormData(form));
    sendRequest.addEventListener("error", function (event) {
      alert("Incorrect username or password");
    });
    sendRequest.addEventListener("load", function (event) {
      alert("successfully logged in");
    });
    sendRequest.open("GET", "http://localhost:5000/app/user/auth", false);
    sendRequest.send("test2", "8fe4c11451281c094a6578e6ddbf5eed");
    var result = sendRequest.response;
    console.log(sendRequest);
  }
  const form = document.getElementById("login");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});
