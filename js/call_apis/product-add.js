// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { product_add_local } from './default_apis.js';

$(document).ready(function () {
    $('#add_new_product_form').validate({
        rules: {
            nameProduct: {
                required: true
            },
            albumProduct: {
                required: true
            },
            descriptionProduct: {
                required: true
            },
            salePriceProduct: {
                required: true,
                number: true
            },
            fullPriceProduct: {
                required: true,
                number: true
            },
            weightProduct: {
                required: true
            },
            importQuantityProduct: {
                required: true,
                number: true
            },
            importDateProduct: {
                required: true
            },
            storehouseQuantityProduct: {
                required: true,
                number: true
            },
            categoryProduct: {
                required: true
            },
            brandProduct: {
                required: true
            }
        },
        messages: {
            nameProduct: {
                required: "Data Required"
            },
            albumProduct: {
                required: "Data Required"
            },
            descriptionProduct: {
                required: "Data Required"
            },
            salePriceProduct: {
                required: "Data Required",
                number: "Data must be a number"
            },
            fullPriceProduct: {
                required: "Data Required",
                number: "Data must be a number"
            },
            weightProduct: {
                required: "Data Required"
            },
            importDateProduct: {
                required: "Data Required"
            },
            storehouseQuantityProduct: {
                required: "Data Required",
                number: "Data must be a number"
            },
            categoryProduct: {
                required: "Data Required"
            },
            brandProduct: {
                required: "Data Required"
            }
        },
        submitHandler: function () {
            console.log("Submitted");
            let nameProduct = $('#nameProduct').val();
            let albumProduct = $('#albumProduct').val();
            let descriptionProduct = $('#descriptionProduct').val();
            let salePriceProduct = $('#salePriceProduct').val();
            let fullPriceProduct = $('#fullPriceProduct').val();
            let weightProduct = $('#weightProduct').val();
            let importQuantityProduct = $('#importQuantityProduct').val();
            let importDateProduct = $('#importDateProduct').val();
            let storehouseQuantityProduct = $('#storehouseQuantityProduct').val();
            let ratingProduct = $('#ratingProduct').val();
            let categoryProduct = $('#categoryProduct').val();
            let brandProduct = $('#brandProduct').val();

            let newProduct = {
                nameProduct: nameProduct,
                albumProduct: albumProduct,
                descriptionProduct: descriptionProduct,
                salePriceProduct: salePriceProduct,
                fullPriceProduct: fullPriceProduct,
                weightProduct: weightProduct,
                importQuantityProduct: importQuantityProduct,
                importDateProduct: importDateProduct,
                storehouseQuantityProduct: storehouseQuantityProduct,
                ratingProduct: ratingProduct,
                categoryProduct: categoryProduct,
                brandProduct: brandProduct
            };
            console.log(newProduct);
            let promise = axios({
                url: product_add_local,
                method: 'POST',
                data: newProduct,
                headers: {
                    // "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token_admin
                },
            })
                .then(function (response) {
                    console.log(response);
                    alert('Product added successfully!');
                })
                .catch(function (response) {
                    console.log(response);
                    // alert('Error occurred while adding user.');
                    alert(response.response.data)
                });
        }
    });
});

// // Set event for button Submit
// document.querySelector('#buttonSubmitAddProduct').onclick = function () {
//     // Get the input
//     console.log("Submitted");
//     let nameProduct = $('#nameProduct').val();
//     let albumProduct = $('#albumProduct').val();
//     let descriptionProduct = $('#descriptionProduct').val();
//     let salePriceProduct = $('#salePriceProduct').val();
//     let fullPriceProduct = $('#fullPriceProduct').val();
//     let weightProduct = $('#weightProduct').val();
//     let importQuantityProduct = $('#importQuantityProduct').val();
//     let importDateProduct = $('#importDateProduct').val();
//     let storehouseQuantityProduct = $('#storehouseQuantityProduct').val();
//     let ratingProduct = $('#ratingProduct').val();
//     let categoryProduct = $('#categoryProduct').val();
//     let brandProduct = $('#brandProduct').val();

//     let newProduct = {
//         nameProduct: nameProduct,
//         albumProduct: albumProduct,
//         descriptionProduct: descriptionProduct,
//         salePriceProduct: salePriceProduct,
//         fullPriceProduct: fullPriceProduct,
//         weightProduct: weightProduct,
//         importQuantityProduct: importQuantityProduct,
//         importDateProduct: importDateProduct,
//         storehouseQuantityProduct: storehouseQuantityProduct,
//         ratingProduct: ratingProduct,
//         categoryProduct: categoryProduct,
//         brandProduct: brandProduct
//     };
//     console.log(newProduct);

//     let promise = axios({
//         url: product_add_local,
//         method: 'POST',
//         data: newProduct,
//         headers: {
//             // "Content-Type": "application/json",
//             'Authorization': 'Bearer ' + token_admin
//         },
//     })
//         .then(function (response) {
//             console.log(response);
//             alert('Product added successfully!');
//         })
//         .catch(function (response) {
//             console.log(response);
//             // alert('Error occurred while adding user.');
//             alert(response.response.data)
//         });
// }

