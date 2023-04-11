// Set some global variables
import { token_admin, token_user } from './default_tokens.js'
import { order_getAll_local, order_deleteByID_local } from './default_apis.js'

let valid = true;
var arrayOrders = [];

function getAllOrdersApi() {
    let promise = axios({
        url: order_getAll_local,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token_admin
        }
    })

    promise.then(function (res) {
        // Handle if successfully get data
        arrayOrders = res.data;
        console.log(res.data);

        // Render products array to layout
        renderOrdersToTableOrders(arrayOrders);
        $('#example').DataTable();
    })

    promise.catch(function (err) {
        // Handle if failed
        console.log(err);
    })
};

// Automatically call APIs when page is loaded
getAllOrdersApi();

// Function delete order
const deleteOrderFunction = (e) => {
    event.preventDefault();
    let idOrder = e.currentTarget.getAttribute("data-idOrder");
    let confirmation = confirm("Do you want to delete this Order?");
    if (confirmation) {
        axios({
            url: order_deleteByID_local + idOrder,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token_admin
            }
        })
            .then(function (response) {
                alert("Delete successfully!");
                getAllOrdersApi();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
window.deleteOrderFunction = deleteOrderFunction;

// Function process selected order
const processOrderFunction = (e) => {
    event.preventDefault();
    let idSelectedToEditOrder = parseInt(e.currentTarget.getAttribute("data-idOrder"));
    for (let value of arrayOrders) {
        if (value.idOrder === idSelectedToEditOrder) {

            // Save all information of selected order for editting to localStorage
            customLocalStorage.saveItemToLocalStorage(value, "selectedToEditOrder");
        }
    }
    console.log(customLocalStorage.getItemFromLocalStorage("selectedToEditOrder"));
    window.location.href = 'order-edit.html';
}
window.processOrderFunction = processOrderFunction;

// Functions Render HTML
function renderOrdersToTableOrders(arrayOrders) {
    let contentHTML = '';
    for (let order of arrayOrders) {
        contentHTML += `
        <tr>
            <td>${order.idOrder}</td>
            <td>${order.dateOrder}</td>
            <td>${order.dateReceiptOrder}</td>
            <td>${order.shippingPriceOrder}</td>
            <td>${order.shippingMethodOrder}</td>
            <td>${order.quantityAllProductsInOrder}</td>
            <td>${order.totalSalePriceOrder}</td>
            <td>${order.totalFullPriceOrder}</td>
            <td>${order.paymentMethodOrder}</td>
            <td>${order.statusOrder}</td>
            <td style="display: flex !important; align-items: center !important;">
                <a style="margin-right: 5px !important;" href="#" data-idOrder="${order.idOrder}" onclick="processOrderFunction(event)"  class="btn btn-sm btn-primary">Edit</a>
                <a href="#" id="delete_order_button" data-idOrder="${order.idOrder}" onclick="deleteOrderFunction(event)" class="btn btn-sm btn-danger">Delete</a>
            </td>
        </tr>
            `;


    }
    document.getElementById('list_orders').innerHTML = contentHTML;
};




