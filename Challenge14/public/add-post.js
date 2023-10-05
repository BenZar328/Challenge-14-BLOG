const postForm = document.querySelector("#post-form");

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#post-title").value;
  const postBody = document.querySelector("#post-body").value;

  if (!postTitle || !postBody) {
    return;
  }

  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ post_title: postTitle, post_body: postBody }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Failed to add post.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while adding the post.");
  }
});
