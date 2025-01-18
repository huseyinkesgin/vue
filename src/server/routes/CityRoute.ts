import { Router } from 'express'
import { CityController } from '../controllers/CityController'

const router = Router()
const cityController = new CityController()

router.get('/', cityController.getAll)
router.get('/:id', cityController.getById)
router.post('/', cityController.create)
router.put('/:id', cityController.update)
router.delete('/:id', cityController.delete)

export default router
