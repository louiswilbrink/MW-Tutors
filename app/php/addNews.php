<?php

  require 'aws-sdb-methods.php';

  $params = json_decode(file_get_contents('php://input'));
  $title = $params->title;
  $imageUrl = $params->imageUrl;
  $videoEmbedCode = $params->videoEmbedCode;
  $transcript = $params->transcript;

  if ($videoEmbedCode == "")
  {
    $videoEmbedCode = "<p>no video</p>";
  }

  addNews($title, $imageUrl, $videoEmbedCode, $transcript);

  $response['log'] = "Amazon SimpleDB: added the news.";
  
  $jsonString = json_encode($response);

  echo $jsonString;

?>
