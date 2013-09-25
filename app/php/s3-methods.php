<?php

require_once 'tpyo-amazon-s3-php-class-2061fa8/S3.php';

require_once 'chromephp/ChromePhp.php';

function getS3 () {

  $credentials = file('nothing-to-see-here-folks.secretSauce');

  return new S3($credentials[0], $credentials[1]);
}

?>
