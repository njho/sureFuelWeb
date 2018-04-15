import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    name: state.common.consoleData.name,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    menuToggle: () => dispatch({
        type: 'SIDEBAR_OPEN',
        value: false
    })
});


class SidebarData extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
            // Data
            loading: false,

            // Auth vars
            auth: {}
        }
    }


    render() {
        return (
            <div className="sidebar"><span>
				<div className="navigation">
                    <div className="sidebar-wrapper">
						<span>
							<div className="sidebar-nav">
                                <div className="sidebar-nav-content">
                                    <nav>
                                        <ul>
                                                <li><Link className="nav-section-logout" to="/login"
                                                          onClick={() => agent.Auth.logout()}>Logout</Link>
    </li>
</ul>

                                    </nav>
                                </div>
                            </div>
						</span>
                    </div>

                </div>
			</span></div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarData));

