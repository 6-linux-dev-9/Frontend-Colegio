import Server from "../API/server";

import { DocentePaginado } from "../interfaces/Personal-Escolar/Docente";
import Storage from "../JWT/Storage";
import { handleErrorResponse } from "../Utils/handles";

export const getListDocentes = async (
  page: number = 1,
  per_page: number = 10
): Promise<DocentePaginado> => {
  const response = await fetch(
    `${Server.API_URL}/docentes/list-paginate?page=${page}&per_page=${per_page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Storage.getStoredToken()}`,
      },
    }
  );
  return await handleErrorResponse(response);
};
