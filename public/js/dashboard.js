const postSubmitHandler = async event => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const contents = document.getElementById('contents').value;

    const result = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title, 
            contents
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (result.ok) {
        alert("Post added successfully!")
        document.location.replace('/')
    } else {
        alert((await result.json()).message);
    }
};

document.getElementById('post-submission-form').addEventListener('submit', postSubmitHandler);