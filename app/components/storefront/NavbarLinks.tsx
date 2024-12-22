"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All Products",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Boys",
    href: "/products/boys",
  },
  {
    id: 3,
    name: "Girls",
    href: "/products/girls",
  },
];

export function NavbarLinks() {
  const location = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center gap-x-2 ml-10">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-30",
              "px-2 py-1 rounded-sm group font-medium"
              
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
