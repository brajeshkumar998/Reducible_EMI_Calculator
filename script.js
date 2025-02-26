document.getElementById('calculate-btn').addEventListener('click', function () {
  // Get input values
  const principal = parseFloat(document.getElementById('principal').value);
  const interest = parseFloat(document.getElementById('interest').value);
  const tenure = parseFloat(document.getElementById('tenure').value);

  // Validate inputs
  if (isNaN(principal) || isNaN(interest) || isNaN(tenure)) {
    alert('Please enter valid numbers for all fields.');
    return;
  }

  // Calculate monthly interest rate
  const monthlyInterest = interest / 12 / 100;

  // Calculate EMI using reducible interest formula
  const emi =
    (principal * monthlyInterest * Math.pow(1 + monthlyInterest, tenure)) /
    (Math.pow(1 + monthlyInterest, tenure) - 1);

  // Display EMI
  document.getElementById('emi-result').textContent = `₹${emi.toFixed(2)}`;

  // Generate amortization schedule
  generateAmortizationSchedule(principal, monthlyInterest, tenure, emi);
});

function generateAmortizationSchedule(principal, monthlyInterest, tenure, emi) {
  const scheduleBody = document.querySelector('#schedule tbody');
  scheduleBody.innerHTML = ''; // Clear previous schedule

  let balance = principal;

  for (let month = 1; month <= tenure; month++) {
    const interestComponent = balance * monthlyInterest;
    const principalComponent = emi - interestComponent;
    balance -= principalComponent;

    // Create a new row for the schedule
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${month}</td>
      <td>₹${principalComponent.toFixed(2)}</td>
      <td>₹${interestComponent.toFixed(2)}</td>
      <td>₹${emi.toFixed(2)}</td>
      <td>₹${balance.toFixed(2)}</td>
    `;
    scheduleBody.appendChild(row);
  }
}
