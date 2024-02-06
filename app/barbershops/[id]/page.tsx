import { db } from '@/app/_lib/prisma'
import BarbershopInfo from './_components/barbershop-info'
import ServiceItem from './_components/service-item'
import { Button } from '@/app/_components/ui/button'

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

const BarbershopDetailsPage = async ({
  params
}: BarbershopDetailsPageProps) => {
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
      <BarbershopInfo barbershop={barbershop} />

      <div className='flex gap-3 px-5 py-6'>
        <Button>Serviços</Button>
        <Button variant="outline">Informações</Button>
      </div>

      <div className='flex flex-col gap-4 px-5'>
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopDetailsPage
