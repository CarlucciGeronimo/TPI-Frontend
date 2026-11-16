import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { VistaAdmin } from "../components/inicio/VistaAdmin";
import { VistaProfesional } from "../components/inicio/VistaProfesional";
import { VistaUsuario } from "../components/inicio/VistaUsuario";
import { Pantalla } from "../components/Pantalla";
import { useRol } from "../context/RolContext";

export default function Inicio() {
  const router = useRouter();
  const { rol, usuario } = useRol();

  const titulo = rol === "admin" ? "Administración" : `Hola, ${usuario.nombre}`;

  const accion = (
    <View className="flex-row items-center gap-2">
      {rol !== "admin" && (
        <Pressable className="h-9 flex-row items-center gap-1 rounded-full bg-black px-4 active:opacity-80">
          <Feather name="plus" size={16} color="#ffffff" />
          <Text className="text-sm font-semibold text-white">Nueva</Text>
        </Pressable>
      )}
      <Pressable
        onPress={() => router.replace("/auth")}
        className="h-9 w-9 items-center justify-center rounded-full border border-neutral-300 active:bg-neutral-100"
      >
        <Feather name="log-out" size={16} color="#000000" />
      </Pressable>
    </View>
  );

  return (
    <Pantalla titulo={titulo} accion={accion}>
      {rol === "usuario" && <VistaUsuario idUsuario={usuario.id} />}
      {rol === "profesional" && <VistaProfesional idProfesional={usuario.id} />}
      {rol === "admin" && <VistaAdmin idAdmin={usuario.id} />}
    </Pantalla>
  );
}