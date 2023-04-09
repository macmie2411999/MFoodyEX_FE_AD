// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { user_edit_local } from './default_apis.js';

var selectedUserForEditing = customLocalStorage.getItemFromLocalStorage("selectedToEditUser");

// Functions Render HTML
function renderUserInformation() {
    let contentHTML = '';

    contentHTML += `
    <div class="form-group">
        <label for="example-email" class="col-md-12">Email</label>
        <div class="col-md-12">
            <input type="email" placeholder="${selectedUserForEditing.emailUser}" value="${selectedUserForEditing.emailUser}"
                class="form-control form-control-line" id="emailUser" name="emailUser">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Password</label>
        <div class="col-md-12">
            <input type="password" placeholder="password" class="form-control form-control-line"
                id="passwordUser" name="passwordUser">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Repeat Password</label>
        <div class="col-md-12">
            <input type="password" placeholder="password" class="form-control form-control-line"
                id="rePasswordUser" name="rePasswordUser">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Full Name</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedUserForEditing.nameUser}" value="${selectedUserForEditing.nameUser}"
                class="form-control form-control-line" id="nameUser" name="nameUser">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Phone Number</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedUserForEditing.phoneNumberUser}"
                class="form-control form-control-line" id="phoneNumberUser" value="${selectedUserForEditing.phoneNumberUser}">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Address</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedUserForEditing.addressUser}" value="${selectedUserForEditing.addressUser}"
                class="form-control form-control-line" id="addressUser" name="addressUser">
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-12">Role</label>
        <div class="col-sm-12">
            <select class="form-control form-control-line" id="roleUser">
            <option value="USER" ${selectedUserForEditing.roleUser === 'USER' ? 'selected' : ''}>USER</option>
            <option value="ADMIN" ${selectedUserForEditing.roleUser === 'ADMIN' ? 'selected' : ''}>ADMIN</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-12">
            <button type="submit" class="btn btn-success" id="buttonSubmitAddUser">Save
                User</button>
            <a href="user-table.html" class="btn btn-primary">Go Back</a>
        </div>
    </div>
            `;
    document.getElementById('edit_user_form').innerHTML = contentHTML;
};

renderUserInformation();

$(document).ready(function () {
    $('#edit_user_form').validate({
        rules: {
            emailUser: {
                required: true,
                email: true
            },
            passwordUser: {
                required: true,
                minlength: 8
            },
            rePasswordUser: {
                required: true,
                minlength: 8,
                equalTo: "#passwordUser"
            },
            nameUser: {
                required: true,
                minlength: 6
            },
            phoneNumberUser: {
                required: true,
                number: true,
                minlength: 6,
                maxlength: 15
            },
            addressUser: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            emailUser: {
                required: "Please enter your email address.",
                email: "Please enter a valid email address."
            },
            passwordUser: {
                required: "Please enter your password.",
                minlength: "Your password must be at least 8 characters long."
            },
            rePasswordUser: {
                required: "Please confirm your password.",
                minlength: "Your password must be at least 8 characters long.",
                equalTo: "Your passwords do not match."
            },
            nameUser: {
                required: "Please enter your full name."
            },
            phoneNumberUser: {
                required: "Please enter your phone number.",
                number: "Please enter a valid phone number."
            },
            addressUser: {
                required: "Please enter your address."
            }
        },
        submitHandler: function () {
            let email = $('#emailUser').val();
            let password = $('#passwordUser').val();
            let name = $('#nameUser').val();
            let phoneNumber = $('#phoneNumberUser').val();
            let address = $('#addressUser').val();
            let role = $('#roleUser').val();

            let newUser = {
                idUser: selectedUserForEditing.idUser,
                emailUser: email,
                passwordUser: password,
                nameUser: name,
                phoneNumberUser: phoneNumber,
                addressUser: address,
                roleUser: role
            };
            console.log(newUser);
            let promise = axios({
                url: user_edit_local,
                method: 'PUT',
                data: newUser,
                headers: {
                    // "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token_admin
                }
            })
                .then(function (response) {
                    console.log(response);
                    alert('User editted successfully!');
                })
                .catch(function (response) {
                    console.log(response);
                    // alert('Error occurred while adding user.');
                    alert(response.response.data)
                });
        }
    });
});


