'use strict';

import { copyArray } from './array';

const div = document.createElement('div'),
      createDiv = div.cloneNode.bind(div, true),
      activeClass = 'active';

const binaryDigitPrototype = {
    activate: function () {
        this.element.classList.add(activeClass);
    },

    deactivate: function () {
        this.element.classList.remove(activeClass);
    },

    setActiveState: function (active) {
        if (active === true) { this.activate(); }
        else if (active === false) { this.deactivate(); }
    }
};

const createBinaryDigit = function () {
    const digit = createDiv();
    digit.classList.add('binary-digit');

    return Object.create(binaryDigitPrototype, {
        element: {
            value: digit,
            enumerable: true
        }
    });
};

const createDigit = function (numBinaryDigits) {
    const binaryDigits = [];

    const digit = createDiv();
    digit.classList.add('digit');

    for (let i = 0; i < numBinaryDigits; i += 1) {
        const binaryDigit = createBinaryDigit();

        binaryDigits.push(binaryDigit);
        digit.appendChild(binaryDigit.element);
    }

    return {
        element: digit,

        setValue: (binaryValue) => {
            // fill from right to left to ensure digit positions
            const str = String(binaryValue);
            const reversedBinaryValues = str.split('').reverse();
            const reversedDigits = copyArray(binaryDigits).reverse();

            reversedDigits.forEach((binaryDigit, index) => {
                const value = reversedBinaryValues[index] || '0';
                const active = value === '1';
                binaryDigit.setActiveState(active);
            });
        }
    };
};

export { createBinaryDigit, createDigit };