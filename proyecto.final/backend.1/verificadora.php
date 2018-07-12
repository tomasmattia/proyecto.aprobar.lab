<?php
    use \Firebase\JWT\JWT as JWT;

    class Verificadora
    {
        public function AltaRegistro($request,$response)
        {
            $parametros=$request->getParsedBody();
            $nombre=$parametros['nombre'];
            $apellido=$parametros['apellido'];
            $correo=$parametros['correo'];
            $clave=$parametros['clave'];
            $perfil=$parametros['perfil'];
            $legajo=$parametros['legajo'];

            $destino = "./fotos/usuarios/" . $correo . "-" . $legajo . ".jpg";

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('INSERT INTO `usuarios`(`correo`,`clave`,`nombre`,`apellido`,`perfil`,`foto`,`legajo`) VALUES (:correo,:clave,:nombre,:apellido,:perfil,:foto,:legajo)');
                
                $sql->execute(array(
                    'correo' => $correo,
                    'clave' => $clave,
                    'nombre' => $nombre,
                    'apellido' => $apellido,
                    'foto' => $destino,
                    'perfil' => $perfil,
                    'legajo' => $legajo,
                    
                ));
                
                move_uploaded_file($_FILES["foto"]["tmp_name"], $destino);
                
                return $response->withJson((["destino"=>$destino]));
            }
            catch(PDOException $e) 
            {
                return $response->withJson((["error"=>$e->getMessage()]));
            }
        }

        public function VerificarUsuario($request,$response,$next)
        {
            $parametros=$request->getParsedBody();
            $correo=$parametros['correo'];
            $clave=$parametros['clave'];
            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('SELECT `correo`,`clave` FROM `usuarios` WHERE `correo` = :correo AND `clave` = :clave');
                $sql->bindValue(':correo', $correo);
                $sql->bindValue(':clave', $clave);
                $sql->execute();
                $result = $sql->rowCount();
                if($result)
                {
                    $response = $next($request, $response);
                }
                else
                {
                    return $response->withJson((["mensaje"=>"Datos de logeo incorrectos"]));
                }
            }
            catch(PDOException $e)
            {
                return "Error!\n" . $e->getMessage();
            }
            return $response;
        }

        public function ValidarToken($request,$response,$next)
        {
            $elToken= $request->getHeader('miToken');
            try
            {
                $jwtDecode = JWT::decode($elToken[0],'example_key',array('HS256'));
                $response = $next($request, $response);
                return $response;
            }
            catch(Exception $e)
            {
                return $response->withJson((["mensaje"=>"token invalido"]),409);
            }
        }

        public static function TraerLasMedias($request,$response)
        {
            $arrayMedias=array();
            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('SELECT `color`, `marca`, `precio`, `talle`,`id` FROM `camisetas`');
                $sql->execute();
                while($result = $sql->fetchObject())
                {
                    array_push($arrayMedias,$result);
                }
            }
            catch(PDOException $e)
            {
                echo "Error!\n" . $e->getMessage();
            }
            return $arrayMedias;
        }

        public static function TraerLosEmpleados($request,$response)
        {
            $arrayEmpleados=array();
            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('SELECT `id`,`nombre`,`apellido`,`correo`,`foto`,`clave`,`perfil`,`legajo` FROM `usuarios`');
                $sql->execute();
                while($result = $sql->fetchObject())
                {
                    array_push($arrayEmpleados,$result);
                }
            }
            catch(PDOException $e)
            {
                echo "Error!\n" . $e->getMessage();
            }
            return $arrayEmpleados;
        }

        public static function AgregarMedia($request,$response)
        {
            $parametros=$request->getParsedBody();

            $color=$parametros['color'];
            $marca=$parametros['marca'];
            $precio=$parametros['precio'];
            $talle=$parametros['talle'];

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('INSERT INTO `camisetas`(`color`, `marca`, `precio`, `talle`) VALUES (:color, :marca, :precio, :talle)');
                
                $sql->execute(array(
                    'color' => $color,
                    'marca' => $marca,
                    'precio' => $precio,
                    'talle' => $talle
                ));
                                
                return $response;
            }
            catch(PDOException $e) 
            {
                return $response->withJson((["error"=>$e->getMessage()]));
            }
        }

        public static function EliminarMedia($request,$response)
        {
            $parametros=$request->getParsedBody();
            
            $id=$parametros['id'];

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('DELETE FROM `camisetas` WHERE `id`= :id');
                
                $sql->execute(array('id' => $id));
                                
                return $response->withJson((["mensaje"=>"todoOk"]));
            }
            catch(PDOException $e) 
            {
                return $response->withJson((["error"=>$e->getMessage()]));
            }
        }

        public static function ModificarMedia($request,$response)
        {
            $parametros=$request->getParsedBody();
            
            $id=$parametros['id'];
            $color=$parametros['color'];
            $marca=$parametros['marca'];
            $precio=$parametros['precio'];
            $talle=$parametros['talle'];

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=finalproglab;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('UPDATE `camisetas` SET `color`=:color,`marca`=:marca,`precio`=:precio,`talle`=:talle WHERE `id`=:id');
                
                $sql->execute(array(
                    'color' => $color,
                    'marca' => $marca,
                    'precio' => $precio,
                    'talle' => $talle,
                    'id' => $id
                ));
                return $response->withJson((["mensaje"=>"todoOk"]));
            }
            catch(PDOException $e) 
            {
                return $response->withJson((["error"=>$e->getMessage()]));
            }
        }



    }
    
?>