import { environment as env } from '../../environments/environment';


export class Usuario{
    /**
     *
     */
    // las opcionales van al final
    constructor(
        public nombre:string,
        public email:string,
        public password?: string,
        public img?:string,
        public google?:boolean,
        public role?:'ADMIN_ROLE' | 'USER_ROLE',
        public uid?:string,
        ){}
    get imagenUrl(){
        if(this.img===undefined){
            return `${ env.endPoint }/uploads/usuarios/no-imag`;   
        }
        else if(this.img.includes('https')){
            return this.img;
        }else if(this.img){
            return `${ env.endPoint }/uploads/usuarios/${this.img}`;     
        }else{
            return `${ env.endPoint }/uploads/usuarios/no-imag`;     
        }
    }
}