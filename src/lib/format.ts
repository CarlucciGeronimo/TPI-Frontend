const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function fecha(iso: string) {
  const [anio, mes, dia] = iso.slice(0, 10).split("-").map(Number);
  return `${dia} ${meses[mes - 1]} ${anio}`;
}

export function money(monto: number) {
  return `$ ${monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export const estadoLabel: Record<string, string> = {
  activa: "Activa",
  cancelada: "Cancelada",
  pendiente: "Pendiente",
  aceptado: "Aceptado",
  cancelado: "Cancelado",
  disponible: "Disponible",
  ocupado: "Ocupado",
  baja: "Dado de baja",
};