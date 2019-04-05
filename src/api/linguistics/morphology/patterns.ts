import Counter from '../../util/Counter';
import LinkedNode from '../../util/LinkedNode';

function buildRelations(source: string) {
    const counter: Counter<string> = new Counter();
    const relations: Map<string, string> = new Map();

    if (source.length === 0) {
        return relations;
    }

    // The only time that the "a" variable below is unique is on the first iteration, because on all others
    // it has been seen before as "b". So we can increment it ahead of time to save other logic.
    counter.increment(source[0]);

    const furthestIndex = source.length - 1;

    for (let i = 0; i < furthestIndex; ++i) {
        const a = source[i];
        const b = source[i + 1];

        counter.increment(b);

        const aKey = `${counter.get(a)}|${a}`;
        const bKey = `${counter.get(b)}|${b}`;

        relations.set(aKey, bKey);
    }

    return relations;
}

function deserializeKey(key: string): [number, string] {
    const [count, str] = key.split('|');

    return [parseInt(count), str];
}

function findDisjointLinkedNodes<T>(nodes: Iterable<LinkedNode<T>>) {
    const seenNodes: Map<LinkedNode<T>, boolean> = new Map();
    const disjointParents = [];

    for (const node of nodes) {
        let cur: LinkedNode<T> | undefined = node;
        let wasSeen = false;

        while (cur) {
            if (seenNodes.has(cur)) {
                wasSeen = true;
                break;
            }

            seenNodes.set(cur, true);

            if (cur.previous) {
                cur = cur.previous;
            } else {
                break;
            }
        }

        if (wasSeen) {
            continue;
        }

        disjointParents.push(cur);
    }
    return disjointParents;
}

function filterNoise(similarStrings: string[]) {
    const relations = [];

    for (const noisyString of similarStrings) {
        relations.push(buildRelations(noisyString));
    }

    const agreeCounts: Map<string, Counter<string>> = new Map();
    const fullyAgreed: Map<string, string> = new Map();

    for (const relationMap of relations) {
        for (const [letterA, letterB] of relationMap.entries()) {
            if (!agreeCounts.has(letterA)) {
                agreeCounts.set(letterA, new Counter());
            }

            const agreeCount = agreeCounts.get(letterA);

            // Will always be true, typescript is being annoying
            if (agreeCount) {
                agreeCount.increment(letterB);

                if (agreeCount.get(letterB) === relations.length) {
                    fullyAgreed.set(letterA, letterB);
                }
            }
        }
    }

    const nodes: Map<string, LinkedNode<string>> = new Map();

    for (const [agreedSource, agreedDest] of fullyAgreed.entries()) {
        const [,sourceValue] = deserializeKey(agreedSource);
        const [,destValue] = deserializeKey(agreedDest);

        const destNode = nodes.get(agreedDest) || new LinkedNode<string>(destValue);
        const sourceNode = nodes.get(agreedSource) || new LinkedNode<string>(sourceValue);

        sourceNode.next = destNode;
        destNode.previous = sourceNode;

        nodes.set(agreedSource, sourceNode);
        nodes.set(agreedDest, destNode);
    }

    const disjointNodes = findDisjointLinkedNodes(nodes.values());

    const letters = [];

    for (const node of disjointNodes) {
        let cur: LinkedNode<string> | undefined = node;
        while (cur) {
            letters.push(cur.value);
            cur = cur.next;
        }
    }

    return letters.join('');
}

export default filterNoise;