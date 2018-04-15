import moment from 'moment';

let SelectedStartDate = moment().subtract(7, 'days');
var SelectedEndDate = moment();

const defaultState = {
    coordinates: {
        lat: null,
        lng: null,
    },
    routes: {}

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'LOCATION_UPDATE':
            return {
                ...state,
                coordinates: action.value
            };
        case 'OPTIMIZED_ROUTES':
            return {
                ...state,
                routes: action.value
            };


        default:
            return state;
    }
}