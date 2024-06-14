document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:5000/profile/', {
        method: 'GET',
        credentials: 'include'  // This ensures cookies are sent with the request
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').value = data.username;
        document.getElementById('email').value = data.email;
        // If the password field is to be used in the future:
        // document.getElementById('password').value = data.password;
    })
    .catch(error => console.error('Error fetching user data:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:5000/profile_jobseeker/', {
        method: 'GET',
        credentials: 'include'  // This ensures cookies are sent with the request
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error fetching profile data:', data.error);
            return;
        }
        document.getElementById('name').value = data.name;
        document.getElementById('major').value = data.major;
        document.getElementById('age').value = data.age;
        document.getElementById('address').value = data.address;
        document.getElementById('number').value = data.number;
        document.getElementById('exprience').value = data.exprience;
        document.getElementById('name_company').value = data.name_company;
        document.getElementById('field_work').value = data.field_work;
    })
    .catch(error => console.error('Error fetching profile data:', error));
});


    $('#editButton').on('click', function() {
        $('#editName').val($('#name').val());
        $('#editMajor').val($('#major').val());
        $('#editAge').val($('#age').val());
        $('#editAddress').val($('#address').val());
        $('#editNumber').val($('#number').val());
        $('#editExprience').val($('#exprience').val());
        $('#editNameCompany').val($('#name_company').val());
        $('#editFieldWork').val($('#field_work').val());
    });

    // Save changes from modal to the main form and send PUT request to update profile
    $('#saveChangesButton').on('click', function() {
        $('#name').val($('#editName').val());
        $('#major').val($('#editMajor').val());
        $('#age').val($('#editAge').val());
        $('#address').val($('#editAddress').val());
        $('#number').val($('#editNumber').val());
        $('#exprience').val($('#editExprience').val());
        $('#name_company').val($('#editNameCompany').val());
        $('#field_work').val($('#editFieldWork').val());

        // Close the modal
        $('#editModal').modal('hide');

        // Prepare data for PUT request
        const updatedData = {
            name: $('#editName').val(),
            major: $('#editMajor').val(),
            age: $('#editAge').val(),
            address: $('#editAddress').val(),
            number: $('#editNumber').val(),
            exprience: $('#editExprience').val(),
            name_company: $('#editNameCompany').val(),
            field_work: $('#editFieldWork').val()
        };

        const jobId = 2; // Replace with the actual jobseeker ID or fetch dynamically if needed

        fetch(`/profile_jobseeker/${jobId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Show success or error message
            // Optionally update the main form fields with updated values
            $('#name').val(updatedData.name);
            $('#major').val(updatedData.major);
            $('#age').val(updatedData.age);
            $('#address').val(updatedData.address);
            $('#number').val(updatedData.number);
            $('#exprience').val(updatedData.exprience);
            $('#name_company').val(updatedData.name_company);
            $('#field_work').val(updatedData.field_work);
        })
        .catch(error => console.error('Error updating profile:', error));
    });