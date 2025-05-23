import { useEffect, useState } from "react";
import PageMeta from "../../../../components/common/PageMeta";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import SelectModified from "../../../shared/SelectModified";
import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import Swal from "sweetalert2";

import { getCompleteList as getGestiones, getCursosByGestion } from "../../../../services/Personal-Academico/GestionService";
import { listMateriasToTable } from "../../../../services/Personal-Academico/MateriaService";
import { GestionAsignacion } from "../../../../services/interfaces/Personal-Escolar/Gestion";
import { CursoGestion, SimpleCursoGestionMateria } from "../../../../services/interfaces/Personal-Escolar/Curso";

import { MateriaAsignacion } from "../../../../services/interfaces/Personal-Escolar/Materia";

export default function AsignacionMateriasPage() {
  const [gestiones, setGestiones] = useState<GestionAsignacion[]>([]);
  const [gestionSeleccionada, setGestionSeleccionada] = useState<number | null>(null);
  const [cursos, setCursos] = useState<CursoGestion[]>([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<CursoGestion | null>(null);

  const [materias, setMaterias] = useState<SimpleCursoGestionMateria[]>([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState<MateriaAsignacion | null>(null);

  useEffect(() => {
    const fetchGestiones = async () => {
      const data = await getGestiones();
      setGestiones(data);
    };
    fetchGestiones();
  }, []);

  useEffect(() => {
    if (gestionSeleccionada !== null) {
      const fetchCursos = async () => {
        const data = await getCursosByGestion(gestionSeleccionada);
        setCursos(data);
      };
      fetchCursos();
    }
  }, [gestionSeleccionada]);

  useEffect(() => {
    if (gestionSeleccionada !== null && cursoSeleccionado !== null) {
      const fetchMaterias = async () => {
        const data = await listMateriasToTable(gestionSeleccionada, cursoSeleccionado.curso.id);
        setMaterias(data);
      };
      fetchMaterias();
    } else {
      setMaterias([]);
    }
  }, [cursoSeleccionado, gestionSeleccionada]);

  const handleAgregarMateria = () => {
    if (materiaSeleccionada) {
      Swal.fire("Materia asignada", `Materia ${materiaSeleccionada.nombre} asignada con éxito`, "success");
      setMateriaSeleccionada(null);
    }
  };

  return (
    <>
      <PageMeta title="Asignar Materias a Curso" description="Asignar materias a un curso por gestión" />
      <PageBreadcrumb pageTitle="Asignación de Materias a Curso" />

      <ComponentCardModified title="Asignación de Materias">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
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
              options={cursos}
              onSelect={setCursoSeleccionado}
              displayValue={(item) => item.curso.nombre}
              getKey={(item) => item.id}
              placeholder="Buscar curso por nombre o turno"
              label="Curso"
            />
          </div>
            {cursoSeleccionado && (
            <>
                <div className="mt-6">
                <AutoCompleteCombobox<MateriaAsignacion>
                    options={materias.map((m) => m.materia)}
                    onSelect={setMateriaSeleccionada}
                    displayValue={(item) => item.nombre}
                    getKey={(item) => item.id}
                    placeholder="Buscar materia"
                    label="Materia"
                />
                </div>

                {materiaSeleccionada && (
                <div className="flex justify-end pt-4">
                    <Button onClick={handleAgregarMateria}>+ Agregar</Button>
                </div>
                )}
            </>
            )}
        </div>

      </ComponentCardModified>
    </>
  );
}
