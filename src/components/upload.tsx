"use client";

import { ImageUp } from "lucide-react";
import React, { useId } from "react";

type Props = React.ComponentProps<"input">;

export function Upload({ ...rest }: Props) {
  const id = useId();
  return (
    <div className="h-100 w-100 flex justify-center items-center rounded-2xl text-sm text-pink-300 bg-zinc-50 outline-none">
      <label
        htmlFor={id}
        className="flex h-12 gap-2 px-4 flex-col items-center cursor-pointer disabled:opacity-50 "
      >
        <ImageUp className="text-pink-500" />
        <p>Selecione a imagem do produto</p>
      </label>
      <input
        type="file"
        id={id}
        accept="image/*"
        className="hidden"
        {...rest}
      />
    </div>
  );
}
