<?php

require_once 'aws-sdk/vendor/autoload.php';
require_once 'chromephp/ChromePhp.php';

use Aws\SimpleDb\SimpleDbClient;

function getClient () {

  $credentials = file('nothing-to-see-here-folks.secretSauce');

  return SimpleDbClient::factory(array(
    'key'    => $credentials[0],
    'secret' => $credentials[1],
    'region' => 'us-east-1',
  ));
}

function addNews($title, $imageUrl, $videoEmbedCode, $transcript) {

  ChromePhp::log($videoEmbedCode);

  $client = getClient();

  $id = uniqid();

  $now = time();

  $client->putAttributes(array(
    'DomainName' => 'mw_newsfeed',
    'ItemName'   => $id,
    'Attributes' => array(
      array('Name' => 'title', 'Value' => $title),
      array('Name' => 'imageUrl', 'Value' => $imageUrl),
      array('Name' => 'videoEmbedCode', 'Value' => $videoEmbedCode),
      array('Name' => 'transcript', 'Value' => $transcript),
      array('Name' => 'status', 'Value' => '1'),
      array('Name' => 'timestamp', 'Value' => $now),
    )
  ));
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

function getScheduleAttributes($scheduleName) {

  $client = getClient();

  $result = $client->getAttributes(array(
    'DomainName' => 'schedule',
    'ItemName'   => $scheduleName,
    'Attributes' => array(
        'date_created', 'span'
    ),
    'ConsistentRead' => true
  ));

  return $result['Attributes'];
}

function getNewsfeed ()
{
  $client = getClient();

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

        // send timestamp as an integer.
        if ($attr['Name'] == 'timestamp')
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
