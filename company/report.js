document.addEventListener('DOMContentLoaded', function () {
    const jobList = document.getElementById('report');

    fetch('http://127.0.0.1:5000/report_company/', {
        method: 'GET',
        credentials: 'include'  // Include credentials if needed for session management
    })
    .then(response => response.json())
    .then(data => {
        const jobs = data.company;  // Ensure this matches the structure returned by your API
        jobs.forEach(job => {
            const jobItem = document.createElement('li');
            jobItem.className = 'list-group-item';

            // Create job content
            const jobContent = `
                <h5>${job.name_job}</h5>
                <p>${job.detail}</p>
                <p><strong>Experience:</strong> ${job.exprience}</p>
                <p><strong>Date Posted:</strong> ${job.date_posted}</p>
                <p><strong>Major:</strong> ${job.major}</p>
                <p><strong>Total Workers:</strong> ${job.total_worker}</p>
            `;

            // Create a list of jobseekers
            const jobseekerList = document.createElement('ul');
            jobseekerList.className = 'list-group mt-3';

            job.jobseekers.forEach(jobseeker => {
                const jobseekerItem = document.createElement('li');
                jobseekerItem.className = 'list-group-item';

                const jobseekerContent = `
                    <p id="jobseeker"><strong>id:</strong> ${jobseeker.id}</p>
                    <p><strong>Name:</strong> ${jobseeker.name}</p>
                    <p><strong>Major:</strong> ${jobseeker.major}</p>
                    <p><strong>Age:</strong> ${jobseeker.age}</p>
                    <p><strong>Address:</strong> ${jobseeker.address}</p>
                    <p><strong>Number:</strong> ${jobseeker.number}</p>
                    <p><strong>Experience:</strong> ${jobseeker.exprience}</p>
                    <p><strong>Company:</strong> ${jobseeker.name_company}</p>
                    <p><strong>Field of Work:</strong> ${jobseeker.field_work}</p>
                    <p><strong>Created At:</strong> ${jobseeker.created_at}</p>
                    <p><strong>Updated At:</strong> ${jobseeker.updated_at}</p>
                    <p><strong>Status Jobseeker:</strong> ${jobseeker.status}</p>
                    <p><a><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></a></p>
                `;
                jobseekerItem.innerHTML = jobseekerContent;

                jobseekerList.appendChild(jobseekerItem);
            });

            jobItem.innerHTML = jobContent;
            jobItem.appendChild(jobseekerList);
            jobList.appendChild(jobItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editButton');
    const editForm = document.getElementById('editForm');
    const jobseekerStatus = document.getElementById('status');
    
    editButton.addEventListener('click', function() {
        $('#editModal').modal('show');
        jobseekerStatus.value = jobseeker.status; // Pre-fill with current status
    });
    
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const status = jobseekerStatus.value;

        fetch(`/report-apply/${jobseeker.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timeline: [
                    {
                        id_job: jobseeker.id, // Adjust accordingly if necessary
                        apply_job: status
                    }
                ]
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Success') {
                jobseeker.status = status; // Update the jobseeker object
                document.querySelector('[strong>Status Jobseeker:</strong>').textContent = `Status Jobseeker: ${status}`;
                $('#editModal').modal('hide');
            } else {
                alert('Failed to update status');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
