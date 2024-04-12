import Footer from '@/app/_components/footer'
import { Avatar, AvatarImage } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Barbershop } from '@prisma/client'
import { Smartphone } from 'lucide-react'
import Image from 'next/image'

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const AboutUs = ({ barbershop }: BarbershopInfoProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-end bg-map-background rounded-lg w-full min-h-[180px] p-4">
          <Card className="w-full">
            <CardContent>
              <div className="flex gap-4 items-center space-y-4">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3>{barbershop.name}</h3>
                  <p>{barbershop.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5">
          <h2 className="uppercase font-bold">Sobre nós</h2>
          <p className="mt-5 text-justify">
            Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
            equipe de mestres barbeiros transforma cortes de cabelo e barbas em
            obras de arte. Em um ambiente acolhedor, promovemos confiança,
            estilo e uma comunidade unida.
          </p>

          <div className="mt-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Smartphone />
                <span>(11) 9999-9999</span>
              </div>
              <Button variant="outline">copiar</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Smartphone />
                <span>(11) 9999-9999</span>
              </div>
              <Button variant="outline">copiar</Button>
            </div>
          </div>
        </div>

        <div className="py-5 border-t border-solid border-secondary mt-5">
          <div className="flex justify-between">
            <span className="text-gray-400 mb-3">Segunda</span>
            <span>Fechado</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 mb-3">Terça</span>
            <span>09:00 - 21:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 mb-3">Quarta</span>
            <span>09:00 - 21:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 mb-3">Quinta</span>
            <span>09:00 - 21:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 mb-3">Sexta</span>
            <span>09:00 - 21:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 mb-3">Sabado</span>
            <span>08:00 - 17:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 mb-3">Domingo</span>
            <span>Fechado</span>
          </div>
        </div>

        <div className="border-t border-solid border-secondary">
          <div className="flex justify-between py-10">
            <span>Em parceria com</span>
            <Image src="/logo.png" alt="FSW Barber" width={120} height={22} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AboutUs
