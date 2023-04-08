// Set some global variables
import { token_admin, token_user } from './default_tokens.js'
import { user_getAll_local, user_deleteByID_local } from './default_apis.js'
let valid = true;

function getAllUsersApi() {
    let promise = axios({
        url: user_getAll_local,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token_admin
        }
    })

    promise.then(function (res) {
        // Handle if successfully get data
        let arrayUsers = res.data;
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
    let idUser = e.currentTarget.getAttribute("data-idUser");
    let confirmation = confirm("Do you want to delete this User?");
    if (confirmation) {
        axios({
            url: user_deleteByID_local + idUser,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token_admin
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
            <td>
                <a href="#" class="btn btn-sm btn-primary">Edit</a>
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
                <a href="#" class="btn btn-sm btn-primary">Edit</a>
                <a href="user-details.html" class="btn btn-sm btn-info">Detail</a>
                <a href="#" class="btn btn-sm btn-danger" id="delete_user_button" data-idUser="${user.idUser}" onclick="deleteUserFunction(event)" >Delete</a>
            </td>
        </tr>
            `;
        }

    }
    document.getElementById('list_users').innerHTML = contentHTML;
};

// Call API to get array Users
// (function getAllUsersApi() {
//     let promise = axios({
//         url: user_getAll_local,
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + token_admin
//         }
//     })

//     promise.then(function (res) {
//         // Handle if successfully get data
//         let arrayUsers = res.data;
//         console.log(res.data);

//         // Render products array to layout
//         renderUsersToTableUsers(arrayUsers);
//         $('#example').DataTable();
//     })

//     promise.catch(function (err) {
//         // Handle if failed
//         console.log(err);
//     })
// })();

// Automatically call APIs when page is loaded
// (async function getAllUsersApi() {
//     // Get link and variables of Object
//     var urlParams = new URLSearchParams(window.location.search);

//     try {
//         var res = await axios({
//             url: 'http://localhost:8080/user/getAll',
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer ' + token_admin
//             }
//         });

//         // Handle if successfully get data
//         let arrayUsers = res.data;
//         console.log(res.data);

//         // Render products array to layout
//         renderUsersToTableUsers(arrayUsers);
//         $('#example').DataTable();
//     } catch (e) {
//         console.log(err);
//     }
// })();

// function deleteUserFunction(userId) {
//     let confirmation = confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
//     if (confirmation) {
//         axios({
//             url: 'http://localhost:8080/user/delete/' + userId,
//             method: 'DELETE',
//             headers: {
//                 'Authorization': 'Bearer ' + token_admin
//             }
//         })
//             .then(function (response) {
//                 alert("Xóa người dùng thành công!");
//                 getAllUsersApi();
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }
// }

// function renderUsersToTableUsers(arrayUsers) {
//     let contentHTML = `
//     <table class="table" id="example">
//         <thead>
//             <tr>
//                 <th>STT</th>
//                 <th>Email</th>
//                 <th>Full Name</th>
//                 <th>Phone Number</th>
//                 <th>Adress</th>
//                 <th>Role</th>
//                 <th>Fuctions</th>
//             </tr>
//         </thead>
//         <tbody  class="list_users" id="list_users">`;
//     let i = 0;
//     for (let user of arrayUsers) {
//         if (user.roleUser === "ADMIN") {
//             contentHTML += `
//             <tr>
//             <td>${++i}</td>
//             <td>${user.emailUser}</td>
//             <td>${user.nameUser}</td>
//             <td>${user.phoneNumberUser}</td>
//             <td>${user.addressUser}</td>
//             <td>${user.roleUser}</td>
//             <td>
//                 <a href="#" class="btn btn-sm btn-primary">Edit</a>
//                 <a href="user-details.html" class="btn btn-sm btn-info">Detail</a>
//                 <a href="#" class="btn btn-sm btn-danger disabled" title="Can't Delete Admin">Delete</a>
//             </td>
//         </tr>
//             `;
//         } else {
//             contentHTML += `
//             <tr>
//             <td>${++i}</td>
//             <td>${user.emailUser}</td>
//             <td>${user.nameUser}</td>
//             <td>${user.phoneNumberUser}</td>
//             <td>${user.addressUser}</td>
//             <td>${user.roleUser}</td>
//             <td>
//                 <a href="#" class="btn btn-sm btn-primary">Edit</a>
//                 <a href="user-details.html" class="btn btn-sm btn-info">Detail</a>
//                 <a href="#" class="btn btn-sm btn-danger">Delete</a>
//             </td>
//         </tr>
//             `;
//         }

//     }
//     contentHTML += `</tbody>
//     </table>`;
//     document.getElementById('table-responsive').innerHTML = contentHTML;
// }

