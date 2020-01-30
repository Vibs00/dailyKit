import React from 'react';
import starwars from "./images/starwars.jpg";
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        let url = window.location.hash.split("/")[1].split("+");
        this.state = {
            name: url[0].split('%20').join(' '),
            birth_yr: url[1],
            homeworld: url[2],
            height: url[3],
            info: {}
        }
    }

    componentWillMount() {
        console.log("component will mount");
        let info = "";
        let name = this.state.name;
        let url = "https://swapi.co/api/people/?page=";
        for (let i = 1; i <= 9; ++i) {
            axios.get(url + i)
                .then(function (response) {
                    response.data.results.map((comp) => {
                        if (comp.name == name)
                            info = comp;
                    });
                })
                // .then(function () {
                //     if (info.films[0])
                //         info.films.map((comp) => {
                //             axios.get(comp)
                //                 .then(function (response) {
                //                     console.log(response);
                //                 })
                //         })
                // })
                .then(() => {
                    this.setState({
                        info: info,
                    })
                    // if (info.name) {
                    // }
                    console.log(this.state.info)
                })
        }
        // info.films.map((comp) => {
        //     url = comp;
        //     axios.get(url)
        //         .then(function (response) {
        //             console.log(response);
        //         })
        //     // .then(() => {
        //     //     this.setState({
        //     //         info: info,
        //     //     })
        //     //     console.log(this.state.info)
        //     // })
        // })
    }

    render() {
        return (
            <div style={{ color: 'white' }}>
                <img
                    src={starwars}
                    style={{ position: 'fixed', filter: "brightness(50%)", top: '0', left: '0' }}
                />
                <Card bg="secondary" text="white" style={{ width: '500px', margin: '0.9rem', opacity: '0.8' }}>
                    <Card.Header><b>{this.state.name}</b></Card.Header>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                            <b>Birth Year:</b> {this.state.birth_yr}<br />
                            <b>Homeworld:</b> {this.state.homeworld}<br />
                            <b>Height:</b> {this.state.height}<br />
                            <b>Created:</b> {this.state.info.created}<br />
                            <b>Edited:</b> {this.state.info.edited}<br />
                            <b>Eye Colour:</b> {this.state.info.eye_color}<br />
                            <b>Gender:</b> {this.state.info.gender}<br />
                            <b>Hair Colour:</b> {this.state.info.hair_color}<br />
                            <b>Mass:</b> {this.state.info.mass}<br />
                            <b>Skin Colour:</b> {this.state.info.skin_color}<br />
                        </Card.Text>
                    </Card.Body>
                </Card>
                <h1>{this.state.name}</h1>
            </div>
        );
    }
}