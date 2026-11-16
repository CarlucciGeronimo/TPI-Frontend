import { Stack } from "expo-router";
import { View } from "react-native";
import "../../global.css";
import { RolProvider } from "../context/RolContext";

export default function RootLayout() {
  return (
    <RolProvider>
      <View className="flex-1 items-center bg-neutral-200">
        <View className="w-full max-w-md flex-1 bg-white">
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    </RolProvider>
  );
}