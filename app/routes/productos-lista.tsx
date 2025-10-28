// app/routes/productos-lista.tsx
import { Link } from "react-router";
// --- AÑADIR ---
import { useProductosContext } from "../root"; // Importa el hook del contexto

export default function ProductosLista() {
    // --- MODIFICAR: Usa el contexto ---
    const { productos, setProductos } = useProductosContext();

    const handleEliminar = (id: string) => {
        // Confirma antes de eliminar
        if (window.confirm(`¿Seguro que quieres eliminar el producto ${id}?`)) {
            // --- MODIFICAR: Actualiza el estado filtrando el producto eliminado ---
            setProductos((productosActuales) =>
                productosActuales.filter((p) => p.id !== id)
            );
            // alert(`Producto ${id} eliminado.`); // Puedes quitar el alert si quieres
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
            {productos.length === 0 ? (
                <p>No hay productos para mostrar.</p>
            ) : (
                <ul className="space-y-2">
                    {productos.map((p) => (
                        <li key={p.id} className="flex justify-between items-center p-3 border rounded-lg shadow-sm">
                            <span className="text-lg">{p.nombre}</span>
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