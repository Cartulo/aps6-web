import {Injectable} from '@angular/core';

import {AutoUnsubscribe} from '../utils/auto-unsubscribe';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Injectable({providedIn: 'root'})
@AutoUnsubscribe()
export class DateService {
    constructor() {
    }

    public now(): Date {
        return DateUtils.now();
    }

    public today(finalDay = false): Date {
        return DateUtils.today(finalDay);
    }

    public toDate(value: any): Date {
        return DateUtils.toDate(value);
    }

    public toDateTime(value: any): Date {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        return moment(value).toDate();
    }

    public addDays(date: Date, days: number): Date {
        if (days === undefined || days === null) {
            days = 0;
        }

        return moment(date).add(days, 'day').toDate();
    }

    public addMonths(date: Date, months: number): Date {
        return DateUtils.addMonths(date, months);
    }

    public addYears(date: Date, years: number): Date {
        if (years === undefined || years === null) {
            years = 0;
        }

        return moment(date).add(years, 'year').toDate();
    }

    public format(value: Date): string {
        return DateFormat.format(value);
    }

    public formatDateDefault(value: Date): string {
        return DateFormat.formatDateDefault(value);
    }

    public formatDateName(value: Date): string {
        return DateFormat.formatDateName(value);
    }

    public formatShortDate(value: Date): string {
        return DateFormat.formatShortDate(value);
    }

    public formatYear(value: Date): string {
        return DateFormat.formatYear(value);
    }

    public formatMonthAndYearDate(value: Date): string {
        return DateFormat.formatMonthAndYearDate(value);
    }

    public formatToFile(value: Date): string {
        return DateFormat.formatToFile(value);
    }

    public getInitialMonth(date?: Date): Date {
        if (date === null || date === undefined) {
            date = this.now();
        }

        return moment(date).startOf('month').toDate();
    }

    public getFinalMonth(date?: Date): Date {
        if (date === null || date === undefined) {
            date = this.now();
        }

        return moment(date).endOf('month').hours(0).minutes(0).seconds(0).milliseconds(0).toDate();
    }

    public getInitialMonthOfYear(year?: number): Date {
        if (year === null || year === undefined) {
            year = moment().year();
        }

        return moment([year]).startOf('year').toDate();
    }

    public getFinalMonthOfYear(year?: number): Date {
        if (year === null || year === undefined) {
            year = moment().year();
        }

        return moment([year]).endOf('year').hours(0).minutes(0).seconds(0).milliseconds(0).toDate();
    }

    public getWeekNumber(value: Date): {year: number, week: number} {
        const date = value === null || value === undefined ? moment() : moment(value);
        return {year: date.year(), week: date.week()};
    }

    public getDateRangeOfWeek(week, year): {firstDate: Date, lastDate: Date} {
        return {
            firstDate: moment().day(1).year(year).week(week).startOf('day').toDate(),
            lastDate: moment().day(0).year(year).week(week + 1).startOf('day').toDate()
        };
    }

    public getLocale() {
        return {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qui', 'Se', 'Sa'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        };
    }
}

export class DateUtils {
    public static now(): Date {
        return moment().toDate();
    }

    public static today(finalDay = false): Date {
        return finalDay
            ? moment().endOf('day').toDate()
            : moment().startOf('day').toDate();
    }

    public static toDate(value: any): Date {
        if (value === null || value === undefined || value === '') {
            return null;
        }

        return moment(value).startOf('day').toDate();
    }

    public static addDays(date: Date, days: number): Date {
        if (days === undefined || days === null) {
            days = 0;
        }

        return moment(date).add(days, 'day').toDate();
    }

    public static fromExcel(serial: any): Date {
        if (serial === null || serial === undefined || serial === '') {
            return null;
        }

        const data = new Date(Date.UTC(0, 0, serial));
        return moment()
            .year(data.getFullYear())
            .month(data.getMonth())
            .date(data.getDate())
            .startOf('day')
            .toDate();
    }

    public static formatDateDefault(value: Date): string {
        return DateFormat.formatDateDefault(value);
    }

    public static expired(value: any, quantity: number): boolean {
        const now = this.now();
        return moment(value).diff(now, 'minutes') <= quantity;
    }

    public static getInitialMonth(date?: Date): Date {
        if (date === null || date === undefined) {
            date = this.now();
        }

        return moment(date).startOf('month').toDate();
    }

    public static getFinalMonth(date?: Date): Date {
        if (date === null || date === undefined) {
            date = this.now();
        }

        return moment(date).endOf('month').hours(0).minutes(0).seconds(0).milliseconds(0).toDate();
    }

    public static getYear(): number {
        return moment().year();
    }

    public static addMonths(date: Date, months: number): Date {
        if (months === undefined || months === null) {
            months = 0;
        }

        return moment(date).add(months, 'month').toDate();
    }

    public static getLocale() {
        return {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qui', 'Se', 'Sa'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar'
        };
    }
}

export class DateFormat {
    public static format(value: Date): string {
        if (value === undefined || value === null) {
            return null;
        }

        return moment(value).format('YYYY-MM-DD');
    }

    public static formatDateDefault(value: Date): string {
        if (value == null || value === undefined) {
            return null;
        }

        return moment(value).format('DD/MM/YYYY');
    }

    public static formatDateName(value: Date): string {
        if (value == null || value === undefined) {
            return null;
        }

        return moment(value).format('dddd');
    }

    public static formatShortDate(value: Date): string {
        const date = value == null || value === undefined
            ? moment().startOf('day')
            : moment(value).startOf('day');

        return date.format('DD/MM');
    }

    public static formatYear(value: Date): string {
        if (value === null || value === undefined) {
            return null;
        }

        return moment(value).format('YYYY');
    }

    public static formatMonthAndYearDate(value: Date): string {
        if (value === null || value === undefined) {
            return null;
        }

        return moment(value).format('MMMM/YYYY');
    }

    public static formatMonth(value: Date): string {
        if (value === null || value === undefined) {
            return null;
        }

        return moment(value).format('MMMM');
    }

    public static formatToFile(value: Date): string {
        if (value === null || value === undefined) {
            return null;
        }

        return moment(value).format('YYYY_M_D_HH_mm');
    }

    public static dateToServer(value: Date): string {
        if (value === undefined || value === null) {
            return null;
        }

        return moment(value).format('YYYY-MM-DD');
    }
}
