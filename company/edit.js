document.addEventListener("DOMContentLoaded", function () {
  const jobList = document.getElementById("jobList");
  const editJobModal = new bootstrap.Modal(
    document.getElementById("editJobModal")
  );
  let currentJobId;

  fetch("http://127.0.0.1:5000/job/", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((job) => {
          const jobItem = document.createElement("li");
          jobItem.className = "list-group-item";

          const jobContent = `
                        <h5>${job.name_job}</h5>
                        <p>${job.detail}</p>
                        <p><strong>Experience:</strong> ${job.exprience}</p>
                        <p><strong>Major:</strong> ${job.major}</p>
                        <p><strong>Name Company:</strong> ${job.name_company}</p>
                        <p><strong>Created At:</strong> ${job.created_at}</p>
                        <p><strong>Updated At:</strong> ${job.updated_at}</p>
                        <p><button type="button" class="btn btn-primary edit-button" data-bs-toggle="modal" data-bs-target="#editJobModal" data-id="${job.id}">Edit</button></p>
                        <p><button type="button" class="btn btn-danger delete-button" data-id="${job.id}">Delete</button></p>
                        
                    `;
          jobItem.innerHTML = jobContent;

          jobList.appendChild(jobItem);
        });

        // Add event listeners to edit buttons
        document.querySelectorAll(".edit-button").forEach((button) => {
          button.addEventListener("click", function () {
            currentJobId = this.getAttribute("data-id");
            fetch(`http://127.0.0.1:5000/job/${currentJobId}`, {
              method: "GET",
              credentials: "include",
            })
              .then((response) => response.json())
              .then((job) => {
                document.getElementById("editJobName").value = job.name_job;
                document.getElementById("editJobDetail").value = job.detail;
                document.getElementById("editJobExperience").value =
                  job.exprience;
                document.getElementById("editJobMajor").value = job.major;
                editJobModal.show();
              })
              .catch((error) =>
                console.error("Error fetching job details:", error)
              );
          });
        });
        // Tambahkan event listener untuk tombol simpan
        document
        .getElementById("saveJobChanges")
        .addEventListener("click", function () {
          const updatedJob = new FormData();
          updatedJob.append("name_job", document.getElementById("editJobName").value);
          updatedJob.append("detail", document.getElementById("editJobDetail").value);
          updatedJob.append("exprience", document.getElementById("editJobExperience").value);
          updatedJob.append("major", document.getElementById("editJobMajor").value);
      
          fetch(`http://127.0.0.1:5000/job/${currentJobId}`, {
            method: "PUT",
            credentials: "include",
            body: updatedJob,
          })
            .then((response) => {
              if (response.ok) {
                // Close modal and perform other necessary actions, like updating the job list
                editJobModal.hide();
                console.log("Job updated successfully");
              } else {
                console.error("Failed to update job");
              }
            })
            .catch((error) => console.error("Error updating job:", error));
            
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".delete-button").forEach((button) => {
          button.addEventListener("click", async function () {
            const jobIdToDelete = this.getAttribute("data-id");
            
            if (confirm("Are you sure you want to delete this job?")) {
              try {
                const response = await fetch(`http://127.0.0.1:5000/job/${jobIdToDelete}`, {
                  method: "DELETE",
                  credentials: "include",
                });
        
                if (response.ok) {
                  location.reload();
                  console.log("Job deleted successfully", data);
                  // You can add code here to remove the job element from the page
                  // or refresh the job list
                } else {
                  console.error("Failed to delete job");
                }
              } catch (error) {
                console.error("Error deleting job:", error);
              }
            }
          });
        });
        

        

      
      } else {
        console.error("Unexpected response format:", data);
      }
    })

    
    .catch((error) => console.error("Error fetching data:", error));



    // document.addEventListener("DOMContentLoaded", function () {
    //     document
    //       .getElementById("deleteJobButton")
    //       .addEventListener("click", function () {
    //         fetch(`http://127.0.0.1:5000/job/${currentJobId}`, {
    //           method: "DELETE",
    //           credentials: "include",
    //         })
    //           .then((response) => {
    //             if (response.ok) {
    //               // Perform necessary actions after successful deletion, such as updating the job list
    //               console.log("Job deleted successfully");
    //             } else {
    //               console.error("Failed to delete job");
    //             }
    //           })
    //           .catch((error) => console.error("Error deleting job:", error));
    //       });
    //   });
      
  

  // document.getElementById('saveJobChanges').addEventListener('click', function () {
  //     const updatedJob = {
  //         name_job: document.getElementById('editJobName').value,
  //         detail: document.getElementById('editJobDetail').value,
  //         exprience: document.getElementById('editJobExperience').value,
  //         major: document.getElementById('editJobMajor').value,
  //         last_application: document.getElementById('editJobLastApplication').value
  //     };

  //     fetch(`http://127.0.0.1:5000/job/${currentJobId}`, {
  //         method: 'PUT',
  //         credentials: 'include',
  //         body: updatedJob
  //     })
  //         .then(response => response.json())
  //         .then(data => {
  //             if (data.message === 'Update Success') {
  //                 editJobModal.hide();
  //                 window.location.reload();
  //             } else {
  //                 console.error('Error updating job:', data.message);
  //             }
  //         })
  //         .catch(error => console.error('Error updating job:', error));
  // });





});

 // Add event listener to save new job button
 document.getElementById("saveNewJob").addEventListener("click", function () {
  const newJob = new FormData();
  newJob.append("name_job", document.getElementById("addJobName").value);
  newJob.append("detail", document.getElementById("addJobDetail").value);
  newJob.append("exprience", document.getElementById("addJobExprience").value);
  newJob.append("major", document.getElementById("addJobMajor").value);

  fetch("http://127.0.0.1:5000/job/", {
    method: "POST",
    credentials: "include",
    body: newJob,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("New job added successfully:", data);
      // addJobModal.hide();
      window.location.reload();
    })
    .catch((error) => console.error("Error adding new job:", error));
});

