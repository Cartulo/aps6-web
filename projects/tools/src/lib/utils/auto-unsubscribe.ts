export function AutoUnsubscribe(blackList = []) {

    return constructor => {
        const original = constructor.prototype.ngOnDestroy;
        blackList.push('blockUI');

        constructor.prototype.ngOnDestroy = function() {
            for (const prop in this) {
                if (this.hasOwnProperty(prop)) {
                    const property = this[prop];
                    if (!blackList.includes(prop)) {
                        if (property && (typeof property.unsubscribe === 'function')) {
                            property.unsubscribe();
                        }
                    }
                }
            }
            // tslint:disable-next-line:no-unused-expression
            original && typeof original === 'function' && original.apply(this, arguments);
        };
    };

}
