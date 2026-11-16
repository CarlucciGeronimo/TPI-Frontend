import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Campo } from "../components/Campo";
import { Segmentado } from "../components/Segmentado";
import { useRol } from "../context/RolContext";
import { usuarios } from "../mocks/data";

type Modo = "login" | "registro";
type RolPublico = "usuario" | "profesional";

const modos = [
  { valor: "login", etiqueta: "Ingresar" },
  { valor: "registro", etiqueta: "Registrarse" },
] as const;

const rolesPublicos = [
  { valor: "usuario", etiqueta: "Usuario" },
  { valor: "profesional", etiqueta: "Profesional" },
] as const;

const emailDemo = (rol: RolPublico) => usuarios.find((u) => u.rol === rol)?.email ?? "";

export default function Auth() {
  const router = useRouter();
  const { setRol } = useRol();
  const [modo, setModo] = useState<Modo>("login");
  const [rolDemo, setRolDemo] = useState<RolPublico>("usuario");
  const [rolRegistro, setRolRegistro] = useState<RolPublico>("usuario");
  const [email, setEmail] = useState(emailDemo("usuario"));
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");

  const elegirRolDemo = (rol: RolPublico) => {
    setRolDemo(rol);
    setEmail(emailDemo(rol));
    setError("");
  };

  const ingresar = () => {
    const encontrado = usuarios.find((u) => u.email === email.trim().toLowerCase());
    if (!encontrado || password.length === 0) {
      setError("Email o contraseña incorrectos");
      return;
    }
    if (!encontrado.activo) {
      setError("Cuenta dada de baja. Contactá a un administrador.");
      return;
    }
    setRol(encontrado.rol);
    router.replace("/inicio");
  };

  const registrar = () => {
    setRol(rolRegistro);
    router.replace("/inicio");
  };

  return (
    <ScrollView className="flex-1 bg-white" keyboardShouldPersistTaps="handled">
      <View className="px-6 pb-10 pt-14">
        <Pressable onPress={() => router.back()} className="-ml-1 h-10 w-10 items-center justify-center rounded-full active:bg-neutral-100">
          <Feather name="arrow-left" size={22} color="#000000" />
        </Pressable>

        <Text className="mt-4 text-3xl font-extrabold text-black">Bienvenido</Text>
        <Text className="mt-1 text-neutral-500">Ingresá o creá tu cuenta.</Text>

        <View className="mt-6">
          <Segmentado opciones={modos} valor={modo} onCambio={setModo} />
        </View>

        {modo === "login" ? (
          <View className="mt-6 gap-4">
            <View className="gap-1.5">
              <Text className="text-sm font-medium text-black">Entrar como</Text>
              <Segmentado opciones={rolesPublicos} valor={rolDemo} onCambio={elegirRolDemo} />
              <Text className="text-xs text-neutral-500">Demostración: completa el email de ejemplo del rol elegido.</Text>
            </View>
            <Campo
              etiqueta="Email"
              value={email}
              onChangeText={(texto) => {
                setEmail(texto);
                setError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Campo
              etiqueta="Contraseña"
              value={password}
              onChangeText={(texto) => {
                setPassword(texto);
                setError("");
              }}
              secureTextEntry
            />
            {error !== "" && (
              <View className="rounded-xl border border-black px-4 py-3">
                <Text className="text-sm text-black">{error}</Text>
              </View>
            )}
            <Pressable onPress={ingresar} className="h-12 items-center justify-center rounded-xl bg-black active:opacity-80">
              <Text className="text-base font-semibold text-white">Ingresar</Text>
            </Pressable>
          </View>
        ) : (
          <View className="mt-6 gap-4">
            <Segmentado opciones={rolesPublicos} valor={rolRegistro} onCambio={setRolRegistro} />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Campo etiqueta="Nombre" />
              </View>
              <View className="flex-1">
                <Campo etiqueta="Apellido" />
              </View>
            </View>
            <Campo etiqueta="Teléfono" keyboardType="phone-pad" />
            <Campo etiqueta="Email" keyboardType="email-address" autoCapitalize="none" />
            <Campo etiqueta="Contraseña" secureTextEntry />
            {rolRegistro === "profesional" && (
              <>
                <Campo etiqueta="Tipo de profesional" placeholder="Electricista, plomero, gasista..." />
                <Campo etiqueta="Nº de matrícula" />
                <Campo etiqueta="Zona de trabajo" />
              </>
            )}
            <Pressable onPress={registrar} className="h-12 items-center justify-center rounded-xl bg-black active:opacity-80">
              <Text className="text-base font-semibold text-white">Crear cuenta</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}