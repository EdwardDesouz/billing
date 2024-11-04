function TrimKeyUp(Val) {
    $("#" + Val).keyup(function (event) {
        if (event.keyCode !== 32 && event.keyCode !== 13) {
            let Value = $("#" + Val).val();
            $("#" + Val).val(Value.trim());
        }
    });
}

function ItemDetailsFocusOn() {
    TrimKeyUp('item-name');
    
    const data = ProductsData.map(product => `${product.productname}:${product.purchasingprice}`);
    console.log('data:', data);
    Autocomplete(data, '#item-name');
}

$(document).ready(function () {
    var ProductsData = [];

    // Fetch products from the API
    $.ajax({
        url: '/api/getallproducts',
        success: function (response) {
            ProductsData = response;
            console.log("Fetched Products Data:", ProductsData);

            // Populate the product table
            ProductsData.forEach(function(product) {
                $('#product-table tbody').append(`
                    <tr data-id="${product.productid}">
                        <td>${product.productid}</td>
                        <td>${product.productcode}</td>
                        <td>${product.productname}</td>
                        <td>${product.quantity}</td>
                        <td>${product.stockcount}</td>
                        <td>$${parseFloat(product.purchasingprice).toFixed(2)}</td>
                        <td>
                            <button class="btn btn-sm btn-info select-product" title="Select"><i class="fas fa-check"></i></button>
                            <button class="btn btn-sm btn-warning edit-product" title="Edit"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger delete-product" title="Delete"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching products:", error);
        }
    });

    // Handle product selection
    $('#product-table').on('click', '.select-product', function() {
        var row = $(this).closest('tr');
        var productId = row.data('id');
        var foundProduct = ProductsData.find(product => product.productid == productId);

        if (foundProduct) {
            $('#selected-item-name').val(foundProduct.productname);
            $('#item-price').val(foundProduct.purchasingprice);
        }
    });

    // Remaining cart logic...
    var items = [];
    $("#item-form").on("submit", addItemToCart);
    $("#cart-table").on("click", ".btn-danger", removeItemFromCart);
    $("#generate-invoice").on("click", generateInvoice);

    function addItemToCart(event) {
        event.preventDefault();

        var itemName = $("#selected-item-name").val();
        var itemPrice = $("#item-price").val();
        var itemQuantity = $("#item-quantity").val();

        if (itemName !== "" && itemPrice !== "" && itemQuantity !== "") {
            var item = {
                name: itemName,
                price: parseFloat(itemPrice),
                quantity: parseFloat(itemQuantity),
            };
            item.totalPrice = item.price * item.quantity;
            items.push(item);
            $("#cart-table tbody").append(
                `<tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.totalPrice.toFixed(2)}</td>
                    <td><button class='btn btn-sm btn-danger'><i class='fa fa-trash-alt'></i></button></td>
                </tr>`
            );
            updateTotalCost();
            $("#selected-item-name").val("");
            $("#item-price").val("");
            $("#item-quantity").val("");
        }
    }

    function removeItemFromCart() {
        var index = $(this).closest("tr").index();
        items.splice(index, 1);
        $(this).closest("tr").remove();
        updateTotalCost();
    }

    function updateTotalCost() {
        var totalCost = 0;
        items.forEach(function (item) {
            totalCost += item.totalPrice;
        });
        $("#total-cost").text("Total Cost: $" + totalCost.toFixed(2));
    }

    function generateInvoice() {
        let invoice = `
            <html>
            <head>
                <title>INVOICE</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container mt-5">
                    <h1 class="text-center">Invoice</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Price</th>
                            </tr>
                        </thead>
                        <tbody>`;
        
        items.forEach(item => {
            invoice += `<tr><td>${item.name}</td><td>$${item.totalPrice.toFixed(2)}</td></tr>`;
        });

        invoice += `</tbody></table>
                    <p class="text-right">Total Cost: $${getTotalCost()}</p>
                </div>
            </body>
            </html>`;
        
        const popup = window.open("", "Invoice");
        popup.document.open();
        popup.document.write(invoice);
        popup.document.close();
    }

    function getTotalCost() {
        return items.reduce((total, item) => total + item.totalPrice, 0).toFixed(2);
    }
});
