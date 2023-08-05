const loginHandler = async event => {
    event.preventDefault();

    const usernameOrEmail = document.getElementById("username-or-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const result = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({

        }),
        headers: { 'Content-Type': 'application/json'}
    });
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

    console.log(result);
};

document.getElementById("login-form").addEventListener("submit", loginHandler);
document.getElementById("create-account-form").addEventListener("submit", createAccountHandler);