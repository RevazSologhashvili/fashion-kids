import prisma from "@/app/lib/db";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

async function getData(){
    const data = await prisma.banner.findMany({
 });

    return data;

}
export async function Hero() {
    const banners = await getData();

    return(
       <Carousel>
            <CarouselContent>
                {banners.map((banner)=>(
                   <CarouselItem key={banner.id} >
                    <div  className="relative h-[60vh] lg:h-[80vh]">
                        <Image src={banner.imageString} alt={banner.title} fill className="object-cover w-full h-full rounded-xl"/>
                        <div className="absolute top-6 left-6 bg-opacity-75 bg-black text-white p-6 shadow-lg hover:scale-105 transition-transform rounded-md">
                            <h1 className="text-xl lg:text-4xl font-bold ">{banner.title}</h1>
                        </div>
                  </div>
                   </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16"/>
            <CarouselNext className="mr-16"/>
       </Carousel>
    )
}