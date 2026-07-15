let role = "user";
document.querySelectorAll(".role-option").forEach((button) =>
  button.addEventListener("click", () => {
    role = button.dataset.role;
    document
      .querySelectorAll(".role-option")
      .forEach((item) => item.classList.toggle("selected", item === button));
  }),
);
document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name =
    document.querySelector("#email").value.split("@")[0] || "Pengguna";
  localStorage.setItem("zoora-user", JSON.stringify({ name, role }));
  document.querySelector("#loginMessage").textContent =
    "Login berhasil, mengalihkan halaman…";
  setTimeout(
    () =>
      (location.href = role === "admin" ? "admin.html" : "marketplace.html"),
    450,
  );
});
document.querySelector("#forgotPassword").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#loginMessage").textContent =
    "Tautan reset kata sandi akan dikirim ke email Anda.";
});
document.querySelector("#registerLink").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#loginMessage").textContent =
    "Pendaftaran akun baru sedang disiapkan.";
});
