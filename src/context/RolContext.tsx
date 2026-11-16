import { createContext, useContext, useState, type ReactNode } from "react";
import { usuarios, type Rol, type Usuario } from "../mocks/data";

type RolContextValue = {
  rol: Rol;
  setRol: (rol: Rol) => void;
  usuario: Usuario;
};

const RolContext = createContext<RolContextValue | null>(null);

export function RolProvider({ children }: { children: ReactNode }) {
  const [rol, setRol] = useState<Rol>("usuario");
  const usuario = usuarios.find((u) => u.rol === rol) as Usuario;

  return <RolContext.Provider value={{ rol, setRol, usuario }}>{children}</RolContext.Provider>;
}

export function useRol() {
  const ctx = useContext(RolContext);
  if (!ctx) throw new Error("useRol debe usarse dentro de RolProvider");
  return ctx;
}