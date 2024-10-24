function generateInvoice() {
    const companyName = document.getElementById("companyName").value;
    const clientName = document.getElementById("clientName").value;
    const productName = document.getElementById("productName").value;
    const productQty = document.getElementById("productQty").value;
    const price = document.getElementById("price").value;
    const logoInput = document.getElementById("logo").files[0];
    const productImageInput = document.getElementById("productImage").files[0];

    if (!companyName || !clientName || !productName || !productQty || !price || !logoInput || !productImageInput) {
        alert("Please fill out all fields and upload required images.");
        return;
    }

    const readerLogo = new FileReader();
    const readerProduct = new FileReader();

    readerLogo.onload = function () {
        const logoURL = readerLogo.result;

        readerProduct.onload = function () {
            const productImageURL = readerProduct.result;

            const totalPrice = productQty * price;

            const invoiceHTML = `
                <div class="invoice">
                    <h2>${companyName}</h2>
                    <p><strong>Client:</strong> ${clientName}</p>
                    <p><strong>Product:</strong> ${productName} (x${productQty})</p>
                    <p><strong>Total Price:</strong> $${totalPrice}</p>
                    <p><strong>Company Logo:</strong></p>
                    <img src="${logoURL}" alt="Company Logo">
                    <p><strong>Product Image:</strong></p>
                    <img src="${productImageURL}" alt="Product Image">
                </div>
            `;

            document.getElementById("invoicePreview").style.display = "block";
            document.getElementById("invoicePreview").innerHTML = invoiceHTML;
            document.getElementById("downloadBtn").style.display = "block";
        };

        readerProduct.readAsDataURL(productImageInput);
    };

    readerLogo.readAsDataURL(logoInput);
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
