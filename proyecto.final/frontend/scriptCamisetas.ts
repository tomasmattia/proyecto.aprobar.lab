window.onload=function():void
{
    var xmlhttp = new XMLHttpRequest();
    
    if((localStorage.getItem('miToken')===null))
    {
        alert("Usuario no logeado");
        window.location.href='./home.php';
        return;
    }

    //let miToken:any=JSON.parse(localStorage.getItem('miToken'));
    let miToken:any=localStorage.getItem('miToken');
    console.log(miToken);
    if(miToken===null || miToken=="")
    {
        alert("Usuario no logeado");
        window.location.href='./home.php';
        return;
    }
    xmlhttp.open("GET", "../backend.1/medias/", true);
    xmlhttp.setRequestHeader("miToken",miToken);
    xmlhttp.send();
    
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let respuesta=JSON.parse(xmlhttp.responseText);
            console.log(respuesta);
            console.log(respuesta.mensaje);
            if(respuesta.mensaje==undefined)
            {
                let stringTabla:string="<table class='table'><th>Marca</th><th>Color</th><th>Talle</th><th>Precio</th><th>Id</th><th>Modificar</th><th>Eliminar</th>";
                respuesta.forEach((camiseta:any) => {
                    //stringTabla+="<tr><td>"+camiseta.titel+"</td><td>"+camiseta.interpret+"</td><td>"+camiseta.jahr+"</td><td>"+camiseta.id+"</td><td><a class='btn btn-warning' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Modificar("+JSON.stringify(camiseta)+")'>Modificar</a></td><td><a class='btn btn-danger' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Eliminar("+JSON.stringify(camiseta)+")'>Eliminar</a></td></tr>";
                    stringTabla+="<tr><td>"+camiseta.marca+"</td><td>"+camiseta.color+"</td><td>"+camiseta.talle+"</td><td>"+camiseta.precio+"</td><td>"+camiseta.id+"</td><td><a class='btn btn-warning' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Modificar("+JSON.stringify(camiseta)+")'>Modificar</a></td><td><a class='btn btn-danger' data-toggle='modal' data-target='#formulario' onclick='Test.Manejadora.Eliminar("+JSON.stringify(camiseta)+")'>Eliminar</a></td></tr>";
                });
                stringTabla+="</table>";
                (<HTMLDivElement>document.getElementById('laTabla')).innerHTML+=stringTabla;
            }
            else
            {
                window.location.href='./home.php';
            } 
        }
    }
};
