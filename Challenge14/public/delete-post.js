const deleteButtons = document.querySelectorAll(".delete-post-btn");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute("data-post-id");

    if (!postId) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload(); 
      } else {
        alert("Failed to delete the post.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the post.");
    }
  });
});
