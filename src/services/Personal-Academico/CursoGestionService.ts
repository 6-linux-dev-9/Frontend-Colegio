import Server from "../API/server"
import { CursoGestionEdit } from "../interfaces/Personal-Escolar/Curso"
import Storage from "../JWT/Storage"
import { handleErrorResponse } from "../Utils/handles"

export const get_curso_gestion_data = async (id:number): Promise<CursoGestionEdit> => {
    const response = await fetch(`${Server.API_URL}/curso-gestion/${id}/get`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${Storage.getStoredToken()}`
        }
    })
    return await handleErrorResponse(response);
}

