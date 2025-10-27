// app/routes/productos-lista.tsx
import { Link, useNavigate } from "react-router"; // Añadir useNavigate si no está
import { useState, useEffect } from "react"; // Necesitamos estado local para los productos leídos

// --- Importa el tipo Producto si lo definiste en root.tsx o crea uno ---
// Asumiendo que tu API devuelve algo como esto:
type Producto = {
    id: number; // La API parece usar números para ID
    nombre: string;
    descripcion?: string;
    precio: number;
    stock?: number;
    categoria?: string;
    activo?: boolean;
    createdAt: string; // O Date
    updatedAt: string; // O Date
    deletedAt?: string | null; // O Date | null
};

const API_BASE_URL = "http://localhost:3000/api/v1";

export default function ProductosLista() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Para la edición

    // --- Función para cargar productos ---
    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/productos`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Filtramos los que tienen deletedAt (soft delete)
            setProductos(data.filter((p: Producto) => !p.deletedAt));
        } catch (e: any) {
            setError(`Error al cargar productos: ${e.message}`);
            console.error("Error fetching productos:", e);
        } finally {
            setLoading(false);
        }
    };

    // --- Cargar productos al montar el componente ---
    useEffect(() => {
        fetchProductos();
    }, []); // El array vacío asegura que solo se ejecute una vez al montar

    const handleEliminar = async (id: number) => {
        if (window.confirm(`¿Seguro que quieres eliminar el producto ${id}?`)) {
            try {
                const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    // Si la API devuelve un error (ej: 404), lánzalo
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Si tiene éxito (204 No Content), actualiza la lista localmente o vuelve a cargar
                setProductos((productosActuales) =>
                    productosActuales.filter((p) => p.id !== id)
                );
                // Opcional: podrías llamar a fetchProductos() de nuevo si prefieres recargar desde el server
                // fetchProductos();
            } catch (e: any) {
                setError(`Error al eliminar producto: ${e.message}`);
                console.error("Error deleting producto:", e);
                alert(`Error al eliminar: ${e.message}`); // Muestra error al usuario
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

            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && productos.length === 0 && (
                <p>No hay productos para mostrar.</p>
            )}

            {!loading && !error && productos.length > 0 && (
                <ul className="space-y-2">
                    {productos.map((p) => (
                        <li key={p.id} className="flex justify-between items-center p-3 border rounded-lg shadow-sm">
                            <span className="text-lg">{p.nombre} (ID: {p.id}) - Precio: ${p.precio}</span>
                            <div className="flex gap-2">
                                {/* --- Asegúrate que el link use el ID correcto --- */}
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