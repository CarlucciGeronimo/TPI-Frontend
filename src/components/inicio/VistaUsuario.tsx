import { Text } from "react-native";
import { presupuestos, propuestas } from "../../mocks/data";
import { PropuestaItem } from "../PropuestaItem";
import { Vacio } from "../ui";

export function VistaUsuario({ idUsuario }: { idUsuario: number }) {
  const mias = propuestas.filter((p) => p.idUsuario === idUsuario);

  return (
    <>
      <Text className="text-lg font-bold text-black">Mis propuestas</Text>
      {mias.length ? (
        mias.map((p) => (
          <PropuestaItem key={p.id} propuesta={p} recibidos={presupuestos.filter((b) => b.idPropuesta === p.id).length} />
        ))
      ) : (
        <Vacio>Todavía no publicaste propuestas.</Vacio>
      )}
    </>
  );
}