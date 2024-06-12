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


$(document).ready(function() {
    $('#editButton').on('click', function() {
        // Populate the modal fields with the current values
        $('#editName').val($('#name').val());
        $('#editMajor').val($('#major').val());
        $('#editAge').val($('#age').val());
        $('#editAddress').val($('#address').val());
        $('#editNumber').val($('#number').val());
        $('#editExprience').val($('#exprience').val());
        $('#editNameCompany').val($('#name_company').val());
        $('#editFieldWork').val($('#field_work').val());
    });

    $('#saveChangesButton').on('click', function() {
        // Save changes from modal to the main form
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
    });
});

$(document).ready(function() {
    $('#editButtonUser').on('click', function() {
        $('#editUser').val($('#userName').val());
        $('#editEmail').val($('#email').val());
    });

    $('#saveChangesButtonUser').on('click', function() {
        $('#userName').val($('#editUser').val());
        $('#email').val($('#editEmail').val());

        $('#editModalUser').modal('hide');
    });
});
