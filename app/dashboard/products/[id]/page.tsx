import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>
}) {

  const resolvedParams = await params; 

  const { id } = resolvedParams;


  const data = await getData(id);

  return <EditForm dataa={data} />;
}
