<?php

  require 'aws-sdb-methods.php';

  $params = json_decode(file_get_contents('php://input'));

  $response['newsfeed'] = getNewsfeed();

  $response['log'] = "Amazon SimpleDB: retrieved the news.";
  
  $jsonString = json_encode($response);

  echo $jsonString;

?>
