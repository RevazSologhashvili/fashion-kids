/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client"

import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {SubmitButtons} from "../SubmitButtons";
import { useActionState, useState } from "react";
import {  editProduct } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { categories } from "@/app/lib/categories";
import {type $Enums } from "@prisma/client";


interface ItemTypes {
   dataa: { 
    id: string;
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
   }
}

export function EditForm({ dataa }: ItemTypes) {
    const [images, setImages] = useState<string[]>(dataa.images);

    const [lastResult, action] = useActionState(editProduct, undefined);
  
    const [form, fields] = useForm({
      lastResult,
  
      onValidate({ formData }) {
        return parseWithZod(formData, { schema: productSchema });
      },
  
      shouldValidate: "onBlur",
      shouldRevalidate: "onInput",
    });

    const handleDelete = (index: number)=> {
        setImages(images.filter((_, i) => i !== index))
      }

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <input type="hidden" name="productId" value={dataa.id}/>
        <div className="flex items-center gap-4 ">
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href={"/dashboard/products"}>
              <ChevronLeft className="!w-4 !h-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">Editing {dataa.name}</h1>
        </div>
  
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>editing product {dataa.name}</CardTitle>
            <CardDescription>edit below data to update product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  type="text"
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={dataa.name}
                  className="w-full"
                  placeholder="Product Name"
                />
  
                <p className="text-red-500">{fields.name.errors}</p>
              </div>
  
              <div className="flex flex-col gap-3">
                <Label>Description</Label>
                <Textarea
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={dataa.description}
                  cols={6}
                  placeholder="Product Description"
                />
                <p className="text-red-500">{fields.description.errors}</p>
              </div>
  
              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input
                  key={fields.price.key}
                  name={fields.price.name}
                  defaultValue={dataa.price}
                  type="number"
                  placeholder="Product Price"
                />
                <p className="text-red-500">{fields.price.errors}</p>
              </div>
  
              <div className="flex flex-col gap-3">
                <Label>Featured Product</Label>
                <Switch
                  key={fields.isFeatured.key}
                  name={fields.isFeatured.name}
                  defaultChecked={dataa.isFeatured}
                />
                <p className="text-red-500">{fields.isFeatured.errors}</p>
              </div>
  
              <div className="flex flex-col gap-3">
                <Label>Status</Label>
                <Select
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={dataa.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <p className="text-red-500">{fields.status.errors}</p>
              </div>
  
              <div className="flex flex-col gap-3">
                  <Label>Category</Label>
                  <Select key={fields.category.key} name={fields.category.name} defaultValue={dataa.category}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select Category"/>
                      </SelectTrigger>
                      <SelectContent>
                          {categories.map((categorie) => (
                              <SelectItem key={categorie.id} value={categorie.name}>
                                  {categorie.title}
                              </SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                  <p className="text-red-500">{fields.category.errors}</p>
              </div>
  
              <div className="flex flex-col gap-3">
                <Label>Images</Label>
                <input type="hidden" value={images} key={fields.images.key} name={fields.images.name} defaultValue={fields.images.initialValue as any}/>
                {images.length > 0 ? (
                  <div className="flex gap-5">
                    {images.map((img, index: number) => (
                      <div key={index} className="relative w-[150px] h-[150px]">
                        <Image
                          src={img}
                          width={100}
                          height={100}
                          alt="uploaded image for product"
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <button type="button" className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                          <XIcon className="w-3 h-3" 
                          onClick={()=> handleDelete(index)}/>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImages(res.map((r) => r.url));
                    }}
                    onUploadError={(error: unknown) => {
                      const  errorMessage = "An unknown error occurred";
                      console.error("Full upload error:", error);
                      alert(`Upload failed: ${errorMessage}`);
                    }}
                  />
                )}
                <p className="text-red-500">{fields.images.errors}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButtons text="Edit Product"/>
          </CardFooter>
        </Card>
      </form>
    )
}