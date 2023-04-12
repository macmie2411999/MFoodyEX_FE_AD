// Set some global variables
import { token_admin, token_user } from './default_tokens.js'
import { feedback_getAll_local, feedback_deleteByID_local } from './default_apis.js'
let valid = true;

// Process LocalStorage and Check Cookies
localStorageCookiesProcess.checkTokenAndUserInformationAtOtherPages();

function getAllFeedbacksApi() {
    let promise = axios({
        url: feedback_getAll_local,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token_admin
        }
    })

    promise.then(function (res) {
        // Handle if successfully get data
        let arrayFeedbacks = res.data;
        console.log(res.data);

        // Render products array to layout
        renderFeedbacksToTableFeedbacks(arrayFeedbacks);
        $('#example').DataTable();
    })

    promise.catch(function (err) {
        // Handle if failed
        console.log(err);
    })
};

// Automatically call APIs when page is loaded
getAllFeedbacksApi();

// Function delete feedback
const deleteFeedbackFunction = (e) => {
    let idFeedback = e.currentTarget.getAttribute("data-idFeedback");
    let confirmation = confirm("Do you want to delete this Feedback?");
    if (confirmation) {
        axios({
            url: feedback_deleteByID_local + idFeedback,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token_admin
            }
        })
            .then(function (response) {
                alert("Delete successfully!");
                getAllFeedbacksApi();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
window.deleteFeedbackFunction = deleteFeedbackFunction;

// Functions Render HTML
function renderFeedbacksToTableFeedbacks(arrayFeedbacks) {
    let contentHTML = '';
    for (let feedback of arrayFeedbacks) {
        contentHTML += `
            <tr>
            <td>${feedback.idFeedbackMail}</td>
            <td>${feedback.titleFeedbackMail}</td>
            <td>${feedback.contentFeedbackMail}</td>
            <td>${feedback.emailUserFeedbackMail}</td>
            <td>${feedback.nameUserFeedbackMail}</td>
            <td>
                <a href="mailto:${feedback.emailUserFeedbackMail}" class="btn btn-sm btn-primary">Reply</a>
                <a href="#" class="btn btn-sm btn-danger" id="delete_user_button" data-idFeedback="${feedback.idFeedbackMail}" onclick="deleteFeedbackFunction(event)">Delete</a>
            </td>
        </tr>
            `;
    }
    document.getElementById('list_feedbacks').innerHTML = contentHTML;
};

