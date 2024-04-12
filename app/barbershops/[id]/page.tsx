import { db } from '@/app/_lib/prisma'
import BarbershopInfo from './_components/barbershop-info'
import ServiceItem from './_components/service-item'
import { Button } from '@/app/_components/ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/_lib/auth'
import Header from '@/app/_components/header'
import AboutUs from './_components/about-us'

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({
  params
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions)

  if (!params.id) {
    // TODO: redirecionar para home page
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })

  if (!barbershop) {
    // TODO: redirecionar para home page
    return null
  }

  return (
    <div>
      <Header />
      <div className="container mt-10">
        <div className="lg:flex lg:gap-10">
          <div className="lg:min-w-[758px]">
            <BarbershopInfo barbershop={barbershop} />

            <div className="flex gap-3 px-5 py-6">
              <Button>Serviços</Button>
              <Button variant="outline">Informações</Button>
            </div>

            <div className="flex flex-col gap-4 px-5 mb-10">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  isAuthenticated={!!session?.user}
                  barbershop={barbershop}
                />
              ))}
            </div>
          </div>

          <div>
            <AboutUs barbershop={barbershop}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopDetailsPage
