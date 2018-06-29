<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT as JWT;

require 'vendor/autoload.php';
require 'verificadora.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->group('/test', function (){
    $this->post('[/]', function (Request $request, Response $response) {   
        $params=$request->getParsedBody();
        $key = "example_key";
        $fecha = time();
        $payload=array(
            "user"=> $params['nombre'],
            "pass"=> $params['clave'],
            "iat"=> $fecha,
            "exp"=> $fecha+10000
        );
        $jwt = JWT::encode($payload, $key);
        return $jwt;
    })->add(\Verificadora::class.':VerificarUsuario');
});

$app->group('/alta', function (){
    $this->post('[/]', function (Request $request, Response $response) {
        Verificadora::AltaRegistro($request,$response);
    });
});

$app->group('/acciones', function (){
    $this->get('/', function (Request $request, Response $response, array $args){
        $listaCds=Verificadora::TraerLosCds($request,$response);
        return json_encode($listaCds);
    });
    $this->post('/add', function (Request $request, Response $response, array $args){
        return Verificadora::AgregarCd($request,$response);
    });
    $this->delete('/delete', function (Request $request, Response $response, array $args){
        return Verificadora::EliminarCd($request,$response);
    });
    $this->put('/modify', function (Request $request, Response $response, array $args){
        return Verificadora::ModificarCd($request,$response);
    });
})->add(\Verificadora::class.':ValidarToken');

$app->run();

?>