import { useState } from "react";
import { Text, View } from "react-native";
import { money } from "../../lib/format";
import { presupuestos, profesionales, propuestas } from "../../mocks/data";
import { PropuestaItem } from "../PropuestaItem";
import { Segmentado } from "../Segmentado";
import { Estado, Tarjeta, Vacio } from "../ui";

const secciones = [
  { valor: "trabajos", etiqueta: "Trabajos" },
  { valor: "presupuestos", etiqueta: "Presupuestos" },
] as const;

type Seccion = (typeof secciones)[number]["valor"];

export function VistaProfesional({ idProfesional }: { idProfesional: number }) {
  const [seccion, setSeccion] = useState<Seccion>("trabajos");
  const perfil = profesionales.find((p) => p.id === idProfesional);
  const disponibles = propuestas.filter((p) => p.estado === "activa" && p.idUsuario !== idProfesional);
  const mios = presupuestos.filter((b) => b.idProfesional === idProfesional);

  return (
    <>
      <Segmentado opciones={secciones} valor={seccion} onCambio={setSeccion} />

      {seccion === "trabajos" &&
        (perfil?.estado !== "disponible" ? (
          <Vacio>
            Estás como "{perfil?.estado === "baja" ? "dado de baja" : "ocupado"}". Cambiá tu estado a Disponible en tu perfil para ver nuevos trabajos.
          </Vacio>
        ) : disponibles.length ? (
          disponibles.map((p) => <PropuestaItem key={p.id} propuesta={p} />)
        ) : (
          <Vacio>No hay propuestas nuevas por ahora.</Vacio>
        ))}

      {seccion === "presupuestos" &&
        (mios.length ? (
          mios.map((b) => {
            const propuesta = propuestas.find((p) => p.id === b.idPropuesta);
            return (
              <Tarjeta key={b.id}>
                <View className="flex-row items-center justify-between gap-2">
                  <View className="flex-1">
                    <Text className="font-semibold text-black">{propuesta?.tipoServicio}</Text>
                    <Text className="text-sm text-neutral-500">{money(b.monto)}</Text>
                  </View>
                  <Estado valor={b.estado} />
                </View>
              </Tarjeta>
            );
          })
        ) : (
          <Vacio>Aún no enviaste presupuestos.</Vacio>
        ))}
    </>
  );
}