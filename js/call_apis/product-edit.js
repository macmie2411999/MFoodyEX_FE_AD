// -by Mac Mie
// Import class User

import { token_admin, token_user } from './default_tokens.js';
import { product_edit_local } from './default_apis.js';
// import { customLocalStorage } from '../util/LocalStorageFunction';

var selectedProductForEditing = customLocalStorage.getItemFromLocalStorage("selectedToEditProduct");
console.log(selectedProductForEditing);

// Functions Render HTML
function renderProductInformation() {
    let contentHTML = '';

    contentHTML += `
    <div class="form-group">
        <label for="example-email" class="col-md-12">Name</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedProductForEditing.nameProduct}" value="${selectedProductForEditing.nameProduct}"
                class="form-control form-control-line" id="nameProduct" name="nameProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Album</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedProductForEditing.albumProduct}" value="${selectedProductForEditing.albumProduct}"
                class="form-control form-control-line" id="albumProduct" name="albumProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Description</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedProductForEditing.descriptionProduct}" value="${selectedProductForEditing.descriptionProduct}"
                class="form-control form-control-line" id="descriptionProduct" name="descriptionProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Sale Price (Rup)</label>
        <div class="col-md-12">
            <input type="number" placeholder="${selectedProductForEditing.salePriceProduct}" value="${selectedProductForEditing.salePriceProduct}"
                class="form-control form-control-line" id="salePriceProduct" name="salePriceProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Full Price (Rup)</label>
        <div class="col-md-12">
            <input type="number" placeholder="${selectedProductForEditing.fullPriceProduct}" value="${selectedProductForEditing.fullPriceProduct}"
                class="form-control form-control-line" id="fullPriceProduct" name="fullPriceProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Weight (Kg)</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedProductForEditing.weightProduct}" value="${selectedProductForEditing.weightProduct}"
                class="form-control form-control-line" id="weightProduct" name="weightProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Import Quantity</label>
        <div class="col-md-12">
            <input type="number" placeholder="${selectedProductForEditing.importQuantityProduct}" value="${selectedProductForEditing.importQuantityProduct}"
                class="form-control form-control-line" id="importQuantityProduct" name="importQuantityProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Import Date</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedProductForEditing.importDateProduct}" value="${selectedProductForEditing.importDateProduct}"
                class="form-control form-control-line" id="importDateProduct" name="importDateProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Storehouse Quantity</label>
        <div class="col-md-12">
            <input type="number" placeholder="${selectedProductForEditing.storehouseQuantityProduct}" value="${selectedProductForEditing.storehouseQuantityProduct}"
                class="form-control form-control-line" id="storehouseQuantityProduct" name="storehouseQuantityProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Category</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedProductForEditing.categoryProduct}" value="${selectedProductForEditing.categoryProduct}"
                class="form-control form-control-line" id="categoryProduct" name="categoryProduct">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-12">Brand</label>
        <div class="col-md-12">
            <input type="text" placeholder="${selectedProductForEditing.brandProduct}" value="${selectedProductForEditing.brandProduct}"
                class="form-control form-control-line" id="brandProduct" name="brandProduct">
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-12">
            <button type="submit" class="btn btn-success" id="buttonSubmitAddProduct">Save
                Product</button>
            <a href="product-table.html" class="btn btn-primary">Go Back</a>
        </div>
    </div>
            `;
    document.getElementById('edit_product_form').innerHTML = contentHTML;
};

renderProductInformation();

$(document).ready(function () {
    $('#edit_product_form').validate({
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
                number: "Data must be number"
            },
            fullPriceProduct: {
                required: "Data Required",
                number: "Data must be number"
            },
            weightProduct: {
                required: "Data Required"
            },
            importDateProduct: {
                required: "Data Required"
            },
            storehouseQuantityProduct: {
                required: "Data Required",
                number: "Data must be number"
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
                url: product_edit_local,
                method: 'PUT',
                data: newProduct,
                headers: {
                    // "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token_admin
                }
            })
                .then(function (response) {
                    console.log(response);
                    alert('Product editted successfully!');
                })
                .catch(function (response) {
                    console.log(response);
                    alert(response.response.data)
                });
        }
    });
});


