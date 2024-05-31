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
