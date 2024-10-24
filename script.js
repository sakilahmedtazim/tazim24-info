let productCount = 0;

function addProduct() {
    productCount++;

    const productList = document.getElementById("productList");

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.id = `product-${productCount}`;

    productDiv.innerHTML = `
        <div class="input-group">
            <label for="productName-${productCount}">Product Name</label>
            <input type="text" id="productName-${productCount}" placeholder="Product Name" required>
        </div>
        <div class="input-group">
            <label for="productQty-${productCount}">Quantity</label>
            <input type="number" id="productQty-${productCount}" placeholder="Quantity" required>
        </div>
        <div class="input-group">
            <label for="price-${productCount}">Price per Unit</label>
            <input type="number" id="price-${productCount}" placeholder="Price per Unit" required>
        </div>
        <button type="button" class="remove-product-btn" onclick="removeProduct(${productCount})">Remove</button>
    `;

    productList.appendChild(productDiv);
}

function removeProduct(productId) {
    const productDiv = document.getElementById(`product-${productId}`);
    productDiv.remove();
}

function generateInvoice() {
    const companyName = document.getElementById("companyName").value;
    const clientName = document.getElementById("clientName").value;
    const clientAddress = document.getElementById("clientAddress").value;
    const clientPhone = document.getElementById("clientPhone").value;
    const invoiceDate = document.getElementById("invoiceDate").value;

    const productElements = document.querySelectorAll(".product");
    let totalPrice = 0;
    let productsHTML = '';

    productElements.forEach((productElement) => {
        const productName = productElement.querySelector(`#productName-${productElement.id.split('-')[1]}`).value;
        const productQty = productElement.querySelector(`#productQty-${productElement.id.split('-')[1]}`).value;
        const productPrice = productElement.querySelector(`#price-${productElement.id.split('-')[1]}`).value;

        const productTotal = productQty * productPrice;
        totalPrice += productTotal;

        productsHTML += `
            <p><strong>Product:</strong> ${productName} (x${productQty}) - $${productTotal}</p>
        `;
    });

    const invoiceHTML = `
        <div class="invoice">
            <h2>${companyName}</h2>
            <p><strong>Client Name:</strong> ${clientName}</p>
            <p><strong>Client Address:</strong> ${clientAddress}</p>
            <p><strong>Client Phone:</strong> ${clientPhone}</p>
            <p><strong>Date:</strong> ${invoiceDate}</p>
            ${productsHTML}
            <p><strong>Total Price:</strong> $${totalPrice}</p>
        </div>
    `;

    document.getElementById("invoicePreview").style.display = "block";
    document.getElementById("invoicePreview").innerHTML = invoiceHTML;
    document.getElementById("downloadBtn").style.display = "block";
}

function downloadInvoice() {
    const invoiceContent = document.getElementById("invoicePreview").innerHTML;
    const invoiceWindow = window.open("", "", "width=800,height=600");
    invoiceWindow.document.write('<html><head><title>Invoice</title></head><body>');
    invoiceWindow.document.write(invoiceContent);
    invoiceWindow.document.write('</body></html>');
    invoiceWindow.document.close();
    invoiceWindow.print();
}
