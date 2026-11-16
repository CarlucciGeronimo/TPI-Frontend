import type { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";

type Props = {
  titulo: string;
  accion?: ReactNode;
  children: ReactNode;
};

export function Pantalla({ titulo, accion, children }: Props) {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center gap-3 border-b border-neutral-200 bg-white px-5 pb-4 pt-12">
        <Text numberOfLines={1} className="flex-1 text-xl font-bold text-black">
          {titulo}
        </Text>
        {accion}
      </View>
      <ScrollView className="flex-1">
        <View className="gap-4 px-5 pb-10 pt-5">{children}</View>
      </ScrollView>
    </View>
  );
}