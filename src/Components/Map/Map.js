import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'


const mapStateToProps = state => ({
    ...state,
    coordinates: state.common.coordinates
});

const mapDispatchToProps = dispatch => ({});

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 3),
    y: -(height / 2),
});

var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 3
};


class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sherpa:
                [{lat: 27.978041, lng: 86.868418},
                    {lat: 28.002814, lng: 86.855839},
                    {lat: 28.003514, lng: 86.852070},
                    {lat: 28.007374, lng: 86.849793}],
            jude: [{lat: 27.949109, lng: 86.815923}, {lat: 27.980924, lng: 86.838754},
                {lat: 27.985954, lng: 86.841697},
                {lat: 27.991143, lng: 86.845917},
                {lat: 28.003514, lng: 86.852070},
            ],
        };
    }


    render() {
        return (

            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: this.props.coordinates.lat, lng: this.props.coordinates.lng}}
                center={{lat: this.props.coordinates.lat, lng: this.props.coordinates.lng}}
                ref={(map) => this.map = map}

                tabIndex={-1}
            >
                <Marker position={{lat: this.props.coordinates.lat, lng: this.props.coordinates.lng}} />
            </GoogleMap>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map))));