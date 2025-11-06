// app/routes/productos-crear.tsx
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useProductosContext } from "~/root";
import apiClient from "../api"; // <-- Importa axios

export default function ProductosCrear() {
    const { setProductos } = useProductosContext();
    const navigate = useNavigate();

    // --- MODIFICAR: Estado para el formulario (usando los campos de la API) ---
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- MODIFICAR: Objeto de datos (DTO) ---
        const nuevoProducto = {
            nombre,
            descripcion,
            precio,
            stock,
        };

        try {
            // --- MODIFICAR: Llamada a la API ---
            const response = await apiClient.post('/productos', nuevoProducto);

            // Añade el nuevo producto (devuelto por la API) al estado local
            setProductos((productosActuales) => [...productosActuales, response.data]);

            navigate("/productos"); // Redirige a la lista
        } catch (error) {
            console.error("Error al crear producto:", error);
            alert("No se pudo crear el producto.");
        }
    };

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>

            {/* --- MODIFICAR: Formulario con todos los campos --- */}
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
                        onChange={(e) => setPrecio(parseFloat(e.target.value))} // Convertir a número
                    />
                </div>

                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock:</label>
                    <input
                        type="number" id="stock"
                        className="mt-1 border rounded p-2 w-full shadow-sm"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(parseInt(e.target.value, 10))} // Convertir a entero
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
                        Guardar
                    </button>
                    <Link to="/productos" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancelar
                    </Link>
                </div>
            </form>
        </main>
    );
}