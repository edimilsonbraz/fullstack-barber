'use client'

import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { CalendarIcon, MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import SideMenu from './side-menu'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from './ui/avatar'

const Header = () => {
  const { data } = useSession()

  return (
    <header>
      <Card className="">
        <CardContent className="p-5 flex flex-row  justify-between items-center lg:container">
          <Link href={'/'}>
            <Image src="/logo.png" alt="FSW Barber" width={120} height={22} />
          </Link>

          {data?.user && (
            <div className="flex gap-6">
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/bookings">
                  <CalendarIcon size={18} className="mr-2" />
                  Agendamentos
                </Link>
              </Button>

              <div className="flex items-center gap-3 ">
                <Avatar>
                  <AvatarImage src={data.user?.image ?? ''} />
                </Avatar>

                <h2 className="font-bold">{data.user?.name}</h2>
              </div>
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
