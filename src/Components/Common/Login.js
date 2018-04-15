import React, {Component} from 'react';
import agent from '../../Helpers/agent';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MapContainer from '../../Components/Map/MapContainer';
import ReactJson from 'react-json-view';


const mapStateToProps = state => ({
    ...state.auth,
    register: state.common.register,

});

const mapDispatchToProps = dispatch => ({
    locationUpdateListener: () => dispatch(agent.FirebaseQuery.locationListener()),
    getOptimizedRoute: () => dispatch(agent.FirebaseQuery.getOptimizedRoute()),


});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.props.locationUpdateListener();
    }


    render() {


        return (
            <div className="login-wrapper">
                <MapContainer></MapContainer>
                <div style={{width: '35vw', height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <h3>REQUESTED FILL-UPS</h3>
                    <ReactJson
                        collapsed={true}
                        src={{
                            0: {
                                id: "visit_1",
                                location: {name: "JASON HO", lat: 51.092626, lng: -114.160965},
                                start: "8:00",
                                end: "16:00",
                                duration: 10
                            },
                            1:
                                {
                                    id: "visit_2",
                                    location: {name: "MAXWELL BRACY", lat: 51.061968, lng: -114.166266},
                                    start: "8:00",
                                    end: "16:00",
                                    duration: 10
                                },
                            2:
                                {
                                    id: "visit_3",
                                    location: {name: "SAMUEL_REID", lat: 51.047290, lng: -114.133663},
                                    start: "8:00",
                                    end: "16:00",
                                    duration: 10
                                }
                        }} theme="monokai"/>

                    <h3>VEHICLES</h3>
                    <ReactJson
                        collapsed={true}
                        src={
                            {
                                0: {
                                    id: "vehicle_1",
                                    start_location: {
                                        id: "depot",
                                        lat: 51.091617,
                                        lng: -113.960600
                                    },
                                    end_location: {
                                        id: "depot",
                                        lat: 51.091617,
                                        lng: -113.960600
                                    }
                                }, 1:
                                {
                                    id: "vehicle_2",
                                    start_location: {
                                        id: "depot",
                                        lat: 51.063649,
                                        lng: -114.010336
                                    },
                                    end_location: {
                                        id: "depot",
                                        lat: 51.063649,
                                        lng: -114.010336
                                    }
                                }
                            }
                        } theme="monokai"/>
                    <div style={{cursor: 'pointer', }} onClick={() => this.props.getOptimizedRoute()}>
                        <h3 style={{cursor: 'pointer'}}>Optimized Response</h3>
                    </div>`


                </div>
            </div>

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
