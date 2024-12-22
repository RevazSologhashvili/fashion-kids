"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageProps {
  images: string[];
}

export function ImageSlider({ images }: ImageProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid gap-6 md:gap-3  place-content-start">
      <div className="relative overflow-hidden rounded-lg w-[100%] h-[80dvh]" >
        <Image
          src={images[mainImageIndex]}
          alt="product image"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button variant={"ghost"} size={"icon"} onClick={handlePreviousClick}>
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button variant={"ghost"} size={"icon"} onClick={handleNextClick}>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 ">
        {images.map((image, index) => (
          <div
            className={
              cn(
                index === mainImageIndex
                  ? "border-2 border-primary"
                  : "border border-gray-200"
              ) +
              ` cursor-pointer relative overflow-hidden rounded-lg`
            }
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt="prduct image"
              width={100}
              height={100}
              className="object-cover w-[100px] h-[100px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
