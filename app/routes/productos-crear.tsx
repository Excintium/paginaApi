// app/routes/productos-crear.tsx
import { Link } from "react-router";

export default function ProductosCrear() {
    // Aquí manejarías el estado del formulario y el envío

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica de mutación (POST a tu API)
        alert("Producto creado (simulación)");
        // Deberías redirigir al usuario a la lista después de crear
        // (usando useNavigate() de react-router)
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