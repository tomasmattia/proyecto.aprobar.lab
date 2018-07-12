<?php
    use \Firebase\JWT\JWT as JWT;

    class Middlewares
    {
        public static function ValidarSeteados($request,$response,$next)
        {
            $parametros=$request->getParsedBody();

            if(!isset($parametros['correo']))
            {
                return $response->withJson((["mensaje"=>"el correo no esta seteado"]));
            }
            else
            {
                if(!isset($parametros['clave']))
                {
                    return $response->withJson((["mensaje"=>"la clave no esta seteada"]));
                }
                else
                {
                    $response = $next($request, $response);
                    return $response;
                }
            }
        }

        public static function ValidarVacios($request,$response,$next)
        {
            $parametros=$request->getParsedBody();

            if($parametros['correo']=="")
            {
                return $response->withJson((["mensaje"=>"el correo esta vacio"]));
            }
            else
            {
                if($parametros['clave']=="")
                {
                    return $response->withJson((["mensaje"=>"la clave esta vacia"]));
                }
                else
                {
                    $response = $next($request, $response);
                    return $response;
                }
            }
        }

        public static function ValidarExistencia($request,$response,$next)
        {
            $parametros=$request->getParsedBody();
            $correo=$parametros['correo'];
            $clave=$parametros['clave'];
            $banderaCorreo=0;
            $banderaClave=0;
            $usuario='root';
            $pass='';
            $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
            $sql=$objetoPDO->prepare('SELECT `correo` FROM `usuarios` WHERE `correo` = :correo');
            $sql->bindValue(':correo', $correo);
            $sql->execute();
            $result = $sql->rowCount();
            if($result)
            {
                $banderaCorreo=1;
            }
            $objetoPDOCorreo = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
            $sql=$objetoPDOCorreo->prepare('SELECT `clave` FROM `usuarios` WHERE `clave` = :clave');
            $sql->bindValue(':clave', $clave);
            $sql->execute();
            $resultCorreo = $sql->rowCount();
            if($result)
            {
                $banderaClave=1;
            }
            if($banderaCorreo==0)
            {
                return $response->withJson((["mensaje"=>"el correo no existe"]));
            }
            else
            {
                if($banderaClave==0)
                {
                    return $response->withJson((["mensaje"=>"la clave no existe"]));
                }
                else
                {
                    $response = $next($request, $response);
                    return $response;
                }
            }
        }
        public function ValidarAccesoPropietario($request,$response)
        {
            $elToken= $request->getHeader('miToken');
            try
            {
                $jwtDecode = JWT::decode($elToken[0],'example_key',array('HS256'));
                try
                {
                    $usuario='root';
                    $pass='';
                    $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                    $sql=$objetoPDO->prepare('SELECT `perfil` FROM `usuarios` WHERE `correo` = :correo AND `clave` = :clave');
                    $sql->bindValue(':correo', $jwtDecode->correo);
                    $sql->bindValue(':clave', $jwtDecode->clave);
                    $sql->execute();
                    $result = $sql->rowCount();
                    if($result)
                    {
                        $objeto=$sql->fetchObject();
                        if ($objeto->perfil ==="Admin") 
                        {
                            return true;
                        }
                    }
                    return false;
                }
                catch(PDOException $e)
                {
                    return false;
                }
            }
            catch(Exception $e)
            {
                return false;
            }
        }

        public function ValidarAccesoEncargado($request,$response)
        {
            $elToken= $request->getHeader('miToken');
            try
            {
                $jwtDecode = JWT::decode($elToken[0],'example_key',array('HS256'));
                try
                {
                    $usuario='root';
                    $pass='';
                    $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                    $sql=$objetoPDO->prepare('SELECT `perfil` FROM `usuarios` WHERE `correo` = :correo AND `clave` = :clave');
                    $sql->bindValue(':correo', $jwtDecode->correo);
                    $sql->bindValue(':clave', $jwtDecode->clave);
                    $sql->execute();
                    $result = $sql->rowCount();
                    if($result)
                    {
                        $objeto=$sql->fetchObject();
                        if ($objeto->perfil ==="Moderador") 
                        {
                            return true;
                        }
                    }
                    return false;
                }
                catch(PDOException $e)
                {
                    return false;                
                }
            }
            catch(Exception $e)
            {
                return false;
            }
        }


    }