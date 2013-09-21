<?php

  require 'aws-sdb-methods.php';

  $params = json_decode(file_get_contents('php://input'));
  $title = $params->title;
  $videoEmbedCode = $params->videoEmbedCode;
  $transcript = $params->transcript;

  addNews($title, $videoEmbedCode, $transcript);

  $response['log'] = "Amazon SimpleDB: added the news.";
  
  $jsonString = json_encode($response);

  echo $jsonString;

?>
