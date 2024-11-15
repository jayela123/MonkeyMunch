<?php
session_start();
if(!isset($_SESSION['un'])){
  header('Location:login.html');
}
include_once "./conection.php";

// Decode JSON
$requestPayload = file_get_contents("php://input");
$data = json_decode($requestPayload, true);


if (!isset($data['score'])) {
    echo json_encode(["status" => "error", "message" => "Invalid request data."]);
    exit;
}

$points = (int) $data['score'];
$name = $_SESSION['un'];

// Check
$sql_check = "SELECT * FROM `leaderboard` WHERE `un` = '$name'";
$result = mysqli_query($con, $sql_check);

if (mysqli_num_rows($result) > 0) {
    // Update 
    $sql_update = "UPDATE `leaderboard` SET `score` = `score` + $points WHERE `un` = '$name'";
    mysqli_query($con, $sql_update);
    echo json_encode(["status" => "success", "message" => "Score updated successfully."]);
} else {
    
    // new
    $sql_insert = "INSERT INTO `leaderboard`(`lid`, `un`, `score`) VALUES (NULL, '$name', $points)";
    mysqli_query($con, $sql_insert);
    echo json_encode(["status" => "success", "message" => "New user added to leaderboard."]);
}
?>
