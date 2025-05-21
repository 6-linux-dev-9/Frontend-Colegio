
import { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Modal } from "../../../../components/ui/modal";
import Button from "../../../../components/ui/button/Button";
import DropzoneComponent from "../../../../components/form/form-elements/DropZone";
import Input from "../../../../components/form/input/InputField";
import SelectModified from "../../../shared/SelectModified";
import Swal from "sweetalert2";
import Label from "../../../../components/form/Label";
import { CursoGestion } from "../../../../services/interfaces/Personal-Escolar/Curso";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import Badge from "../../../../components/ui/badge/Badge";

interface Props {
  data: CursoGestion[];
  onDeleted: (id: number) => void;
  onUpdated: () => void;
}

export default function CursoGestionTable({ data, onDeleted, onUpdated }: Props) {
  const [selected, setSelected] = useState<CursoGestion | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [form, setForm] = useState({
    total_aprobados: 0,
    total_reprobados: 0,
    total_abandono: 0,
    estado: "Habilitado",
  });

  const estadoBadge = (estado: string) => (
    <Badge variant="light" color={estado === "Habilitado" ? "success" : "error"}>{estado}</Badge>
  );


  const handleOpenEdit = (item: CursoGestion) => {
    setSelected(item);
    setForm({
      total_aprobados: item.total_aprobados,
      total_reprobados: item.total_reprobados,
      total_abandono: item.total_abandono,
      estado: item.estado,
    });
    setEditModal(true);
  };

  const handleSave = async () => {
    if (!selected) return;
    try {
      // await updateCursoGestion(selected.id, form);
      onUpdated();
      Swal.fire("Éxito", "Curso actualizado", "success");
      setEditModal(false);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire("Error", "No se pudo actualizar", "error");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUploadPhoto = async (file: File) => {
    if (!selected) return;
    try {
      // await updateCursoFoto(selected.id, file);
      onUpdated();
      setPhotoModal(false);
      Swal.fire("Éxito", "Imagen actualizada", "success");
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err:any) {
      Swal.fire("Error", "Error al subir imagen", "error");
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleted(id);
        Swal.fire("Eliminado", "El curso ha sido eliminado.", "success");
      }
    });
  };

  const handlePhotoView = (item: CursoGestion) => {
    setSelected(item);
    setPhotoModal(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] mt-6">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Curso</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Estado</TableCell>
                {/* <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Abandonos</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Reprobados</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Aprobados</TableCell> */}
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item) => (
                <TableRow key={item.id}>
                  
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{item.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{item.curso.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm">{estadoBadge(item.estado)}</TableCell>
                  {/* <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{item.total_abandono}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{item.total_reprobados}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{item.total_aprobados}</TableCell> */}
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handlePhotoView(item)}>
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-green-600 dark:hover:text-green-400" onClick={() => handleOpenEdit(item)}>
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => handleDelete(item.id)}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={editModal} onClose={() => setEditModal(false)} className="max-w-[600px] m-4">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl space-y-4">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Editar Curso</h4>
          <Label>Aprobados</Label>
          <Input type="number" value={form.total_aprobados === 0 ? "" : form.total_aprobados} onChange={(e) => setForm({ ...form, total_aprobados: parseInt(e.target.value || "0") })} />
          <Label>Reprobados</Label>
          <Input type="number" value={form.total_reprobados === 0 ? "" : form.total_reprobados} onChange={(e) => setForm({ ...form, total_reprobados: parseInt(e.target.value || "0") })} />
          <Label>Abandonos</Label>
          <Input type="number" value={form.total_abandono === 0 ? "" : form.total_abandono} onChange={(e) => setForm({ ...form, total_abandono: parseInt(e.target.value || "0") })} />
          <Label>Estado</Label>
          <SelectModified options={[{ label: "Habilitado", value: "Habilitado" }, { label: "Deshabilitado", value: "Deshabilitado" }]} value={form.estado} onChange={(v) => setForm({ ...form, estado: v })} />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setEditModal(false)}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={photoModal} onClose={() => setPhotoModal(false)} className="max-w-[600px] m-4">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl">
          <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Subir Imagen</h4>
          <DropzoneComponent onUpload={handleUploadPhoto} />
        </div>
      </Modal>
    </>
  );
}
