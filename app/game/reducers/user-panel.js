import { connect } from 'preact-redux';

const defaultState = {
    displayName: 'Player',
    iconCharCode: '\uf007',
};

export default function userPanel(state = defaultState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
