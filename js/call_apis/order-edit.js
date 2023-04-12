// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { order_edit_local } from './default_apis.js';

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

// Get current user's token
const token_current_admin = customLocalStorage.getItemFromLocalStorage("MFoody - tokenCurrentUser");

// Get selected order
const selectedOrderForEditing = customLocalStorage.getItemFromLocalStorage("MFdooy - selectedToEditOrder");
console.log(selectedOrderForEditing);

// Functions Render HTML
function renderOrderInformation() {
    let contentHTML = '';

    contentHTML += `
    <div class="form-group">
        <label class="col-md-12">Date Order</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedOrderForEditing.dateOrder}" value="${selectedOrderForEditing.dateOrder}"
                class="form-control form-control-line" id="dateOrder" name="dateOrder">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Date Receipt Order</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedOrderForEditing.dateReceiptOrder}" value="${selectedOrderForEditing.dateReceiptOrder}"
                class="form-control form-control-line" id="dateReceiptOrder" name="dateReceiptOrder">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Shipping Fee (Rup)</label>
        <div class="col-md-12">
            <input type="number" placeholder="${selectedOrderForEditing.shippingPriceOrder}" value="${selectedOrderForEditing.shippingPriceOrder}"
                class="form-control form-control-line" id="shippingPriceOrder" name="shippingPriceOrder">
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-12">Shipping Method</label>
        <div class="col-sm-12">
            <select class="form-control form-control-line" id="shippingMethodOrder">
                <option value="Recieve at Store" ${selectedOrderForEditing.shippingMethodOrder === 'Recieve at Store' ? 'selected' : ''}>Recieve at Store</option>
                <option value="Shipping Service" ${selectedOrderForEditing.shippingMethodOrder === 'Shipping Service' ? 'selected' : ''}>Shipping Service</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Total Quantity</label>
        <div class="col-md-12">
            <input type="number" placeholder="${selectedOrderForEditing.quantityAllProductsInOrder}" value="${selectedOrderForEditing.quantityAllProductsInOrder}"
                class="form-control form-control-line" id="quantityAllProductsInOrder" name="quantityAllProductsInOrder">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Total Sale Price (Rup)</label>
        <div class="col-md-12">
            <input type="number" placeholder="${selectedOrderForEditing.totalSalePriceOrder}" value="${selectedOrderForEditing.totalSalePriceOrder}"
                class="form-control form-control-line" id="totalSalePriceOrder" name="totalSalePriceOrder">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Total Full Price (Rup)</label>
        <div class="col-md-12">
            <input type="number" placeholder="${selectedOrderForEditing.totalFullPriceOrder}" value="${selectedOrderForEditing.totalFullPriceOrder}"
                class="form-control form-control-line" id="totalFullPriceOrder" name="totalFullPriceOrder">
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-12">Payment Method</label>
        <div class="col-sm-12">
            <select class="form-control form-control-line" id="paymentMethodOrder">
                <option value="Cash" ${selectedOrderForEditing.paymentMethodOrder === 'Cash' ? 'selected' : ''}>Cash</option>
                <option value="Credit Card" ${selectedOrderForEditing.paymentMethodOrder === 'Credit Card' ? 'selected' : ''}>Credit Card</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-12">Status Order</label>
        <div class="col-sm-12">
            <select class="form-control form-control-line" id="statusOrder">
                <option value="Processing" ${selectedOrderForEditing.statusOrder === 'Processing' ? 'selected' : ''}>Processing</option>
                <option value="Completed" ${selectedOrderForEditing.statusOrder === 'Completed' ? 'selected' : ''}>Completed</option>
                <option value="Aborted" ${selectedOrderForEditing.statusOrder === 'Aborted' ? 'selected' : ''}>Aborted</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <div class="col-sm-12">
            <button type="submit" class="btn btn-success" id="buttonSubmitAddOrder">Save Order</button>
            <a href="order-table.html" class="btn btn-primary">Go Back</a>
        </div>
    </div>

            `;
    document.getElementById('edit_order_form').innerHTML = contentHTML;
};

renderOrderInformation();

$(document).ready(function () {
    $('#edit_order_form').validate({
        rules: {
            dateOrder: {
                required: true
            },
            dateReceiptOrder: {
                required: true
            },
            shippingPriceOrder: {
                required: true,
                number: true
            },
            shippingMethodOrder: {
                required: true
            },
            quantityAllProductsInOrder: {
                required: true,
                number: true
            },
            totalSalePriceOrder: {
                required: true,
                number: true
            },
            totalFullPriceOrder: {
                required: true,
                number: true
            },
            paymentMethodOrder: {
                required: true
            },
            statusOrder: {
                required: true
            },
            idUser: {
                required: true,
                number: true
            }
        },
        messages: {
            dateOrder: {
                required: "Data Required"
            },
            dateReceiptOrder: {
                required: "Data Required"
            },
            shippingPriceOrder: {
                required: "Data Required",
                number: "Data must be a number"
            },
            shippingMethodOrder: {
                required: "Data Required"
            },
            quantityAllProductsInOrder: {
                required: "Data Required",
                number: "Data must be a number"
            },
            totalSalePriceOrder: {
                required: "Data Required",
                number: "Data must be a number"
            },
            totalFullPriceOrder: {
                required: "Data Required",
                number: "Data must be a number"
            },
            paymentMethodOrder: {
                required: "Data Required"
            },
            statusOrder: {
                required: "Data Required"
            },
            idUser: {
                required: "Data Required",
                number: "Data must be a number"
            }
        },
        submitHandler: function () {
            console.log("Submitted");
            let idOrder = selectedOrderForEditing.idOrder;
            let dateOrder = $('#dateOrder').val();
            let dateReceiptOrder = $('#dateReceiptOrder').val();
            let shippingPriceOrder = $('#shippingPriceOrder').val();
            let shippingMethodOrder = $('#shippingMethodOrder').val();
            let quantityAllProductsInOrder = $('#quantityAllProductsInOrder').val();
            let totalSalePriceOrder = $('#totalSalePriceOrder').val();
            let totalFullPriceOrder = $('#totalFullPriceOrder').val();
            let paymentMethodOrder = $('#paymentMethodOrder').val();
            let statusOrder = $('#statusOrder').val();
            let idUser = $('#idUser').val();

            let newOrder = {
                idOrder: idOrder,
                dateOrder: dateOrder,
                dateReceiptOrder: dateReceiptOrder,
                shippingPriceOrder: shippingPriceOrder,
                shippingMethodOrder: shippingMethodOrder,
                quantityAllProductsInOrder: quantityAllProductsInOrder,
                totalSalePriceOrder: totalSalePriceOrder,
                totalFullPriceOrder: totalFullPriceOrder,
                paymentMethodOrder: paymentMethodOrder,
                statusOrder: statusOrder,
                idUser: idUser
            };
            console.log(newOrder);

            let promise = axios({
                url: order_edit_local,
                method: 'PUT',
                data: newOrder,
                headers: {
                    // "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token_current_admin
                }
            })
                .then(function (response) {
                    console.log(response);
                    alert('Order editted successfully!');
                })
                .catch(function (response) {
                    console.log(response);
                    alert(response.response.data)
                });
        }
    });
});


