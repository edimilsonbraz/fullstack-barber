import BarbershopItem from '../(home)/_components/barbershop-item'
import Header from '../_components/header'
import { db } from '../_lib/prisma'

interface BarbershopsPageProps {
  searchParams: {
    search: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  })

  return (
    <>
      <Header />

      <div className="p-5 py-6">
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultado para &quot;{searchParams.search}&quot;
          <div className="grid gap-4 grid-cols-2 mt-3">
            {barbershops.map((barbershop) => (
              <div key={barbershop.id} className="w-full">
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        </h1>
      </div>
    </>
  )
}

export default BarbershopsPage
