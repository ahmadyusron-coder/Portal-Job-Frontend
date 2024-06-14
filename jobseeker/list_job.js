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
                <button type="submit" class="btn btn-primary" >Apply Job</button>
            `;
            jobItem.innerHTML = jobContent;

            jobList.appendChild(jobItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});