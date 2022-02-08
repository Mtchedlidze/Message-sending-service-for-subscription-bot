import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { HttpModule } from '@nestjs/axios'
import { ScheduleModule } from '@nestjs/schedule'
import { DatabaseModule } from './database/database.module'
import { MessageProviderModule } from './message-provider/message-provider.module'
import { MomentModule } from '@ccmos/nestjs-moment'

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MessageProviderModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    MomentModule.forRoot({
      tz: 'Europe/London',
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
