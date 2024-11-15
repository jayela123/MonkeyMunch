<?php
session_start();
if(!isset($_SESSION['un'])){
  header('Location:login.html');
}?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Game Leaderboard</title>
  <link rel="stylesheet" href="./css/leaderboard.css">
  <link rel="stylesheet" href="./css/navBar.css">
</head>
<body>
<?php 
  include_once "./navbar.php";
  ?>
  <div class="leaderboard">
    <h2>Game Leaderboard</h2>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
          
        </tr>
      </thead>
      <tbody>
      <?php include_once "./handlers/conection.php";


$sql="SELECT * FROM `leaderboard` ORDER BY `score` DESC";


$result=mysqli_query($con, $sql);

if (mysqli_num_rows($result)>0) {
  $rank = 1;
  while($row=mysqli_fetch_assoc($result)) {
    ?>
        <tr>
              <td><?php echo $rank++; ?></td>
              <td><?php echo $row['un']; ?></td>
              <td><?php echo $row['score']; ?></td>
        </tr>
        <?php
    }
  }

  mysqli_close($con);
  ?>
      </tbody>
    </table>
  </div>

</body>
</html>
