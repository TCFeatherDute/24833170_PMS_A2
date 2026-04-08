interface InventoryItem {
    itemId: string;
    itemName: string;
    category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
    quantity: number;
    price: number;
    supplierName: string;
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    isPopular: 'Yes' | 'No';
    comment?: string;
}

//Global inventory data storage
let inventory: InventoryItem[] = [
    {
        itemId: 'E001',
        itemName: 'MacBook Pro',
        category: 'Electronics',
        quantity: 10,
        price: 2499.99,
        supplierName: 'Harvey Norman',
        stockStatus: 'In Stock',
        isPopular: 'Yes',
        comment: '16-inch M3 Pro'
    }
];

const elements = {
    itemId: document.getElementById('itemId') as HTMLInputElement,
    itemName: document.getElementById('itemName') as HTMLInputElement,
    category: document.getElementById('category') as HTMLSelectElement,
    quantity: document.getElementById('quantity') as HTMLInputElement,
    price: document.getElementById('price') as HTMLInputElement,
    supplier: document.getElementById('supplier') as HTMLInputElement,
    stockStatus: document.getElementById('stockStatus') as HTMLSelectElement,
    popular: document.getElementById('popular') as HTMLSelectElement,
    comment: document.getElementById('comment') as HTMLTextAreaElement,
    addBtn: document.getElementById('addBtn') as HTMLButtonElement,
    editBtn: document.getElementById('editBtn') as HTMLButtonElement,
    deleteBtn: document.getElementById('deleteBtn') as HTMLButtonElement,
    searchInput: document.getElementById('searchInput') as HTMLInputElement,
    searchBtn: document.getElementById('searchBtn') as HTMLButtonElement,
    showAllBtn: document.getElementById('showAllBtn') as HTMLButtonElement,
    showPopularBtn: document.getElementById('showPopularBtn') as HTMLButtonElement,
    feedback: document.getElementById('feedback') as HTMLDivElement,
    inventoryBody: document.getElementById('inventoryBody') as HTMLTableSectionElement
};

window.onload = (): void => renderInventory(inventory);

/**
 * @param message
 * @param isSuccess
 */
const showFeedback = (message: string, isSuccess: boolean): void => {
    elements.feedback.textContent = message;
    elements.feedback.className = isSuccess ? 'success' : 'error';
    setTimeout((): void => { elements.feedback.className = ''; }, 3000);
};

/**
 * @param item
 * @param isEdit
 * @returns
 */
const validateItem = (item: Partial<InventoryItem>, isEdit = false): boolean => {

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
const getFormData = (): Partial<InventoryItem> => ({
    itemId: elements.itemId.value.trim(),
    itemName: elements.itemName.value.trim(),
    category: elements.category.value as InventoryItem['category'],
    quantity: Number(elements.quantity.value),
    price: Number(elements.price.value),
    supplierName: elements.supplier.value.trim(),
    stockStatus: elements.stockStatus.value as InventoryItem['stockStatus'],
    isPopular: elements.popular.value as InventoryItem['isPopular'],
    comment: elements.comment.value.trim() || undefined
});

const resetForm = (): void => {
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
const renderInventory = (items: InventoryItem[]): void => {
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


elements.addBtn.addEventListener('click', (): void => {
    const newItem = getFormData() as InventoryItem;
    if (!validateItem(newItem)) return;
    inventory.push(newItem);
    renderInventory(inventory);
    resetForm();
    showFeedback(`Success: Item ${newItem.itemName} added!`, true);
});


elements.editBtn.addEventListener('click', (): void => {
    const editData = getFormData() as InventoryItem;
    if (!validateItem(editData, true)) return;
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


elements.deleteBtn.addEventListener('click', (): void => {
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


elements.searchBtn.addEventListener('click', (): void => {
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
        showFeedback('Error: Enter a search term!', false);
        return;
    }
    const results = inventory.filter(i => i.itemName.toLowerCase().includes(searchTerm));
    renderInventory(results);
    showFeedback(`Found ${results.length} item(s) matching "${searchTerm}"`, true);
});


elements.showAllBtn.addEventListener('click', (): void => {
    renderInventory(inventory);
    resetForm();
    showFeedback('Showing all inventory items', true);
});


elements.showPopularBtn.addEventListener('click', (): void => {
    const popularItems = inventory.filter(i => i.isPopular === 'Yes');
    renderInventory(popularItems);
    showFeedback(`Showing ${popularItems.length} popular item(s)`, true);
});