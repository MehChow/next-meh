export default async function ApexVidPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <div>Apex {id}</div>;
}
