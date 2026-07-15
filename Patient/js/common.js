const headerImage = document.getElementById("headerImage");
const profileLink = document.getElementById("profileLink");

if (headerImage) {
  headerImage.style.cursor = "pointer";

  headerImage.onclick = () => {
    window.location.href = "profile.html";
  };
}

if (profileLink) {
  profileLink.style.cursor = "pointer";

  profileLink.onclick = () => {
    window.location.href = "profile.html";
  };
}
