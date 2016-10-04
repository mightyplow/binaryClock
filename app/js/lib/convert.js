'use strict';

export const toBinaryString = function (val) {
    const num = Number(val);
    return !isNaN(num) && num.toString(2) || '';
};