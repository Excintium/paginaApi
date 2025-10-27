// app/routes/productos-editar.tsx
import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:3000/api/v1";

// Reusa el tipo Producto de la lista o define uno similar
type Producto = { id: number; nombre: string; descripcion?: string; precio: number; stock?: number; categoria?: string; activo?: boolean; /* ...otros campos */ };
// Tipo para los datos actualizables (similar al Update DTO)
//
type UpdateProductoData = Partial<Omit<Producto, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>;


export default function ProductosEditar() {
    const { id } = useParams(); // El ID viene como string de la URL
    const navigate = useNavigate();

    // Estados para el formulario
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState<number | ''>('');
    const [stock, setStock] = useState<number | ''>('');
    const [categoria, setCategoria] = useState("");
    const [activo, setActivo] = useState(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // --- Cargar datos del producto al montar ---
    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/productos/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Producto con ID ${id} no encontrado.`);
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Producto = await response.json();
                // Poblar el estado del formulario con los datos cargados
                setNombre(data.nombre);
                setDescripcion(data.descripcion ?? "");
                setPrecio(data.precio);
                setStock(data.stock ?? '');
                setCategoria(data.categoria ?? "");
                setActivo(data.activo ?? true);

            } catch (e: any) {
                setError(`Error al cargar producto: ${e.message}`);
                console.error("Error fetching producto:", e);
            } finally {
                setLoading(false);
            }
        };

        if (id) { // Solo ejecuta si hay un ID
            fetchProducto();
        } else {
            setError("ID de producto no válido.");
            setLoading(false);
        }
    }, [id]); // Dependencia: se ejecuta si el ID cambia

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!nombre.trim() || precio === '' || precio < 0) {
            setError("Nombre y Precio (positivo) son requeridos.");
            return;
        }

        const productoActualizado: UpdateProductoData = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim() || undefined, // Envía undefined si está vacío
            precio: Number(precio),
            stock: stock === '' ? undefined : Number(stock),
            categoria: categoria.trim() || undefined,
            activo: activo,
        };

        setSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
                method: "PATCH", // O PUT si tu API lo requiere
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productoActualizado),
            });

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || JSON.stringify(errorData);
                } catch (jsonError) {
                    errorMessage = response.statusText;
                }
                throw new Error(errorMessage);
            }

            // Si tiene éxito, redirige a la lista
            navigate("/productos");

        } catch (e: any) {
            setError(`Error al actualizar producto: ${e.message}`);
            console.error("Error updating producto:", e);
        } finally {
            setSubmitting(false);
        }
    };

    // --- Muestra mensajes de carga o error ---
    if (loading) {
        return <main className="pt-16 p-4 container mx-auto"><p>Cargando datos del producto...</p></main>;
    }
    if (error && !submitting) { // No muestra error de carga si ya hay error de envío
        return (
            <main className="pt-16 p-4 container mx-auto">
                <p className="text-red-500">{error}</p>
                <Link to="/productos" className="text-blue-500 hover:underline mt-4 inline-block">Volver a la lista</Link>
            </main>
        );
    }


    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Editar Producto (ID: {id})</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Muestra error de envío */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                {/* ... (campos del formulario iguales a los de crear, pero usando los estados definidos aquí) ... */}
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium">Nombre*:</label>
                    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="mt-1 border rounded p-2 w-full shadow-sm" />
                </div>
                <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium">Descripción:</label>
                    <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="mt-1 border rounded p-2 w-full shadow-sm" />
                </div>
                <div>
                    <label htmlFor="precio" className="block text-sm font-medium">Precio*:</label>
                    <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value === '' ? '' : Number(e.target.value))} required min="0" step="0.01" className="mt-1 border rounded p-2 w-full shadow-sm" />
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium">Stock:</label>
                    <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))} min="0" step="1" className="mt-1 border rounded p-2 w-full shadow-sm" />
                </div>
                <div>
                    <label htmlFor="categoria" className="block text-sm font-medium">Categoría:</label>
                    <input type="text" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 border rounded p-2 w-full shadow-sm" />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="activo" checked={activo} onChange={(e) => setActivo(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2" />
                    <label htmlFor="activo" className="text-sm font-medium">Activo</label>
                </div>

                <div className="flex gap-2">
                    <button type="submit" disabled={submitting} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
                        {submitting ? "Actualizando..." : "Actualizar"}
                    </button>
                    <Link to="/productos" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancelar
                    </Link>
                </div>
            </form>
        </main>
    );
}