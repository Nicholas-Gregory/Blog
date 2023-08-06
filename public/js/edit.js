const postId = document.getElementById('post-id').dataset.id;

const saveHandler = async event => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const contents = document.getElementById('contents').value;

    const result = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title, contents
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (result.ok) {
        alert('Edits successfully saved!');
        document.location.replace('/dashboard');
    } else {
        alert((await result.json()).message);
    }
};

const deleteHandler = async event => {
    event.preventDefault();

    const result = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (result.ok) {
        alert("Post successfully deleted!");
        document.location.replace('/dashboard');
    } else {
        alert((await result.json()).message);
    }
};

document.getElementById('save').addEventListener('click', saveHandler);
document.getElementById('delete').addEventListener('click', deleteHandler);