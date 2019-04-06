export default abstract class StringUtil {
    static getPluralizedString(base: string, count: number) {
        return count === 1 ? base : `${base}s`;
    }
}