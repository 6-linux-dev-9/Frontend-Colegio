import { Meta } from "../Bitacora";
import { GestionAsignacion } from "./Gestion";
import { MateriaAsignacion } from "./Materia";

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

export interface CursoAsignacion{
    id:number,
    nombre:string
}


export interface CursoGestion{
    id:number,
    estado:string,
    // total_aprobados:number,
    // total_reprobados:number,
    curso:CursoAsignacion
    // total_abandono: number,
    // url_image:string
}

export interface CursoGestionPaginado{
    items:CursoGestion[],
    meta:Meta
}

export interface CursoGestionEdit {
  id: number;
  estado: string;
  total_aprobados:number,
  total_reprobados:number,
  curso: CursoAsignacion,
  gestion:GestionAsignacion,
  total_abandono: number,
  url_image:string
}

export interface SimpleCursoGestionMateria {
  id: number;
  estado: string;
  materia:MateriaAsignacion
}