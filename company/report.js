document.addEventListener('DOMContentLoaded', function () {
    const jobList = document.getElementById('report');

    fetch('http://127.0.0.1:5000/report_company/2', {
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
                    <p><a href="./edit.html"><button type="button" class="btn btn-primary" id="editButton">Edit</button></a></p>
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