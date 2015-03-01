<?php
/**
 * User: saada
 * Date: 3/1/15
 * Time: 12:46 PM
 */
namespace app\services;


use Guzzle\Http\Client;

class Film
{
    // this is the main API url for SF movie filming locations
    private $baseUrl = "https://data.sfgov.org/resource/yitu-d5am.json";
    private $client;
    private $token;

    public function __construct()
    {
        $this->token = \Yii::$app->params['security_token'];
        $this->token = rawurlencode($this->token);
        $this->client = new Client();
    }

    /**
     * Generic function to make an API call with secure token as a custom HTTP header as required in the API docs
     * here http://dev.socrata.com/foundry/#/data.sfgov.org/yitu-d5am
     *
     * @param $serviceName
     * @param array $args
     * @return array|bool|float|int|string
     */
    private function callApi($serviceName, $args = [])
    {
        $request = $this->client->get($this->baseUrl, ['X-App-Token' => $this->token], ['query' => $args]);
        $response = $request->send();
        return $response->json();
    }

    /**
     * Retrieves a list of Films from API
     * @return resource
     */
    public function GetAllFilms()
    {
        return $this->callApi(__FUNCTION__);
    }
}