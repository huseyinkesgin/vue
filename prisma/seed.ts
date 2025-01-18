import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Örnek şehirler
    const cities = [
        {
            code: 'IST',
            name: 'İstanbul',
            description: 'Türkiye\'nin en büyük şehri',
            isActive: true
        },
        {
            code: 'ANK',
            name: 'Ankara',
            description: 'Türkiye\'nin başkenti',
            isActive: true
        },
        {
            code: 'IZM',
            name: 'İzmir',
            description: 'Ege\'nin incisi',
            isActive: true
        }
    ]

    for (const city of cities) {
        await prisma.city.upsert({
            where: { code: city.code },
            update: {},
            create: city
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
