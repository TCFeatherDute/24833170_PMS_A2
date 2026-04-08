"use strict";
//Global inventory data storage
let inventory = [
    {
        itemId: 'E001',
        itemName: 'MROG Strict G18',
        category: 'Electronics',
        quantity: 10,
        price: 4999.99,
        supplierName: 'Dwight',
        stockStatus: 'In Stock',
        isPopular: 'Yes',
        comment: '18-inch i9 14900HX'
    }
];
const elements = {
    itemId: document.getElementById('itemId'),
    itemName: document.getElementById('itemName'),
    category: document.getElementById('category'),
    quantity: document.getElementById('quantity'),
    price: document.getElementById('price'),
    supplier: document.getElementById('supplier'),
    stockStatus: document.getElementById('stockStatus'),
    popular: document.getElementById('popular'),
    comment: document.getElementById('comment'),
    addBtn: document.getElementById('addBtn'),
    editBtn: document.getElementById('editBtn'),
    deleteBtn: document.getElementById('deleteBtn'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    showAllBtn: document.getElementById('showAllBtn'),
    showPopularBtn: document.getElementById('showPopularBtn'),
    feedback: document.getElementById('feedback'),
    inventoryBody: document.getElementById('inventoryBody')
};
window.onload = () => renderInventory(inventory);
/**
 * @param message
 * @param isSuccess
 */
const showFeedback = (message, isSuccess) => {
    elements.feedback.textContent = message;
    elements.feedback.className = isSuccess ? 'success' : 'error';
    setTimeout(() => { elements.feedback.className = ''; }, 3000);
};
/**
 * @param item
 * @param isEdit
 * @returns
 */
const validateItem = (item, isEdit = false) => {
    if (!item.itemId || !item.itemName || !item.category || !item.quantity || !item.price || !item.supplierName || !item.stockStatus || !item.isPopular) {
        showFeedback('Error: All fields except Comment are required!', false);
        return false;
    }
    if (item.quantity < 0 || item.price < 0) {
        showFeedback('Error: Quantity and Price must be non-negative!', false);
        return false;
    }
    if (!isEdit && inventory.some(i => i.itemId === item.itemId)) {
        showFeedback(`Error: Item ID ${item.itemId} already exists!`, false);
        return false;
    }
    return true;
};
/**
 * @returns
 */
const getFormData = () => ({
    itemId: elements.itemId.value.trim(),
    itemName: elements.itemName.value.trim(),
    category: elements.category.value,
    quantity: Number(elements.quantity.value),
    price: Number(elements.price.value),
    supplierName: elements.supplier.value.trim(),
    stockStatus: elements.stockStatus.value,
    isPopular: elements.popular.value,
    comment: elements.comment.value.trim() || undefined
});
const resetForm = () => {
    elements.itemId.value = '';
    elements.itemName.value = '';
    elements.quantity.value = '';
    elements.price.value = '';
    elements.supplier.value = '';
    elements.comment.value = '';
    elements.searchInput.value = '';
};
/**
 * @param items
 */
const renderInventory = (items) => {
    elements.inventoryBody.innerHTML = '';
    if (items.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="9" style="text-align: center; padding: 20px;">No items in inventory</td>';
        elements.inventoryBody.appendChild(row);
        return;
    }
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.itemId}</td>
            <td>${item.itemName}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.supplierName}</td>
            <td>${item.stockStatus}</td>
            <td>${item.isPopular}</td>
            <td>${item.comment || 'N/A'}</td>
        `;
        elements.inventoryBody.appendChild(row);
    });
};
elements.addBtn.addEventListener('click', () => {
    const newItem = getFormData();
    if (!validateItem(newItem))
        return;
    inventory.push(newItem);
    renderInventory(inventory);
    resetForm();
    showFeedback(`Success: Item ${newItem.itemName} added!`, true);
});
elements.editBtn.addEventListener('click', () => {
    const editData = getFormData();
    if (!validateItem(editData, true))
        return;
    const index = inventory.findIndex(i => i.itemName === editData.itemName);
    if (index === -1) {
        showFeedback(`Error: Item ${editData.itemName} not found!`, false);
        return;
    }
    editData.itemId = inventory[index].itemId;
    inventory[index] = editData;
    renderInventory(inventory);
    resetForm();
    showFeedback(`Success: Item ${editData.itemName} updated!`, true);
});
elements.deleteBtn.addEventListener('click', () => {
    const itemName = elements.itemName.value.trim();
    if (!itemName) {
        showFeedback('Error: Enter Item Name to delete!', false);
        return;
    }
    if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
        const originalLength = inventory.length;
        inventory = inventory.filter(i => i.itemName !== itemName);
        if (inventory.length === originalLength) {
            showFeedback(`Error: Item ${itemName} not found!`, false);
            return;
        }
        renderInventory(inventory);
        resetForm();
        showFeedback(`Success: Item ${itemName} deleted!`, true);
    }
});
elements.searchBtn.addEventListener('click', () => {
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
        showFeedback('Error: Enter a search term!', false);
        return;
    }
    const results = inventory.filter(i => i.itemName.toLowerCase().includes(searchTerm));
    renderInventory(results);
    showFeedback(`Found ${results.length} item(s) matching "${searchTerm}"`, true);
});
elements.showAllBtn.addEventListener('click', () => {
    renderInventory(inventory);
    resetForm();
    showFeedback('Showing all inventory items', true);
});
elements.showPopularBtn.addEventListener('click', () => {
    const popularItems = inventory.filter(i => i.isPopular === 'Yes');
    renderInventory(popularItems);
    showFeedback(`Showing ${popularItems.length} popular item(s)`, true);
});
