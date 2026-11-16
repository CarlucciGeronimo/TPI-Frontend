import { useState } from "react";
import { Text, View } from "react-native";
import { nombreDe, profesionales, propuestas, usuarios } from "../../mocks/data";
import { Segmentado } from "../Segmentado";
import { BotonChico, Estado, Tarjeta } from "../ui";

const secciones = [
  { valor: "usuarios", etiqueta: "Usuarios" },
  { valor: "profesionales", etiqueta: "Profesionales" },
] as const;

type Seccion = (typeof secciones)[number]["valor"];

const estadisticas = [
  { etiqueta: "Usuarios", valor: usuarios.length },
  { etiqueta: "Propuestas", valor: propuestas.length },
  { etiqueta: "Encargos", valor: 3 },
  { etiqueta: "Reseñas", valor: 8 },
];

export function VistaAdmin({ idAdmin }: { idAdmin: number }) {
  const [seccion, setSeccion] = useState<Seccion>("usuarios");
  const [listaUsuarios, setListaUsuarios] = useState(usuarios);
  const [listaProfesionales, setListaProfesionales] = useState(profesionales);

  const alternar = (id: number) =>
    setListaUsuarios((lista) => lista.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u)));

  const reactivar = (id: number) =>
    setListaProfesionales((lista) => lista.map((p) => (p.id === id ? { ...p, estado: "disponible" as const } : p)));

  return (
    <>
      <View className="flex-row gap-2">
        {estadisticas.map((e) => (
          <View key={e.etiqueta} className="flex-1 items-center rounded-2xl border border-neutral-200 bg-white py-3">
            <Text className="text-xl font-bold text-black">{e.valor}</Text>
            <Text className="text-[10px] text-neutral-500">{e.etiqueta}</Text>
          </View>
        ))}
      </View>

      <Segmentado opciones={secciones} valor={seccion} onCambio={setSeccion} />

      {seccion === "usuarios" &&
        listaUsuarios.map((u) => (
          <Tarjeta key={u.id} className="flex-row items-center justify-between gap-2">
            <View className="flex-1">
              <Text numberOfLines={1} className="font-semibold text-black">
                {u.nombre} {u.apellido}
              </Text>
              <Text numberOfLines={1} className="text-xs text-neutral-500">
                {u.email}
              </Text>
            </View>
            {u.id !== idAdmin && (
              <BotonChico etiqueta={u.activo ? "Dar de baja" : "Reactivar"} variante={u.activo ? "borde" : "solido"} onPress={() => alternar(u.id)} />
            )}
          </Tarjeta>
        ))}

      {seccion === "profesionales" &&
        listaProfesionales.map((p) => (
          <Tarjeta key={p.id} className="flex-row items-center justify-between gap-2">
            <View className="flex-1">
              <Text className="font-semibold text-black">{nombreDe(p.id)}</Text>
              <Text className="text-xs text-neutral-500">
                {p.tipoProfesional} · ★ {p.calificacion.toFixed(1)}
              </Text>
            </View>
            <View className="items-end gap-2">
              <Estado valor={p.estado} />
              {p.estado === "baja" && <BotonChico etiqueta="Reactivar" onPress={() => reactivar(p.id)} />}
            </View>
          </Tarjeta>
        ))}
    </>
  );
}