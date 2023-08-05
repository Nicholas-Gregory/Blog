const loginHandler = async event => {
    event.preventDefault();

    const usernameOrEmail = document.getElementById("username-or-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let result;
    if (usernameOrEmail.split('').includes('@')) {
        result = await fetch('/api/users/login?byEmail=true', {
            method: 'POST',
            body: JSON.stringify({
                email: usernameOrEmail,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        result = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                userName: usernameOrEmail,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (result.ok) {
        document.location.replace('/')
    } else {
        alert((await result.json()).message);
    }
};

const createAccountHandler = async event => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const userName = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const result = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email, 
            userName,
            password
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (result.ok) {
        document.location.replace('/');
    } else {
        alert((await result.json()).message)
    }

    console.log(result);
};

document.getElementById("login-form").addEventListener("submit", loginHandler);
document.getElementById("create-account-form").addEventListener("submit", createAccountHandler);