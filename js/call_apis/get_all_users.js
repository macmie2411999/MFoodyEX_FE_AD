// Set some global variables
import { token_admin, token_user } from './default_tokens.js'
let valid = true;

(async function getAllUsersApi() {
    // Get link and variables of Object
    var urlParams = new URLSearchParams(window.location.search);

    try {
        var res = await axios({
            url: 'http://localhost:8080/user/getAll',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token_admin
            }
        });

        // Handle if successfully get data
        let arrayUsers = res.data;
        console.log(res.data);

        // Render products array to layout
        renderUsersToTableUsers(arrayUsers);
        $('#example').DataTable();
    } catch (e) {
        console.log(err);
    }
})();

// Functions Render HTML
function renderUsersToTableUsers(arrayUsers) {
    let contentHTML = '';
    let i = 0;
    for (let user of arrayUsers) {
        if (user.roleUser === "ADMIN") {
            contentHTML += `
            <tr>
            <td>${++i}</td>
            <td>${user.emailUser}</td>
            <td>${user.nameUser}</td>
            <td>${user.phoneNumberUser}</td>
            <td>${user.addressUser}</td>
            <td>${user.roleUser}</td>
            <td>
                <a href="#" class="btn btn-sm btn-primary">Edit</a>
                <a href="user-details.html" class="btn btn-sm btn-info">Detail</a>
                <a href="#" class="btn btn-sm btn-danger disabled" title="Can't Delete Admin">Delete</a>
            </td>
        </tr>
            `;
        } else {
            contentHTML += `
            <tr>
            <td>${++i}</td>
            <td>${user.emailUser}</td>
            <td>${user.nameUser}</td>
            <td>${user.phoneNumberUser}</td>
            <td>${user.addressUser}</td>
            <td>${user.roleUser}</td>
            <td>
                <a href="#" class="btn btn-sm btn-primary">Edit</a>
                <a href="user-details.html" class="btn btn-sm btn-info">Detail</a>
                <a href="#" class="btn btn-sm btn-danger" onclick="deleteUser(${user.idUser})">Delete</a>
            </td>
        </tr>
            `;
        }

    }
    document.getElementById('list_users').innerHTML = contentHTML;
}

function deleteUser(userId) {
    let confirmation = confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
    if (confirmation) {
        axios({
            url: 'http://localhost:8080/user/delete/' + userId,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token_admin
            }
        })
            .then(function (response) {
                alert("Xóa người dùng thành công!");
                getAllUsersApi();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

// Call API to get array Users
// (function getAllUsersApi() {
//     let promise = axios({
//         url: 'http://localhost:8080/user/getAll',
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
//     })

//     promise.catch(function (err) {
//         // Handle if failed
//         console.log(err);
//     })
// })();

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

