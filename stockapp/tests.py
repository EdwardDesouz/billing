{% extends 'dashboard.html' %}
{% load static %}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management</title>
    <link rel="stylesheet" href="{% static 'css/trail.css' %}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="icon" href="{% static 'images/favicon.ico' %}" type="image/x-icon">
    <style>
        /* Hide stock tables by default */
        .stock-table {
            display: none; /* Initially hide all tables */
        }
    </style>
</head>

<body>
    {% block content %}

    <h2>Low Stocks</h2>
    <h4>Manage your low stocks</h4>
    <button id="showLowStocks" class="lowstocks-button">Low Stocks Product</button>
    <button id="showOutOfStocks" class="outofstocks-button">Out of Stocks</button>

    <div id="lowStocksTable" class="stock-table">
        <table class="table" id="product-table-low">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Stock Count</th>
                    <th>Purchasing Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Populate with low stock products -->
            </tbody>
        </table>
    </div>

    <div id="outOfStocksTable" class="stock-table">
        <h2>Out of Stocks</h2>
        <h4>Out of Stocks</h4>
        <table class="table" id="product-table-out">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Stock Count</th>
                    <th>Purchasing Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Populate with out of stock products -->
            </tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{% static 'js/product.js' %}"></script>
    <script>
        $(document).ready(function() {
            // Show the low stocks table by default
            $("#lowStocksTable").show();

            // Click event for Low Stocks button
            $("#showLowStocks").click(function() {
                $("#lowStocksTable").show(); // Show low stocks table
                $("#outOfStocksTable").hide(); // Hide out of stocks table
            });

            // Click event for Out of Stocks button
            $("#showOutOfStocks").click(function() {
                $("#outOfStocksTable").show(); // Show out of stocks table
                $("#lowStocksTable").hide(); // Hide low stocks table
            });
        });
    </script>

    {% endblock %}
</body>

</html>
