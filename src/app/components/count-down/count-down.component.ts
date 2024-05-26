import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReplaySubject, Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {
  @Input()
  endDate: Date | null = null;


  private start = moment(new Date());
  private end: moment.Moment = moment(new Date());


  month: number = 0;
  week: number = 0;
  day: number = 0;
  hour: number = 0;
  minute: number = 0;
  sec: number = 0;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  
  constructor() { }
  
  ngOnInit(): void {
    this.end = moment(this.endDate);

    timer(1000, 1000)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(() => this.setCountVariables());
  }
  
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private setCountVariables(): void{
    this.start = moment(new Date());
    const duration = moment.duration(this.end.diff(this.start));
  
    this.month = Math.floor(duration.asMonths());
    this.week = Math.floor(duration.subtract(moment.duration(this.month, 'months')).asWeeks());
    this.day = Math.floor(duration.subtract(moment.duration(this.week, 'weeks')).asDays());
    this.hour = Math.floor(duration.subtract(moment.duration(this.day, 'days')).asHours());
    this.minute = Math.floor(duration.subtract(moment.duration(this.hour, 'hours')).asMinutes());
    this.sec = Math.floor(duration.subtract(moment.duration(this.minute, 'minutes')).asSeconds());
  }
}
