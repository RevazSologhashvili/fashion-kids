import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          id: true,
          images: true,
          price: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });
      return {
        title: "All Products",
        data: data,
      };
    }

    case "boys": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "boysClothing",
        },
        select: {
          name: true,
          id: true,
          images: true,
          price: true,
          description: true,
        },
      });
      return {
        title: "Boys Clothings",
        data: data,
      };
    }

    case "girls": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "girlsClothing",
        },
        select: {
          name: true,
          id: true,
          images: true,
          price: true,
          description: true,
        },
      });
      return {
        title: "Girls Clothings",
        data: data,
      };
    }

    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;
  const { data, title } = await getData(name);

  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              images: item.images,
            }}
          />
        ))}
      </div>
    </section>
  );
}
