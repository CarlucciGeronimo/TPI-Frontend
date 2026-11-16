import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const pasos = [
  { icono: "clipboard", titulo: "Publicá tu propuesta", detalle: "Contá qué necesitás, dónde y cuándo." },
  { icono: "tool", titulo: "Recibí presupuestos", detalle: "Profesionales disponibles te envían su oferta." },
  { icono: "message-circle", titulo: "Coordiná por chat", detalle: "Al aceptar, se abre un chat privado." },
  { icono: "star", titulo: "Calificá", detalle: "Al terminar, dejá tu opinión del trabajo." },
] as const;

export default function Landing() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="rounded-b-[40px] bg-black px-6 pb-12 pt-16">
        <Text className="text-sm font-semibold uppercase tracking-widest text-neutral-400">Firmat Servicios</Text>
        <Text className="mt-4 text-4xl font-extrabold leading-tight text-white">
          El profesional que buscás, <Text className="text-neutral-400">a un mensaje</Text>.
        </Text>
        <Text className="mt-4 text-neutral-300">Plomeros, electricistas, gasistas y más. Publicás, comparás y elegís.</Text>
        <Pressable
          onPress={() => router.push("/auth")}
          className="mt-8 h-12 items-center justify-center rounded-xl bg-white active:opacity-80"
        >
          <Text className="text-base font-semibold text-black">Empezar</Text>
        </Pressable>
      </View>

      <View className="gap-3 px-6 py-8">
        {pasos.map((p, i) => (
          <View key={p.titulo} className="flex-row items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
              <Feather name={p.icono} size={20} color="#000000" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-black">
                {i + 1}. {p.titulo}
              </Text>
              <Text className="text-sm text-neutral-500">{p.detalle}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}