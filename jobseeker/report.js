document.addEventListener('DOMContentLoaded', () => {
    fetch('/apply-job/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')  // Assuming you use token-based auth
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
    })
    .then(data => {
        const jobApplicationsDiv = document.getElementById('job-applications');
        if (data.apply_job && data.apply_job.length > 0) {
            data.apply_job.forEach(job => {
                const jobDiv = document.createElement('div');
                jobDiv.classList.add('job-application');
                jobDiv.innerHTML = `
                    <h3>${job.job.name_job}</h3>
                    <p><strong>Detail:</strong> ${job.job.detail}</p>
                    <p><strong>Major:</strong> ${job.job.major}</p>
                    <p><strong>Company:</strong> ${job.job.company.name} (${job.job.company.country})</p>
                    <p><strong>Status:</strong> ${job.status}</p>
                    <p><strong>Applied on:</strong> ${new Date(job.created_at).toLocaleString()}</p>
                    <p><strong>Last updated:</strong> ${new Date(job.updated_at).toLocaleString()}</p>
                `;
                jobApplicationsDiv.appendChild(jobDiv);
            });
        } else {
            jobApplicationsDiv.innerHTML = '<p>No job applications found.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching job applications:', error);
        const jobApplicationsDiv = document.getElementById('job-applications');
        jobApplicationsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
