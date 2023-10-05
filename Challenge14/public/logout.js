const logoutButton = document.querySelector("#logout-btn");

logoutButton.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/login"; 
    } else {
              alert("Failed to log out.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while logging out.");
  }
});
