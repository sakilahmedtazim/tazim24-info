function generateInvoice() {
    const companyName = document.getElementById("companyName").value;
    const clientName = document.getElementById("clientName").value;
    const productDetails = document.getElementById("productDetails").value;
    const price = document.getElementById("price").value;
    const logoInput = document.getElementById("logo").files[0];
    const productImageInput = document.getElementById("productImage").files[0];

    if (!companyName || !clientName || !productDetails || !price || !logoInput || !productImageInput) {
        alert("Please fill out all fields and upload the required images.");
        return;
    }

    const readerLogo = new FileReader();
    const readerProduct = new FileReader();

    readerLogo.onload = function () {
        const logoURL = readerLogo.result;

        readerProduct.onload = function () {
            const productImageURL = readerProduct.result;

            const invoiceHTML = `
                <div class="invoice">
                    <h2>${companyName}</h2>
                    <p><strong>Client:</strong> ${clientName}</p>
                    <p><strong>Product Details:</strong></p>
                    <p>${productDetails}</p>
                    <p><strong>Price:</strong> $${price}</p>
                    <p><strong>Company Logo:</strong></p>
                    <img src="${logoURL}" alt="Company Logo" width="100">
                    <p><strong>Product Image:</strong></p>
                    <img src="${productImageURL}" alt="Product Image" width="200">
                </div>
            `;

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
