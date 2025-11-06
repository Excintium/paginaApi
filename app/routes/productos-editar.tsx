// app/routes/productos-editar.tsx
import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useProductosContext } from "~/root";
import apiClient from "../api"; // <-- Importa axios
import type { Producto } from "~/root";

export default function ProductosEditar() {
    const { id } = useParams();
    const { setProductos } = useProductosContext();
    const navigate = useNavigate();

    // Estado local para los campos del formulario
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [loading, setLoading] = useState(true);

    // --- MODIFICAR: Cargar datos del producto desde la API ---
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await apiClient.get<Producto>(`/productos/${id}`);
                const producto = response.data;
                // Rellenar el formulario con los datos de la API
                setNombre(producto.nombre);
                setDescripcion(producto.descripcion || "");
                setPrecio(producto.precio);
                setStock(producto.stock);
                setLoading(false);
            } catch (error) {
                console.error(`Producto con ID ${id} no encontrado.`, error);
                alert("Producto no encontrado.");
                navigate("/productos");
            }
        };

        fetchProducto();
    }, [id, navigate]); // Dependencias: se ejecuta si el ID cambia

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productoActualizado = {
            nombre,
            descripcion,
            precio,
            stock,
        };

        try {
            // --- MODIFICAR: Llamada a la API (PATCH) ---
            const response = await apiClient.patch(`/productos/${id}`, productoActualizado);

            // Actualiza el estado global
            setProductos(productosActuales =>
                productosActuales.map(p =>
                    p.id === Number(id) ? response.data : p // Asegúrate de comparar IDs como números
                )
            );

            navigate("/productos"); // Redirige a la lista
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("No se pudo actualizar el producto.");
        }
    };

    if (loading) {
        return <main className="pt-16 p-4 container mx-auto"><p>Cargando producto...</p></main>;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Editar Producto (ID: {id})</h1>

            {/* --- REEMPLAZAR: Formulario completo --- */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input
                        type="text" id="nombre"
                        className="mt-1 border rounded p-2 w-full shadow-sm"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio:</label>
                    <input
                        type="number" id="precio"
                        className="mt-1 border rounded p-2 w-full shadow-sm"
                        required
                        min="0"
                        value={precio}
                        onChange={(e) => setPrecio(parseFloat(e.target.value))}
                    />
                </div>

                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock:</label>
                    <input
                        type="number" id="stock"
                        className="mt-1 border rounded p-2 w-full shadow-sm"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(parseInt(e.target.value, 10))}
                    />
                </div>

                <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción (Opcional):</label>
                    <textarea
                        id="descripcion"
                        className="mt-1 border rounded p-2 w-full shadow-sm"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Actualizar
                    </button>
                    <Link to="/productos" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancelar
                    </Link>
                </div>
            </form>
        </main>
    );
}