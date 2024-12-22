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

type Params = Promise<{ id: string }>

export default async function EditRoute({  params,}: {  params: Params}) {
  const { id } = await params;


  const data = await getData(id);

  return <EditForm dataa={data} />;
}
