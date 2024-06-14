document.addEventListener('DOMContentLoaded', function () {
    const jobList = document.getElementById('jobList');

    fetch('http://127.0.0.1:5000/list-job/', {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
        const jobs = data.jobs; // Change 'data.job' to 'data.jobs'
        jobs.forEach(job => {
            const jobItem = document.createElement('li');
            jobItem.className = 'list-group-item';

            const jobContent = `
                <h5>${job.name_job}</h5>
                <p>${job.detail}</p>
                <p><strong>Exprience:</strong> ${job.exprience}</p> <!-- Change 'exprience' to 'experience' -->
                <p><strong>Major:</strong> ${job.major}</p>
                <p><strong>Company:</strong> ${job.company.name} (${job.company.country})</p>
            `;
            jobItem.innerHTML = jobContent;

            jobList.appendChild(jobItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});



document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password input values
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Prepare the data to be sent
    const data = {
        username: username,
        password: password
    };

    // Fetch request to the login endpoint
    fetch("http://127.0.0.1:5000/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
       
        return response.json();
    })
    .then(data => {
        // Handle successful login response
        document.getElementById("loginSuccessAlert").classList.remove("d-none");
        // document.getElementById("loginErrorAlert").classList.add("d-none");
        console.log(data)
        // Redirect user based on user type
        if (data.user_type === "jobseeker") {
            window.location.href = "../jobseeker/dashboard_jobseeker.html";
        } else if (data.user_type === "company") {
            window.location.href = "../company/dashboard-company.html";
        } else {
            console.error("Invalid user type");
        }
    })
    .catch(error => {
        // Handle login error
        document.getElementById("loginErrorAlert").classList.remove("d-none");
        document.getElementById("loginSuccessAlert").classList.add("d-none");
        console.error("There was a problem with the fetch operation:", error);
    });
});

document.getElementById('registerFormCompany').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    
    const formData = new FormData();
    formData.append('username', document.getElementById('registerUsername').value);
    formData.append('email', document.getElementById('registerEmail').value);
    formData.append('password', document.getElementById('registerPassword').value);
    
    fetch('http://127.0.0.1:5000/register_company/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Success Create Company') {
            document.getElementById('registerSuccessAlert').classList.remove('d-none');
            document.getElementById('registerSuccessAlert').classList.add('show');
        } else {
            alert('Error: ' + (data.error || data.message));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});

document.getElementById('registerFormJobseeker').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    
    const formData = new FormData();
    formData.append('username', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('password', document.getElementById('password').value);
    
    fetch('http://127.0.0.1:5000/register_jobseeker/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Success Create Jobseeker') {
            document.getElementById('registerSuccessAlert1').classList.remove('d-none');
            document.getElementById('registerSuccessAlert1').classList.add('show');
        } else {
            alert('Error: ' + (data.error || data.message));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});