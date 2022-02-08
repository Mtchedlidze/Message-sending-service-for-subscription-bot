import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DatabaseService } from './database.service'
import { UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
