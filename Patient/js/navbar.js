window.addEventListener("load", function () {
  let profile = JSON.parse(localStorage.getItem("profile"));
  if (profile) {
    document.getElementById("headerName").textContent = profile.name;
    document.getElementById("headerImage").src = profile.image;
  }
});
