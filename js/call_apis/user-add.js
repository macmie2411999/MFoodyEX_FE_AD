// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { user_add_local } from './default_apis.js';

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_admin = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");

$(document).ready(function () {
    $('#add_new_user_form').validate({
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
                emailUser: email,
                passwordUser: password,
                nameUser: name,
                phoneNumberUser: phoneNumber,
                addressUser: address,
                roleUser: role
            };
            console.log(newUser);
            let promise = axios({
                url: user_add_local,
                method: 'POST',
                data: newUser,
                // headers: {
                //     // "Content-Type": "application/json",
                //     'Authorization': 'Bearer ' + token_admin
                // },
            })
                .then(function (response) {
                    console.log(response);
                    alert('User added successfully!');
                })
                .catch(function (response) {
                    console.log(response);
                    alert(response.response.data)
                });
        }
    });
});


// // Set event for button Submit
// document.querySelector('#buttonSubmitAddUser').onclick = function () {
//     // Get the input
//     let emailUser = document.querySelector('#emailUser').value;
//     let passwordUser = document.querySelector('#passwordUser').value;
//     let rePasswordUser = document.querySelector('#rePasswordUser').value;
//     let nameUser = document.querySelector('#nameUser').value;
//     let phoneNumberUser = document.querySelector('#phoneNumberUser').value;
//     let addressUser = document.querySelector('#addressUser').value;
//     let roleUser = document.querySelector('roleUser').value;
//     console.log(userFullName + userEmail + userGender);

//     // Check if password matches
//     valid = checkPassword(userPassword, userConfirmPassword, "alert-password-match");
//     valid &= validation.checkEmailInput(userEmail, 'alert-email', "Email");
//     valid &= validation.checkLengthInput(userPassword, 'alert-password-length', "Password", 6, 30);
//     valid &= validation.checkNumberInput(userPhoneNumber, 'alert-phonenumber', "Phone Number");
//     if (!valid) {
//         return;
//     }
