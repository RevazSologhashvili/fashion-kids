import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="rounded-lg mb-2">
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

          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10" />
        </Carousel>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h2 className="font-semibold text-xl">{item.name}</h2>
        <h3 className="inline-flex items-center rounded-lg bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/10">₾{item.price}</h3>
      </div>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>

      <Button asChild className="w-full mt-5">
        <Link href={`/product/${item.id}`}></Link>
      </Button>
    </div>
  );
}


export function LoadingProductCard() {
  return( 
    <div className="flex flex-col">
        <Skeleton className="w-full h-[330px]"/>
        <div className="flex flex-col mt-2 gap-y-2">
          <Skeleton className="h-4 w-full"/>
          <Skeleton className="h-6 w-full"/>
        </div>
        <Skeleton className="w-full h-10 mt-5"/>
    </div>
  )
}