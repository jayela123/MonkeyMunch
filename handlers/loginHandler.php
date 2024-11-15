<?php session_start(); //start the new session
include_once "./conection.php";
if(isset($_POST["btnSubmit"]))
{
	$username=$_POST["username"];
	$password=$_POST["password"];
	
	
	
	$sql = "SELECT * FROM `user` WHERE `un`='".$username."' and `pass`='".$password."'";
	
	$results=mysqli_query($con,$sql);
	
	if(mysqli_num_rows($results) > 0)
	{
		
		$_SESSION["un"]=$username;
		$row = mysqli_fetch_assoc($results);
			header('location:../home.php');
	}
	else{
		header('location:../login.html');
	}
}
else{
	header('location:../login.html');
}
?>