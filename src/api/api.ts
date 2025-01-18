import type { City } from '@/models/City'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

type EntityType = 'cities'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getAll<T>(entity: EntityType): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}/${entity}`)
    if (!response.ok) throw new Error(`${entity} yüklenemedi`)
    return response.json()
  }

  async getById<T>(entity: EntityType, id: number): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${entity}/${id}`)
    if (!response.ok) throw new Error(`${entity} bulunamadı`)
    return response.json()
  }

  async create<T>(entity: EntityType, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${entity}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`${entity} eklenemedi`)
    return response.json()
  }

  async update<T>(entity: EntityType, id: number, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${entity}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`${entity} güncellenemedi`)
    return response.json()
  }

  async delete(entity: EntityType, id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${entity}/${id}`, {
      method: 'DELETE'
    })

    if (response.status === 204) {
      return
    }

    if (!response.ok) {
      throw new Error(`${entity} silinemedi`)
    }
  }
}

export const api = new ApiService(API_URL)

