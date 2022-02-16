import { Module } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { HttpModule } from '@nestjs/axios'
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
