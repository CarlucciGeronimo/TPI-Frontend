import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { fecha } from "../lib/format";
import type { Propuesta } from "../mocks/data";
import { Estado, Tarjeta } from "./ui";

type Props = {
  propuesta: Propuesta;
  recibidos?: number;
};

function textoRecibidos(cantidad: number) {
  if (cantidad === 0) return "Sin presupuestos todavía";
  return cantidad === 1 ? "1 presupuesto recibido" : `${cantidad} presupuestos recibidos`;
}

export function PropuestaItem({ propuesta, recibidos }: Props) {
  return (
    <Tarjeta>
      <View className="flex-row items-start justify-between gap-2">
        <Text className="flex-1 font-semibold text-black">{propuesta.tipoServicio}</Text>
        <Estado valor={propuesta.estado} />
      </View>
      <Text numberOfLines={2} className="mt-1 text-sm text-neutral-500">
        {propuesta.descripcion}
      </Text>
      <View className="mt-3 flex-row gap-4">
        <View className="flex-row items-center gap-1">
          <Feather name="map-pin" size={14} color="#737373" />
          <Text className="text-xs text-neutral-500">{propuesta.ubicacion}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Feather name="calendar" size={14} color="#737373" />
          <Text className="text-xs text-neutral-500">{fecha(propuesta.fechaSolicitada)}</Text>
        </View>
      </View>
      {recibidos !== undefined && <Text className="mt-3 text-xs font-semibold text-black">{textoRecibidos(recibidos)}</Text>}
    </Tarjeta>
  );
}