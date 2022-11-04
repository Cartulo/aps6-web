export enum NavigationDateType {
    Year = 0,
    Month = 1,
    Week = 2,
    Day = 3,
    Custom = 4,
    Total = 5
}

export class NavigationDateTypeDesc {
    static getDescription(type: NavigationDateType): string {
        switch (type) {
            case NavigationDateType.Year:
                return 'Anual';
            case NavigationDateType.Month:
                return 'Mensal';
            case NavigationDateType.Week:
                return 'Semanal';
            case NavigationDateType.Day:
                return 'Diário';
            case NavigationDateType.Custom:
                return 'Personalizado';
            case NavigationDateType.Total:
                return 'Total';
        }
    }
}
