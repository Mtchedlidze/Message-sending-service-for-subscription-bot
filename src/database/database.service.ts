import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface'
@Injectable()
export class DatabaseService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findUsers(time: string) {
    return this.userModel.find({ time })
  }
}
