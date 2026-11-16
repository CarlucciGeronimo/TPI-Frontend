import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { estadoLabel } from "../lib/format";

type Tono = { fondo: string; texto: string };

const positivo: Tono = { fondo: "bg-black", texto: "text-white" };
const neutro: Tono = { fondo: "bg-neutral-200", texto: "text-black" };
const negativo: Tono = { fondo: "border border-neutral-400 bg-white", texto: "text-neutral-500" };

const tono: Record<string, Tono> = {
  activa: positivo,
  disponible: positivo,
  aceptado: positivo,
  pendiente: neutro,
  ocupado: neutro,
  cancelada: negativo,
  cancelado: negativo,
  baja: negativo,
};

export function Estado({ valor }: { valor: string }) {
  const t = tono[valor] ?? neutro;
  return (
    <View className={`self-start rounded-full px-2.5 py-0.5 ${t.fondo}`}>
      <Text className={`text-xs font-semibold ${t.texto}`}>{estadoLabel[valor] ?? valor}</Text>
    </View>
  );
}

export function Tarjeta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <View className={`rounded-2xl border border-neutral-200 bg-white p-4 ${className}`}>{children}</View>;
}

export function Vacio({ children }: { children: ReactNode }) {
  return (
    <View className="rounded-2xl border border-dashed border-neutral-300 p-8">
      <Text className="text-center text-sm text-neutral-500">{children}</Text>
    </View>
  );
}

type PropsBotonChico = {
  etiqueta: string;
  onPress?: () => void;
  variante?: "solido" | "borde";
};

export function BotonChico({ etiqueta, onPress, variante = "solido" }: PropsBotonChico) {
  const solido = variante === "solido";
  return (
    <Pressable
      onPress={onPress}
      className={`h-9 items-center justify-center rounded-lg px-3 active:opacity-80 ${solido ? "bg-black" : "border border-neutral-400 bg-white"}`}
    >
      <Text className={`text-sm font-semibold ${solido ? "text-white" : "text-black"}`}>{etiqueta}</Text>
    </Pressable>
  );
}