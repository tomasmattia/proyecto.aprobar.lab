/// <reference path="./funcionesLogin.ts" />
/// <reference path="./funcionesRegistro.ts" />
namespace Test
{
    export class Manejadora
    {
        public static Limpiar():void
        {
            (<HTMLInputElement>document.getElementById('nombre')).value="";
            (<HTMLInputElement>document.getElementById('clave')).value="";
        }

        public static AltaRegistro():void
        {
            let nombre:string=(<HTMLInputElement>document.getElementById('nombre')).value;
            let apellido:string=(<HTMLInputElement>document.getElementById('apellido')).value;
            let clave:string=(<HTMLInputElement>document.getElementById('clave')).value;
            let confirmar:string=(<HTMLInputElement>document.getElementById('confirmar')).value;
            let correo:string=(<HTMLInputElement>document.getElementById('correo')).value;
            let perfil:string=(<HTMLSelectElement>document.getElementById('perfil')).value;
            let legajo:string=(<HTMLInputElement>document.getElementById('legajo')).value;
            let foto:any=(<HTMLInputElement>document.getElementById('foto'));
            console.log(nombre,clave,correo,perfil,legajo,foto);
            ValidadoraRegistro.LimpiarErrores();
            if(!(ValidadoraRegistro.ValidarVacios(nombre,apellido,correo,legajo,clave,confirmar,foto)) || !(ValidadoraRegistro.ValidarRegistro(nombre,apellido,correo,legajo,clave,confirmar,foto)))
            {
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
            xmlhttp.setRequestHeader("enctype","multipart/form-data");
            xmlhttp.send(formData);

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if(xmlhttp.responseText!="Registro Incompleto")
                    {
                        console.log(xmlhttp.responseText);
                        // localStorage.setItem('miToken',xmlhttp.responseText);
                        // window.location.assign('./listadoCd.php');
                        window.location.assign('./home.php');
                    }
                    else
                    {
                        alert('Faltan datos');
                    }
                }
            }
        }

