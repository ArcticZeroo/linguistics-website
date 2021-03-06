import { splitIpaIntoSymbols } from '../ipa/util';

export enum Distribution {
    overlapping,
    complementary
}

// Use this for passing unprocessed params to methods
export interface IEnvironmentParams {
    sources: string[];
    symbols: string[];
}

export type EnvironmentMap = { [symbol: string]: { [symbol: string]: boolean } };
export type EnvironmentSymbolsDataMap = { [symbol: string]: IEnvironmentData };

// Use this for processed params, no knowledge of original sources/symbols is known here
export interface IEnvironmentData {
    leftToRight: EnvironmentMap;
    rightToLeft: EnvironmentMap;
}

export interface IDistributionData {
    left: Distribution;
    right: Distribution;
    overall: Distribution;
}

export const wordBoundaryIdentifier = '#';

function getEnvironmentIdentifier(symbols: string[], index: number) {
    if (index < 0 || index >= symbols.length) {
        return wordBoundaryIdentifier;
    }

    return symbols[index];
}

export function findEnvironments({ sources, symbols }: IEnvironmentParams): EnvironmentSymbolsDataMap {
    const dataMap = {};

    for (const symbol of symbols) {
        dataMap[symbol] = { leftToRight: {}, rightToLeft: {} };
    }

    for (const source of sources) {
        const ipaSymbolsInSource = splitIpaIntoSymbols(source);

        for (const symbol of symbols) {
            const data: IEnvironmentData = dataMap[symbol];

            let i = 0;
            while (i < source.length && (i = source.indexOf(symbol, i)) !== -1) {
                const endIndex = i + symbol.length;

                const leftSymbol = getEnvironmentIdentifier(ipaSymbolsInSource, i - 1);
                const rightSymbol = getEnvironmentIdentifier(ipaSymbolsInSource, endIndex);

                if (!data.leftToRight[leftSymbol]) {
                    data.leftToRight[leftSymbol] = {};
                }

                if (!data.rightToLeft[rightSymbol]) {
                    data.rightToLeft[rightSymbol] = {};
                }

                data.leftToRight[leftSymbol][rightSymbol] = true;
                data.rightToLeft[rightSymbol][leftSymbol] = true;

                ++i;
            }
        }
    }

    return dataMap;
}

function findSideDistribution(dataA: EnvironmentMap, dataB: EnvironmentMap) {
    for (const symbolA of Object.keys(dataA)) {
        if (dataB.hasOwnProperty(symbolA)) {
            return Distribution.overlapping;
        }
    }

    return Distribution.complementary;
}

function getOverallDistribution(left: Distribution, right: Distribution) {
    if (left === Distribution.complementary || right === Distribution.complementary) {
        return Distribution.complementary;
    }

    return Distribution.overlapping;
}

export function findPairDistribution(dataA: IEnvironmentData, dataB: IEnvironmentData): IDistributionData {
    const leftDistribution = findSideDistribution(dataA.leftToRight, dataB.leftToRight);
    const rightDistribution = findSideDistribution(dataA.rightToLeft, dataB.rightToLeft);

    return {
        left: leftDistribution,
        right: rightDistribution,
        overall: getOverallDistribution(leftDistribution, rightDistribution)
    };
}