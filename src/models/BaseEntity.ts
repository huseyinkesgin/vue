export abstract class BaseEntity {
    id: number
    code: string
    isActive: boolean
    description?: string
    createdAt: Date
    updatedAt: Date

    constructor(data: Partial<BaseEntity>) {
        this.id = data.id || 0
        this.code = data.code || ''
        this.isActive = data.isActive ?? true
        this.description = data.description
        this.createdAt = data.createdAt || new Date()
        this.updatedAt = data.updatedAt || new Date()
    }
}
