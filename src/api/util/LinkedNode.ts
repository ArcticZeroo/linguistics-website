export default class LinkedNode<T> {
    value: T;
    next?: LinkedNode<T>;
    previous?: LinkedNode<T>;

    constructor(value: T) {
        this.value = value;
    }
}