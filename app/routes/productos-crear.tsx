// app/routes/productos-crear.tsx
import { Link, useNavigate } from "react-router"; // <-- Añadir useNavigate
// --- AÑADIR ---
import { useState } from "react";
import { useProductosContext } from "../root"; // Importa el hook del contexto

export default function ProductosCrear() {
    // --- AÑADIR ---
    const { setProductos } = useProductosContext();
    const navigate = useNavigate(); // Hook para redirigir
    const [nombreProducto, setNombreProducto] = useState(""); // Estado para el input

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombreProducto.trim()) {
            alert("El nombre no puede estar vacío.");
            return;
        }
        // --- MODIFICAR: Lógica para añadir al estado ---
        const nuevoProducto = {
            id: Date.now().toString(), // ID simple basado en timestamp (no ideal para producción)
            nombre: nombreProducto,
        };
        setProductos((productosActuales) => [...productosActuales, nuevoProducto]);

        // alert("Producto creado (simulación)"); // Quita el alert
        navigate("/productos"); // Redirige a la lista después de crear
    };

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre del Producto:
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="mt-1 border rounded p-2 w-full shadow-sm"
                        required
                        // --- AÑADIR: Controla el valor del input ---
                        value={nombreProducto}
                        onChange={(e) => setNombreProducto(e.target.value)}
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