<?php

require_once 'aws-sdk/vendor/autoload.php';
require_once 'tpyo-amazon-s3-php-class-2061fa8/S3.php';
require_once 'chromephp/ChromePhp.php';

use Aws\SimpleDb\SimpleDbClient;

function getS3 () {

  $credentials = file('nothing-to-see-here-folks.secretSauce');

  // Remove \n character.
  $access = preg_replace("/[\n\r]/","",$credentials[0]);  
  $secret = preg_replace("/[\n\r]/","",$credentials[1]);  

  return new S3($access, $secret);
}

function getClient () {

  $credentials = file('nothing-to-see-here-folks.secretSauce');

  return SimpleDbClient::factory(array(
    'key'    => $credentials[0],
    'secret' => $credentials[1],
    'region' => 'us-east-1',
  ));
}

function addNews($title, $imageUrl, $videoEmbedCode, $transcript) {

  $id = uniqid();
  $now = time();

  // Write the transcript file into a tmp folder.
  $transcriptFile = "../tmp/transcript-$id.txt";

  file_put_contents($transcriptFile, $transcript);

  // Instantiate s3, setup mw_tutors bucket.
  $s3 = getS3();
  $s3->putBucket("mw_tutors", S3::ACL_PUBLIC_READ);

  $s3transcriptFile = "transcript-$id.txt";
    
  if ($s3->putObjectFile($transcriptFile, "mw_tutors", $s3transcriptFile, S3::ACL_PUBLIC_READ)) 
  {  
     ChromePhp::log("upload successful"); 
  }
  else
  {  
     ChromePhp::log("upload failed!");
  } 

  unlink($transcriptFile);

  $client = getClient();

  $client->putAttributes(array(
    'DomainName' => 'mw_newsfeed',
    'ItemName'   => $id,
    'Attributes' => array(
      array('Name' => 'title', 'Value' => $title),
      array('Name' => 'imageUrl', 'Value' => $imageUrl),
      array('Name' => 'videoEmbedCode', 'Value' => $videoEmbedCode),
      array('Name' => 's3transcriptFile', 'Value' => $s3transcriptFile),
      array('Name' => 'status', 'Value' => '1'),
      array('Name' => 'timestamp', 'Value' => $now),
    )
  ));

  return;
}

function deleteNews($id) {

  $client = getClient();

  $client->putAttributes(array(
    'DomainName' => 'mw_newsfeed',
    'ItemName'   => $id,
    'Attributes' => array(
      array('Name' => 'status', 'Value' => '0', 'Replace' => true),
    )
  ));
}

function getNewsfeed ()
{
  $client = getClient();

  // Parse RSS into this array:

  $rss = array(
    array(
      'title' => 'This is a title,This is a title,This is a title,This is a title,',
      'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'date' => 'November 12, 2013',
    ),
    array(
      'title' => 'This is a title,This is a title,This is a title,This is a title,',
      'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'date' => 'November 12, 2013',
    ),
    array(
      'title' => 'This is a title,This is a title,This is a title,This is a title,',
      'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'date' => 'November 12, 2013',
    )
  );

  return $rss;

  $result = $client->select(array(
      'SelectExpression' => "select * from mw_newsfeed where status = '1'"
  ));

  $newsfeed = [];

  if ($result['Items'])
  {
    foreach ($result['Items'] as $item) {
      $news = [];

      // Save ItemName as id.
      $news['id'] = $item['Name'];

      foreach ($item['Attributes'] as $attr) {

        // Retrieve full transcript from s3.
        if($attr['Name'] == 's3transcriptFile')
        {
          $s3transcriptFile = (string) $attr['Value'];
          $response = S3::getObject('mw_tutors', $s3transcriptFile);
          $news['transcript'] = $response->body;
        }
        // send timestamp as an integer.
        else if ($attr['Name'] == 'timestamp')
        {
          $news[$attr['Name']] = (int) $attr['Value'];
        }
        else
        {
          $news[$attr['Name']] = $attr['Value'];
        }
      };

      $newsfeed[] = $news;
    }
  }

  return $newsfeed;
}

?>
