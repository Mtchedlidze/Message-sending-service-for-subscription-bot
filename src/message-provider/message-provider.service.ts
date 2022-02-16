import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { map, lastValueFrom } from 'rxjs'
import { DatabaseService } from 'src/database/database.service'
import { TimeService } from 'src/time/time.service'
import { WeatherService } from 'src/weather/weather.service'

process.env.TZ = 'Europe/London'

@Injectable()
export class MessageProvider {
  url: string
  constructor(
    private readonly httpService: HttpService,
    private readonly database: DatabaseService,
    private readonly weatherService: WeatherService,
    private readonly timeService: TimeService,
  ) {
    this.url = process.env.TELEGRAM_API_URL
  }

  private checkUser() {
    const timeNow = this.timeService.formatTime(new Date())

    return this.database.findUsers(timeNow)
  }

  private async sendMessage() {
    const users = await this.checkUser()

    if (users.length > 0) {
      users.map(async (user) => {
        const { location } = user
        const weather = await this.weatherService.getWeather(
          location.longitude,
          location.latitude,
        )

        lastValueFrom(
          this.httpService
            .post(this.url, {
              text: weather,
              chat_id: user.chatID,
              parse_mode: 'HTML',
            })
            .pipe(map((resp) => resp.data)),
        )
      })
    }
  }

  @Cron('* * * * *')
  async handle() {
    await this.sendMessage()
  }
}
