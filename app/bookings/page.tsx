import { getServerSession } from 'next-auth'
import Header from '../_components/header'
import { redirect } from 'next/navigation'
import { db } from '@/app/_lib/prisma'
import BookingItem from '../_components/booking-item'
import { authOptions } from '../_lib/auth'
import AboutUs from '../barbershops/[id]/_components/about-us'

const BookingsPage = async () => {
  // Recuperar a sessão do usuário (ver se ele está logado ou não)
  const session = await getServerSession(authOptions)

  // Se não estiver logado, redirecionar para tela de login ou Home
  if (!session?.user) {
    return redirect('/')
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      }
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      }
    })
  ])

  return (
    <>
      <Header />
      <div className="container lg:mt-16">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div className="flex items-center gap-10">
          <div className="px-5 py-6 w-full">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
                  Confirmados
                </h2>

                <div className="flex flex-col gap-3">
                  {confirmedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </>
            )}

            {finishedBookings.length > 0 && (
              <>
                <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
                  Finalizados
                </h2>

                <div className="flex flex-col gap-3">
                  {finishedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            {/* <AboutUs barbershop={barbershop}/> */}
            {confirmedBookings.map((barbershop) => (
              <AboutUs key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingsPage
