// Fungsi ambil cookie berdasarkan nama
function getCookie(name) {
  let cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    let [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return "";
}

// Tampilkan nama user jika cookie ada
const userName = getCookie("name");
if (userName) {
    console.log("test");
    
  document.getElementById("userName").textContent = userName;
  document.getElementById("userName").href = "#"; // atau ke profil jika ada
  document.getElementById("logout").style.display = "inline";
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "none";

} else {
  // Sembunyikan logout kalau belum login
  document.getElementById("logout").style.display = "none";
  document.getElementById("login").style.display = "inline";
  document.getElementById("register").style.display = "inline";
  document.getElementById("userName").style.display = "none";
}
function deleteAllCookies() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}
document.getElementById("logout").addEventListener("click", function (e) {
  e.preventDefault();
  deleteAllCookies();
  window.location.href = "index.php";
});