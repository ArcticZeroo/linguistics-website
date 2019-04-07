import * as React from 'react';
import styled from 'styled-components';
import drawVowelChartBackground, { vowelChartSideLengthInPx } from '../../../api/linguistics/ipa/drawVowelChartBackground';
import vowels, { Tenseness, TongueFrontBackness, TongueHeight } from '../../../api/linguistics/ipa/vowels';
import strings from '../../../config/strings';
import SelectOnClick from '../../util/SelectOnClick';

const ChartContainer = styled.div`
  background-image: url(${drawVowelChartBackground()});
  background-repeat: no-repeat;
  height: ${vowelChartSideLengthInPx}px;
  width: ${vowelChartSideLengthInPx * 2}px;
  position: relative;
`;

const ChartSymbols = styled.div`
  position: absolute;
`;

const positionOffset = { x: 30, y: 15 };

// Map<FrontBackness, Map<Height, Position>>
const heightPositionsY = {
    [TongueHeight.high]: positionOffset.y,
    [TongueHeight.mid]: vowelChartSideLengthInPx / 2,
    [TongueHeight.low]: vowelChartSideLengthInPx - (positionOffset.y * 2)
};

const centralPositionX = vowelChartSideLengthInPx * 1.4;
const backPositionX = (vowelChartSideLengthInPx * 2) - positionOffset.x;

const frontBacknessPositionsX = {
    [TongueFrontBackness.front]: {
        [TongueHeight.high]: positionOffset.x * 2.5,
        [TongueHeight.mid]: vowelChartSideLengthInPx / 2 + (positionOffset.x * 1.5),
        [TongueHeight.low]: vowelChartSideLengthInPx + (positionOffset.x / 2)
    },
    [TongueFrontBackness.central]: {
        [TongueHeight.high]: centralPositionX,
        [TongueHeight.mid]: centralPositionX,
        [TongueHeight.low]: centralPositionX
    },
    [TongueFrontBackness.back]: {
        [TongueHeight.high]: backPositionX,
        [TongueHeight.mid]: backPositionX,
        [TongueHeight.low]: backPositionX
    }
};

const nullPosition = { x: 0, y: 0 };

const shiftMultiplier = 2.5;

const shifts = {
    up: {
        x: 0,
        y: -(positionOffset.y * shiftMultiplier)
    },
    down: {
        x: 0,
        y: positionOffset.y * shiftMultiplier
    },
    left: {
        x: -(positionOffset.x * shiftMultiplier),
        y: 0
    },
    right: {
        x: positionOffset.x * shiftMultiplier,
        y: 0
    }
};

const tensenessOffsets = {
    [TongueFrontBackness.front]: {
        [TongueHeight.high]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: {
                x: positionOffset.x * 3.5,
                y: positionOffset.y * shiftMultiplier
            }
        },
        [TongueHeight.mid]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: shifts.right
        },
        [TongueHeight.low]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: {
                x: positionOffset.x,
                y: -(positionOffset.y * shiftMultiplier)
            }
        }
    },
    [TongueFrontBackness.central]: {
        [TongueHeight.high]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: shifts.down
        },
        [TongueHeight.mid]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: nullPosition
        },
        [TongueHeight.low]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: shifts.up
        }
    },
    [TongueFrontBackness.back]: {
        [TongueHeight.high]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: {
                x: -(positionOffset.x * shiftMultiplier),
                y: positionOffset.y * shiftMultiplier
            }
        },
        [TongueHeight.mid]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: shifts.left
        },
        [TongueHeight.low]: {
            [Tenseness.tense]: nullPosition,
            [Tenseness.lax]: {
                x: -(positionOffset.x * shiftMultiplier),
                y: -(positionOffset.y * shiftMultiplier)
            }
        }
    }
};

const seenOffset = {
    x: positionOffset.x,
    y: 0
};

const VowelChartBody = () => {
    const elements = [];

    const seenFrontBackHeight = {};

    for (const vowel of Object.keys(vowels)) {
        const vowelData = vowels[vowel];

        if (!seenFrontBackHeight[vowelData.frontBackness]) {
            seenFrontBackHeight[vowelData.frontBackness] = {};
        }

        if (!seenFrontBackHeight[vowelData.frontBackness][vowelData.height]) {
            seenFrontBackHeight[vowelData.frontBackness][vowelData.height] = {};
        }

        if (!seenFrontBackHeight[vowelData.frontBackness][vowelData.height][vowelData.tenseness]) {
            seenFrontBackHeight[vowelData.frontBackness][vowelData.height][vowelData.tenseness] = [];
        }

        const seenOfThisType: string[] = seenFrontBackHeight[vowelData.frontBackness][vowelData.height][vowelData.tenseness];

        const tensenessOffset = tensenessOffsets[vowelData.frontBackness][vowelData.height][vowelData.tenseness];
        const extraOffset = seenOfThisType.length ? seenOffset : nullPosition;

        const position = {
            x: frontBacknessPositionsX[vowelData.frontBackness][vowelData.height] + tensenessOffset.x + extraOffset.x,
            y: heightPositionsY[vowelData.height] + tensenessOffset.y + extraOffset.y
        };

        const name = [
            strings.tongueHeight[vowelData.height],
            strings.tongueFrontBackness[vowelData.frontBackness],
            strings.rounding[vowelData.rounding],
            strings.tenseness[vowelData.tenseness],
            strings.vowelChart.vowelTitle
        ].join(' ');

        elements.push(
            <ChartSymbols title={name}
                          style={{
                              left: position.x,
                              top: position.y
                          }}
                          key={name}
            >
                <SelectOnClick>
                    {vowel}
                </SelectOnClick>
            </ChartSymbols>
        );

        seenOfThisType.push(vowel);
    }

    return (
        <>
            {elements}
        </>
    );
};

export default function () {
    return (
        <ChartContainer>
            <VowelChartBody/>
        </ChartContainer>
    );
}