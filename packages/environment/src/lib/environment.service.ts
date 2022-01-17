import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  public get<TType>(key: string): TType {
    const value = this.configService.get<TType>(key)

    if (typeof value === 'undefined') {
      throw new Error(`Environment value ${key} must be set.`)
    }

    return value
  }
}
