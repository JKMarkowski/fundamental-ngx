import { Component } from '@angular/core';

@Component({
selector: 'fd-date-picker-single-example',
template: ` <fd-date-picker [type]="'single'" [(ngModel)]="selectedDay"></fd-date-picker>
            <br/>
            <div>Selected Date: {{selectedDay.date ? selectedDay.date.toDateString() : 'null'}}</div>
            <br/>
            <fd-date-picker [type]="'single'" [(ngModel)]="selectedDayEnd"></fd-date-picker>
            <div>Selected Date: {{selectedDayEnd.date ? selectedDayEnd.date.toDateString() : 'null'}}</div>
            <div>{{date}}</div>`
})
export class DatePickerSingleExampleComponent {

    selectedDay = {
        date: new Date()
    };

    selectedDayEnd = {
        date: null
    };

    public get date() {
        return this.selectedDayEnd.date
    }

}
