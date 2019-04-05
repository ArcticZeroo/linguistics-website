export default class Counter<T> {
    private readonly _map: Map<T, number> = new Map();

    get(key: T): number {
        return this._map.get(key) || 0;
    }

    set(key: T, count: number): void {
        this._map.set(key, count);
    }

    increment(key: T): void {
        this.set(key, this.get(key) + 1);
    }

    decrement(key: T): void {
        this.set(key, Math.max(0, this.get(key) - 1));
    }

    reset(): void;
    reset(key: T): void;
    reset(key?: T): void {
        if (key == null) {
            this._map.clear();
            return;
        }

        this._map.delete(key);
    }
}