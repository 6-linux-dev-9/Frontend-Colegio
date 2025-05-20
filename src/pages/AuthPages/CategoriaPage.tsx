import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ComponentCardModified from "./ComponentCardModified";
import TableCategoria from "./TableCategoria";
import { Modal } from "../../components/ui/modal";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Swal from "sweetalert2";
import { createCategoria } from "../../services/Gestion_de_Productos/categoriaService";

export const CategoriaPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [reloadCategorias, setReloadCategorias] = useState(false);

  const handleCrearCategoria = async () => {
    try {
      const data = await createCategoria(nombreCategoria);
      setNombreCategoria("");
      setShowCreateModal(false);
      setReloadCategorias(prev => !prev);

      Swal.fire({
        icon: 'success',
        title: 'Categoría creada con exito',
        text: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la categoría.',
      });
      console.error("Error al crear categoría:", error);
    }
  };

  return (
    <>
      <PageMeta
        title="Bitácora de Usuario"
        description="Esta es la página de bitácora de usuario"
      />
      <PageBreadcrumb pageTitle="Categoría" />
      <div className="space-y-6">
        <ComponentCardModified
          title="Tabla de Categorías"
          action={
            <Button onClick={() => setShowCreateModal(true)}>
              + Agregar
            </Button>
          }
        >
          <TableCategoria reloadTrigger={reloadCategorias} onDeleted={() => setReloadCategorias(prev => !prev)} />
        </ComponentCardModified>
      </div>

      {/* Modal para crear Categoría */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nueva Categoría</h2>
          <div className="space-y-4">
            <Label>Nombre de la Categoría</Label>
            <Input
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              placeholder="Ej. Electrónica, Ropa, Juguetes"
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCrearCategoria}>
                Crear Categoría
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
