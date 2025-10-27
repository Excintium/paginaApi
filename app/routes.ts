// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Ruta principal (Home)
    index("routes/home.tsx"),

    // --- Rutas del CRUD de Productos ---

    // 1. Página de Lista (/productos)
    route("productos", "routes/productos-lista.tsx"),

    // 2. Página de Creación (/productos/nueva)
    route("productos/nueva", "routes/productos-crear.tsx"),

    // 3. Página de Edición (/productos/:id/editar)
    route("productos/:id/editar", "routes/productos-editar.tsx"),

] satisfies RouteConfig;