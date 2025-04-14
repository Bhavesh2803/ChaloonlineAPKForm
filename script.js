const form = document.forms["apk-build-form"];
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(form);

  fetch("/", {
    method: "POST",
    headers: { "Accept": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data).toString(),
  })
    .then(() => {
      form.style.display = "none";
      document.getElementById("success-message").style.display = "block";
    })
    .catch((error) => alert("Error submitting the form"));
});