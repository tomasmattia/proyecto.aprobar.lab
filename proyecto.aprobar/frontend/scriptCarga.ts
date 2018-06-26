window.onload=function():void
{
    var xmlhttp = new XMLHttpRequest();

    let miToken=localStorage.getItem('miToken');
    if(miToken===null)
    {
        alert("Usuario no logeado");
        window.location.href='./home.php';
        return;
    }
    xmlhttp.open("GET", "../backend.1/acciones/", true);
    xmlhttp.setRequestHeader("miToken",miToken);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let respuesta=JSON.parse(xmlhttp.responseText);
            console.log(respuesta);
            if(respuesta.mensaje==undefined)
            {
                let stringTabla:string="<table class='table'><th>Titulo</th><th>Interprete</th><th>Año</th><th>Id</th><th>Foto</th><th>Modificar</th><th>Eliminar</th>";
                respuesta.forEach((cd:any) => {
                    //stringTabla+="<tr><td>"+cd.titel+"</td><td>"+cd.interpret+"</td><td>"+cd.jahr+"</td><td>"+cd.id+"</td><td><a class='btn btn-warning' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Modificar("+JSON.stringify(cd)+")'>Modificar</a></td><td><a class='btn btn-danger' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Eliminar("+JSON.stringify(cd)+")'>Eliminar</a></td></tr>";
                    stringTabla+="<tr><td>"+cd.titulo+"</td><td>"+cd.interprete+"</td><td>"+cd.anio+"</td><td>"+cd.id+"</td><td><img src='../backend.1/"+cd.foto+"' width='50px' alt='"+cd.foto+"' class='img-thumbnail' id='imagen'></td><td><a class='btn btn-warning' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Modificar("+JSON.stringify(cd)+")'>Modificar</a></td><td><a class='btn btn-danger' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Eliminar("+JSON.stringify(cd)+")'>Eliminar</a></td></tr>";
                });
                stringTabla+="</table>";
                (<HTMLDivElement>document.getElementById('laTabla')).innerHTML+=stringTabla;
            }
            else
            {
                window.location.href='./home.html';
            } 
        }
    }
    
};
    