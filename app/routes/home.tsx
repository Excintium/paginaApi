import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Página de Inicio" },
        { name: "description", content: "Bienvenido a mi aplicación" },
    ];
}

export default function Home() {
    return (
        <main className="pt-16 p-4 container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-8">Bienvenido</h1>
            <p className="mb-6 text-lg">
                Esta es la página principal de tu aplicación.
            </p>
            <Link
                to="/productos"
                className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-lg font-medium text-white shadow-md transition hover:bg-blue-600"
            >
                Administrar Productos
            </Link>
        </main>
    );
}