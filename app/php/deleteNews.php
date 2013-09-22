<?php

  require 'aws-sdb-methods.php';

  $params = json_decode(file_get_contents('php://input'));
  $id = $params->id;

  deleteNews($id);

  $response['log'] = "Amazon SimpleDB: deleted the news [$id]";
  
  $jsonString = json_encode($response);

  echo $jsonString;

?>
