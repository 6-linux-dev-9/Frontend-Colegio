import { Meta } from "../Bitacora";

export interface Curso{
    id : number,
    fecha_actualizacion: string,
    fecha_creacion: string,
    nombre:string,
    turno:string,
    estado:string
}
export interface CursoPaginado{
    items:Curso[],
    meta:Meta
}