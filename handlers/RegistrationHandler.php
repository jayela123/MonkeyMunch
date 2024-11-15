<?php session_start();
if(isset($_POST["btnReg"]))
{
	$name=$_POST["txtName"];
	$email=$_POST["txtEmail"];
	$passwd=$_POST["txtPassword"];
	
	
	include_once "./conection.php";
	
	$sql = "INSERT INTO `user`(`id`, `un`,`email`, `pass`) VALUES (null,'".$name."','".$email."','".$passwd."')";
	
	mysqli_query($con,$sql);
	header('location:../login.html');
	
}
?>