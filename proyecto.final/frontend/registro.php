<!doctype html>
<html lang="es">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <script src="funciones.js"></script>
    <title>Listado CDs</title>
  </head>
  <body>
    <div class="container-fluid">
      <h2 class="display-4 text-center">Registro</h2>
        <div class="row justify-content-center">
            <div class="card" style="width: 40rem;">
                <div class="card-body bg-secondary">
                    <form class="form-horizontal" role="form" id='formulario'>
                        <label for="nombre" class="control-label"></label><h6 class="card-subtitle mb-2 text-light">Nombre</h6>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-user"></i></div>
                            </div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre">
                            <span id="errorNombre" style="color:red;" hidden=true></span>
                        </div>
                        <label for="apellido" class="control-label"></label><h6 class="card-subtitle mb-2 text-light">Apellido</h6>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-user"></i></div>
                            </div>
                            <input type="text" class="form-control" id="apellido" placeholder="Apellido">
                            <span id="errorApellido" style="color:red;" hidden=true></span>
                        </div>
                        <label for="correo" class="control-label"></label><h6 class="card-subtitle mb-2 text-light">Email</h6>
                        <div class="input-group mb-2">
                            
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-at"></i></div>
                            </div>
                            <input type="text" class="form-control" id="correo" placeholder="Email">
                            <span id="errorEmail" style="color:red;" hidden=true></span>
                        </div>
                        <label for="legajo" class="control-label"></label><h6 class="card-subtitle mb-2 text-light">Legajo</h6>
                        <div class="input-group mb-2">
                            
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-address-card"></i></div>
                            </div>
                            <input type="number" class="form-control" id="legajo" placeholder="Legajo">
                            <span id="errorLegajo" style="color:red;" hidden=true></span>
                        </div>
                        <label for="perfil" class="control-label"></label><h6 class="card-subtitle mb-2 text-light">Perfil</h6>
                        <div class="input-group mb-2">
                            <select class="custom-select" id='perfil'>
                                <option selected value="Usuario" >Usuario</option>
                                <option value="Moderador">Moderador</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <span id="errorPerfil" style="color:red;" hidden=true></span>
                        </div>
                        <label for="foto" class="control-label"></label><h6 class="card-subtitle mb-2 text-light">Foto</h6>
                        <div class="input-group mb-2">
                            
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-camera"></i></div>
                            </div>
                            <input type="file" class="form-control" id="foto" placeholder="Foto">
                            <span id="errorFoto" style="color:red;" hidden=true></span>
                        </div>
                        <label for="clave" class="control-label"></label><h6 class="card-subtitle mb-2 text-light">Contraseña</h6>
                        <div class="input-group mb-2">
                            
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-unlock"></i></div>
                            </div>
                            <input type="password" class="form-control" id="clave" placeholder="Contraseña">
                            <span id="errorClave" style="color:red;" hidden=true></span>
                        </div>
                        <label for="confirmar" class="control-label"></label><h6 class="card-subtitle mb-2 text-light">Confirmar contraseña</h6>
                        <div class="input-group mb-2">
                            
                            <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-unlock"></i></div>
                            </div>
                            <input type="password" class="form-control" id="confirmar" placeholder="Confirmar contraseña">
                            <span id="errorConfirmar" style="color:red;" hidden=true></span>
                        </div>
                        <div class="input-group mb-2">
                            <div class="alert alert-danger col-12" role="alert" id="alertaRegistro" hidden=true></div>
                        </div>
                        <div class="form-group">
                            <div class="row d-flex justify-content-center">
                                <a class="btn btn-warning mt-2" onclick="Test.Manejadora.AltaRegistro()">Registrarse</a>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>               
        </div>
    </div>
    <!-- Modal Ends -->
    <!-- Button trigger modal -->
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    
  </body>
</html>
