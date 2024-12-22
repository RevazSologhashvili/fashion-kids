"use client";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface btnProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButtons({ text, variant }: btnProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          Please Wait
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}

export function CartButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button size={"lg"} className="w-full mt-5">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" />
          Adding to Cart
        </Button>
      ) : (
        <Button size={"lg"} className="w-full mt-5">
          <ShoppingBag className="mr-4 h-5 w-5" />
          Add to cart
        </Button>
      )}
    </>
  );
}

export function DeleteItems() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="text-primary font-medium text-end">Deleting...</button>
      ) : (
        <button type="submit" className="text-primary font-medium text-end">Delete</button>
      )}
    </>
  );
}


export function CheckoutButton() {
  const {pending} = useFormStatus();
  return(
    <>
    {pending ? (
         <Button disabled size={"lg"} className="w-full">
          <Loader2 className="mr-2 h-5 w-5 animate-spin"/> Please Wait
       </Button>
    ): (
      <Button type="submit" size={"lg"} className="w-full">
      Checkout
    </Button>
    )}
    </>
  )
}