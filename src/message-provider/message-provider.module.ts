import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { WeatherModule } from 'src/weather/weather.module'
import { MessageProvider } from './message-provider.service'
import { DatabaseModule } from 'src/database/database.module'
import { TimeModule } from 'src/time/time.module'

@Module({
  imports: [
    WeatherModule,
    DatabaseModule,
    TimeModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [MessageProvider],
})
export class MessageProviderModule {}
