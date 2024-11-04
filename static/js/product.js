$(document).ready(function () {
    console.log('error')
    function fetchProducts() {
        $.ajax({
            url: 'getallproducts',
            method: 'GET',
            success: function (response) {
                $('#product-table tbody').empty();
                response.forEach(function (product) {
                    $('#product-table tbody').append(`
                        <tr>
                            <td>${product.productid}</td>
                            <td>${product.productcode}</td>
                            <td>${product.productname}</td>
                            <td>${product.quantity}</td>
                            <td>${product.stockcount}</td>
                            <td>$${parseFloat(product.purchasingprice).toFixed(2)}</td>
                            <td>
                                <button class="btn btn-sm btn-warning edit-product" title="Edit" style="background-color: #ffc107; border: none; margin: 2px; color: black;">
                                <i class="fas fa-edit"></i>Edit</button>
                                 <button class="btn btn-sm btn-danger delete-product" title="Delete" style="background-color: #dc3545; border: none; margin: 2px; color: white;">
                                <i class="fas fa-trash"></i>Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function (xhr, status, error) {
                console.log("Error fetching products:", error);
            }
        });
    }
    fetchProducts();
});

