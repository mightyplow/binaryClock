'use strict';

export const getTime = function () {
    const timeMatch = Date().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/);
    return timeMatch && timeMatch[0];
};