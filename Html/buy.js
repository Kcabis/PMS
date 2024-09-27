document.addEventListener('DOMContentLoaded', function () {
    const showEntries = document.getElementById('showEntries');
    const searchBox = document.getElementById('searchBox');
    const tableBody = document.querySelector('tbody');

    // Fetch data from main page (assuming data is stored in localStorage for this example)
    function loadBuyHistory() {
        const savedData = JSON.parse(localStorage.getItem('buyHistory')) || [];
        populateTable(savedData);
    }

    // Populate table with data
    function populateTable(data) {
        tableBody.innerHTML = '';

        data.forEach((item, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>
                    <button class="edit-btn btn btn-primary btn-sm" data-index="${index}">Edit</button>
                    <button class="delete-btn btn btn-danger btn-sm" data-index="${index}">Delete</button>
                </td>
                <td>${item.symbol}</td>
                <td>${item.date}</td>
                <td>${item.type}</td>
                <td>${item.quantity}</td>
                <td>${item.purchasePrice}</td>
                <td>${item.sebonFees}</td>
                <td>${item.commission}</td>
                <td>${item.dpCharge}</td>
                <td>${item.amountPaid}</td>
                <td>${item.effectiveRate}</td>
            `;

            tableBody.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                editEntry(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                deleteEntry(index);
            });
        });
    }

    // Edit entry in the table
    function editEntry(index) {
        const savedData = JSON.parse(localStorage.getItem('buyHistory')) || [];
        const item = savedData[index];

        // Display item data in an editable form (for simplicity, you can design a modal for editing)
        const newSymbol = prompt('Enter new symbol:', item.symbol);
        const newDate = prompt('Enter new date:', item.date);
        const newType = prompt('Enter new type:', item.type);
        const newQuantity = prompt('Enter new quantity:', item.quantity);
        const newPurchasePrice = prompt('Enter new purchase price:', item.purchasePrice);

        // Update the entry
        savedData[index] = {
            ...item,
            symbol: newSymbol || item.symbol,
            date: newDate || item.date,
            type: newType || item.type,
            quantity: newQuantity || item.quantity,
            purchasePrice: newPurchasePrice || item.purchasePrice,
            sebonFees: calculateSebonFees(newPurchasePrice, newQuantity), // Recalculate fees
            commission: calculateCommission(newPurchasePrice, newQuantity),
            dpCharge: 25, // Flat fee
            amountPaid: (newPurchasePrice * newQuantity + 25 + calculateSebonFees(newPurchasePrice, newQuantity) + calculateCommission(newPurchasePrice, newQuantity)).toFixed(2),
            effectiveRate: (newPurchasePrice * newQuantity / newQuantity).toFixed(2),
        };

        // Save updated data and refresh table
        localStorage.setItem('buyHistory', JSON.stringify(savedData));
        loadBuyHistory();
    }

    // Delete entry from the table
    function deleteEntry(index) {
        const savedData = JSON.parse(localStorage.getItem('buyHistory')) || [];

        if (confirm('Are you sure you want to delete this entry?')) {
            savedData.splice(index, 1);
            localStorage.setItem('buyHistory', JSON.stringify(savedData));
            loadBuyHistory();
        }
    }

    // Search functionality
    searchBox.addEventListener('input', function () {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredData = JSON.parse(localStorage.getItem('buyHistory')).filter(item =>
            item.symbol.toLowerCase().includes(searchTerm)
        );
        populateTable(filteredData);
    });

    // Show entries functionality
    showEntries.addEventListener('change', function () {
        const entriesToShow = parseInt(this.value);
        const savedData = JSON.parse(localStorage.getItem('buyHistory')) || [];
        populateTable(savedData.slice(0, entriesToShow));
    });

    // Utility functions to calculate fees
    function calculateSebonFees(purchasePrice, quantity) {
        return ((purchasePrice * quantity) * 0.015 / 100).toFixed(2);
    }

    function calculateCommission(purchasePrice, quantity) {
        const totalAmount = purchasePrice * quantity;
        if (totalAmount <= 2500) return 10;
        if (totalAmount <= 50000) return (totalAmount * 0.36 / 100).toFixed(2);
        if (totalAmount <= 500000) return (totalAmount * 0.33 / 100).toFixed(2);
        if (totalAmount <= 2000000) return (totalAmount * 0.31 / 100).toFixed(2);
        return (totalAmount * 0.27 / 100).toFixed(2);
    }

    // Initial load of buy history data
    loadBuyHistory();
});
