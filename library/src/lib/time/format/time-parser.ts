import { Injectable } from '@angular/core';
import { TimeObject } from '../time-object';

export function TIME_FORMAT_FACTORY() {
    return new TimeFormatParserDefault();
}

/**
 * Abstract class which defines the behaviour of the date format and parser.
 */
@Injectable({
    providedIn: 'root',
    useFactory: TIME_FORMAT_FACTORY
})
export abstract class TimeFormatParser {

    /**
     * Delimiter for the range. This should not show up in the string representation of the time.
     */
    rangeDelimiter: string = ':';

    /**
     * Should take in a string value and return a Time object.
     * @param value String to concert to a time object.
     * @param meridian boolean to
     * @param displaySeconds boolean to .
     */
    abstract parse(value: string, displaySeconds: boolean, meridian?: boolean): TimeObject;

    /**
     * Should take in a time object and return a string representation.
     * @param time String to concert to a time object.
     * @param meridian boolean to .
     */
    abstract format(time: TimeObject, meridian?: boolean): string;
}

/**
 * Default implementation of the DateFormatParser service.
 */
@Injectable()
export class TimeFormatParserDefault extends TimeFormatParser {

    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param timeFromInput String to convert to a time object.
     * @param meridian boolean to .
     * @param displaySeconds boolean to .
     */
    public parse(timeFromInput: string, displaySeconds: boolean = true, meridian?: boolean): TimeObject {
        let time = new TimeObject();
        let regexp;
        if (!meridian) {
            if (displaySeconds) {
                regexp = new RegExp('\^([0-1]?[0-9]|2[0-3])' + this.rangeDelimiter + '([0-5][0-9])(' + this.rangeDelimiter + '[0-5][0-9])\$');
            } else {
                regexp = new RegExp('\^([0-1]?[0-9]|2[0-3])' + this.rangeDelimiter + '([0-5][0-9])\$');
            }
            if (regexp.test(timeFromInput)) {
                const splitString = timeFromInput.split(this.rangeDelimiter);
                time.hour = parseInt(splitString[0], 10);
                time.minute = parseInt(splitString[1], 10);
                if (displaySeconds) {
                    time.second = parseInt(splitString[2], 10);
                }
                return time;
            } else {
                return null;
            }
        } else if (meridian) {
            if (displaySeconds) {
                regexp = new RegExp('\^([0-1]?[0-9]|2[0-3])' + this.rangeDelimiter + '([0-5][0-9])(' + this.rangeDelimiter + '[0-5][0-9]) [APap][mM]\$') ;
            } else {
                regexp = new RegExp('\^([0-1]?[0-9]|2[0-3])' + this.rangeDelimiter + '([0-5][0-9]) [APap][mM]\$');
            }
            if (regexp.test(timeFromInput)) {
                const period = timeFromInput.split(' ')[1];

                const splitString = timeFromInput.split(this.rangeDelimiter);
                time.hour = parseInt(splitString[0], 10);
                if (( period === 'pm' || period === 'PM' ) && time.hour < 12) {
                    time.hour = time.hour + 12;
                } else if ( (period === 'am' || period === 'AM') && time.hour === 12 ) {
                    time.hour = 0;
                }
                time.minute = parseInt(splitString[1], 10);
                if (displaySeconds) {
                    time.second = parseInt(splitString[2], 10);
                }
                return time;
            } else {
                return null;
            }
        }
    }

    /**
     * Takes in a time object and returns the string representation.
     * @param time Time object to convert to a string.
     * @param meridian boolean to
     */
    public format(time: TimeObject, meridian?: boolean): string {
        let formattedHour, formattedMinute, formattedSecond;
        let formattedTime;
        let formattedMeridian;
        if (time.hour !== null) {
            if (meridian) {
                if (time.hour === 0) {
                    formattedHour = 12;
                    formattedMeridian = 'am';
                } else if (time.hour > 12) {
                    formattedHour = time.hour - 12;
                    formattedMeridian = 'pm';
                } else if (time.hour === 12) {
                    formattedHour = 12;
                    formattedMeridian = 'pm';
                } else {
                    formattedHour = time.hour;
                    formattedMeridian = 'am';
                }
            } else {
                formattedHour = time.hour;
            }
        }
        if (time.minute !== null) {
            formattedMinute = time.minute < 10 ? '0' + time.minute : time.minute;
        }

        if (time.second !== null) {
            formattedSecond = time.second < 10 ? '0' + time.second : time.second;
        }
        if (formattedHour || formattedHour === 0) {
            formattedTime = formattedHour;
            if (formattedMinute || formattedMinute === '00') {
                formattedTime = formattedTime + this.rangeDelimiter + formattedMinute;
                if (formattedSecond || formattedSecond === '00') {
                    formattedTime = formattedTime + this.rangeDelimiter + formattedSecond;
                }
            }
        }
        if (formattedMeridian && formattedTime) {
            formattedTime += ' ' + formattedMeridian
        }

        return formattedTime;
    }
}