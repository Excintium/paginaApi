// app/root.tsx
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    // --- AÑADIR ---
    useOutletContext, // Para pasar el contexto a las rutas hijas
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
// --- AÑADIR ---
import { useState } from "react";

// --- AÑADIR: Define el tipo de Producto ---
export type Producto = {
    id: string;
    nombre: string;
};

// --- AÑADIR: Define el tipo para el contexto ---
type ContextType = {
    productos: Producto[];
    setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};

export const links: Route.LinksFunction = () => [
    // ... (links existentes)
];

export function Layout({ children }: { children: React.ReactNode }) {
    // ... (Layout existente)
}

export default function App() {
    // --- AÑADIR: Estado para los productos ---
    const [productos, setProductos] = useState<Producto[]>([
        // Datos iniciales de ejemplo
        { id: "1", nombre: "Producto Inicial 1" },
        { id: "2", nombre: "Producto Inicial 2" },
    ]);

    // --- MODIFICAR: Pasa el estado y el setter al Outlet ---
    return <Outlet context={{ productos, setProductos } satisfies ContextType} />;
}

// --- AÑADIR: Hook para usar el contexto fácilmente en las rutas hijas ---
export function useProductosContext() {
    return useOutletContext<ContextType>();
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    // ... (ErrorBoundary existente)
}