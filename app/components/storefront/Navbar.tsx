import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogIn, ShoppingCart, User2, UserPlus } from "lucide-react";
import { UserDrodown } from "./UserDrodown";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

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
    <div className="border-b sticky top-0 z-50">
    <nav className="max-w-[1480px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between bg-white">
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
              initials={`${user.given_name?.[0] ?? ""}${
                user.family_name?.[0] ?? ""
              }`}
              name={`${user.given_name} ${user.family_name}`}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
              email={user.email as string}
            />
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-full"
                >
                  <User2 className="!w-14 !h-14 font-thin text-muted-foreground p-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex items-center justify-center hover:bg-accent rounded-md">
                  <LoginLink className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2">
                    ავტორიზაცია
                  </LoginLink>
                  <LogIn className="text-md font-thin text-muted-foreground" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="h-[1px] bg-muted"/>
                <DropdownMenuItem className="flex items-center justify-center hover:bg-accent rounded-md">
                  <RegisterLink className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  hover:text-accent-foreground h-10 px-4 py-2">
                    რეგისტრაცია
                  </RegisterLink>
                  <UserPlus className="text-md font-thin text-muted-foreground" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  </div>
  );
}
