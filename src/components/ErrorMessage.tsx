import React from "react";

export function ErrorMessage({ message }: { message: string }) {
  return <span className="text-red-600 text-xs">{message}</span>;
}
