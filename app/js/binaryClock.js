'use strict';

import { createDigit } from './lib/digit';
import { getTime } from './lib/time';
import { toBinaryString } from './lib/convert';

export const createBinaryClock = function (targetElement, startImmediately) {
    if (!targetElement) {
        throw Error('target element must be pased');
    }

    startImmediately = startImmediately !== false;

    const binaryDigitCounts = [2, 4, 3, 4, 3, 4];
    const updateIntervalInMs = 200;
    const binaryClockClassname = 'binary-clock';

    const updateClock = (function () {
        const digits = binaryDigitCounts.map(count => createDigit(count));
        digits.forEach(digit => targetElement.appendChild(digit.element));

        return timeString => {
            const timeDigits = timeString.replace(/:/g, '');
            const binaryDigitValues = timeDigits.split('').map(toBinaryString);
            binaryDigitValues.forEach((binaryValue, index) => digits[index].setValue(binaryValue));
        };
    }());

    const clock = (function () {
        let lastTime,
            interval;

        const updateTimeHandlers = new Set();

        const updateTime = function () {
            const time = getTime();

            if (time !== lastTime) {
                updateClock(time);
                updateTimeHandlers.forEach(handler => handler(time));
            }

            lastTime = time;
        };

        return {
            start: function () {
                updateTime();
                interval = setInterval(updateTime, updateIntervalInMs);
            },

            stop: function () {
                clearInterval(interval);
                lastTime = undefined;
            },

            addTimeUpdateHandler: handler => {
                updateTimeHandlers.add(handler);
                interval && lastTime && handler(lastTime);
            },

            removeTimeUpdateHandler: updateTimeHandlers.delete.bind(updateTimeHandlers)
        };
    }());

    targetElement.classList.add(binaryClockClassname);
    startImmediately && clock.start();

    return clock;
};