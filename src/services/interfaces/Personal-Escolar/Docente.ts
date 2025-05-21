import { Meta } from "../Bitacora";

export interface Docente{
    id : number,
    ci:string,
    correo:string,
    url_profile:string
    fecha_actualizacion: string,
    fecha_creacion: string,
    nombre:string,
    estado:string
}
export interface DocentePaginado{
    items:Docente[],
    meta:Meta
}