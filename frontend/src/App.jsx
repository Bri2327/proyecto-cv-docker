import React, { useState, useEffect } from "react";
import {
  MapPin,
  GraduationCap,
  Github,
  Mail,
  Loader2,
  Sun,
  Moon
} from "lucide-react";
import { getCv } from "./api/cvClient";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    async function loadCv() {
      try {
        const response = await getCv();
        setData(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadCv();
  }, []);

  if (loading) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
          <Loader2 className="w-6 h-6 animate-spin mb-4" />
          <p className="text-sm font-medium animate-pulse">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const { persona, formacion } = data;

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300 relative">
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="p-2.5 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-white"
            aria-label="Alternar modo oscuro"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <main className="max-w-2xl mx-auto px-6 py-20 sm:py-32">
          <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-16">
            <div className="relative">
              <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 rounded-full blur-md opacity-50"></div>
              <img
                src={persona.foto}
                alt={`Fotografía de ${persona.nombre}`}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {persona.nombre} <br className="hidden sm:block" />
                <span className="text-zinc-500 dark:text-zinc-400">{persona.apellido}</span>
              </h1>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                <MapPin className="w-4 h-4" />
                <span>{persona.ciudad}</span>
              </div>

              <div className="pt-4 space-y-2">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg">
                  <Mail className="w-4 h-4" />
                  <span>{persona.email}</span>
                </div>
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                  <Github className="w-4 h-4" />
                  <span>{persona.github}</span>
                </div>
              </div>
            </div>
          </header>

          <hr className="border-zinc-200 dark:border-zinc-800/60 mb-12" />

          <section>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              <h2 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                Formación Académica
              </h2>
            </div>

            <div className="space-y-4">
              {formacion.map((item, index) => (
                <div
                  key={item.id ?? `${item.titulo}-${index}`}
                  className="group relative flex flex-col sm:flex-row sm:items-baseline justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md hover:border-zinc-300/50 dark:hover:border-zinc-700/50 transition-all focus-within:ring-2 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-600 focus-within:outline-none"
                  tabIndex={0}
                >
                  <div className="space-y-1">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors">
                      {item.titulo}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.institucion}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 tabular-nums font-mono">
                    <span>{item.anio}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
