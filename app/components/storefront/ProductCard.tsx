"use client"
import { addItem } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


// Your product interface and props
interface ProductCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export function ProductCard({ item }: ProductCardProps) {
  const [isPending, setIsPending] = useState(false); // Local pending state

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      await addItem(item.id); // Assuming addItem is an async function
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false); // Reset pending state
    }
  };

  return (
    <>
      <div className="rounded-lg mb-2 cursor-pointer">
        <Link href={`/product/${item.id}`} passHref>
          <div className="relative">
            <Carousel className="w-full mx-auto">
              <CarouselContent>
                {item.images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[350px] bg-gray-100 rounded-md">
                      <Image
                        src={src}
                        alt="featured product image"
                        fill
                        className="object-contain object-center w-full h-full rounded-xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex justify-between items-center mt-2">
            <h2 className="font-semibold text-xl">{item.name}</h2>
            <h3 className="inline-flex items-center rounded-lg bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/10">
              ₾{item.price}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {item.description}
          </p>
        </Link>
        {/* Form to Add Item to Cart */}
        <div className="flex items-center justify-center gap-4 mt-4">
        <form onSubmit={handleAddItem}>
          <input type="hidden" name="productId" value={item.id} />
          {isPending ? (
            <Button disabled size="lg" className="w-full">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> გთხოვთ
              დაიცადოთ
            </Button>
          ) : (
            <Button type="submit" size="lg" className="w-full">
              კალათაში დამატება
            </Button>
          )}
        </form>
      </div>
      </div>
    </>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
