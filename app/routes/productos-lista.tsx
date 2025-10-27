// app/routes/productos-lista.tsx
import { Link } from "react-router";

export default function ProductosLista() {
    // En una aplicación real, cargarías estos datos desde una API
    const productos = [
        { id: "1", nombre: "Producto 1" },
        { id: "2", nombre: "Producto 2" },
    ];

    const handleEliminar = (id: string) => {
        // Aquí iría tu lógica para llamar a la API (DELETE)
        alert(`Eliminar producto ${id} (simulación)`);
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
                            {/* El botón de eliminar llama a la acción de borrado */}
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
        </main>
    );
}