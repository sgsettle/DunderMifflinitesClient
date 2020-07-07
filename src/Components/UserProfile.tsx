import React from 'react';
import ReactDOM from 'react-dom';

class UserProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.userId
        fetch()
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default UserProfile;