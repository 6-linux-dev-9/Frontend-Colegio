import { Meta } from "../Bitacora";

export interface Materia{
    id : number,
    fecha_actualizacion: string,
    fecha_creacion: string,
    nombre:string,
    estado:string
}
export interface MateriaPaginada{
    items:Materia[],
    meta:Meta
}