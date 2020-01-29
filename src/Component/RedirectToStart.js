import React from "react";
import {withRouter} from "react-router-dom";

class RedirectToStart extends React.Component {
    handleClearJwt = () => {
        localStorage.removeItem('userToken');
        this.props.sign_up(false);
        this.props.history.push('/')
    };
    render() {
        return (
            <div className={'go_out'}>
                <span onClick={this.handleClearJwt}>Вийти з кабінету</span>
            </div>
        )
    }
}

export default withRouter(RedirectToStart)
