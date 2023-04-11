// Set some global variables
import { token_admin, token_user } from './default_tokens.js'
import { product_getAll_local, product_deleteByID_local } from './default_apis.js'

let valid = true;
var arrayProducts = [];

function getAllProductsApi() {
    let promise = axios({
        url: product_getAll_local,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token_admin
        }
    })

    promise.then(function (res) {
        // Handle if successfully get data
        arrayProducts = res.data;
        console.log(res.data);

        // Render products array to layout
        renderProductsToTableProducts(arrayProducts);
        $('#example').DataTable();
    })

    promise.catch(function (err) {
        // Handle if failed
        console.log(err);
    })
};

// Automatically call APIs when page is loaded
getAllProductsApi();

// Function delete product
const deleteProductFunction = (e) => {
    event.preventDefault();
    let idProduct = e.currentTarget.getAttribute("data-idProduct");
    let confirmation = confirm("Do you want to delete this Product?");
    if (confirmation) {
        axios({
            url: product_deleteByID_local + idProduct,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token_admin
            }
        })
            .then(function (response) {
                alert("Delete successfully!");
                getAllProductsApi();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
window.deleteProductFunction = deleteProductFunction;

// Function process selected product
const processProductFunction = (e) => {
    event.preventDefault();
    let idSelectedToEditProduct = parseInt(e.currentTarget.getAttribute("data-idProduct"));
    for (let value of arrayProducts) {
        if (value.idProduct === idSelectedToEditProduct) {

            // Save all information of selected product for editting to localStorage
            customLocalStorage.saveItemToLocalStorage(value, "selectedToEditProduct");
        }
    }
    console.log(customLocalStorage.getItemFromLocalStorage("selectedToEditProduct"));
    window.location.href = 'product-edit.html';
}
window.processProductFunction = processProductFunction;

// Functions Render HTML
function renderProductsToTableProducts(arrayProducts) {
    let contentHTML = '';
    for (let product of arrayProducts) {
        contentHTML += `
        <tr >
            <td>${product.idProduct}</td>
            <td>${product.nameProduct}</td>
            <td>${product.albumProduct}</td>
            <td style="width: 300px !important; display: flex; padding: 20px 8px !important;">${product.descriptionProduct}</td>
            <td>${product.salePriceProduct}</td>
            <td>${product.fullPriceProduct}</td>
            <td>${product.weightProduct}</td>
            <td>${product.importQuantityProduct}</td>
            <td>${product.importDateProduct}</td>
            <td>${product.storehouseQuantityProduct}</td>
            <td>${product.ratingProduct}</td>
            <td>${product.categoryProduct}</td>
            <td>${product.brandProduct}</td>
            <td style="display: flex !important; align-items: center !important;">
                <a style="margin-right: 5px !important;" href="#" data-idProduct="${product.idProduct}" onclick="processProductFunction(event)" class="btn btn-sm btn-primary">Edit</a>
                <a href="#" id="delete_product_button" data-idProduct="${product.idProduct}" onclick="deleteProductFunction(event)" class="btn btn-sm btn-danger">Delete</a>
            </td>
        </tr>
            `;
    }
document.getElementById('list_products').innerHTML = contentHTML;
};




