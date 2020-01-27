import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Row extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card bg="secondary" text="white" style={{ width: '18rem', margin: "1rem"}}>
        <Card.Header>{this.props.gender}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>
            Birth Year: {this.props.birth_year}<br />
            Homeword: {this.props.homeword}<br />
            Height: {this.props.height}<br />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [' ']
    }
  }

  addRow = () => {
    let info = this.state.info.slice();
    let rows = info.map((comp) => <Row name={comp.name} gender={comp.gender} height={comp.height} homeword={comp.homeword} birth_year={comp.birth_year} />);
    return rows;
  }

  componentWillMount() {
    let info;
    const url = "https://swapi.co/api/people";
    axios.get(url)
      .then(function (response) {
        console.log(response);
        info = response.data.results.slice();
      })
      .then(() => {
        this.setState({
          info: info
        })
        console.log(this.state.info);
      })
  }

  render() {
    return (
      <>
        {this.addRow()}
      </>
    );
  }
}

export default Table;
