namespace Test
{
    export class ValidadoraLogin
    {
        public static LimpiarErrores():void
        {
            (<HTMLSpanElement>document.getElementById("errorCorreo")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("errorClave")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("alertaLogin")).innerHTML="";
            (<HTMLSpanElement>document.getElementById("alertaLogin")).hidden=true;
            (<HTMLSpanElement>document.getElementById("errorCorreo")).hidden=true;
            (<HTMLSpanElement>document.getElementById("errorClave")).hidden=true;
        }

        public static LimpiarCampos():void
        {
            (<HTMLInputElement>document.getElementById("correo")).value="";
            (<HTMLInputElement>document.getElementById("clave")).value="";
            this.LimpiarErrores();
        }

        public static ValidarLoginVacios(mail:string,clave:string):boolean
        {
            if(clave == "" && mail == "")
            {
                (<HTMLSpanElement>document.getElementById("errorCorreo")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorClave")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("alertaLogin")).innerHTML="Correo y Contraseña se encuentran vacios";
                (<HTMLSpanElement>document.getElementById("alertaLogin")).hidden=false;
                (<HTMLSpanElement>document.getElementById("errorCorreo")).hidden=false;
                (<HTMLSpanElement>document.getElementById("errorClave")).hidden=false;
                return false;
            }
            else
            {
                if(mail == "")
                {
                    (<HTMLSpanElement>document.getElementById("errorCorreo")).innerHTML="*";
                    (<HTMLSpanElement>document.getElementById("alertaLogin")).innerHTML="Correo se encuentra vacio";
                    (<HTMLSpanElement>document.getElementById("alertaLogin")).hidden=false;
                    (<HTMLSpanElement>document.getElementById("errorCorreo")).hidden=false;
                    return false;
                }
                else
                {
                    if(clave == "")
                    {
                        (<HTMLSpanElement>document.getElementById("errorClave")).innerHTML="*";
                        (<HTMLSpanElement>document.getElementById("alertaLogin")).innerHTML="Contraseña se encuentra vacia";
                        (<HTMLSpanElement>document.getElementById("alertaLogin")).hidden=false;
                        (<HTMLSpanElement>document.getElementById("errorClave")).hidden=false;
                        return false;
                    }
                }
            }
            return true;
        }

        public static ValidarLoginFormato(mail:string,clave:string):boolean
        {
            if(!(this.validarMail(mail)) && !(this.validarClave(clave)))
            {
                (<HTMLSpanElement>document.getElementById("errorCorreo")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("errorClave")).innerHTML="*";
                (<HTMLSpanElement>document.getElementById("alertaLogin")).innerHTML="Correo y Contraseña tienen formato invalido";
                (<HTMLSpanElement>document.getElementById("errorCorreo")).hidden=false;
                (<HTMLSpanElement>document.getElementById("errorClave")).hidden=false;
                (<HTMLSpanElement>document.getElementById("alertaLogin")).hidden=false;
                return false;
            }
            else
            {
                if(!(this.validarMail(mail)))
                {
                    (<HTMLSpanElement>document.getElementById("errorCorreo")).innerHTML="*";
                    (<HTMLSpanElement>document.getElementById("alertaLogin")).innerHTML="Correo tiene formato invalido";
                    (<HTMLSpanElement>document.getElementById("alertaLogin")).hidden=false;
                    (<HTMLSpanElement>document.getElementById("errorCorreo")).hidden=false;
                    return false;
                }
                else
                {
                    if(!(this.validarClave(clave)))
                    {
                        (<HTMLSpanElement>document.getElementById("errorClave")).innerHTML="*";
                        (<HTMLSpanElement>document.getElementById("alertaLogin")).innerHTML="Contraseña tiene formato invalido";
                        (<HTMLSpanElement>document.getElementById("alertaLogin")).hidden=false;
                        (<HTMLSpanElement>document.getElementById("errorClave")).hidden=false;

                        return false;
                    }
                }
            }
            return true;
        }

        public static validarMail(mail:string):boolean
        {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(mail).toLowerCase());
        }

        public static validarClave(clave:string):boolean
        {
            if(clave.length >= 4 && clave.length <= 8 )
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}