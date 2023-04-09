// Set some global variables
import { token_admin, token_user } from './default_tokens.js'
import { user_countTotalNumber_local, order_countTotalNumber_local, product_countTotalNumber_local, feedback_countTotalNumber_local } from './default_apis.js'
let valid = true;

// function getAllUsersApi() {
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
// };

let config = {
    headers: {
        'Authorization': 'Bearer ' + token_admin
    }
};

function countTotalNumberArgApis() {
    Promise.all([
        axios.get(user_countTotalNumber_local, config),
        axios.get(order_countTotalNumber_local, config),
        axios.get(product_countTotalNumber_local, config),
        axios.get(feedback_countTotalNumber_local, config)
    ]).then(function (responses) {
        let totalUsers = responses[0].data;
        let totalOrders = responses[1].data;
        let totalProducts = responses[2].data;
        let totalFeedbacks = responses[3].data;

        // Render products array to layout
        renderDashboard(totalUsers, totalOrders, totalProducts, totalFeedbacks);

        // do something with the data
    }).catch(function (error) {
        console.log(error);
    });
};

// Automatically call APIs when page is loaded
countTotalNumberArgApis();

// Functions Render HTML
function renderDashboard(totalUsers, totalOrders, totalProducts, totalFeedbacks) {
    let contentHTML = '';

    contentHTML += `
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div class="white-box">
        <div class="col-in row">
            <div class="col-md-6 col-sm-6 col-xs-6"> <i data-icon="E"
                    class="linea-icon linea-basic"></i>
                <h5 class="text-muted vb">Users</h5>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h3 class="counter text-right m-t-15 text-danger">${totalUsers}</h3>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="progress">
                    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="${totalUsers}"
                        aria-valuemin="0" aria-valuemax="100" style="width: ${totalUsers}%"> <span
                            class="sr-only">${totalUsers}% Complete (success)</span> </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div class="white-box">
        <div class="col-in row">
            <div class="col-md-6 col-sm-6 col-xs-6"> <i class="linea-icon linea-basic"
                    data-icon="&#xe01b;"></i>
                <h5 class="text-muted vb">Orders</h5>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h3 class="counter text-right m-t-15 text-megna">${totalOrders}</h3>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="progress">
                    <div class="progress-bar progress-bar-megna" role="progressbar" aria-valuenow="${totalOrders}"
                        aria-valuemin="0" aria-valuemax="100" style="width: ${totalOrders}%"> <span
                            class="sr-only">${totalOrders}% Complete (success)</span> </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div class="white-box">
        <div class="col-in row">
            <div class="col-md-6 col-sm-6 col-xs-6"> <i class="linea-icon linea-basic"
                    data-icon="&#xe00b;"></i>
                <h5 class="text-muted vb">Products</h5>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h3 class="counter text-right m-t-15 text-primary">${totalProducts}</h3>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="progress">
                    <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="${totalProducts}"
                        aria-valuemin="0" aria-valuemax="100" style="width: ${totalProducts}%"> <span
                            class="sr-only">${totalProducts}% Complete (success)</span> </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div class="white-box">
        <div class="col-in row">
            <div class="col-md-6 col-sm-6 col-xs-6"> <i class="linea-icon linea-basic"
                    data-icon="&#xe00b;"></i>
                <h5 class="text-muted vb">FeedBacks</h5>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h3 class="counter text-right m-t-15 text-danger">${totalFeedbacks}</h3>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="progress">
                    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="${totalFeedbacks}"
                        aria-valuemin="0" aria-valuemax="100" style="width: ${totalFeedbacks}%"> <span
                            class="sr-only">${totalFeedbacks}% Complete (success)</span> </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div class="white-box">
        <div class="col-in row">
            <div class="col-md-6 col-sm-6 col-xs-6"> <i class="linea-icon linea-basic"
                    data-icon="&#xe00b;"></i>
                <h5 class="text-muted vb">FeedBacks</h5>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <h3 class="counter text-right m-t-15 text-danger">${totalFeedbacks}</h3>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="progress">
                    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="${totalFeedbacks}"
                        aria-valuemin="0" aria-valuemax="100" style="width: ${totalFeedbacks}%"> <span
                            class="sr-only">${totalFeedbacks}% Complete (success)</span> </div>
                </div>
            </div>
        </div>
    </div>
</div>
            `;

    document.getElementById('head-dashboard-container').innerHTML = contentHTML;
};