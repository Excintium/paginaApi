// app/root.tsx
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    // --- ELIMINA useOutletContext ---
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
// --- ELIMINA useState y los tipos Producto y ContextType ---

export const links: Route.LinksFunction = () => [
    // ... (links existentes)
];

export function Layout({ children }: { children: React.ReactNode }) {
    // ... (Layout existente)
}

export default function App() {
    // --- ELIMINA el useState ---

    // --- MODIFICAR: Outlet ya no necesita el contexto ---
    return <Outlet />;
}

// --- ELIMINA el hook useProductosContext ---


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    // ... (ErrorBoundary existente)
}