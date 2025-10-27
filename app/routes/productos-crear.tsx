// app/routes/productos-crear.tsx
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const API_BASE_URL = "http://localhost:3000/api/v1";

// Define un tipo para los datos del formulario (similar al DTO del backend)
//
type NuevoProductoData = {
    nombre: string;
    descripcion?: string;
    precio: number;
    stock?: number;
    categoria?: string;
    activo?: boolean;
};

export default function ProductosCrear() {
    const navigate = useNavigate();
    // Estado para cada campo del formulario
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState<number | ''>(''); // Usar '' para input vacío
    const [stock, setStock] = useState<number | ''>('');
    const [categoria, setCategoria] = useState("");
    const [activo, setActivo] = useState(true); // Valor por defecto
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validación simple en frontend (la API también validará)
        if (!nombre.trim() || precio === '' || precio < 0) {
            setError("Nombre y Precio (positivo) son requeridos.");
            return;
        }

        const nuevoProducto: NuevoProductoData = {
            nombre: nombre.trim(),
            // Solo incluye campos opcionales si tienen valor
            ...(descripcion.trim() && { descripcion: descripcion.trim() }),
            precio: Number(precio), // Asegura que sea número
            ...(stock !== '' && { stock: Number(stock) }),
            ...(categoria.trim() && { categoria: categoria.trim() }),
            activo: activo,
        };

        setSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/productos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProducto),
            });

            if (!response.ok) {
                // Intenta leer el mensaje de error de la API si lo hay
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || JSON.stringify(errorData);
                } catch (jsonError) {
                    // Si no hay JSON, usa el status text
                    errorMessage = response.statusText;
                }
                throw new Error(errorMessage);
            }

            // Si tiene éxito (201 Created), redirige a la lista
            navigate("/productos");

        } catch (e: any) {
            setError(`Error al crear producto: ${e.message}`);
            console.error("Error creating producto:", e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {/* Añade más campos al formulario según tu DTO */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
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
                        {submitting ? "Guardando..." : "Guardar"}
                    </button>
                    <Link to="/productos" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancelar
                    </Link>
                </div>
            </form>
        </main>
    );
}