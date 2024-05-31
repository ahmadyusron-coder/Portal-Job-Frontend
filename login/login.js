document.addEventListener('DOMContentLoaded', function () {
    const jobForm = document.getElementById('jobForm');
    const jobList = document.getElementById('jobList');
    const searchForm = document.getElementById('searchForm');

    if (jobForm) {
        jobForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const jobTitle = document.getElementById('jobTitle').value;
            const jobDescription = document.getElementById('jobDescription').value;
            const jobExperience = document.getElementById('jobExperience').value;
            const jobMajor = document.getElementById('jobMajor').value;

            if (jobTitle && jobDescription && jobExperience && jobMajor) {
                const jobItem = document.createElement('li');
                jobItem.className = 'list-group-item';

                const jobContent = `
                    <h5>${jobTitle}</h5>
                    <p>${jobDescription}</p>
                    <p><strong>Experience:</strong> ${jobExperience}</p>
                    <p><strong>Major:</strong> ${jobMajor}</p>
                `;
                jobItem.innerHTML = jobContent;

                jobList.appendChild(jobItem);

                // Clear form
                jobForm.reset();
            }
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const experience = document.getElementById('experience').value;
            const major = document.getElementById('major').value.toLowerCase();

            const jobs = jobList.getElementsByTagName('li');

            Array.from(jobs).forEach(function (job) {
                const jobExperience = job.querySelector('p strong').nextSibling.textContent.toLowerCase();
                const jobMajor = job.querySelectorAll('p strong')[1].nextSibling.textContent.toLowerCase();

                if ((experience === '' || jobExperience.includes(experience)) &&
                    (major === '' || jobMajor.includes(major))) {
                    job.style.display = '';
                } else {
                    job.style.display = 'none';
                }
            });
        });
    }

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });
    }
});