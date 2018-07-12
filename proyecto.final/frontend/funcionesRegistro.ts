namespace Test
{
    export class ValidadoraRegistro
    {
        public static LimpiarErrores():void
        {
            (<HTMLSpanElement>document.getElementById("errorApellido")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("errorApellido")).hidden=true;
            (<HTMLSpanElement>document.getElementById("errorNombre")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("errorNombre")).hidden=true;
            (<HTMLSpanElement>document.getElementById("errorEmail")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("errorEmail")).hidden=true;
            (<HTMLSpanElement>document.getElementById("errorLegajo")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("errorLegajo")).hidden=true;
            (<HTMLSpanElement>document.getElementById("errorClave")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("errorClave")).hidden=true;
            (<HTMLSpanElement>document.getElementById("errorConfirmar")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("errorConfirmar")).hidden=true;
            (<HTMLSpanElement>document.getElementById("errorFoto")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("errorFoto")).hidden=true;
            (<HTMLSpanElement>document.getElementById("alertaRegistro")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("alertaRegistro")).hidden=true;
        }

        public static ValidarVacios(nombre:string,apellido:string,mail:string,legajo:string,clave:string,confirmar:string,foto:any):boolean
        {
            let errores:string[]=[];
            if(nombre=="")
            {
                errores.push("Nombre");
                (<HTMLSpanElement>document.getElementById("errorNombre")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorNombre")).hidden=false;
            }
            if(apellido=="")
            {
                errores.push("Apellido");
                (<HTMLSpanElement>document.getElementById("errorApellido")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorApellido")).hidden=false;
            }
            if(mail=="")
            {
                errores.push("Email");
                (<HTMLSpanElement>document.getElementById("errorEmail")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorEmail")).hidden=false;
            }
            if(legajo=="")
            {
                errores.push("Legajo");
                (<HTMLSpanElement>document.getElementById("errorLegajo")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorLegajo")).hidden=false;
            }
            if(clave=="")
            {
                errores.push("Clave");
                (<HTMLSpanElement>document.getElementById("errorClave")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorClave")).hidden=false;
            }
            if(confirmar=="")
            {
                errores.push("Confirmar");
                (<HTMLSpanElement>document.getElementById("errorConfirmar")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorConfirmar")).hidden=false;
            }
            if(foto.value=="")
            {
                console.log(errores.push("Foto"));
                (<HTMLSpanElement>document.getElementById("errorFoto")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorFoto")).hidden=false;
            }
            if(errores.length==0)
            {
                console.log(errores);
                return true;
            }
            let stringErrores:string="Los siguientes campos estan vacios: <br>";
            errores.forEach(error => {
                stringErrores+=error+"<br>";
            });
            (<HTMLSpanElement>document.getElementById("alertaRegistro")).innerHTML=stringErrores;
            (<HTMLSpanElement>document.getElementById("alertaRegistro")).hidden=false;
            console.log(errores);
            return false;
        }

        public static ValidarRegistro(nombre:string,apellido:string,mail:string,legajo:string,clave:string,confirmar:string,foto:any):boolean
        {
            let legajoParsed=parseInt(legajo);
            let errores:string[]=[];
            errores=this.ValidarNombreApellido(nombre,apellido,errores);
            errores=this.validarMail(mail,errores);
            errores=this.ValidarLegajo(legajoParsed,errores);
            errores=this.ValidarClaveConfirmar(clave,confirmar,errores);
            errores=this.ValidarFoto(foto,errores);
            if(errores.length==0)
            {
                console.log(errores);
                return true;
            }
            let stringErrores:string="Los siguientes campos tienen errores de formato: <br>";
            errores.forEach(error => {
                stringErrores+=error+"<br>";
            });
            (<HTMLSpanElement>document.getElementById("alertaRegistro")).innerHTML=stringErrores;
            (<HTMLSpanElement>document.getElementById("alertaRegistro")).hidden=false;
            console.log(errores);
            return false;
        }

        public static ValidarNombreApellido(nombre:string,apellido:string,errores:string[]):string[]
        {
            if(apellido.length>15)
            {
                errores.push("Apellido");
                (<HTMLSpanElement>document.getElementById("errorApellido")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorApellido")).hidden=false;
            }
            if(nombre.length>10)
            {
                errores.push("Nombre");
                (<HTMLSpanElement>document.getElementById("errorNombre")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorNombre")).hidden=false;
            }
            return errores;
        }

        public static validarMail(mail:string,errores:string[]):string[] 
        {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!(re.test(String(mail).toLowerCase())))
            {
                errores.push("Email");
                (<HTMLSpanElement>document.getElementById("errorEmail")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorEmail")).hidden=false;
            }
            return errores;
        }

        public static ValidarLegajo(legajo:number,errores:string[]):string[]
        {
            if(legajo<100 || legajo>999999)
            {
                errores.push("Legajo");
                (<HTMLSpanElement>document.getElementById("errorLegajo")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorLegajo")).hidden=false;
            }
            return errores;
        }

        public static ValidarClaveConfirmar(clave:string,confirmar:string,errores:string[]):string[]
        {
            if(clave.length>8 || clave.length<4)
            {
                errores.push("Clave");
                (<HTMLSpanElement>document.getElementById("errorClave")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorClave")).hidden=false;
            }
            if(confirmar !== clave)
            {
                errores.push("Confirmar");
                (<HTMLSpanElement>document.getElementById("errorConfirmar")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorConfirmar")).hidden=false;
            }
            return errores;
        }

        public static ValidarFoto(foto:any, errores:string[]):string[]
        {
            var filePath = foto.value;
            var allowedExtensions = /(\.jpg|\.png)$/i;
            if(!allowedExtensions.exec(filePath))
            {
                errores.push("Foto - Solo JPG y PNG");
                (<HTMLSpanElement>document.getElementById("errorFoto")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorFoto")).hidden=false;
            }
            return errores;
        }


    }
}