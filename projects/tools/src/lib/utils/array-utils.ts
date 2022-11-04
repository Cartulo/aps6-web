export class ArrayUtils {
    public static distinct(values: string[]): string[] {
        if (values === undefined || values === null || values.length === 0) {
            return [];
        }

        return values.filter((x, i, a) => a.indexOf(x) === i);
    }

    public static groupBy(list, keyFunction): any {
        const groups = {};

        list.forEach(el => {
            const key = keyFunction(el);
            if (key in groups === false) {
                groups[key] = [];
            }
            groups[key].push(el);
        });

        return groups;
    }
}
