<?php

/** called in a cron job on my.cs.lmu.edu/~jcrawley/~tweet-grabber.php**/
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');
require_once('firebaseLib.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "",
    'oauth_access_token_secret' => "",
    'consumer_key' => "",
    'consumer_secret' => ""
);



/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q=%23inspiration%20OR%20%23inspirational&count=1000';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
$tweets =  $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();

$url = 'https://blazing-fire-897.firebaseio.com/';
$token = '0dlcc1uSwJNfkGjvTZJ2znMJlDgaYAq3jwqDiXV6';

$fb = new fireBase($url, $token);

$todoPath = '/tweets';

/*$data = $fb->get('tweets/statuses/0/id_str');
echo $data;*/

printf("Pushing data from %s\n", $todoPath);

$response = $fb->push($todoPath, json_decode($tweets));

/**printf("Result: %s\n", $response);**/
sleep(2);
?>




