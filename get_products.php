<?php
// Oracle database connection settings
$host = 'DESKTOP-Q88PLFU';
$port = '8080';
$dbname = 'XE';
$username = 'SYSTEM';
$password = '200600';

// Establish Oracle database connection
$conn = oci_connect($username, $password, "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=$host)(PORT=$port))(CONNECT_DATA=(SID=$dbname)))");

// Check if connection established
if (!$conn) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}

// Function to fetch all products
function getAllProducts() {
    global $conn;
    $products = [];
    $query = "SELECT * FROM products";
    $stmt = oci_parse($conn, $query);
    oci_execute($stmt);
    
    while ($row = oci_fetch_assoc($stmt)) {
        $products[] = $row;
    }
    
    return $products;
}

// Fetch all products
$products = getAllProducts();

// Output products as JSON
header('Content-Type: application/json');
echo json_encode($products);
?>
