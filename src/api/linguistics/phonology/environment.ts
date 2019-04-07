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

export interface IDistributionInformation {
    distribution: Distribution;
    minimalPairs?: string[];
}

type EnvironmentMap = { [symbol: string]: { [symbol: string]: boolean } };
export type EnvironmentDataMap = { [symbol: string]: IEnvironmentData };

// Use this for processed params, no knowledge of original sources/symbols is known here
export interface IEnvironmentData {
    leftToRight: EnvironmentMap;
    rightToLeft: EnvironmentMap;
}

export const wordBoundaryIdentifier = '#';

function getEnvironmentIdentifier(symbols: string[], index: number) {
    if (index < 0 || index >= symbols.length) {
        return wordBoundaryIdentifier;
    }

    return symbols[index];
}

export function findEnvironments({ sources, symbols }: IEnvironmentParams): EnvironmentDataMap {
    const dataMap = {};

    for (const symbol of symbols) {
        dataMap[symbol] = { leftToRight: {}, rightToLeft: {} };
    }

    for (const source of sources) {
        const ipaSymbolsInSource = splitIpaIntoSymbols(source);

        for (let i = 0; i < ipaSymbolsInSource.length; ++i) {
            const symbol = ipaSymbolsInSource[i];

            // tracked symbol
            if (!dataMap.hasOwnProperty(symbol)) {
                continue;
            }

            const data: IEnvironmentData = dataMap[symbol];

            const left = getEnvironmentIdentifier(ipaSymbolsInSource, i - 1);
            const right = getEnvironmentIdentifier(ipaSymbolsInSource, i + 1);

            if (!data.leftToRight[left]) {
                data.leftToRight[left] = {};
            }

            if (!data.rightToLeft[right]) {
                data.rightToLeft[right] = {};
            }

            data.leftToRight[left][right] = true;
            data.rightToLeft[right][left] = true;
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

export function findMinimalPairs(dataA: IEnvironmentData, dataB: IEnvironmentData): { [left: string]: string[] } {
    const minimalPairs = {};

    for (const symbolLeft of Object.keys(dataA.leftToRight)) {
        for (const symbolRight of Object.keys(dataA.leftToRight[symbolLeft])) {
            if (dataB.leftToRight[symbolLeft] && dataB.leftToRight[symbolLeft][symbolRight]) {
                if (!minimalPairs[symbolLeft]) {
                   minimalPairs[symbolLeft] = [];
                }

                minimalPairs[symbolLeft].push(symbolRight);
            }
        }
    }

    return minimalPairs;
}

export function findPairDistribution(dataA: IEnvironmentData, dataB: IEnvironmentData) {
    const leftDistribution = findSideDistribution(dataA.leftToRight, dataB.leftToRight);

    if (leftDistribution === Distribution.complementary) {
        return Distribution.complementary;
    }

    return findSideDistribution(dataA.rightToLeft, dataB.rightToLeft);
}