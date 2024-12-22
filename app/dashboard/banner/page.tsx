import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData() {
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })
    return data;
}

export default async function BannerRoute() {

    const data = await getData();

    return( 
        <>
        <div className="flex items-center justify-end">
            <Button asChild className="flex gap-x-2">
            <Link href={'/dashboard/banner/create'}>
                <PlusSquare className="w-5 h-5"/>
                <span>Add Banner</span>
            </Link>
            </Button>
        </div>

        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Banners</CardTitle>
                <CardDescription>Manage your banners</CardDescription>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-end">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                       {data.map((item)=> (
                         <TableRow key={item.id}>
                         <TableCell>
                            <Image src={item.imageString} width={128} height={128} alt={item.title} className="rounded-md border object-contain w-32 h-32"/>
                         </TableCell>
                     <TableCell>{item.title}</TableCell>

                     <TableCell className="text-end">
                                 <DropdownMenu>
                                     <DropdownMenuTrigger asChild>
                                         <Button size={'icon'} variant={'ghost'}>
                                             <MoreHorizontal className="!w-5 !h-5"/>
                                         </Button>
                                     </DropdownMenuTrigger>
                                     <DropdownMenuContent align="end">
                                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                         <DropdownMenuSeparator />
                                         <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-500 hover:text-white" asChild>
                                             <Link href={`/dashboard/banner/${item.id}/delete`}>Delete</Link>
                                         </DropdownMenuItem>
                                     </DropdownMenuContent>
                                 </DropdownMenu>
                             </TableCell>
                     </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </>
    )
}