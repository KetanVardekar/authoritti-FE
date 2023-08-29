import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormatWithTimeZone' })
export class DateFormatWithTimeZonePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {

  }

  transform(input: any, type: any) {

    if (input) {
      let d = new Date(input);
      let startDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
      let endDate = moment(input).format('YYYY-MM-DD');
      let currentDate = moment(input).format('YYYY-MM-DD');
      let date;
      let presentDate = moment().format('YYYY-MM-DD');
      if (type == "date") {

        let finaldate;
        if (presentDate == currentDate) {
          finaldate = 'Today';
          return finaldate;
        } else if (currentDate >= startDate && currentDate <= endDate) {
          date = new DatePipe('en-US').transform(d, 'EEEE');
          finaldate = date;
          return finaldate;
        }
        else {
          let d = new Date(input);
          // d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
          finaldate = this.datePipe.transform(d, "M/d/yy");
          return finaldate;
        }
      }
      else if (type == "dateTime") {

        let finaldate;
        if (presentDate == currentDate) {
          date = new DatePipe('en-US').transform(d, 'h:mm a');
          finaldate = 'Today' + ' ' + date;
          return finaldate;
        }
        else {
          let d = new Date(input);
          // d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );
          finaldate = this.datePipe.transform(d, "M/d/yy, h:mm a");
          return finaldate;
        }

      } else if (type == 'overview') {
        return moment(input).format('MMMM D,YYYY');
      } else if (type == 'dateInvoice') {
        return moment(input).format('MM-DD-YYYY');
      }
      else {
        return input;
      }
    }
    else {
      return "";
    }

  }
}
