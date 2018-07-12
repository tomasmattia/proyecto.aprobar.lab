var Test;
(function (Test) {
    var ValidadoraLogin = /** @class */ (function () {
        function ValidadoraLogin() {
        }
        ValidadoraLogin.LimpiarErrores = function () {
            document.getElementById("errorCorreo").innerHTML = "";
            document.getElementById("errorClave").innerHTML = "";
            document.getElementById("alertaLogin").innerHTML = "";
            document.getElementById("alertaLogin").hidden = true;
            document.getElementById("errorCorreo").hidden = true;
            document.getElementById("errorClave").hidden = true;
        };
        ValidadoraLogin.LimpiarCampos = function () {
            document.getElementById("correo").value = "";
            document.getElementById("clave").value = "";
            this.LimpiarErrores();
        };
        ValidadoraLogin.ValidarLoginVacios = function (mail, clave) {
            if (clave == "" && mail == "") {
                document.getElementById("errorCorreo").innerHTML = "*";
                document.getElementById("errorClave").innerHTML = "*";
                document.getElementById("alertaLogin").innerHTML = "Correo y Contraseña se encuentran vacios";
                document.getElementById("alertaLogin").hidden = false;
                document.getElementById("errorCorreo").hidden = false;
                document.getElementById("errorClave").hidden = false;
                return false;
            }
            else {
                if (mail == "") {
                    document.getElementById("errorCorreo").innerHTML = "*";
                    document.getElementById("alertaLogin").innerHTML = "Correo se encuentra vacio";
                    document.getElementById("alertaLogin").hidden = false;
                    document.getElementById("errorCorreo").hidden = false;
                    return false;
                }
                else {
                    if (clave == "") {
                        document.getElementById("errorClave").innerHTML = "*";
                        document.getElementById("alertaLogin").innerHTML = "Contraseña se encuentra vacia";
                        document.getElementById("alertaLogin").hidden = false;
                        document.getElementById("errorClave").hidden = false;
                        return false;
                    }
                }
            }
            return true;
        };
        ValidadoraLogin.ValidarLoginFormato = function (mail, clave) {
            if (!(this.validarMail(mail)) && !(this.validarClave(clave))) {
                document.getElementById("errorCorreo").innerHTML = "*";
                document.getElementById("errorClave").innerHTML = "*";
                document.getElementById("alertaLogin").innerHTML = "Correo y Contraseña tienen formato invalido";
                document.getElementById("errorCorreo").hidden = false;
                document.getElementById("errorClave").hidden = false;
                document.getElementById("alertaLogin").hidden = false;
                return false;
            }
            else {
                if (!(this.validarMail(mail))) {
                    document.getElementById("errorCorreo").innerHTML = "*";
                    document.getElementById("alertaLogin").innerHTML = "Correo tiene formato invalido";
                    document.getElementById("alertaLogin").hidden = false;
                    document.getElementById("errorCorreo").hidden = false;
                    return false;
                }
                else {
                    if (!(this.validarClave(clave))) {
                        document.getElementById("errorClave").innerHTML = "*";
                        document.getElementById("alertaLogin").innerHTML = "Contraseña tiene formato invalido";
                        document.getElementById("alertaLogin").hidden = false;
                        document.getElementById("errorClave").hidden = false;
                        return false;
                    }
                }
            }
            return true;
        };
        ValidadoraLogin.validarMail = function (mail) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(mail).toLowerCase());
        };
        ValidadoraLogin.validarClave = function (clave) {
            if (clave.length >= 4 && clave.length <= 8) {
                return true;
            }
            else {
                return false;
            }
        };
        return ValidadoraLogin;
    }());
    Test.ValidadoraLogin = ValidadoraLogin;
})(Test || (Test = {}));
var Test;
(function (Test) {
    var ValidadoraRegistro = /** @class */ (function () {
        function ValidadoraRegistro() {
        }
        ValidadoraRegistro.LimpiarErrores = function () {
            document.getElementById("errorApellido").innerHTML = "";
            document.getElementById("errorApellido").hidden = true;
            document.getElementById("errorNombre").innerHTML = "";
            document.getElementById("errorNombre").hidden = true;
            document.getElementById("errorEmail").innerHTML = "";
            document.getElementById("errorEmail").hidden = true;
            document.getElementById("errorLegajo").innerHTML = "";
            document.getElementById("errorLegajo").hidden = true;
            document.getElementById("errorClave").innerHTML = "";
            document.getElementById("errorClave").hidden = true;
            document.getElementById("errorConfirmar").innerHTML = "";
            document.getElementById("errorConfirmar").hidden = true;
            document.getElementById("errorFoto").innerHTML = "";
            document.getElementById("errorFoto").hidden = true;
            document.getElementById("alertaRegistro").innerHTML = "";
            document.getElementById("alertaRegistro").hidden = true;
        };
        ValidadoraRegistro.ValidarVacios = function (nombre, apellido, mail, legajo, clave, confirmar, foto) {
            var errores = [];
            if (nombre == "") {
                errores.push("Nombre");
                document.getElementById("errorNombre").innerHTML = "*";
                document.getElementById("errorNombre").hidden = false;
            }
            if (apellido == "") {
                errores.push("Apellido");
                document.getElementById("errorApellido").innerHTML = "*";
                document.getElementById("errorApellido").hidden = false;
            }
            if (mail == "") {
                errores.push("Email");
                document.getElementById("errorEmail").innerHTML = "*";
                document.getElementById("errorEmail").hidden = false;
            }
            if (legajo == "") {
                errores.push("Legajo");
                document.getElementById("errorLegajo").innerHTML = "*";
                document.getElementById("errorLegajo").hidden = false;
            }
            if (clave == "") {
                errores.push("Clave");
                document.getElementById("errorClave").innerHTML = "*";
                document.getElementById("errorClave").hidden = false;
            }
            if (confirmar == "") {
                errores.push("Confirmar");
                document.getElementById("errorConfirmar").innerHTML = "*";
                document.getElementById("errorConfirmar").hidden = false;
            }
            if (foto.value == "") {
                console.log(errores.push("Foto"));
                document.getElementById("errorFoto").innerHTML = "*";
                document.getElementById("errorFoto").hidden = false;
            }
            if (errores.length == 0) {
                console.log(errores);
                return true;
            }
            var stringErrores = "Los siguientes campos estan vacios: <br>";
            errores.forEach(function (error) {
                stringErrores += error + "<br>";
            });
            document.getElementById("alertaRegistro").innerHTML = stringErrores;
            document.getElementById("alertaRegistro").hidden = false;
            console.log(errores);
            return false;
        };
        ValidadoraRegistro.ValidarRegistro = function (nombre, apellido, mail, legajo, clave, confirmar, foto) {
            var legajoParsed = parseInt(legajo);
            var errores = [];
            errores = this.ValidarNombreApellido(nombre, apellido, errores);
            errores = this.validarMail(mail, errores);
            errores = this.ValidarLegajo(legajoParsed, errores);
            errores = this.ValidarClaveConfirmar(clave, confirmar, errores);
            errores = this.ValidarFoto(foto, errores);
            if (errores.length == 0) {
                console.log(errores);
                return true;
            }
            var stringErrores = "Los siguientes campos tienen errores de formato: <br>";
            errores.forEach(function (error) {
                stringErrores += error + "<br>";
            });
            document.getElementById("alertaRegistro").innerHTML = stringErrores;
            document.getElementById("alertaRegistro").hidden = false;
            console.log(errores);
            return false;
        };
        ValidadoraRegistro.ValidarNombreApellido = function (nombre, apellido, errores) {
            if (apellido.length > 15) {
                errores.push("Apellido");
                document.getElementById("errorApellido").innerHTML = "*";
                document.getElementById("errorApellido").hidden = false;
            }
            if (nombre.length > 10) {
                errores.push("Nombre");
                document.getElementById("errorNombre").innerHTML = "*";
                document.getElementById("errorNombre").hidden = false;
            }
            return errores;
        };
        ValidadoraRegistro.validarMail = function (mail, errores) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!(re.test(String(mail).toLowerCase()))) {
                errores.push("Email");
                document.getElementById("errorEmail").innerHTML = "*";
                document.getElementById("errorEmail").hidden = false;
            }
            return errores;
        };
        ValidadoraRegistro.ValidarLegajo = function (legajo, errores) {
            if (legajo < 100 || legajo > 999999) {
                errores.push("Legajo");
                document.getElementById("errorLegajo").innerHTML = "*";
                document.getElementById("errorLegajo").hidden = false;
            }
            return errores;
        };
        ValidadoraRegistro.ValidarClaveConfirmar = function (clave, confirmar, errores) {
            if (clave.length > 8 || clave.length < 4) {
                errores.push("Clave");
                document.getElementById("errorClave").innerHTML = "*";
                document.getElementById("errorClave").hidden = false;
            }
            if (confirmar !== clave) {
                errores.push("Confirmar");
                document.getElementById("errorConfirmar").innerHTML = "*";
                document.getElementById("errorConfirmar").hidden = false;
            }
            return errores;
        };
        ValidadoraRegistro.ValidarFoto = function (foto, errores) {
            var filePath = foto.value;
            var allowedExtensions = /(\.jpg|\.png)$/i;
            if (!allowedExtensions.exec(filePath)) {
                errores.push("Foto - Solo JPG y PNG");
                document.getElementById("errorFoto").innerHTML = "*";
                document.getElementById("errorFoto").hidden = false;
            }
            return errores;
        };
        return ValidadoraRegistro;
    }());
    Test.ValidadoraRegistro = ValidadoraRegistro;
})(Test || (Test = {}));
/// <reference path="./funcionesLogin.ts" />
/// <reference path="./funcionesRegistro.ts" />
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Limpiar = function () {
            document.getElementById('nombre').value = "";
            document.getElementById('clave').value = "";
        };
        Manejadora.AltaRegistro = function () {
            var nombre = document.getElementById('nombre').value;
            var apellido = document.getElementById('apellido').value;
            var clave = document.getElementById('clave').value;
            var confirmar = document.getElementById('confirmar').value;
            var correo = document.getElementById('correo').value;
            var perfil = document.getElementById('perfil').value;
            var legajo = document.getElementById('legajo').value;
            var foto = document.getElementById('foto');
            console.log(nombre, clave, correo, perfil, legajo, foto);
            Test.ValidadoraRegistro.LimpiarErrores();
            if (!(Test.ValidadoraRegistro.ValidarVacios(nombre, apellido, correo, legajo, clave, confirmar, foto)) || !(Test.ValidadoraRegistro.ValidarRegistro(nombre, apellido, correo, legajo, clave, confirmar, foto))) {
                return;
            }
            var formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('clave', clave);
            formData.append('correo', correo);
            formData.append('perfil', perfil);
            formData.append('legajo', legajo);
            formData.append('foto', foto.files[0]);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "../backend.1/usuarios/", true);
            xmlhttp.setRequestHeader("enctype", "multipart/form-data");
            xmlhttp.send(formData);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if (xmlhttp.responseText != "Registro Incompleto") {
                        console.log(xmlhttp.responseText);
                        // localStorage.setItem('miToken',xmlhttp.responseText);
                        // window.location.assign('./listadoCd.php');
                        window.location.assign('./home.php');
                    }
                    else {
                        alert('Faltan datos');
                    }
                }
            };
        };
        Manejadora.Logear = function () {
            var correo = document.getElementById('correo').value;
            var clave = document.getElementById('clave').value;
            Test.ValidadoraLogin.LimpiarErrores();
            if (!(Test.ValidadoraLogin.ValidarLoginVacios(correo, clave)) || !(Test.ValidadoraLogin.ValidarLoginFormato(correo, clave))) {
                return;
            }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "../backend.1/login/", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("correo=" + correo + '&clave=' + clave);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                    var respuestaParseada = JSON.parse(xmlhttp.responseText);
                    if (respuestaParseada.mensaje == undefined) {
                        window.location.assign('./listaCamisetas.php');
                        localStorage.setItem('miToken', respuestaParseada.split('"'));
                        console.log(JSON.stringify(respuestaParseada));
                    }
                    else {
                        alert('Usuario o contraseña incorrectos');
                    }
                }
            };
        };
        Manejadora.Modificar = function (objJson) {
            document.getElementById('id').value = objJson.id;
            document.getElementById('formularioLabel').innerText = "Modificar";
            document.getElementById('marca').value = objJson.marca;
            document.getElementById('color').value = objJson.color;
            document.getElementById('talle').value = objJson.talle;
            document.getElementById('precio').value = objJson.precio;
            document.getElementById('id').readOnly = true;
            document.getElementById('marca').readOnly = false;
            document.getElementById('color').readOnly = false;
            document.getElementById('talle').readOnly = false;
            document.getElementById('precio').readOnly = false;
            //(<HTMLInputElement>document.getElementById('imagen')).src="../backend.1/"+objJson.foto;
            //(<HTMLInputElement>document.getElementById('archivo')).hidden=false;
            //(<HTMLInputElement>document.getElementById('imagen')).hidden=false;
            document.getElementById('divId').hidden = false;
            document.getElementById('boton-agregar').hidden = true;
            document.getElementById('boton-modificar').hidden = false;
            document.getElementById('boton-borrar').hidden = true;
            console.log(objJson);
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById('formularioLabel').innerText = "Agregar";
            document.getElementById('id').value = "";
            document.getElementById('marca').value = "";
            document.getElementById('color').value = "";
            document.getElementById('talle').value = "";
            document.getElementById('precio').value = "";
            document.getElementById('id').readOnly = false;
            document.getElementById('marca').readOnly = false;
            document.getElementById('color').readOnly = false;
            document.getElementById('talle').readOnly = false;
            document.getElementById('precio').readOnly = false;
            //(<HTMLImageElement>document.getElementById('imagen')).hidden=true;
            document.getElementById('boton-agregar').hidden = false;
            document.getElementById('boton-borrar').hidden = true;
            document.getElementById('boton-modificar').hidden = true;
            document.getElementById('divId').hidden = true;
        };
        Manejadora.Eliminar = function (objJson) {
            document.getElementById('formularioLabel').innerText = "Eliminar";
            document.getElementById('id').value = objJson.id;
            document.getElementById('marca').value = objJson.marca;
            document.getElementById('color').value = objJson.color;
            document.getElementById('talle').value = objJson.talle;
            document.getElementById('precio').value = objJson.precio;
            document.getElementById('id').readOnly = true;
            document.getElementById('marca').readOnly = true;
            document.getElementById('color').readOnly = true;
            document.getElementById('talle').readOnly = true;
            document.getElementById('precio').readOnly = true;
            //(<HTMLInputElement>document.getElementById('imagen')).src="../backend.1/"+objJson.foto;
            //(<HTMLInputElement>document.getElementById('imagen')).alt="../backend.1/"+objJson.foto;
            //(<HTMLInputElement>document.getElementById('archivo')).hidden=true;
            //(<HTMLInputElement>document.getElementById('imagen')).hidden=false;
            document.getElementById('divId').hidden = false;
            document.getElementById('boton-agregar').hidden = true;
            document.getElementById('boton-borrar').hidden = false;
            document.getElementById('boton-modificar').hidden = true;
        };
        Manejadora.Deslogear = function () {
            localStorage.removeItem("miToken");
            window.location.assign('./home.php');
        };
        Manejadora.AgregarObj = function () {
            var marca = document.getElementById('marca').value;
            var color = document.getElementById('color').value;
            var talle = document.getElementById('talle').value;
            var precio = document.getElementById('precio').value;
            //let foto : any = (<HTMLInputElement> document.getElementById("fotoSubir"));
            var miToken = localStorage.getItem('miToken');
            if (miToken === null) {
                alert("Usuario no logeado");
                window.location.href = './home.php';
                return;
            }
            var formData = new FormData();
            formData.append('marca', marca);
            formData.append('color', color);
            formData.append('talle', talle);
            formData.append('precio', precio);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "../backend.1/", true);
            xmlhttp.setRequestHeader("enctype", "multipart/form-data");
            xmlhttp.setRequestHeader("miToken", miToken);
            xmlhttp.send(formData);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                    location.reload();
                }
                else {
                    console.log(xmlhttp.responseText);
                }
            };
            //location.reload();
        };
        Manejadora.BorrarObj = function () {
            var marca = document.getElementById('marca').value;
            var color = document.getElementById('color').value;
            var id = document.getElementById("id").value;
            //let foto  = (<HTMLImageElement> document.getElementById("imagen")).alt;
            //console.log(foto);
            var miToken = localStorage.getItem('miToken');
            if (miToken === null) {
                alert("Usuario no logeado");
                window.location.href = './home.php';
                return;
            }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("DELETE", "../backend.1/");
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlhttp.setRequestHeader("miToken", miToken);
            xmlhttp.send("id=" + id + "&marca=" + marca + "&color=" + color);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var respuestaParseada = JSON.parse(xmlhttp.responseText);
                    if (respuestaParseada.mensaje == "todoOk") {
                        alert(xmlhttp.responseText);
                        location.reload();
                        console.log(JSON.stringify(respuestaParseada));
                    }
                    else {
                        alert(xmlhttp.responseText);
                        console.log(xmlhttp.responseText);
                    }
                }
            };
        };
        Manejadora.ModificarObj = function () {
            var id = document.getElementById('id').value;
            var marca = document.getElementById('marca').value;
            var color = document.getElementById('color').value;
            var talle = document.getElementById('talle').value;
            var precio = document.getElementById('precio').value;
            //let foto : any = (<HTMLInputElement> document.getElementById("fotoSubir"));
            var miToken = localStorage.getItem('miToken');
            if (miToken === null) {
                alert("Usuario no logeado");
                window.location.href = './home.php';
                return;
            }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("PUT", "../backend.1/", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.setRequestHeader("miToken", miToken);
            xmlhttp.send("id=" + id + "&marca=" + marca + "&color=" + color + "&talle=" + talle + "&precio=" + precio);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var respuestaParseada = JSON.parse(xmlhttp.responseText);
                    if (respuestaParseada.mensaje == "todoOk") {
                        alert(xmlhttp.responseText);
                        location.reload();
                        console.log(JSON.stringify(respuestaParseada));
                    }
                    else {
                        alert(xmlhttp.responseText);
                        console.log(xmlhttp.responseText);
                    }
                }
            };
        };
        Manejadora.EliminarEmpleado = function (objJson) {
            console.log(objJson);
            var id = objJson.id;
            //let foto : any = (<HTMLInputElement> document.getElementById("fotoSubir"));
            var txt;
            var r = confirm("Desea borrar a " + objJson.apellido + " " + objJson.nombre);
            if (r == false) {
                return;
            }
            var miToken = localStorage.getItem('miToken');
            if (miToken === null) {
                alert("Usuario no logeado");
                window.location.href = './home.php';
                return;
            }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("DELETE", "../backend.1/usuarios/", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.setRequestHeader("miToken", miToken);
            xmlhttp.send("id=" + id);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var respuestaParseada = JSON.parse(xmlhttp.responseText);
                    if (respuestaParseada.mensaje == "todoOk") {
                        alert(xmlhttp.responseText);
                        location.reload();
                        console.log(JSON.stringify(respuestaParseada));
                    }
                    else {
                        alert(xmlhttp.responseText);
                        console.log(xmlhttp.responseText);
                    }
                }
            };
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
