// app/routes/productos-editar.tsx
import { Link, useParams, useNavigate } from "react-router"; // <-- Añadir useNavigate
// --- AÑADIR ---
import { useState, useEffect } from "react";
import { useProductosContext } from "../root"; // Importa el hook del contexto
import type { Producto } from "../root"; // Importa el tipo Producto


export default function ProductosEditar() {
    const { id } = useParams();
    // --- AÑADIR ---
    const { productos, setProductos } = useProductosContext();
    const navigate = useNavigate(); // Hook para redirigir
    const [productoActual, setProductoActual] = useState<Producto | null>(null); // Estado para los datos del producto
    const [nombreEditado, setNombreEditado] = useState(""); // Estado para el input

    // --- AÑADIR: Efecto para cargar datos del producto cuando el ID cambie ---
    useEffect(() => {
        const encontrado = productos.find(p => p.id === id);
        if (encontrado) {
            setProductoActual(encontrado);
            setNombreEditado(encontrado.nombre); // Inicializa el input con el nombre actual
        } else {
            // Opcional: manejar el caso de ID no encontrado (redirigir, mostrar error)
            console.error(`Producto con ID ${id} no encontrado.`);
            setProductoActual(null); // Limpia el estado si no se encuentra
            // navigate("/productos"); // Podrías redirigir si no se encuentra
        }
    }, [id, productos, navigate]); // Dependencias: se ejecuta si cambian id, productos o navigate

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!productoActual || !nombreEditado.trim()) {
            alert("No se puede actualizar el producto o el nombre está vacío.");
            return;
        }

        // --- MODIFICAR: Lógica para actualizar el estado ---
        setProductos(productosActuales =>
            productosActuales.map(p =>
                p.id === id ? { ...p, nombre: nombreEditado } : p
            )
        );

        // alert(`Producto ${id} actualizado (simulación)`); // Quita el alert
        navigate("/productos"); // Redirige a la lista después de actualizar
    };

    // --- AÑADIR: Muestra un mensaje mientras carga o si no se encuentra ---
    if (!productoActual) {
        return (
            <main className="pt-16 p-4 container mx-auto">
                <p>Cargando producto o producto no encontrado...</p>
                <Link to="/productos" className="text-blue-500 hover:underline">Volver a la lista</Link>
            </main>
        );
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Editar Producto (ID: {id})</h1>
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
                        // --- MODIFICAR: Controla el valor del input ---
                        value={nombreEditado}
                        onChange={(e) => setNombreEditado(e.target.value)}
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