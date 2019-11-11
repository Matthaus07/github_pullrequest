import React, { Component } from "react";
import axios from 'axios';


export default class StudentList extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         students: []
    //     };
    // }
    state = {
        response: ''
    };
    componentDidMount() {
        this.callApi()
            .then(res => this.setState([res.data] ))

            .catch(err => console.log(err));
    }

    callApi = async () => {
        const url_cors = 'https://cors-anywhere.herokuapp.com';
        const endpoint = `${url_cors}/https://pullrequestgithub.herokuapp.com/list`
        const response = await fetch(endpoint)
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (
            <div className="table-wrapper">
                {this.state.response}
            </div>);
    }
}