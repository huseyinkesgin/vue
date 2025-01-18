import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { Prisma } from '@prisma/client'

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(error)

    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            error: error.message
        })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            return res.status(409).json({
                error: 'Bu kayıt zaten mevcut'
            })
        }
    }

    res.status(500).json({
        error: 'Sunucu hatası'
    })
}
