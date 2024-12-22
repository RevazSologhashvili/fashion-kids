import { addItem } from "@/app/actions";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProdcuts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import { CartButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  
  const resolvedParams = await params;  

  
  const { id } = resolvedParams;

  const data = await getData(id);

  const addToCart = addItem.bind(null, data.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-bold text-3xl text-green-600">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
          </div>

          <p className="text-base text-gray-700 mt-6">{data.description}</p>

          <form action={addToCart}>
            <CartButton />
          </form>
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
