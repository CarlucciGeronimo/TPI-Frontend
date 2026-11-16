import { Text, TextInput, View, type TextInputProps } from "react-native";

/* 
    Campo de texto
*/
type Props = TextInputProps & { etiqueta: string };

export function Campo({ etiqueta, ...resto }: Props) {
  return (
    <View className="gap-1.5">
      <Text className="text-sm font-medium text-black">{etiqueta}</Text>
      <TextInput
        placeholderTextColor="#a3a3a3"
        className="h-12 rounded-xl border border-neutral-300 bg-white px-4 text-base text-black outline-none focus:border-black"
        {...resto}
      />
    </View>
  );
}