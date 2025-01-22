// Default to root path for development
export const BASE_URL = import.meta.env.VITE_BASE_URL || "/";

// Helper function to join paths correctly
export function joinPaths(...paths) {
  return paths
    .map((path) => path.replace(/^\/+|\/+$/g, "")) // Remove leading/trailing slashes
    .filter(Boolean) // Remove empty segments
    .join("/");
}
