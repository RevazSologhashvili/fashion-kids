import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingCart } from "lucide-react";
import { UserDrodown } from "./UserDrodown";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";


export async function Navbar() {
  let user = null;
  let cart: Cart | null = null;
  let total = 0;

  try {
    const { getUser } = getKindeServerSession();
    user = await getUser();

    if (user?.id) {
      cart = await redis.get(`cart-${user.id}`);
      total = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    }
  } catch (error) {
    console.error("Navbar error:", error);
    // Don't throw the error - let the navbar render without cart data
  }

  return (
    <div className="border-b">
      <nav className="max-w-[1480px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <Link href={"/"}>
            <h1 className="text-blue-400 text-2xl">
              Kids<span className="text-pink-400">Store</span>
            </h1>
          </Link>
          <div className="hidden md:flex">
            <NavbarLinks />
          </div>
        </div>
        <div className="flex items-center">
          {user ? (
            <>
              <Link
                href={"/cart"}
                className="group p-2 flex items-center mr-2 relative"
              >
                <ShoppingCart className="h-7 w-7 text-slate-400 group-hover:text-slate-500" />
                <span className="-top-1.5 rounded-full bg-red-500 w-5 h-5 text-center text-white right-0 text-sm font-medium group-hover:bg-red-600 absolute">
                  {total}
                </span>
              </Link>
              <UserDrodown
                name={`${user.given_name} ${user.family_name}`}
                userImage={
                  user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
                }
                email={user.email as string}
              />
            </>
          ) : (
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
              <LoginLink className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Sign in
              </LoginLink>

              <span className="h-6 w-px bg-gray-200"></span>

              <RegisterLink className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Create Account
              </RegisterLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
