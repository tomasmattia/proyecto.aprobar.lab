<?php
    use \Firebase\JWT\JWT as JWT;

    class Verificadora
    {
        public function AltaRegistro($request,$response)
        {
            $parametros=$request->getParsedBody();
            $nombre=$parametros['nombre'];
            $clave=$parametros['clave'];
            $mail=$parametros['mail'];
            $perfil=$parametros['perfil'];
            $legajo=$parametros['legajo'];

            $destino = "./fotos/usuarios/" . $mail . "-" . $legajo . ".jpg";

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('INSERT INTO `clientes`(`nombre`, `clave`, `mail`, `perfil`,`legajo`,`foto`) VALUES (:nombre, :clave, :mail, :perfil, :legajo, :foto)');
                
                $sql->execute(array(
                    'nombre' => $nombre,
                    'clave' => $clave,
                    'mail' => $mail,
                    'perfil' => $perfil,
                    'legajo' => $legajo,
                    'foto' => $destino
                ));
                
                move_uploaded_file($_FILES["foto"]["tmp_name"], $destino);
                
                return $response->withJson(array(["destino"=>$destino]));
            }
            catch(PDOException $e) 
            {
                return $response->withJson(array(["error"=>$e->getMessage()]));
            }
        }

        public function VerificarUsuario($request,$response,$next)
        {
            if($request->isGet())
            {
                $response = $next($request, $response);
            }
            else
            {
                $parametros=$request->getParsedBody();
                $nombre=$parametros['nombre'];
                $clave=$parametros['clave'];
                try
                {
                    $usuario='root';
                    $pass='';
                    $objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', $usuario, $pass);
                    $sql=$objetoPDO->prepare('SELECT `nombre`,`clave` FROM `usuarios` WHERE `nombre` = :nombre AND `clave` = :clave');
                    $sql->bindValue(':nombre', $nombre);
                    $sql->bindValue(':clave', $clave);
                    $sql->execute();
                    $result = $sql->rowCount();
                    if($result)
                    {
                        $response = $next($request, $response);
                    }
                    else
                    {
                        $response->getBody()->write('Error nombre o clave incorrectos');
                    }
                }
                catch(PDOException $e)
                {
                    echo "Error!\n" . $e->getMessage();
                }
            }
            return $response;
        }

        public function ValidarToken($request,$response,$next)
        {
            $elToken= $request->getHeader('miToken');
            if(empty($elToken[0])|| $elToken[0] === "")
            {
                echo "el token esta vacio";
            }
            try
            {
                $jwtDecode = JWT::decode($elToken[0],'example_key',array('HS256'));
                $response = $next($request, $response);
                return $response;
            }
            catch(Exception $e)
            {
                return $response->withJson(array(["mensaje"=>"token invalido"]));
            }
        }

        public static function TraerLosCds($request,$response)
        {
            $arrayDeCds=array();
            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', $usuario, $pass);
                //$sql=$objetoPDO->prepare('SELECT `titel`,`interpret`,`jahr`,`id` FROM `cds`');
                $sql=$objetoPDO->prepare('SELECT `titulo`,`interprete`,`anio`,`id`,`foto` FROM `discos`');
                $sql->execute();
                while($result = $sql->fetchObject())
                {
                    array_push($arrayDeCds,$result);
                }
            }
            catch(PDOException $e)
            {
                echo "Error!\n" . $e->getMessage();
            }
            return $arrayDeCds;
        }

        public static function AgregarCd($request,$response)
        {
            $parametros=$request->getParsedBody();

            $titulo=$parametros['titulo'];
            $interprete=$parametros['interprete'];
            $anio=$parametros['anio'];
            
            $destino = "./fotos/" . $titulo . "-" . $interprete . ".jpg";

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('INSERT INTO `discos`(`titulo`, `interprete`, `anio`, `foto`) VALUES (:titulo, :interprete, :anio, :foto)');
                
                $sql->execute(array(
                    'titulo' => $titulo,
                    'interprete' => $interprete,
                    'anio' => $anio,
                    'foto' => $destino
                ));
                
                move_uploaded_file($_FILES["foto"]["tmp_name"], $destino);
                
                return $response->withJson(array(["destino"=>$destino]));
            }
            catch(PDOException $e) 
            {
                return $response->withJson(array(["error"=>$e->getMessage()]));
            }
        }

        public static function EliminarCd($request,$response)
        {
            $parametros=$request->getParsedBody();
            
            $id=$parametros['id'];
            $titulo=$parametros['titulo'];
            $interprete=$parametros['interprete'];
            $origen=$parametros['foto'];

            $destino = "./fotos/eliminadas/" . $titulo . "-" . $interprete . ".jpg";

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('DELETE FROM `discos` WHERE `id`= :id');
                
                $sql->execute(array('id' => $id));
                
                rename($origen,$destino);
                
                return $response->withJson(array(["destino"=>$destino]));
            }
            catch(PDOException $e) 
            {
                return $response->withJson(array(["error"=>$e->getMessage()]));
            }
        }

        public static function ModificarCd($request,$response)
        {
            $parametros=$request->getParsedBody();
            
            $id=$parametros['id'];
            $titulo=$parametros['titulo'];
            $interprete=$parametros['interprete'];
            $anio=$parametros['anio'];
            //$origen=$parametros['foto'];

            //$destino = "./fotos/modificadas/" . $titulo . "-" . $interprete . date("H").date("i").date("s"). ".jpg";

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('UPDATE `discos` SET `titulo`=:titulo,`interprete`=:interprete,`anio`=:anio WHERE `id`=:id');
                
                $sql->execute(array(
                    'titulo' => $titulo,
                    'interprete' => $interprete,
                    'anio' => $anio,
                    'id' => $id
                ));

                //rename($origen,$destino);

               // move_uploaded_file($_FILES["foto"]["tmp_name"], $origen);

                return $response;
            }
            catch(PDOException $e) 
            {
                return $response->withJson(array(["error"=>$e->getMessage()]));
            }
        }
    }
    
?>