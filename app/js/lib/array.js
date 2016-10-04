'use strict';

const copyArray = ar => {
    ar = ar || [];
    return ar.slice(0);
};

export { copyArray };