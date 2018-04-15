import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


import agent from '../../Helpers/agent';



const mapStateToProps = state => ({
    chatExpanded: state.common.chatExpanded,

});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),


});

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
};

class HomeDash extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
        }

    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }


    render() {
        return (
            <div className={"container"}>

            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDash));
