

import { useEffect, useState } from "react";
import PageMeta from "../../../../components/common/PageMeta";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import SelectModified from "../../../shared/SelectModified";
import Button from "../../../../components/ui/button/Button";

// import Switch from "../../../../components/form/switch/Switch";
import { getCursosByGestion, getCompleteList as getGestiones } from "../../../../services/Personal-Academico/GestionService";
import Label from "../../../../components/form/Label";
import { GestionAsignacion } from "../../../../services/interfaces/Personal-Escolar/Gestion";

import AutoCompleteCombobox from "../../../shared/AutoCompleteCombobox";
import { CursoGestion } from "../../../../services/interfaces/Personal-Escolar/Curso";
import CursoGestionTable from "./CursoPorGestionTable";
import { Modal } from "../../../../components/ui/modal";
import Swal from "sweetalert2";

export default function AsignacionCursoPage() {
  const [gestiones, setGestiones] = useState<GestionAsignacion[]>([]);
  const [cursosPorGestion, setCursosPorGestion] = useState<CursoGestion[]>([]);
  const [gestionSeleccionada, setGestionSeleccionada] = useState<number | null>(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<CursoGestion | null>(null);
  const [refresh, setRefresh] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  // const [soloHabilitados, setSoloHabilitados] = useState<boolean>(true);



  //para obtener todas las gestiones y cargar los cursos por la gestion seleccionada
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCursosPorGestion = async (gestionId: number) => {
    try {
      const data = await getCursosByGestion(gestionId);
      setCursosPorGestion(data)
      // setCursosPorGestion(data);
    } catch (error) {
      console.error("Error al obtener cursos por gestión:", error);
    }
  };

  useEffect(() => {
    if (gestionSeleccionada !== null) {
      fetchCursosPorGestion(gestionSeleccionada);
    }
  }, [gestionSeleccionada,refresh]);

  // const cursosFiltrados = soloHabilitados
  //   ? cursosPorGestion.filter((c) => c.estado === "Habilitado")
  //   : cursosPorGestion;

  const handleAgregarCurso = () => {
    if (cursoSeleccionado){
      setShowConfirmModal(true)
    }
  };



  const confirmarAsignacion = async () => {
    try {
      // Aquí deberías hacer el POST real al backend
      // await asignarCursoAGestion({ cursoId: cursoSeleccionado.id, gestionId: gestionSeleccionada })

      setShowConfirmModal(false);
      setCursoSeleccionado(null);
      triggerRefresh();

      Swal.fire({
        icon: "success",
        title: "Curso asignado",
        text: "El curso fue asignado correctamente a la gestión.",
        timer: 2000,
        showConfirmButton: false,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setShowConfirmModal(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo asignar el curso.",
        showConfirmButton: true,
      });
    }
  };


  // const handleEliminarCurso = (id: number) => {
  //   setCursosAgregados((prev) => prev.filter((c) => c.id !== id));
  // };

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
              options={cursosPorGestion}
              onSelect={setCursoSeleccionado}
              displayValue={(item) => item.curso.nombre}
              getKey={(item) => item.id}
              placeholder="Buscar por nombre o turno..."
              label="Curso"
            />
          </div>

          {/* <div className="flex items-center gap-2">
            <Switch
              label="Mostrar solo habilitados"
              defaultChecked={true}
              onChange={setSoloHabilitados}
            />
          </div> */}

            {cursoSeleccionado && (
          <div className="flex items-center pt-[25px]">
            <Button size="sm" onClick={handleAgregarCurso} disabled={!cursoSeleccionado}>
              + Agregar
            </Button>
          </div>
        )}
        </div>

       

      
        <CursoGestionTable
          data={cursosPorGestion}
          onDeleted={triggerRefresh}
          // onUpdated={triggerRefresh}
        />
      </ComponentCardModified>
      <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          className="max-w-[500px] m-4"
        >
          <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              Confirmar Asignación
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              ¿Estás seguro de asignar el curso <strong>{cursoSeleccionado?.curso.nombre}</strong> a la gestión <strong>{gestiones.find(g => g.id === gestionSeleccionada)?.nombre}</strong>?
            </p>
            <div className="flex justify-end gap-3 pt-6">
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmarAsignacion}>
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>

    </>
  );
}
