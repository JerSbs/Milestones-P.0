// Cek password dan confirm password sama atau tidak 
document.querySelector("form").addEventListener("submit", function (e) {
  const pswd = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  if (pswd !== confirm) {
    alert("Konfirmasi password tidak sama! Silahkan ulangi kembali.");
    e.preventDefault();
  }
});
