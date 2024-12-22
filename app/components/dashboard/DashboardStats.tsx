import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, Users2Icon } from "lucide-react";

async function getData() {
  const [user, product, order] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),

    prisma.product.findMany({
      select: {
        id: true,
      },
    }),

    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return { user, product, order };
}

export async function DashboardStats() {
  const { user, product, order } = await getData();

  const totalAmount = order.reduce((accumulator, currentVal) => {
    return accumulator + currentVal.amount;
  }, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between pb-3">
            Total Revenue
            <DollarSign className="h-6 w-6 text-green-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${new Intl.NumberFormat("ge-KA").format(totalAmount / 100)}
          </p>
          <p className="text-sm text-muted-foreground">Based on 100 Charges.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between pb-3">
            Total Sales
            <ShoppingBag className="h-6 w-6 text-orange-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{order.length}</p>
          <p className="text-sm text-muted-foreground">
            Total Sales on kids clothings.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between pb-3">
            Total Products
            <PartyPopper className="h-6 w-6 text-blue-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{product.length}</p>
          <p className="text-sm text-muted-foreground">
            Total Count of Products
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between pb-3">
            Total Users
            <Users2Icon className="h-6 w-6 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{user.length}</p>
          <p className="text-sm text-muted-foreground">
            Total Registered Users
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
