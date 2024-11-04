$(document).ready(function() {
    fetchGst();
    fetchShops();

    $("#item-form").on("submit", function(event) {
        event.preventDefault(); 
        console.log('hello');
        upload();
    });
});

function fetchGst() {
    $.ajax({
        type: "GET",
        url: '/api/getAllGst',
        success: function(data) {
            data.forEach(function(gst) {
                $('#gst').append(new Option(gst.gstpercentage, gst.gstid));
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching GST:", xhr.responseJSON);
        }
    });
}

function fetchShops() {
    $.ajax({
        type: "GET",
        url: '/api/getAllShops',
        success: function(data) {
                data.forEach(function(shop) {
                $('#shop').append(new Option(shop.shopname, shop.shopid)); 
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching shops:", xhr.responseJSON);
        }
    });
}

function upload() {
    $.ajax({
        type: "POST",
        url: '/api/addnewproduct',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            productcode: $('#productCode').val(),
            productname: $('#productName').val(),
            purchasingdate: $('#purchasingDate').val(),
            purchasingprice: $('#purchasingPrice').val(),
            quantity: $('#quantity').val(),
            shop: $('#shop').val(),
            stockcount: $('#stockCount').val(),
            gst: $('#gst').val(), 
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
        }),
        success: function(response) {
            alert("Product added successfully:", response);
            $('#item-form')[0].reset(); 
            fetchGst(); 
            fetchShops(); 
        },
        error: function(xhr, status, error) {
            console.error("Error adding product:", xhr.responseJSON);
            alert("Error: " + (xhr.responseJSON.detail || "An error occurred while adding the product."));
        }
    });
}

function addNewGst() {
    const gstPercentage = prompt("Enter new GST percentage:");
    if (gstPercentage) {
        $.ajax({
            type: "POST",
            url: '/api/addnewgst', 
            data: JSON.stringify({ gstpercentage: gstPercentage }),
            contentType: "application/json",
            success: function(response) {
                alert("New GST added successfully");
                fetchGst(); 
            },
            error: function(xhr) {
                console.error("Error adding GST:", xhr.responseJSON);
                alert("Error adding GST: " + xhr.responseJSON.detail);
            }
        });
    }
}

function addNewShop() {
    const shopName = prompt("Enter new Shop name:");
    if (shopName) {
        $.ajax({
            type: "POST",
            url: '/api/addnewshop', 
            data: JSON.stringify({ shopname: shopName }),
            contentType: "application/json",
            success: function(response) {
                alert("New Shop added successfully");
                fetchShops();
            },
            error: function(xhr) {
                console.error("Error adding Shop:", xhr.responseJSON);
                alert("Error adding Shop: " + xhr.responseJSON.detail);
            }
        });
    }
}
