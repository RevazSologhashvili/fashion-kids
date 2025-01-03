import { deleteProduct } from "@/app/actions";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";


type Params = Promise<{ id: string }>

export default async function DeleteRoute({  params,}: {  params: Params}) {
  const { id } = await params;

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you sure ?</CardTitle>
          <CardDescription>
            Once you delete this product it wont be restored
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-between">
          <Button variant={"secondary"} asChild>
            <Link href={"/dashboard/products"}>Cancel</Link>
          </Button>
          <form action={deleteProduct}>
            <input type="hidden" name="productId" value={id} />
            <SubmitButtons text="Permanently Delete" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
