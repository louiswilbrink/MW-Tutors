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

function addNews($title, $videoEmbedCode, $transcript) {

  $client = getClient();

  $id = uniqid();

  $client->putAttributes(array(
    'DomainName' => 'mw_newsfeed',
    'ItemName'   => $id,
    'Attributes' => array(
      array('Name' => 'title', 'Value' => $title),
      array('Name' => 'video-embed', 'Value' => $videoEmbedCode),
      array('Name' => 'transcript', 'Value' => $transcript),
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

function addDays ($scheduleId, $days)
{
  $client = getClient();

  $dbDays = getDays($scheduleId);
  $dbFullDates = daysToFullDates($dbDays);

  foreach($days as $day)
  {
    // Add the days that are not already in the db.
    if (!in_array($day->fullDate, $dbFullDates))
    {
      // Convert True/False to 1/0 for SimpleDB.  It's... 'simple'.
      $isPossibleEventDate = $day->isPossibleEventDate ? 1 : 0;

      $client->putAttributes(array(
        'DomainName' => 'day',
        'ItemName'   => $day->id,
        'Attributes' => array(
          array('Name' => 'schedule_name', 'Value' => $scheduleId),
          array('Name' => 'day', 'Value' => $day->day),
          array('Name' => 'full_date', 'Value' => $day->fullDate),
          array('Name' => 'number', 'Value' => $day->number),
          array('Name' => 'isPossibleEventDate', 'Value' => $isPossibleEventDate),
        )));
    }
  }
}

function getTimeSlot ($day)
{
  $client = getClient();

  $dayId = $day['id'];

  $result = $client->select(array(
      'SelectExpression' => "select * from time_slot where day_id = '$dayId'"
  ));

  $timeSlots = [];

  if ($result['Items'])
  {
    foreach ($result['Items'] as $item) {

      foreach ($item['Attributes'] as $attr) {
        if($attr['Name'] != "day_id")
        {
          $timeSlots[] = $attr['Value'];
        }
      };
    }
  }

  return washForFrontend($timeSlots);
}

function getDays ($scheduleId)
{
  $client = getClient();

  $result = $client->select(array(
      'SelectExpression' => "select * from day where schedule_name = '$scheduleId'"
  ));

  $days = [];

  // Convert SimpleDB results into associative array.
  // Example:
  // 
  // "id_d7f40c9a_8309_1a2e_b473_a82e0a1098d1" =
  //   [
  //   id                  => 
  //   full_date           => "2013-09-01T17:52:47.186Z",
  //   number              => "1",
  //   day                 => "0",
  //   isPossibleEventDate => "0",
  //   schedule_name       => "id_84b1563c_a6fa_c7b6_ac89_e110986b79da"
  //   ]
  if ($result['Items'])
  {
    foreach ($result['Items'] as $item) {

      $day = [];
      $day['id'] = $item['Name'];

      foreach ($item['Attributes'] as $attr) {
        $day[$attr['Name']] = $attr['Value'];
      };

      $day['timeSlots'] = getTimeSlot($day);

      $days[$item['Name']] = $day;
    }
  }

  return $days; 
}

function saveTimeSlot ($day)
{
  $client = getClient();

  $dayId = $day->id;

  $timeSlots = washForSimpleDB($day->timeSlots);

  $client->putAttributes(array(
    'DomainName' => 'time_slot',
    'ItemName'   => $dayId,
    'Attributes' => array(
      array('Name' => 'day_id', 'Value' => $day->id, 'Replace' => true),
      array('Name' => 'slot_0', 'Value' => $timeSlots[0], 'Replace' => true),
      array('Name' => 'slot_1', 'Value' => $timeSlots[1], 'Replace' => true),
      array('Name' => 'slot_2', 'Value' => $timeSlots[2], 'Replace' => true),
      array('Name' => 'slot_3', 'Value' => $timeSlots[3], 'Replace' => true),
      array('Name' => 'slot_4', 'Value' => $timeSlots[4], 'Replace' => true),
      array('Name' => 'slot_5', 'Value' => $timeSlots[5], 'Replace' => true),
      array('Name' => 'slot_6', 'Value' => $timeSlots[6], 'Replace' => true),
      array('Name' => 'slot_7', 'Value' => $timeSlots[7], 'Replace' => true),
      array('Name' => 'slot_8', 'Value' => $timeSlots[8], 'Replace' => true),
      array('Name' => 'slot_9', 'Value' => $timeSlots[9], 'Replace' => true),
      array('Name' => 'slot_10', 'Value' => $timeSlots[10], 'Replace' => true),
      array('Name' => 'slot_11', 'Value' => $timeSlots[11], 'Replace' => true),
    )));
}

function saveDay ($scheduleId, $day)
{
  
  $client = getClient();

  // Convert True/False to 1/0 for SimpleDB.  It's... 'simple'.
  $isPossibleEventDate = $day->isPossibleEventDate ? 1 : 0;

  $client->putAttributes(array(
    'DomainName' => 'day',
    'ItemName'   => $day->id,
    'Attributes' => array(
      array('Name' => 'schedule_name', 'Value' => $scheduleId, 'Replace' => true),
      array('Name' => 'day', 'Value' => $day->day, 'Replace' => true),
      array('Name' => 'full_date', 'Value' => $day->fullDate, 'Replace' => true),
      array('Name' => 'number', 'Value' => $day->number, 'Replace' => true),
      array('Name' => 'isPossibleEventDate', 'Value' => $isPossibleEventDate, 'Replace' => true),
    )));

  saveTimeSlot($day);
}

?>
