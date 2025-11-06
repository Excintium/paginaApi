// app/root.tsx
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useOutletContext,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
// --- AÑADIR ---
import { useState, useEffect } from "react";
import apiClient from "./api"; // <-- Importa tu cliente axios

// --- AÑADIR: Define el tipo de Producto (DEBE COINCIDIR CON LA API) ---
// Este tipo ahora coincide con tu entidad de NestJS
export type Producto = {
    id: number; // <-- Era string, ahora es number
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
};

// Define el tipo para el contexto
type ContextType = {
    productos: Producto[];
    setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};

export const links: Route.LinksFunction = () => [
    // ... (tus links)
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links /><title></title>
        </head>
        <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    // El estado inicial ahora es un array vacío
    const [productos, setProductos] = useState<Producto[]>([]);

    // --- AÑADIR: useEffect para cargar los productos desde la API ---
    useEffect(() => {
        // Función para cargar los datos
        const fetchProductos = async () => {
            try {
                const response = await apiClient.get('/productos');
                setProductos(response.data); // Carga los datos de la API en el estado
            } catch (error) {
                console.error("Error al cargar productos:", error);
                // Aquí podrías manejar el error, ej: mostrar un mensaje
            }
        };

        fetchProductos(); // Llama a la función al montar el componente
    }, []); // El array vacío [] significa que solo se ejecuta una vez

    return <Outlet context={{ productos, setProductos } satisfies ContextType} />;
}

// Hook para usar el contexto (sin cambios)
export function useProductosContext() {
    return useOutletContext<ContextType>();
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    // ... (Tu ErrorBoundary existente)
    // (Asegúrate de que este código esté presente si lo tenías)
    console.error(error);
    if (isRouteErrorResponse(error)) {
        return (
            <Layout>
                <div className="p-4 text-center">
                    <h1 className="text-2xl font-bold text-red-500">{error.status} {error.statusText}</h1>
                    <p>{error.data}</p>
                </div>
            </Layout>
        );
    }
    let message = "Unknown error";
    if (error instanceof Error && error.stack) {
        message = error.stack;
    }
    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-red-500">Error</h1>
                <pre>{message}</pre>
            </div>
        </Layout>
    );
}