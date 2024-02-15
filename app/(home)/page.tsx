import { format } from 'date-fns'
import Header from '../_components/header'
import { ptBR } from 'date-fns/locale'
import Search from './_components/search'
import BookingItem from '../_components/booking-item'
import BarbershopItem from './_components/barbershop-item'
import { db } from '../_lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, booking] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findFirst({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date()
            }
          },
          include: {
            service: true,
            barbershop: true
          }
        })
      : Promise.resolve([])
  ])

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá Edimilson!</h2>
        <p className="capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-400 uppercase mb-3">
          Último Agendamentos
        </h2>

        {/* TODO: Chamar o ultimo agendamento no banco */}
        <div className="">
          {booking && <BookingItem booking={booking as any} />}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-sm px-5 font-bold text-gray-400 uppercase mb-3">
          Recomendados
        </h2>

        <div className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="px-4">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-sm px-5 font-bold text-gray-400 uppercase mb-3">
          Populares
        </h2>

        <div className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="px-4">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
