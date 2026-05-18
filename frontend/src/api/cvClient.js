export async function getCv() {
  const response = await fetch("/api/cv");

  if (!response.ok) {
    throw new Error("No se pudo cargar la informacion del CV.");
  }

  return response.json();
}
