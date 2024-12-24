"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "მთავარი",
    href: "/",
  },
  {
    id: 1,
    name: "ყველა პროდუქცია",
    href: "/products/all",
  },
  {
    id: 2,
    name: "ბიჭის ტანსაცმელი",
    href: "/products/boys",
  },
  {
    id: 3,
    name: "გოგოს ტანსაცმელი",
    href: "/products/girls",
  },
];

export function NavbarLinks() {
  const location = usePathname();

  return (
    <div className="flex flex-col items-start text-xs md:flex-row justify-center md:items-center gap-x-2 ml-10">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-30",
              "px-3 py-2 rounded-sm group font-medium"
              
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
