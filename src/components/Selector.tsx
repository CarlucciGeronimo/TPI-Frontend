import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  etiqueta: string;
  opciones: readonly string[];
  valor: string;
  onCambio: (valor: string) => void;
  placeholder?: string;
};

export function Selector({ etiqueta, opciones, valor, onCambio, placeholder = "Selecciona una opcion"}: Props) {
    const [abierto, setAbierto] = useState(false);

    return (
    <View className="gap-1.5">
      <Text className="text-sm font-medium text-black">{etiqueta}</Text>
      <Pressable
        onPress={() => setAbierto(!abierto)}
        className="h-12 flex-row items-center justify-between rounded-xl border border-neutral-300 bg-white px-4"
      >
        <Text className={`text-base ${valor ? "text-black" : "text-neutral-400"}`}>{valor || placeholder}</Text>
        <Feather name={abierto ? "chevron-up" : "chevron-down"} size={18} color="#000000" />
      </Pressable>
      {abierto && (
        <View className="overflow-hidden rounded-xl border border-neutral-300 bg-white">
          {opciones.map((opcion, i) => (
            <Pressable
              key={opcion}
              onPress={() => {
                onCambio(opcion);
                setAbierto(false);
              }}
              className={`h-11 flex-row items-center justify-between px-4 active:bg-neutral-100 ${i > 0 ? "border-t border-neutral-200" : ""}`}
            >
              <Text className="text-base text-black">{opcion}</Text>
              {opcion === valor && <Feather name="check" size={16} color="#000000" />}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

