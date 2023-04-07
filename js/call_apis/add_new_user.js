// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';

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
                url: 'http://localhost:8080/user/add',
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
                    alert('Error occurred while adding user.');
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

//     // Create new user to return to server
//     var newUser = new User(userEmail, userPassword, userFullName, userGender, userPhoneNumber);
//     console.log(JSON.stringify(newUser));
//     callAPIRegister(JSON.stringify(newUser), "alert-register");
// }

// /**
//  * This function is used to call api and return to server infor of user registered
//  * and handle affairs after registering
//  * @param {*} returnData Data sent to server
//  * @param {*} alertId Show message success
//  */
// function callAPIRegister(returnData, alertId) {
//     let promise = axios({
//             url: 'https://shop.cyberlearn.vn/api/Users/signup',
//             method: 'POST',
//             data: returnData,
//             headers: {
//                 "Content-Type": "application/json-patch+json"
//             },
//         })
//         .then(function (response) {
//             // Handle if successfully return data
//             console.log(response);

//             document.getElementById(alertId).style.display = 'block';
//             document.getElementById("buttonSubmit").style.display = 'none';
//             document.getElementById(alertId).innerHTML = `Register successfully!`;
//         })
//         .catch(function (response) {
//             // Handle if failed
//             console.log(response);
//         });
// };

// /**
//  * Check if password is valid
//  * @param {*} errId Id tag of the error
//  * @returns boolean
//  */
// function checkPassword(password, confirmPassword, errId) {
//     let flagMatch = false;
//     if (password === confirmPassword) {
//         // Turn the flag on if there are any duplicates
//         flagMatch = true;
//     }

//     if (!flagMatch) {
//         document.getElementById(errId).style.display = 'block';
//         document.getElementById(errId).innerHTML = `Please re-check password!`;
//         return false;
//     }

//     document.getElementById(errId).style.display = 'none';
//     return true;
// }

// /**
//  * This function remove all the Vietnamese Tones
//  * @param {*} str String need to be re-formated
//  * @returns New re-formated string
//  */
// function removeVietnameseTones(str) {
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//     str = str.replace(/đ/g, "d");
//     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
//     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
//     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
//     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
//     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
//     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
//     str = str.replace(/Đ/g, "D");
//     // Some system encode vietnamese combining accent as individual utf-8 characters
//     // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
//     str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
//     str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
//     // Remove extra spaces
//     // Bỏ các khoảng trắng liền nhau
//     str = str.replace(/ + /g, " ");
//     str = str.trim();
//     // Remove punctuations
//     // Bỏ dấu câu, kí tự đặc biệt
//     str = str.replace(
//         /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
//         " "
//     );
//     return str;
// }

