function* generateSubstrings(source: string): IterableIterator<string> {
    for (let i = 0; i < source.length - 1; ++i) {
        for (let j = i + 1; j < source.length; ++j) {
            yield source.substring(i, j);
        }
    }
}

export function longestCommonSubstring(sourceA: string, sourceB: string): string {
    const allSubstringsInA = {};

    for (const substring of generateSubstrings(sourceA)) {
        allSubstringsInA[substring] = true;
    }

    let longestSubstring = '';
    for (const substring of generateSubstrings(sourceB)) {
        if (!allSubstringsInA.hasOwnProperty(substring)) {
            continue;
        }

        if (substring.length > longestSubstring.length) {
            longestSubstring = substring;
        }
    }

    return longestSubstring;
}