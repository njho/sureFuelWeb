import React, {Component} from 'react';
import {Motion, spring} from 'react-motion'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';

import Icon from 'react-icon-base';


import Map from './Map';


const mapStateToProps = state => ({
    ...state,
    chatExpanded: state.common.chatExpanded,

});

const mapDispatchToProps = dispatch => ({
    setMapExpanded: (value) => dispatch({
        type: 'SET_MAP_EXPANDED',
        value: value
    }),


});


class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }


    render() {
        return (

            <div className={'map-container'}
                 tabIndex={-1}
                 style={{
                     minHeight: '105px',
                     height: '100%',
                     width: '100%',
                     minWidth: '105px',
                 }}
            >


                <Map isMarkerShown={true}
                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIpabTnIbXsdIgI2Zo2zO6g3GGxUbYqw8&v=3.exp&libraries=geometry,drawing,places"
                     loadingElement={<div style={{height: `100px`,}}/>}
                     tabIndex={-1}

                     containerElement={
                         <div style={{
                             minHeight: '100px',
                             minWidth: '100px',
                             height: '100%',
                             width: '100%',
                             overflow: 'hidden',
                             zIndex: 3,
                             border: 'solid white 3px'
                         }}/>}
                     mapElement={<div style={{height: `100%`, width: '100%'}}/>}/>

            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapContainer));


//This was removed from map-container
