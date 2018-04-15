import React, {Component} from 'react';
import agent from '../../Helpers/agent';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MapContainer from '../../Components/Map/MapContainer';


const mapStateToProps = state => ({
    ...state.auth,
    beautifulUnsplash: state.common.beautifulUnsplash,
    register: state.common.register,

});

const mapDispatchToProps = dispatch => ({
    getBeautifulUnsplash: () => dispatch(agent.common.beautifulUnsplash()),
    updateFieldAuth: (key, value) =>
        dispatch({type: 'UPDATE_FIELD_AUTH', key: key, value}),
    onSubmit: (email, password) => {
        dispatch({type: 'LOGIN', payload: agent.Auth.login(email, password)})
    },
    onRegister: (name, vendor, email, password, checked) => {
        if (checked === true) {
            dispatch({type: 'REGISTER', payload: agent.Auth.register(email, password), name: name, vendor: vendor})
        }
    },
    onUnload: () =>
        dispatch({type: 'LOGIN_PAGE_UNLOADED'})
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {


        return (
            <div className="login-wrapper">
                <MapContainer></MapContainer>
            </div>

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
