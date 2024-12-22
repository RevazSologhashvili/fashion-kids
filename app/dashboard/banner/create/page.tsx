"use client";
import { createBanner } from "@/app/actions";
import  {SubmitButtons} from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function CreateBannerRoute() {
  const [image, setImages] = useState<string>("");
  const [lastResult, action] = useActionState(createBanner, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} action={action} onSubmit={form.onSubmit}>
      <div className="flex items-center gap-x-4 mt-6">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={"/dashboard/banner"}>
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Create your banner right here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                type="text"
                placeholder="Banner title"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input type="hidden" value={image} name={fields.image.name} key={fields.image.key} defaultValue={fields.image.initialValue} />
              {image ? (
                <Image className="w-[300px] h-[300px] object-contain border rounded-md"
                  src={image}
                  width={300}
                  height={300}
                  alt={`Banner Image ${fields.title.value}`}
                />
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImages(res[0].url);
                  }}
                  onUploadError={() => {
                    alert("something went wrong");
                  }}
                  endpoint={"bannerImageRoute"}
                />
              )}
              <p className="text-red-500">{fields.image.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButtons text="Create Banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
