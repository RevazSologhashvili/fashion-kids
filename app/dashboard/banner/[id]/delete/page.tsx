import { deleteBanner } from "@/app/actions";
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


export default async function DeleteBannerRoute({
  params,
}: {
  params: { id: string } 
}) {
  const { id } = params;

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you sure ?</CardTitle>
          <CardDescription>
            Once you delete this Banner it wont be restored
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-between">
          <Button variant={"secondary"} asChild>
            <Link href={"/dashboard/banner"}>Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={id} />
            <SubmitButtons text="Permanently Delete" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
