namespace Test
{
    export class Manejadora
    {
        public static Limpiar():void
        {
            (<HTMLInputElement>document.getElementById('nombre')).value="";
            (<HTMLInputElement>document.getElementById('clave')).value="";
        }

        public static Logear():void
        {
            let nombre:string=(<HTMLInputElement>document.getElementById('nombre')).value;
            let clave:string=(<HTMLInputElement>document.getElementById('clave')).value;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "../backend.1/test", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xmlhttp.send("nombre="+nombre+'&clave='+clave);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if(xmlhttp.responseText!="Error nombre o clave incorrectos")
                    {
                        localStorage.setItem('miToken',xmlhttp.responseText);
                        window.location.assign('./listadoCd.php');
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
            (<HTMLInputElement>document.getElementById('titulo')).value=objJson.titulo;
            (<HTMLInputElement>document.getElementById('interprete')).value=objJson.interprete;
            (<HTMLInputElement>document.getElementById('anio')).value=objJson.anio;
            (<HTMLInputElement>document.getElementById('id')).readOnly=true;
            (<HTMLInputElement>document.getElementById('titulo')).readOnly=false;
            (<HTMLInputElement>document.getElementById('interprete')).readOnly=false;
            (<HTMLInputElement>document.getElementById('anio')).readOnly=false;
            (<HTMLInputElement>document.getElementById('imagen')).src="../backend.1/"+objJson.foto;
            (<HTMLInputElement>document.getElementById('archivo')).hidden=false;
            (<HTMLInputElement>document.getElementById('imagen')).hidden=false;
            (<HTMLInputElement>document.getElementById('divId')).hidden=false;
            (<HTMLButtonElement>document.getElementById('boton-agregar')).hidden=true;
            (<HTMLInputElement>document.getElementById('boton-agregar')).innerText="Modificar";
            console.log(objJson);
        }
        
        public static LimpiarForm():void
        {
            (<HTMLInputElement>document.getElementById('formularioLabel')).innerText="Agregar";
            (<HTMLInputElement>document.getElementById('id')).value="";
            (<HTMLInputElement>document.getElementById('titulo')).value="";
            (<HTMLInputElement>document.getElementById('interprete')).value="";
            (<HTMLInputElement>document.getElementById('anio')).value="";
            (<HTMLInputElement>document.getElementById('id')).readOnly=false;
            (<HTMLInputElement>document.getElementById('titulo')).readOnly=false;
            (<HTMLInputElement>document.getElementById('interprete')).readOnly=false;
            (<HTMLInputElement>document.getElementById('anio')).readOnly=false;
            (<HTMLInputElement>document.getElementById('archivo')).hidden=false;
            (<HTMLInputElement>document.getElementById('imagen')).hidden=true;
            (<HTMLInputElement>document.getElementById('divId')).hidden=true;
            (<HTMLButtonElement>document.getElementById('boton-agregar')).hidden=false;
            (<HTMLInputElement>document.getElementById('boton-agregar')).innerText="Agregar";
            (<HTMLButtonElement>document.getElementById('boton-borrar')).hidden=true;
        }

        public static Eliminar(objJson:any):void
        {
            (<HTMLInputElement>document.getElementById('formularioLabel')).innerText="Eliminar";
            (<HTMLInputElement>document.getElementById('id')).value=objJson.id;
            (<HTMLInputElement>document.getElementById('titulo')).value=objJson.titulo;
            (<HTMLInputElement>document.getElementById('interprete')).value=objJson.interprete;
            (<HTMLInputElement>document.getElementById('anio')).value=objJson.anio;
            (<HTMLInputElement>document.getElementById('id')).readOnly=true;
            (<HTMLInputElement>document.getElementById('titulo')).readOnly=true;
            (<HTMLInputElement>document.getElementById('interprete')).readOnly=true;
            (<HTMLInputElement>document.getElementById('anio')).readOnly=true;
            (<HTMLInputElement>document.getElementById('imagen')).src="../backend.1/"+objJson.foto;
            (<HTMLInputElement>document.getElementById('imagen')).alt="../backend.1/"+objJson.foto;
            (<HTMLInputElement>document.getElementById('archivo')).hidden=true;
            (<HTMLInputElement>document.getElementById('imagen')).hidden=false;
            (<HTMLInputElement>document.getElementById('divId')).hidden=false;
            (<HTMLButtonElement>document.getElementById('boton-agregar')).hidden=true;
            (<HTMLButtonElement>document.getElementById('boton-borrar')).hidden=false;
        }

        public static Deslogear():void
        {

        }

        public static Agregar():any
        {
            let titulo=(<HTMLInputElement>document.getElementById('titulo')).value;
            let interprete=(<HTMLInputElement>document.getElementById('interprete')).value;
            let anio=(<HTMLInputElement>document.getElementById('anio')).value;
            let foto : any = (<HTMLInputElement> document.getElementById("fotoSubir"));
            
            let miToken=localStorage.getItem('miToken');

            if(miToken===null)
            {
                alert("Usuario no logeado");
                window.location.href='./home.php';
                return;
            }

            var formData = new FormData();

            formData.append('titulo', titulo);
            formData.append('interprete', interprete);
            formData.append('anio', anio);
            formData.append('foto', foto.files[0]);

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open("POST", "../backend.1/acciones/add", true);
            xmlhttp.setRequestHeader("enctype","multipart/form-data");
            xmlhttp.setRequestHeader("miToken",miToken);
            xmlhttp.send(formData);

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    console.log(xmlhttp.responseText);
                }
            }
            
        }

        public static Borrar():any
        {
            let titulo=(<HTMLInputElement>document.getElementById('titulo')).value;
            let interprete=(<HTMLInputElement>document.getElementById('interprete')).value;
            let id = (<HTMLInputElement> document.getElementById("id")).value;
            let foto  = (<HTMLImageElement> document.getElementById("imagen")).alt;

            console.log(foto);
            let miToken=localStorage.getItem('miToken');

            if(miToken===null)
            {
                alert("Usuario no logeado");
                window.location.href='./home.php';
                return;
            }

            var formData = new FormData();

            formData.append('id', id);
            formData.append('titulo', titulo);
            formData.append('interprete', interprete);
            formData.append('foto', foto);

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open("DELETE", "../backend.1/acciones/delete/");
            xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xmlhttp.setRequestHeader("miToken",miToken);
            xmlhttp.send(formData);
            
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                {
                    console.log(xmlhttp.responseText);
                }
            }
            
        }
    }
}