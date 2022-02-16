import { Injectable } from '@nestjs/common'
import * as moment from 'moment-timezone'

@Injectable()
export class TimeService {
  moment = moment

  formatTime(time: Date) {
    return this.moment(time, 'HHmm').format('HH:mm')
  }
}
