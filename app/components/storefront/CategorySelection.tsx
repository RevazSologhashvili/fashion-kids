import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.jpg";
import girl from "@/public/girl.jpg";
import boy from "@/public/boy.jpg";

export function CategoriesSelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Shop by Categorie
        </h2>

        <Link
          href="/products/all"
          className="text-sm font-semibold text-primary hover:text-primary/75"
        >
          browse all products &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-6 lg:gap-8">
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2">
          <Image
            src={all}
            alt="all clotings for both girl and boy"
            className="object-cover object-top"
          />
          <div className="bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <div className="p-6 flex items-end">
            <Link href={'/products/all'}>
                <h3 className="text-white font-semibold text-xl">All Clothings</h3>
                <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={boy}
            alt="all clotings for both girl and boy"
            className="object-top  object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-t from-transparent to-blue-500 opacity-40 sm:absolute sm:inset-0" ></div>
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href={'/products/boy'}>
                <h3 className="text-white font-semibold text-xl">Boys Clothings</h3>
                <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={girl}
            alt="all clotings for both girl and boy"
            className="object-top object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full"
          />
          <div className="bg-gradient-to-b from-transparent to-pink-500 opacity-40 sm:absolute sm:inset-0" ></div>
          <div className="p-6 flex items-end sm:absolute sm:inset-0">
            <Link href={'/products/girls'}>
                <h3 className="text-white font-semibold text-xl">Girls Clothings</h3>
                <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
