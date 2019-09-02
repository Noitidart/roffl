const INITIAL = 10;
export const sagas = [];

const A = ([actionType]) => 'COUNT_' + actionType;

//
const UP = A`UP`;
const up = () => ({ type:UP });

//
const DN = A`DN`;
function dn() {
    return {
        type: DN
    }
}

export default function reducer(state = INITIAL, action) {
    switch(action.type) {
        case UP: return state + 1;
        case DN: return state - 1;
        default: return state;
    }
}

export { up, dn }
