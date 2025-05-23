import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComponentCardModified from "../../../shared/ComponentCardModified";
import Input from "../../../../components/form/input/InputField";
import Label from "../../../../components/form/Label";
import Button from "../../../../components/ui/button/Button";
import { Modal } from "../../../../components/ui/modal";
import DropzoneComponent from "../../../../components/form/form-elements/DropZone";
import Swal from "sweetalert2";


import { CursoGestionEdit } from "../../../../services/interfaces/Personal-Escolar/Curso";
import { get_curso_gestion_data } from "../../../../services/Personal-Academico/CursoGestionService";
import SelectModified from "../../../shared/SelectModified";
import PageMetaModified from "../../../shared/PageMetaModified";
import PageBreadcrumbModified from "../../../shared/PageBreadcrumbModified";

export default function CursoGestionEditPage() {
  const { id } = useParams();
  const [cursoGestion, setCursoGestion] = useState<CursoGestionEdit | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [form, setForm] = useState({
    cantidad_aprobados: 0,
    cantidad_reprobados: 0,
    cantidad_abandono: 0,
    estado: "Habilitado"
  });

  useEffect(() => {
    if (id) {
      fetchCursoGestionData(parseInt(id));
    }
  }, [id]);

  const fetchCursoGestionData = async (id: number) => {
    try {
      const data = await get_curso_gestion_data(id);
      setCursoGestion(data);
      setForm({
        cantidad_aprobados: data.total_aprobados || 0,
        cantidad_reprobados: data.total_reprobados || 0,
        cantidad_abandono: data.total_abandono || 0,
        estado: data.estado
      });
    } catch (error) {
      console.error("Error al obtener datos del curso gestión:", error);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const handleActualizar = () => {
    // Aquí deberías llamar al backend para actualizar los datos
    Swal.fire("Actualizado", "El curso ha sido actualizado", "success");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUploadImage = async (file: File) => {
    // Lógica para subir la imagen (simulada)
    setShowImageModal(false);
    Swal.fire("Éxito", "Imagen actualizada correctamente", "success");
  };

  return (
    <>
      <PageMetaModified
      title="Editar Curso" 
      subtitle={`GESTIÓN [${cursoGestion?.gestion?.nombre || "-"} - ${cursoGestion?.curso?.nombre || "-"} ]`}
      description="Formulario para editar curso por gestión" />
      <PageBreadcrumbModified pageTitle="Editar Curso" subtitle={`GESTIÓN [${cursoGestion?.gestion?.nombre || "-"} - ${cursoGestion?.curso?.nombre || "-"} ]`}/>

      <ComponentCardModified
        
      >
        <div className="flex flex-col items-center gap-4">
          {cursoGestion?.url_image && (
            <img src={cursoGestion.url_image} alt="Imagen Curso" className="w-48 h-48 object-cover rounded-xl" />
          )}

          <Button size="sm" onClick={() => setShowImageModal(true)}>
            Sube tu imagen
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div>
              <Label>Cantidad Reprobados</Label>
              <Input
                type="number"
                value={form.cantidad_reprobados}
                onChange={(e) => handleInputChange("cantidad_reprobados", parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>Cantidad Aprobados</Label>
              <Input
                type="number"
                value={form.cantidad_aprobados}
                onChange={(e) => handleInputChange("cantidad_aprobados", parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>Cantidad Bajas</Label>
              <Input
                type="number"
                value={form.cantidad_abandono}
                onChange={(e) => handleInputChange("cantidad_abandono", parseInt(e.target.value))}
              />
            </div>
            <div className="md:col-span-3">
             <Label>Estado</Label>
                <SelectModified
                options={[
                    { label: "Habilitado", value: "Habilitado" },
                    { label: "Deshabilitado", value: "Deshabilitado" }
                ]}
                value={form.estado}
                onChange={(v) => handleInputChange("estado", v)}
                />
            </div>
          </div>

          <div className="flex justify-end w-full pt-4">
            <Button onClick={handleActualizar}>Actualizar</Button>
          </div>
        </div>
      </ComponentCardModified>

      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
            Subir nueva imagen
          </h2>
          <DropzoneComponent onUpload={handleUploadImage} />
        </div>
      </Modal>
    </>
  );
}
