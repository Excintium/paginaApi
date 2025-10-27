// app/routes/productos-editar.tsx
import { Link, useParams } from "react-router";

export default function ProductosEditar() {
    // El hook useParams lee el parámetro :id de la URL
    const { id } = useParams();

    // En una aplicación real:
    // 1. Usarías el 'id' para cargar los datos actuales del producto desde tu API.
    // 2. Poblarías el formulario con esos datos.

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica de mutación (PUT/PATCH a tu API)
        alert(`Producto ${id} actualizado (simulación)`);
        // Deberías redirigir al usuario a la lista después de actualizar
    };

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
                        defaultValue={`Datos cargados para Producto ${id}`} // Simulación de carga de datos
                        required
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