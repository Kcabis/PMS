function addShareholder() {
    document.getElementById('addShareholderModal').style.display = 'flex';
}

function editShareholder() {
    // Logic to edit shareholder
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function saveShareholder() {
    const name = document.getElementById('shareholderName').value;
    const shareholdersDiv = document.getElementById('shareholders');
    shareholdersDiv.innerHTML += `<div>${name}</div>`;
    closeModal('addShareholderModal');
}

function addStock() {
    document.getElementById('addStockModal').style.display = 'flex';
}

function saveStock() {
    const stockName = document.getElementById('stockName').value;
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!stockName || isNaN(purchasePrice) || isNaN(quantity)) {
        alert('Please fill all fields correctly.');
        return;
    }

    const marketValue = purchasePrice * quantity;
    const unrealizedGain = (marketValue - (purchasePrice * quantity)).toFixed(2);

    const tableBody = document.querySelector('#portfolioTable tbody');
    const newRow = `
        <tr>
            <td>${stockName}</td>
            <td>${purchasePrice.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>${marketValue.toFixed(2)}</td>
            <td>${marketValue.toFixed(2)}</td>
            <td>${unrealizedGain}</td>
        </tr>
    `;
    tableBody.innerHTML += newRow;
    closeModal('addStockModal');
}
