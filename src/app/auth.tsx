import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Campo } from "../components/Campo";
import { Segmentado } from "../components/Segmentado";
import { Selector } from "../components/Selector";
import { useRol } from "../context/RolContext";
import { tiposProfesional, usuarios } from "../mocks/data";

type Modo = "login" | "registro";
type RolRegistro = "usuario" | "profesional";

const modos = [
  { valor: "login", etiqueta: "Ingresar" },
  { valor: "registro", etiqueta: "Registrarse" },
] as const;

const rolesRegistro = [
  { valor: "usuario", etiqueta: "Usuario" },
  { valor: "profesional", etiqueta: "Profesional" },
] as const;

export default function Auth() {
  const router = useRouter();
  const { setRol } = useRol();
  const [modo, setModo] = useState<Modo>("login");
  const [rolRegistro, setRolRegistro] = useState<RolRegistro>("usuario");
  const [tipoProfesional, setTipoProfesional] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
            <Campo
              etiqueta="Email"
              value={email}
              onChangeText={(texto) => {
                setEmail(texto);
                setError("");
              }}
              placeholder="tu@email.com"
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
            <Segmentado opciones={rolesRegistro} valor={rolRegistro} onCambio={setRolRegistro} />
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
                <Selector etiqueta="Tipo de profesional" opciones={tiposProfesional} valor={tipoProfesional} onCambio={setTipoProfesional} />
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