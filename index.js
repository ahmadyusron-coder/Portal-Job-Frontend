document.addEventListener('DOMContentLoaded', function () {
    const jobList = document.getElementById('jobList');

    fetch('http://127.0.0.1:5000/list-job/')
        .then(response => response.json())
        .then(data => {
            const jobs = data.job;
            jobs.forEach(job => {
                const jobItem = document.createElement('li');
                jobItem.className = 'list-group-item';

                const jobContent = `
                    <h5>${job.name_job}</h5>
                    <p>${job.detail}</p>
                    <p><strong>Experience:</strong> ${job.exprience}</p>
                    <p><strong>Major:</strong> ${job.major}</p>
                    <p><strong>Company:</strong> ${job.company.name} (${job.company.country})</p>
                    <p><strong>Date Posted:</strong> ${job.date_posted}</p>
                    <p><strong>Last Application:</strong> ${job.last_application}</p>
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