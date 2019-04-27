import { IResolvedDependency } from './DependencyResolver';

export enum MorphemeType {
    prefix = 'prefix',
    suffix = 'suffix',
    infix = 'infix',
    circumfix = 'circumfix',
    root = 'root',
    unknown = 'unknown'
}

function formatMorphemePlacement({value, type}: IResolvedDependency) {
    switch (type) {
        case MorphemeType.prefix:
            return `${value}-X`;
        case MorphemeType.suffix:
            return `X-${value}`;
        default:
            return `value`
    }
}

export function formatMorpheme({value, type}: IResolvedDependency) {
    return `${formatMorphemePlacement({value, type})} (${type})`
}