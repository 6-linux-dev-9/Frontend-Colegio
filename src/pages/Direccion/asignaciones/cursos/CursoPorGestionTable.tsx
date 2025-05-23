
import { useState } from "react";

import { Modal } from "../../../../components/ui/modal";
import Button from "../../../../components/ui/button/Button";
// import Input from "../../../../components/form/input/InputField";
// import SelectModified from "../../../shared/SelectModified";
import Swal from "sweetalert2";
import { CursoGestion } from "../../../../services/interfaces/Personal-Escolar/Curso";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import Badge from "../../../../components/ui/badge/Badge";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";

interface Props {
  data: CursoGestion[];
  onDeleted: (id: number) => void;
  //onUpdated?: () => void;
}

export default function CursoGestionTable({ data, onDeleted }: Props) {
  const [showDeleteModal,setShowDeleteModal] = useState<boolean>(false)
  const [cursoToDelete,SetCursoToDelete] = useState<CursoGestion | null>(null);
  
  const navigate = useNavigate();

  const estadoBadge = (estado: string) => (
    <Badge variant="light" color={estado === "Habilitado" ? "success" : "error"}>{estado}</Badge>
  );


  const handleNavigate = (id:number) => {
      navigate(`/curso-gestion/${id}`)
  };

 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


 
  const openDeleteModal = (item: CursoGestion) => {
    SetCursoToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmarEliminacion = () => {
    if (!cursoToDelete) return;

    onDeleted(cursoToDelete.id);
    setShowDeleteModal(false);
    SetCursoToDelete(null);

    Swal.fire("Eliminado", "El curso ha sido eliminado.", "success");
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
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item) => (
                <TableRow key={item.id}>
                  
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{item.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{item.curso.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm">{estadoBadge(item.estado)}</TableCell>
      
                  <TableCell className="px-4 py-3 text-start">
                     <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() => handleNavigate(item.id)}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button
                          className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                          onClick={() => openDeleteModal(item)}
                        >
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
              {/* modal de edicion */}
      {/* <Modal isOpen={editModal} onClose={() => setEditModal(false)} className="max-w-[600px] m-4">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl space-y-4">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Editar Curso</h4>
          
          <Label>Estado</Label>
          <SelectModified options={[{ label: "Habilitado", value: "Habilitado" }, { label: "Deshabilitado", value: "Deshabilitado" }]} value={form.estado} onChange={(v) => setForm({ ...form, estado: v })} />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setEditModal(false)}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </div>
      </Modal> */}

    {/* modal de eliminacion */}
      <Modal isOpen={showDeleteModal} 
      onClose={() => setShowDeleteModal(false)} 
      className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Confirmar eliminación
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar el curso <span className="font-bold">{cursoToDelete?.curso.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={confirmarEliminacion}>Eliminar</Button>
          </div>
        </div>
      </Modal>

    </>
  );
}
