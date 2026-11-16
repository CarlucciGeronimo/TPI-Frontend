import { Pressable, Text, View } from "react-native";

/*
  Selector segmentado
*/
type Opcion<T extends string> = { valor: T; etiqueta: string };

type Props<T extends string> = {
  opciones: readonly Opcion<T>[];
  valor: T;
  onCambio: (valor: T) => void;
};

export function Segmentado<T extends string>({ opciones, valor, onCambio }: Props<T>) {
  return (
    <View className="flex-row gap-1 rounded-xl bg-neutral-100 p-1">
      {opciones.map((o) => {
        const activa = o.valor === valor;
        return (
          <Pressable
            key={o.valor}
            onPress={() => onCambio(o.valor)}
            className={`h-10 flex-1 items-center justify-center rounded-lg ${activa ? "bg-black" : ""}`}
          >
            <Text className={`text-sm font-semibold ${activa ? "text-white" : "text-neutral-500"}`}>{o.etiqueta}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}