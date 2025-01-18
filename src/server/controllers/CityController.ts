import type { Request, Response, NextFunction } from 'express'
import prisma from '../../api/db'
import { ApiError } from '../utils/ApiError'

export class CityController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const cities = await prisma.city.findMany({
                orderBy: { name: 'asc' }
            })
            res.json(cities)
        } catch (error) {
            next(error)
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const city = await prisma.city.findUnique({
                where: { id: Number(req.params.id) }
            })
            if (!city) {
                throw new ApiError(404, 'Şehir bulunamadı')
            }
            res.json(city)
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const city = await prisma.city.create({
                data: req.body
            })
            res.status(201).json(city)
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const { name, description, isActive } = req.body

            const existingCity = await prisma.city.findUnique({
                where: { id }
            })

            if (!existingCity) {
                throw new ApiError(404, 'Şehir bulunamadı')
            }

            const updatedCity = await prisma.city.update({
                where: { id },
                data: {
                    name,
                    description,
                    isActive
                }
            })

            res.json(updatedCity)
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)

            const existingCity = await prisma.city.findUnique({
                where: { id }
            })

            if (!existingCity) {
                throw new ApiError(404, 'Silinecek şehir bulunamadı')
            }

            await prisma.city.delete({
                where: { id }
            })

            res.status(204).end()
        } catch (error) {
            if (error instanceof ApiError) {
                next(error)
            } else {
                next(new ApiError(500, 'Şehir silinirken bir hata oluştu'))
            }
        }
    }
}
