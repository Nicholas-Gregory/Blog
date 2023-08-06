const handleCommentSubmit = async event => {
    event.preventDefault();

    const comment = document.getElementById('add-comment').value;
    const userId = Number(document.getElementById('current-user').dataset.userId);
    const postId = Number(document.getElementById('post-id').dataset.postId);

    const result = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            contents: comment,
            creatorId: userId,
            postId: postId
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (result.ok) {
        alert("Comment added successfully!");
        location.reload();
    } else {
        alert((await result.json()).message);
    }
};

document
    .getElementById('comment-form')
    .addEventListener('submit', handleCommentSubmit);