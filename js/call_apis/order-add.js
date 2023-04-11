// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { order_add_local } from './default_apis.js';

$(document).ready(function () {
    $('#add_new_order_form').validate({
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
                url: order_add_local,
                method: 'POST',
                data: newOrder,
                headers: {
                    // "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token_admin
                },
            })
                .then(function (response) {
                    console.log(response);
                    alert('Order added successfully!');
                })
                .catch(function (response) {
                    console.log(response);
                    // alert('Error occurred while adding user.');
                    alert(response.response.data)
                });
        }
    });
});


