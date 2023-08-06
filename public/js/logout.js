const logoutClickHandler = async event => {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert("Not logged in");
    }
}

document.getElementById('logout').addEventListener('click', logoutClickHandler);