document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:5000/profile/', {
        method: 'GET',
        credentials: 'include'  // This ensures cookies are sent with the request
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').value = data.username;
        document.getElementById('email').value = data.email;
        // If the password field is to be used in the future:
        // document.getElementById('password').value = data.password;
    })
    .catch(error => console.error('Error fetching user data:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:5000/profile_company/', {
        method: 'GET',
        credentials: 'include'  // This ensures cookies are sent with the request
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error fetching profile data:', data.error);
            return;
        }
        document.getElementById('name_company').value = data.name_company;
        document.getElementById('number').value = data.number;
        document.getElementById('detail_company').value = data.detail_company;
        document.getElementById('country').value = data.country;
    })
    .catch(error => console.error('Error fetching profile data:', error));
});
