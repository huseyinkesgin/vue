import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'

export class CityValidator {
    static validate(req: Request, res: Response, next: NextFunction) {
        const { code, name } = req.body
        const errors: string[] = []

        if (req.method === 'POST') {
            if (!code) {
                errors.push('Kod alanı zorunludur')
            }
            if (!name) {
                errors.push('İsim alanı zorunludur')
            }
        }

        if (code !== undefined) {
            if (code.length < 2 || code.length > 10) {
                errors.push('Kod 2-10 karakter arasında olmalıdır')
            }
        }

        if (name !== undefined) {
            if (name.length < 2 || name.length > 50) {
                errors.push('İsim 2-50 karakter arasında olmalıdır')
            }
        }

        if (errors.length > 0) {
            throw new ApiError(400, errors.join(', '))
        }

        next()
    }
}
