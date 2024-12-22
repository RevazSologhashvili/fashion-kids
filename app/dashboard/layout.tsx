import React from 'react'
import { DashboardNavigation } from '../components/dashboard/DasboardNavigation'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CircleUser, MenuIcon } from 'lucide-react'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image'

export default async function layout({ children }: { children: React.ReactNode }) {

    const {getUser} = getKindeServerSession();

    const user = await getUser();

    if(!user || user.email !== 'rezosologa@gmail.com') {
        return redirect("/")  // add page to show no access  sign in or return to home page
    }
    
    return (
        <div className='flex flex-col w-full w-max-7xl  mx-auto px-4 sm:px-6 lg:px-8'>
            <header className='sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white'>

                <nav className='hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
                    <DashboardNavigation />
                </nav>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button className='shrink-0 md:hidden' variant={'outline'} size={'icon'}>
                            <MenuIcon className='h-5 w-5 ' />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={'left'}>
                        <SheetHeader>
                            <SheetTitle className='text-3xl border-b '>Navigation</SheetTitle>
                        </SheetHeader>
                            <nav className='flex flex-col gap-6 text-lg font-medium mt-10'>
                                <DashboardNavigation />
                            </nav>
                    </SheetContent>
                </Sheet>

                <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button variant={'secondary'} size={'icon'} className='rounded-full '>
                            {!user ?   <CircleUser /> : 
                                        <Avatar><Image src={user?.picture || 'https://placehold.co/40x40'} width={50} height={50} alt='profile picture'/></Avatar>
                            }
                          
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <LogoutLink>Logout</LogoutLink>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className='my-5'>{children}</main>
        </div>
    )
}
