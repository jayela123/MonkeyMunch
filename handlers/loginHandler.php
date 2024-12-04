<?php 
session_start();
include_once "./conection.php";

if (isset($_POST["btnSubmit"])) {
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    
    $stmt = $con->prepare("SELECT * FROM `user` WHERE `un` = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        
        if (password_verify($password, $row['pass'])) {
            $_SESSION["un"] = $username; 
            header('Location: ../home.php');
            exit();
        } else {
          
            header('Location: ../login.html');
            exit();
        }
    } else {
       
        header('Location: ../login.html');
        exit();
    }
} else {
    header('Location: ../login.html');
    exit();
}
?>
