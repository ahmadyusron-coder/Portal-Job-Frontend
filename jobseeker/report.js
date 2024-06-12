// document.addEventListener("DOMContentLoaded", function() {
//     fetch('http://127.0.0.1:5000/apply-job/', {
//         method: 'GET',
//         credentials: 'include'  // This ensures cookies are sent with the request
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message) {
//             console.error('Error fetching profile data:', data.message);
//             return;
//         }
//         let applyJobList = data.apply_job;
//         if (applyJobList && applyJobList.length > 0) {
//             let job = applyJobList[0].job;  // Assuming the job data is in the first element
//             let applyJobData = applyJobList[0];  // Assuming the applyJobData is the first element

//             document.getElementById('company').value = job.company.name || '';
//             document.getElementById('country').value = job.company.country || '';
//             document.getElementById('name').value = job.name_job || '';
//             document.getElementById('detail').value = job.detail || '';
//             document.getElementById('major').value = job.major || '';
//             document.getElementById('name_job').value = job.name_job || '';

//             document.getElementById('status').value = applyJobData.status || '';
//         }
//     })
//     .catch(error => console.error('Error fetching profile data:', error));
// });



document.addEventListener('DOMContentLoaded', function () {
    const jobList = document.getElementById('job');

    fetch('http://127.0.0.1:5000/apply-job/', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.error('Error fetching data:', data.message);
            return;
        }
        
        const jobs = data.apply_job;
        jobs.forEach(jobData => {
            const job = jobData.job;

            const jobItem = document.createElement('li');
            jobItem.className = 'list-group-item';

            const jobContent = `
                <h5>${job.name_job}</h5>
                <p>${job.detail}</p>
                <p><strong>Company:</strong> ${job.company.name}</p>
                <p><strong>Major:</strong> ${job.major}</p>
                <p><strong>Country:</strong> ${job.company.country}</p>
                <p><strong>Status:</strong> ${jobData.status}</p>
                `;
            jobItem.innerHTML = jobContent;

            jobList.appendChild(jobItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});
