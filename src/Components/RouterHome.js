import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../Helpers/history.js';


import App from '../App';
import HomeDash from './Dashes/HomeDash';
import agent from '../Helpers/agent';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    lookupConsole2: (uid) => dispatch(agent.Auth.lookupConsole2(uid))

});

function PrivateRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}

function LoginRoute({component: Component, authed, ...rest}) {
    /* console.log('loginRoute');
     console.log(authed);*/
    return (
        <Route
            exact
            {...rest}
            render={(props) => authed === false
                ? <Component {...props} />
                : <Redirect to='/home'/>}
        />
    )
}


function PublicRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === false
                ? <Component {...props} />
                : <Redirect to='/dashboard'/>}
        />
    )
}

var svgString = '<div class="loader"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="70px" y="0px" viewBox="0 0 1498.2 1265.9" enable-background="new 0 0 1498.2 1265.9" xml:space="preserve"><g transform="scale(3)"><path fill-rule="evenodd" clip-rule="evenodd" d="M364.44,76.776h-47.709c0.488-1.574,0.673-3.138,0.673-4.595c0-1.151,0.056-2.808,0.12-4.726c0.513-15.32,1.468-43.837-12.849-58.641C299.019,2.965,291.755,0,283.085,0c-22.32,0-50.588,20.475-61.707,29.277c-4.302,3.406-20.977,16.979-29.939,29.503c-8.962-12.524-25.638-26.096-29.94-29.503C150.381,20.475,122.113,0,99.793,0c-8.67,0-15.934,2.965-21.589,8.814C63.887,23.618,64.841,52.135,65.354,67.455c0.064,1.918,0.12,3.575,0.12,4.726c0,1.458,0.185,3.021,0.673,4.595H18.438c-9.649,0-17.5,7.851-17.5,17.5v73.376c0,9.649,7.851,17.5,17.5,17.5H32.49v185.225c0,6.893,5.607,12.5,12.5,12.5h113.19h66.518h113.19c6.893,0,12.5-5.607,12.5-12.5V185.153h14.052c9.649,0,17.5-7.851,17.5-17.5V94.276C381.94,84.627,374.089,76.776,364.44,76.776z M209.698,170.153H173.18V92.215h36.518V170.153z M232.277,39.793C252.267,24.269,271.26,15,283.085,15c4.574,0,8.008,1.348,10.807,4.242c9.895,10.231,9.015,36.496,8.64,47.711c-0.068,2.034-0.127,3.793-0.128,5.189c-0.432,0.377-85.718,3.559-92.432,2.678c-6.486-0.851-8.641-2.147-9.223-2.606C202.23,68.058,213.387,54.463,232.277,39.793z M88.986,19.242C91.785,16.348,95.219,15,99.793,15c11.825,0,30.818,9.269,50.808,24.793c18.89,14.671,30.047,28.265,31.529,32.422c-0.582,0.459-2.737,1.755-9.224,2.606c-6.714,0.88-92-2.301-92.432-2.678c-0.001-1.396-0.06-3.155-0.128-5.189C79.971,55.738,79.091,29.473,88.986,19.242zM15.938,167.653V94.276c0-1.355,1.145-2.5,2.5-2.5H158.18v78.376H44.99H18.438C17.083,170.153,15.938,169.008,15.938,167.653zM47.49,367.878V185.153h110.69v182.725H47.49z M173.18,367.878V185.153h36.518v182.725H173.18z M335.388,367.878h-110.69V185.153h110.69V367.878z M366.94,167.653c0,1.355-1.145,2.5-2.5,2.5h-26.552h-113.19V91.776H364.44c1.355,0,2.5,1.145,2.5,2.5V167.653z"/></g><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" d="M1265.6,124.8c-3.2,0-5.8,2.6-5.8,5.8c0,3.2,2.6,5.8,5.8,5.8c3.2,0,5.8-2.6,5.8-5.8C1271.3,127.4,1268.8,124.8,1265.6,124.8L1265.6,124.8z"/></g></svg></div>';

class RouterHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authed: false,
            loading: true
        }
    }

    componentDidMount() {

        this.removeListener = agent.authService.onAuthStateChanged((user) => {

            if (user) {
                /*Populate the Console Data*/
                this.props.lookupConsole2(user.uid);

                this.setState({
                    authed: true,
                    loading: false
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }
        })
    }

    componentWillUnmount() {
        this.removeListener()
    }

    render() {
        return <ConnectedRouter  history={history}>
                <Switch>
                    <Redirect exact from="/" to="/login"/>
                    <Route exact path="/login" component={App}/>

                    <Route exact path="/home" component={HomeDash}/>
                </Switch>
        </ConnectedRouter>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterHome);
