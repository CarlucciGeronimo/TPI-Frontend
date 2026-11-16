export type Rol = "usuario" | "profesional" | "admin";
export type EstadoPropuesta = "activa" | "cancelada";
export type EstadoPresupuesto = "pendiente" | "aceptado" | "cancelado";
export type EstadoProfesional = "disponible" | "ocupado" | "baja";

export type Usuario = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: Rol;
  activo: boolean;
};

export type Profesional = {
  id: number;
  tipoProfesional: string;
  zona: string;
  nroMatricula: string;
  comentarioPresentacion: string;
  estado: EstadoProfesional;
  trabajosRealizados: number;
  calificacion: number;
};

export type Propuesta = {
  id: number;
  idUsuario: number;
  tipoServicio: string;
  descripcion: string;
  estado: EstadoPropuesta;
  ubicacion: string;
  fechaSolicitada: string;
};

export type Presupuesto = {
  id: number;
  idProfesional: number;
  idPropuesta: number;
  estado: EstadoPresupuesto;
  monto: number;
  descripcion: string;
  fechaPresupuesto: string;
};

export const usuarios: Usuario[] = [
  { id: 1, nombre: "Lucía", apellido: "Fernández", email: "lucia.fernandez@mail.com", telefono: "3465 41-2301", rol: "usuario", activo: true },
  { id: 2, nombre: "Martín", apellido: "Ríos", email: "martin.rios@mail.com", telefono: "3465 42-7788", rol: "profesional", activo: true },
  { id: 3, nombre: "Sofía", apellido: "Acosta", email: "sofia.acosta@mail.com", telefono: "3465 40-1190", rol: "admin", activo: true },
  { id: 4, nombre: "Diego", apellido: "Paredes", email: "diego.paredes@mail.com", telefono: "3465 43-5521", rol: "usuario", activo: true },
  { id: 5, nombre: "Carla", apellido: "Gómez", email: "carla.gomez@mail.com", telefono: "3465 44-9012", rol: "usuario", activo: true },
  { id: 6, nombre: "Carlos", apellido: "Benítez", email: "carlos.benitez@mail.com", telefono: "3465 45-3376", rol: "profesional", activo: true },
  { id: 7, nombre: "Andrea", apellido: "Molina", email: "andrea.molina@mail.com", telefono: "3465 46-8854", rol: "profesional", activo: true },
  { id: 8, nombre: "Julián", apellido: "Paz", email: "julian.paz@mail.com", telefono: "3465 47-6603", rol: "profesional", activo: false },
];

export const profesionales: Profesional[] = [
  {
    id: 2,
    tipoProfesional: "Electricista",
    zona: "Centro",
    nroMatricula: "MP-4821",
    comentarioPresentacion: "Instalaciones domiciliarias y tableros. Trabajo prolijo y con garantía.",
    estado: "disponible",
    trabajosRealizados: 37,
    calificacion: 4.8,
  },
  {
    id: 6,
    tipoProfesional: "Plomero",
    zona: "Barrio Sur",
    nroMatricula: "MP-3307",
    comentarioPresentacion: "Destapes, reparación de pérdidas e instalación de sanitarios.",
    estado: "disponible",
    trabajosRealizados: 52,
    calificacion: 4.6,
  },
  {
    id: 7,
    tipoProfesional: "Gasista",
    zona: "Zona Norte",
    nroMatricula: "MG-1594",
    comentarioPresentacion: "Gasista matriculada. Instalación y revisión de artefactos.",
    estado: "ocupado",
    trabajosRealizados: 29,
    calificacion: 4.9,
  },
  {
    id: 8,
    tipoProfesional: "Pintor",
    zona: "Centro",
    nroMatricula: "MP-2248",
    comentarioPresentacion: "Pintura de interiores y exteriores, con y sin materiales.",
    estado: "baja",
    trabajosRealizados: 14,
    calificacion: 4.2,
  },
];

export const propuestas: Propuesta[] = [
  { id: 1, idUsuario: 1, tipoServicio: "Electricidad", descripcion: "Se corta la luz del living cuando enciendo el aire acondicionado. Necesito revisar el tablero.", estado: "activa", ubicacion: "Belgrano 1240", fechaSolicitada: "2026-11-24" },
  { id: 2, idUsuario: 1, tipoServicio: "Plomería", descripcion: "Pierde agua la canilla de la cocina y hay humedad en la mesada.", estado: "activa", ubicacion: "Belgrano 1240", fechaSolicitada: "2026-11-28" },
  { id: 3, idUsuario: 1, tipoServicio: "Pintura", descripcion: "Pintar dos habitaciones y el pasillo, las paredes ya están enduidas.", estado: "cancelada", ubicacion: "Belgrano 1240", fechaSolicitada: "2026-12-05" },
  { id: 4, idUsuario: 4, tipoServicio: "Gas", descripcion: "Instalación de un calefón nuevo y revisión de la conexión de gas.", estado: "activa", ubicacion: "San Martín 855", fechaSolicitada: "2026-11-22" },
  { id: 5, idUsuario: 5, tipoServicio: "Carpintería", descripcion: "Arreglar la puerta del placard, se salió de la guía.", estado: "activa", ubicacion: "Rivadavia 430", fechaSolicitada: "2026-11-26" },
  { id: 6, idUsuario: 4, tipoServicio: "Electricidad", descripcion: "Instalar tres tomacorrientes en el taller del fondo.", estado: "activa", ubicacion: "San Martín 855", fechaSolicitada: "2026-12-02" },
];

export const presupuestos: Presupuesto[] = [
  { id: 1, idProfesional: 2, idPropuesta: 1, estado: "pendiente", monto: 18000, descripcion: "Revisión completa del tablero y cambio de térmica.", fechaPresupuesto: "2026-11-13" },
  { id: 2, idProfesional: 6, idPropuesta: 2, estado: "pendiente", monto: 9500, descripcion: "Cambio de cuerito y sellado de la conexión.", fechaPresupuesto: "2026-11-14" },
  { id: 3, idProfesional: 2, idPropuesta: 6, estado: "pendiente", monto: 28500, descripcion: "Incluye materiales y mano de obra. Trabajo de una jornada.", fechaPresupuesto: "2026-11-15" },
  { id: 4, idProfesional: 7, idPropuesta: 4, estado: "aceptado", monto: 41000, descripcion: "Calefón instalado y prueba de pérdidas.", fechaPresupuesto: "2026-11-10" },
  { id: 5, idProfesional: 8, idPropuesta: 3, estado: "cancelado", monto: 60000, descripcion: "Mano de obra y materiales para dos habitaciones y pasillo.", fechaPresupuesto: "2026-11-09" },
];

export function nombreDe(idUsuario: number) {
  const u = usuarios.find((x) => x.id === idUsuario);
  return u ? `${u.nombre} ${u.apellido}` : "";
}