"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function FilterSelect() {
  const searchParams = useSearchParams(); //Permite ler os parâmetros atuais da URL
  const pathname = usePathname(); //Retorna o caminho atual da rota
  const { replace } = useRouter(); //substitui a URL sem dar refresh completo na página

  function handleFilter(value: string) {
    //função é chamada quando o usuário seleciona uma categoria
    const params = new URLSearchParams(searchParams); //pega os parâmetros atuais da URL criando uma cópia editável deles

    if (value === "all") {
      //ee o usuário escolheu "Todas" remove o parâmetro da URL
      params.delete("categories");
    } else {
      //Se o usuário escolheu uma categoria específica adiciona (ou atualiza) o parâmetro
      params.set("categories", value);
    }

    replace(`${pathname}?${params.toString()}`); //Aqui monta a nova URL
  }

  return (
    <Select
      onValueChange={handleFilter} //Toda vez que o usuário selecionar algo, chama sua função
      value={searchParams.get("categories") ?? "all"} //value serve para dizer: qual opção deve aparecer selecionada na tela
    >
      <SelectTrigger>
        <SelectValue placeholder="Filtrar por categoria" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">Todas</SelectItem>
        <SelectItem value="Móvel">Móvel</SelectItem>
        <SelectItem value="Roupa">Roupa</SelectItem>
        <SelectItem value="Brinquedo">Brinquedo</SelectItem>
        <SelectItem value="Utensílio">Utensílio</SelectItem>
      </SelectContent>
    </Select>
  );
}
