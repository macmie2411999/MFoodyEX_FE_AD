// Set some global variables
import { token_admin, token_user } from './default_tokens.js'
import { user_getAll_local, user_deleteByID_local } from './default_apis.js'

let valid = true;
var arrayUsers = [];

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_admin = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");

function getAllUsersApi() {
    let promise = axios({
        url: user_getAll_local,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token_current_admin
        }
    })

    promise.then(function (res) {
        // Handle if successfully get data
        arrayUsers = res.data;
        console.log(res.data);

        // Render products array to layout
        renderUsersToTableUsers(arrayUsers);
        $('#example').DataTable();
    })

    promise.catch(function (err) {
        // Handle if failed
        console.log(err);
    })
};

// Automatically call APIs when page is loaded
getAllUsersApi();

// Function delete user
const deleteUserFunction = (e) => {
    event.preventDefault();
    let idUser = e.currentTarget.getAttribute("data-idUser");
    let confirmation = confirm("Do you want to delete this User?");
    if (confirmation) {
        axios({
            url: user_deleteByID_local + idUser,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token_current_admin
            }
        })
            .then(function (response) {
                alert("Delete successfully!");
                getAllUsersApi();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
window.deleteUserFunction = deleteUserFunction;

// Function process selected user
const processUserFunction = (e) => {
    event.preventDefault();
    let idSelectedToEditUser = parseInt(e.currentTarget.getAttribute("data-idUser"));
    for(let value of arrayUsers){
        if(value.idUser === idSelectedToEditUser){

            // Save all information of selected user for editting to localStorage
            customLocalStorage.saveItemToLocalStorage(value, "MFdooy - selectedToEditUser");
        }
    }
    console.log(customLocalStorage.getItemFromLocalStorage("MFdooy - selectedToEditUser"));
    window.location.href = 'user-edit.html';
}
window.processUserFunction = processUserFunction;

// Functions Render HTML
function renderUsersToTableUsers(arrayUsers) {
    let contentHTML = '';
    for (let user of arrayUsers) {
        if (user.roleUser === "ADMIN") {
            contentHTML += `
            <tr>
                <td>${user.idUser}</td>
                <td>${user.emailUser}</td>
                <td>${user.nameUser}</td>
                <td>${user.phoneNumberUser}</td>
                <td>${user.addressUser}</td>
                <td>${user.roleUser}</td>
                <td >
                    <a href="#" data-idUser="${user.idUser}" onclick="processUserFunction(event)" class="btn btn-sm btn-primary">Edit</a>
                    <a href="user-details.html" class="btn btn-sm btn-info">Detail</a>
                    <a href="#" class="btn btn-sm btn-danger disabled" id="delete_user_button" data-idUser="${user.idUser}" onclick="deleteUserFunction(event)" title="Can't Delete Admin">Delete</a>
                </td>
            </tr>
            `;
        } else {
            contentHTML += `
            <tr>
                <td>${user.idUser}</td>
                <td>${user.emailUser}</td>
                <td>${user.nameUser}</td>
                <td>${user.phoneNumberUser}</td>
                <td>${user.addressUser}</td>
                <td>${user.roleUser}</td>
                <td>
                    <a href="#" data-idUser="${user.idUser}" onclick="processUserFunction(event)" class="btn btn-sm btn-primary">Edit</a>
                    <a href="user-details.html" class="btn btn-sm btn-info">Detail</a>
                    <a href="#" class="btn btn-sm btn-danger" id="delete_user_button" data-idUser="${user.idUser}" onclick="deleteUserFunction(event)" >Delete</a>
                </td>
            </tr>
            `;
        }

    }
    document.getElementById('list_users').innerHTML = contentHTML;
};




