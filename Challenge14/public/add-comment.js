const commentForm = document.querySelector("#comment-form");

commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const commentText = document.querySelector("#comment-text").value;
  const postId = document.querySelector("#post-id").value;

  if (!commentText || !postId) {
    return;
  }

  try {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment_text: commentText, post_id: postId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload(); 
    } else {
      alert("Failed to add comment.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while adding the comment.");
  }
});
