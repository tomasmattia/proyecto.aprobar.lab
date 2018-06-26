var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Limpiar = function () {
            document.getElementById('nombre').value = "";
            document.getElementById('clave').value = "";
        };
        Manejadora.Logear = function () {
            var nombre = document.getElementById('nombre').value;
            var clave = document.getElementById('clave').value;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "../backend.1/test", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("nombre=" + nombre + '&clave=' + clave);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if (xmlhttp.responseText != "Error nombre o clave incorrectos") {
                        localStorage.setItem('miToken', xmlhttp.responseText);
                        window.location.assign('./listadoCd.php');
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
            document.getElementById('titulo').value = objJson.titulo;
            document.getElementById('interprete').value = objJson.interprete;
            document.getElementById('anio').value = objJson.anio;
            document.getElementById('id').readOnly = true;
            document.getElementById('titulo').readOnly = false;
            document.getElementById('interprete').readOnly = false;
            document.getElementById('anio').readOnly = false;
            document.getElementById('imagen').src = "../backend.1/" + objJson.foto;
            document.getElementById('archivo').hidden = false;
            document.getElementById('imagen').hidden = false;
            document.getElementById('divId').hidden = false;
            document.getElementById('boton-agregar').hidden = true;
            document.getElementById('boton-agregar').innerText = "Modificar";
            console.log(objJson);
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById('formularioLabel').innerText = "Agregar";
            document.getElementById('id').value = "";
            document.getElementById('titulo').value = "";
            document.getElementById('interprete').value = "";
            document.getElementById('anio').value = "";
            document.getElementById('id').readOnly = false;
            document.getElementById('titulo').readOnly = false;
            document.getElementById('interprete').readOnly = false;
            document.getElementById('anio').readOnly = false;
            document.getElementById('archivo').hidden = false;
            document.getElementById('imagen').hidden = true;
            document.getElementById('divId').hidden = true;
            document.getElementById('boton-agregar').hidden = false;
            document.getElementById('boton-agregar').innerText = "Agregar";
            document.getElementById('boton-borrar').hidden = true;
        };
        Manejadora.Eliminar = function (objJson) {
            document.getElementById('formularioLabel').innerText = "Eliminar";
            document.getElementById('id').value = objJson.id;
            document.getElementById('titulo').value = objJson.titulo;
            document.getElementById('interprete').value = objJson.interprete;
            document.getElementById('anio').value = objJson.anio;
            document.getElementById('id').readOnly = true;
            document.getElementById('titulo').readOnly = true;
            document.getElementById('interprete').readOnly = true;
            document.getElementById('anio').readOnly = true;
            document.getElementById('imagen').src = "../backend.1/" + objJson.foto;
            document.getElementById('imagen').alt = "../backend.1/" + objJson.foto;
            document.getElementById('archivo').hidden = true;
            document.getElementById('imagen').hidden = false;
            document.getElementById('divId').hidden = false;
            document.getElementById('boton-agregar').hidden = true;
            document.getElementById('boton-borrar').hidden = false;
        };
        Manejadora.Deslogear = function () {
        };
        Manejadora.Agregar = function () {
            var titulo = document.getElementById('titulo').value;
            var interprete = document.getElementById('interprete').value;
            var anio = document.getElementById('anio').value;
            var foto = document.getElementById("fotoSubir");
            var miToken = localStorage.getItem('miToken');
            if (miToken === null) {
                alert("Usuario no logeado");
                window.location.href = './home.php';
                return;
            }
            var formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('interprete', interprete);
            formData.append('anio', anio);
            formData.append('foto', foto.files[0]);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "../backend.1/acciones/add", true);
            xmlhttp.setRequestHeader("enctype", "multipart/form-data");
            xmlhttp.setRequestHeader("miToken", miToken);
            xmlhttp.send(formData);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                }
            };
        };
        Manejadora.Borrar = function () {
            var titulo = document.getElementById('titulo').value;
            var interprete = document.getElementById('interprete').value;
            var id = document.getElementById("id").value;
            var foto = document.getElementById("imagen").alt;
            console.log(foto);
            var miToken = localStorage.getItem('miToken');
            if (miToken === null) {
                alert("Usuario no logeado");
                window.location.href = './home.php';
                return;
            }
            var formData = new FormData();
            formData.append('id', id);
            formData.append('titulo', titulo);
            formData.append('interprete', interprete);
            formData.append('foto', foto);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("DELETE", "../backend.1/acciones/delete/");
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlhttp.setRequestHeader("miToken", miToken);
            xmlhttp.send(formData);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                }
            };
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
