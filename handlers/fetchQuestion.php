<?php
header("Content-Type: application/json");

$apiUrl = "http://marcconrad.com/uob/banana/api.php?out=json&base64=no";

// Use cURL to fetch the data
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);

if(curl_errno($ch)) {
    echo json_encode(["error" => "Unable to fetch data."]);
} else {
    echo $response;
}
curl_close($ch);
?>
