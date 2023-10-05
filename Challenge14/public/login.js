const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (!email || !password) {
    return;
  }

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      const responseData = await response.json();
      alert(responseData.message || "Failed to log in.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while logging in.");
  }
});
