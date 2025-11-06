// app/routes/productos-lista.tsx
import { Link } from "react-router";
import { useProductosContext } from "~/root";
import apiClient from "../api"; // <-- Importa axios

export default function ProductosLista() {
    const { productos, setProductos } = useProductosContext();

    const handleEliminar = async (id: number) => { // <-- id ahora es number
        if (window.confirm(`¿Seguro que quieres eliminar el producto ${id}?`)) {
            try {
                // --- MODIFICAR: Llamada a la API ---
                await apiClient.delete(`/productos/${id}`);

                // Actualiza el estado local DESPUÉS de que la API confirme
                setProductos((productosActuales) =>
                    productosActuales.filter((p) => p.id !== id)
                );
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                alert("No se pudo eliminar el producto.");
            }
        }
    };

    return (
        <main className="pt-16 p-4 container mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Productos</h1>
                <Link
                    to="/productos/nueva"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Crear Producto
                </Link>
            </div>
            {/* ... (resto del JSX igual, el .map funcionará) ... */}
            {productos.length === 0 ? (
                <p>No hay productos para mostrar.</p>
            ) : (
                <ul className="space-y-2">
                    {productos.map((p) => (
                        <li key={p.id} className="flex justify-between items-center p-3 border rounded-lg shadow-sm">
                            <span className="text-lg">{p.nombre} (Precio: ${p.precio})</span> {/* Mostramos más datos */}
                            <div className="flex gap-2">
                                <Link
                                    to={`/productos/${p.id}/editar`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleEliminar(p.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}