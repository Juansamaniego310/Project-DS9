import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Almacena tu clave de API en una variable de entorno

console.log('Supabase URL:', supabaseUrl);  // Verifica que se impriman las URLs correctas
console.log('Supabase Key:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;