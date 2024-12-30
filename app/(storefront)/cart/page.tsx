export const dynamic = 'force-dynamic';

import { checkOut, deleteItem } from "@/app/actions";
import { CheckoutButton, DeleteItems } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function CartRoute() {


    const { getUser } = getKindeServerSession();
    console.log("Got session");
    
    const user = await getUser();

    console.log("User result:", user);

    if (!user) {
      console.log("No user found, redirecting");
      redirect("/");
    }

    


  const cart:Cart | null  = await redis.get(`cart-${user.id}`);

  let totalPrice: number = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return (
    <div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
      {!cart || !cart.items.length ? (
        <div className="flex min-h-[400px] flex-col justify-center items-center border border-dashed p-8 text-center rounded-lg mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-medium">
            ამჟამად თქვენი კალათა ცარიელია
          </h2>
          <p className="mb-4 mt-6  text-sm leading-4 text-muted-foreground max-w-md">
            გადათით პროდუქტების გვერდზე ქვომთ მოცემული ღილაკით
          </p>
          <Button asChild>
            <Link href={"/"}>მთავარ გვერდზე დაბრუნება</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {cart?.items.map((item) => (
            <div key={item.id} className="flex ring-1 ring-inset ring-primary/10 p-2 rounded-lg">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  src={item.imageString}
                  alt="product image"
                  fill
                  className="rounded-md object-cover "
                />
              </div>
              <div className="ml-5 flex justify-between w-full font-medium">
                <p>{item.name}</p>
                <div className="flex flex-col h-full justify-between py-5">
                  <p>რაოდენობა: {item.quantity}</p>
                  <div className="flex items-center gap-x-2 justify-end">
                    <p>
                      ₾
                      {new Intl.NumberFormat("ge-KA").format(
                        item.price * item.quantity
                      )}
                    </p>
                  </div>
                  <form action={deleteItem} className="text-end">
                    <input type="hidden" name="productId" value={item.id} />
                    <DeleteItems />
                  </form>
                </div>
              </div>
            </div>
          ))}
          <div className=" mt-5">
            <div className="flex items-center justify-between font-medium mb-3">
              <p>ჯამში გადასახდელი: </p>
              <p>₾{new Intl.NumberFormat("ge-KA").format(totalPrice)}</p>
            </div>
            <form action={checkOut}>
              <CheckoutButton />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
