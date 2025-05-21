

import { useEffect, useState } from "react";
import PageMeta from "../../../../components/common/PageMeta";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import SelectModified from "../../../shared/SelectModified";
import Button from "../../../../components/ui/button/Button";
import { TrashIcon } from "@heroicons/react/24/solid";
import Switch from "../../../../components/form/switch/Switch";
import { getCursosByGestion, getCompleteList as getGestiones } from "../../../../services/Personal-Academico/GestionService";
import Label from "../../../../components/form/Label";
import { GestionAsignacion } from "../../../../services/interfaces/Personal-Escolar/Gestion";

import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";
import { CursoGestion } from "../../../../services/interfaces/Personal-Escolar/Curso";
import CursoGestionTable from "./CursoPorGestionTable";

export default function AsignacionCursoPage() {
  const [gestiones, setGestiones] = useState<GestionAsignacion[]>([]);
  const [cursosPorGestion, setCursosPorGestion] = useState<CursoGestion[]>([]);

  const [gestionSeleccionada, setGestionSeleccionada] = useState<number | null>(null);
  const [soloHabilitados, setSoloHabilitados] = useState<boolean>(true);

  const [cursoSeleccionado, setCursoSeleccionado] = useState<CursoGestion | null>(null);
  const [cursosAgregados, setCursosAgregados] = useState<CursoGestion[]>([]);


  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);

  useEffect(() => {
    const fetchData = async () => {
      const gestionesData = await getGestiones();
      setGestiones(gestionesData);
      if (gestionesData.length > 0) {
        //podria ajustarse para que apunte a la gestion del contexto o de la tabla de la bd
        const ultimaGestionId = gestionesData[gestionesData.length - 1].id;
        setGestionSeleccionada(ultimaGestionId);
        fetchCursosPorGestion(ultimaGestionId);
      }
    };
    fetchData();
  }, []);

  const fetchCursosPorGestion = async (gestionId: number) => {
    try {
      const data = await getCursosByGestion(gestionId);
      setCursosPorGestion(data);
    } catch (error) {
      console.error("Error al obtener cursos por gestión:", error);
    }
  };

  useEffect(() => {
    if (gestionSeleccionada !== null) {
      fetchCursosPorGestion(gestionSeleccionada);
    }
  }, [gestionSeleccionada,refresh]);

  const cursosFiltrados = soloHabilitados
    ? cursosPorGestion.filter((c) => c.estado === "Habilitado")
    : cursosPorGestion;

  const handleAgregarCurso = () => {
    if (cursoSeleccionado && !cursosAgregados.find(c => c.id === cursoSeleccionado.id)) {
      setCursosAgregados((prev) => [...prev, cursoSeleccionado]);
      setCursoSeleccionado(null);
    }
  };

  const handleEliminarCurso = (id: number) => {
    setCursosAgregados((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <PageMeta title="Asignar Cursos" description="Asignar cursos a gestiones académicas" />
      <PageBreadcrumb pageTitle="Asignación de Cursos" />

      <ComponentCardModified
        title={`Cursos para la Gestión ${
          gestiones.find((g) => g.id === gestionSeleccionada)?.nombre || "-"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <Label>Gestión</Label>
            <SelectModified
              options={gestiones.map((g) => ({ label: g.nombre, value: g.id.toString() }))}
              value={gestionSeleccionada?.toString() || ""}
              onChange={(v) => setGestionSeleccionada(parseInt(v))}
            />
          </div>

          <div className="md:col-span-2">
            
            <AutoCompleteCombobox<CursoGestion>
              options={cursosFiltrados}
              onSelect={setCursoSeleccionado}
              displayValue={(item) => item.curso.nombre}
              getKey={(item) => item.id}
              placeholder="Buscar por nombre o turno..."
              label="Curso"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              label="Mostrar solo habilitados"
              defaultChecked={true}
              onChange={setSoloHabilitados}
            />
          </div>
        </div>

        <div className="mt-6">
          <ul className="space-y-3">
            {cursosAgregados.map((curso) => (
              <li
                key={curso.id}
                className="flex items-center justify-between rounded-md border px-4 py-2 dark:border-white/10"
              >
                <span>{curso.curso.nombre}</span>
                <button
                  onClick={() => handleEliminarCurso(curso.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {cursoSeleccionado && (
          <div className="flex justify-end pt-6">
            <Button size="sm" onClick={handleAgregarCurso}>
              + Agregar
            </Button>
          </div>
        )}
        <CursoGestionTable
          data={cursosFiltrados}
          onDeleted={triggerRefresh}
          onUpdated={triggerRefresh}
        />
      </ComponentCardModified>
    </>
  );
}
