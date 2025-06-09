export default async function MinecraftPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <div>Minecraft {id}</div>;
}
