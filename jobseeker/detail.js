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
    fetch('http://127.0.0.1:5000/profile_jobseeker/', {
        method: 'GET',
        credentials: 'include'  // This ensures cookies are sent with the request
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error fetching profile data:', data.error);
            return;
        }
        document.getElementById('name').value = data.name;
        document.getElementById('major').value = data.major;
        document.getElementById('age').value = data.age;
        document.getElementById('address').value = data.address;
        document.getElementById('number').value = data.number;
        document.getElementById('exprience').value = data.exprience;
        document.getElementById('name_company').value = data.name_company;
        document.getElementById('field_work').value = data.field_work;
    })
    .catch(error => console.error('Error fetching profile data:', error));
});