import { BaseEntity } from './BaseEntity'

export class City extends BaseEntity {
  name: string


  constructor(data: Partial<City>) {
    super(data)
    this.name = data.name || ''

  }
}