        public static Logear():void
        {
            let correo:string=(<HTMLInputElement>document.getElementById('correo')).value;
            let clave:string=(<HTMLInputElement>document.getElementById('clave')).value;
            ValidadoraLogin.LimpiarErrores();
            if(!(ValidadoraLogin.ValidarLoginVacios(correo,clave)) || !(ValidadoraLogin.ValidarLoginFormato(correo,clave)))
            {
                return;
            }
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "../backend.1/login/", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("correo="+correo+'&clave='+clave);
            xmlhttp.onreadystatechange = function () 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    console.log(xmlhttp.responseText);
                    let respuestaParseada=JSON.parse(xmlhttp.responseText);
                    if(respuestaParseada.mensaje==undefined)
                    {
                        window.location.assign('./listaCamisetas.php');
                        localStorage.setItem('miToken',respuestaParseada.split('"'));
                        console.log(JSON.stringify(respuestaParseada));
                    }
                    else
                    {
                        alert('Usuario o contraseña incorrectos');
                    }
                }
            }
        }

        public static Modificar(objJson:any):void
        {
            (<HTMLInputElement>document.getElementById('id')).value=objJson.id;
            (<HTMLInputElement>document.getElementById('formularioLabel')).innerText="Modificar";
            (<HTMLInputElement>document.getElementById('marca')).value=objJson.marca;
            (<HTMLInputElement>document.getElementById('color')).value=objJson.color;
            (<HTMLInputElement>document.getElementById('talle')).value=objJson.talle;
            (<HTMLInputElement>document.getElementById('precio')).value=objJson.precio;
            (<HTMLInputElement>document.getElementById('id')).readOnly=true;
            (<HTMLInputElement>document.getElementById('marca')).readOnly=false;
            (<HTMLInputElement>document.getElementById('color')).readOnly=false;
            (<HTMLInputElement>document.getElementById('talle')).readOnly=false;
            (<HTMLInputElement>document.getElementById('precio')).readOnly=false;
            //(<HTMLInputElement>document.getElementById('imagen')).src="../backend.1/"+objJson.foto;
            //(<HTMLInputElement>document.getElementById('archivo')).hidden=false;
            //(<HTMLInputElement>document.getElementById('imagen')).hidden=false;
            (<HTMLInputElement>document.getElementById('divId')).hidden=false;
            (<HTMLButtonElement>document.getElementById('boton-agregar')).hidden=true;
            (<HTMLButtonElement>document.getElementById('boton-modificar')).hidden=false;
            (<HTMLButtonElement>document.getElementById('boton-borrar')).hidden=true;
            console.log(objJson);
        }
        
        public static LimpiarForm():void
        {
            (<HTMLInputElement>document.getElementById('formularioLabel')).innerText="Agregar";
            (<HTMLInputElement>document.getElementById('id')).value="";
            (<HTMLInputElement>document.getElementById('marca')).value="";
            (<HTMLInputElement>document.getElementById('color')).value="";
            (<HTMLInputElement>document.getElementById('talle')).value="";
            (<HTMLInputElement>document.getElementById('precio')).value="";
            (<HTMLInputElement>document.getElementById('id')).readOnly=false;
            (<HTMLInputElement>document.getElementById('marca')).readOnly=false;
            (<HTMLInputElement>document.getElementById('color')).readOnly=false;
            (<HTMLInputElement>document.getElementById('talle')).readOnly=false;
            (<HTMLInputElement>document.getElementById('precio')).readOnly=false;
            //(<HTMLImageElement>document.getElementById('imagen')).hidden=true;
            (<HTMLButtonElement>document.getElementById('boton-agregar')).hidden=false;
            (<HTMLButtonElement>document.getElementById('boton-borrar')).hidden=true;
            (<HTMLButtonElement>document.getElementById('boton-modificar')).hidden=true;
            (<HTMLDivElement>document.getElementById('divId')).hidden=true;
        }

        public static Eliminar(objJson:any):void
        {
            (<HTMLInputElement>document.getElementById('formularioLabel')).innerText="Eliminar";
            (<HTMLInputElement>document.getElementById('id')).value=objJson.id;
            (<HTMLInputElement>document.getElementById('marca')).value=objJson.marca;
            (<HTMLInputElement>document.getElementById('color')).value=objJson.color;
            (<HTMLInputElement>document.getElementById('talle')).value=objJson.talle;
            (<HTMLInputElement>document.getElementById('precio')).value=objJson.precio;
            (<HTMLInputElement>document.getElementById('id')).readOnly=true;
            (<HTMLInputElement>document.getElementById('marca')).readOnly=true;
            (<HTMLInputElement>document.getElementById('color')).readOnly=true;
            (<HTMLInputElement>document.getElementById('talle')).readOnly=true;
            (<HTMLInputElement>document.getElementById('precio')).readOnly=true;
            //(<HTMLInputElement>document.getElementById('imagen')).src="../backend.1/"+objJson.foto;
            //(<HTMLInputElement>document.getElementById('imagen')).alt="../backend.1/"+objJson.foto;
            //(<HTMLInputElement>document.getElementById('archivo')).hidden=true;
            //(<HTMLInputElement>document.getElementById('imagen')).hidden=false;
            (<HTMLInputElement>document.getElementById('divId')).hidden=false;
            (<HTMLButtonElement>document.getElementById('boton-agregar')).hidden=true;
            (<HTMLButtonElement>document.getElementById('boton-borrar')).hidden=false;
            (<HTMLButtonElement>document.getElementById('boton-modificar')).hidden=true;
        }

        public static Deslogear():void
        {
            localStorage.removeItem("miToken");
            window.location.assign('./home.php');
        }

        public static AgregarObj():any
        {
            let marca=(<HTMLInputElement>document.getElementById('marca')).value;
            let color=(<HTMLInputElement>document.getElementById('color')).value;
            let talle=(<HTMLInputElement>document.getElementById('talle')).value;
            let precio=(<HTMLInputElement>document.getElementById('precio')).value;
            //let foto : any = (<HTMLInputElement> document.getElementById("fotoSubir"));
            
            let miToken=localStorage.getItem('miToken');

            if(miToken===null)
            {
                alert("Usuario no logeado");
                window.location.href='./home.php';
                return;
            }

            var formData = new FormData();

            formData.append('marca', marca);
            formData.append('color', color);
            formData.append('talle', talle);
            formData.append('precio', precio);

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open("POST", "../backend.1/", true);
            xmlhttp.setRequestHeader("enctype","multipart/form-data");
            xmlhttp.setRequestHeader("miToken",miToken);
            xmlhttp.send(formData);

            xmlhttp.onreadystatechange = function () 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    console.log(xmlhttp.responseText);
                    location.reload();
                }
                else
                {
                    console.log(xmlhttp.responseText);
                }
            }
            //location.reload();

        }

        public static BorrarObj():any
        {
            let marca=(<HTMLInputElement>document.getElementById('marca')).value;
            let color=(<HTMLInputElement>document.getElementById('color')).value;
            let id = (<HTMLInputElement> document.getElementById("id")).value;
            //let foto  = (<HTMLImageElement> document.getElementById("imagen")).alt;

            //console.log(foto);
            let miToken=localStorage.getItem('miToken');

            if(miToken===null)
            {
                alert("Usuario no logeado");
                window.location.href='./home.php';
                return;
            }

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open("DELETE", "../backend.1/");
            xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlhttp.setRequestHeader("miToken",miToken);
            xmlhttp.send("id=" + id + "&marca=" + marca + "&color=" + color);
            
            xmlhttp.onreadystatechange = function () 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    let respuestaParseada=JSON.parse(xmlhttp.responseText);
                    if(respuestaParseada.mensaje=="todoOk")
                    {
                        alert(xmlhttp.responseText);
                        location.reload();
                        console.log(JSON.stringify(respuestaParseada));
                    }
                    else
                    {
                        alert(xmlhttp.responseText);
                        console.log(xmlhttp.responseText);
                    }
                }
            }
            
        }

        public static ModificarObj():any
        {
            let id=(<HTMLInputElement>document.getElementById('id')).value;
            let marca=(<HTMLInputElement>document.getElementById('marca')).value;
            let color=(<HTMLInputElement>document.getElementById('color')).value;
            let talle=(<HTMLInputElement>document.getElementById('talle')).value;
            let precio=(<HTMLInputElement>document.getElementById('precio')).value;
            //let foto : any = (<HTMLInputElement> document.getElementById("fotoSubir"));
            
            let miToken=localStorage.getItem('miToken');

            if(miToken===null)
            {
                alert("Usuario no logeado");
                window.location.href='./home.php';
                return;
            }

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open("PUT", "../backend.1/", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.setRequestHeader("miToken",miToken);
            xmlhttp.send("id=" + id + "&marca=" + marca + "&color=" + color + "&talle=" + talle+ "&precio=" + precio);

            xmlhttp.onreadystatechange = function () 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    let respuestaParseada=JSON.parse(xmlhttp.responseText);
                    if(respuestaParseada.mensaje=="todoOk")
                    {
                        alert(xmlhttp.responseText);
                        location.reload();
                        console.log(JSON.stringify(respuestaParseada));
                    }
                    else
                    {
                        alert(xmlhttp.responseText);
                        console.log(xmlhttp.responseText);
                    }
                }
            }
        }

        public static EliminarEmpleado(objJson:any):any
        {
            console.log(objJson);
            let id=objJson.id;
            //let foto : any = (<HTMLInputElement> document.getElementById("fotoSubir"));
            var txt;
            var r = confirm("Desea borrar a "+objJson.apellido+" "+objJson.nombre);
            if (r == false) 
            {
                return;
            } 
            let miToken=localStorage.getItem('miToken');

            if(miToken===null)
            {
                alert("Usuario no logeado");
                window.location.href='./home.php';
                return;
            }

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open("DELETE", "../backend.1/usuarios/", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.setRequestHeader("miToken",miToken);
            xmlhttp.send("id=" + id);

            xmlhttp.onreadystatechange = function () 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    let respuestaParseada=JSON.parse(xmlhttp.responseText);
                    if(respuestaParseada.mensaje=="todoOk")
                    {
                        alert(xmlhttp.responseText);
                        location.reload();
                        console.log(JSON.stringify(respuestaParseada));
                    }
                    else
                    {
                        alert(xmlhttp.responseText);
                        console.log(xmlhttp.responseText);
                    }
                }
            }
        }
    }
}
