// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults(e) {
    console.log('Calculating...')
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const mountlyPayment = document.getElementById('mountly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute mountly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const mountly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(mountly)) {
        mountlyPayment.value = mountly.toFixed(2);
        totalPayment.value = (mountly * calculatedPayments).toFixed(2);
        totalInterest.value = ((mountly * calculatedPayments) - principal).toFixed(2);
        // show results
        document.getElementById('results').style.display = 'block';
        // hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

// Show Error
function showError(error) {
    // show results
    document.getElementById('results').style.display = 'none';
    // hide loader
    document.getElementById('loading').style.display = 'none';
    //create a div
    const errorDiv = document.createElement('div');
    // add bootstrap class

    //get elements for shoe
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    errorDiv.className = 'alert alert-danger';
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //inserterror above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}