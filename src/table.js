import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import starwars from "./images/starwars.jpg";
import { Button } from 'react-bootstrap';
import SortingAndSearching from './sorting_and_searching.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';

class OneRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeworld: " "
    }
  }
  componentWillMount() {
    let homeworld;
    const url = this.props.homeworld;
    axios.get(url)
      .then(function (response) {
        homeworld = response.data.name;
      })
      .then(() => {
        this.setState({
          homeworld: homeworld
        })
      })
  }

  render() {
    return (
      <Card bg="secondary" text="white" style={{ height: '135px', margin: '0.9rem', display: 'flex', flexDirection: 'row', opacity: '0.7' }}>
        <Card.Header>{this.props.gender}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.name}</Card.Title>
          <Card.Text>
            Birth Year: {this.props.birth_year}<br />
            Homeworld: {this.state.homeworld}<br />
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
      active_page: 1,
      flag: true,
      info: [' '],
      page_number: 1,
      render: false,
      rows: " ",
      rows_on_one_page: " ",
      sortedInfo: [' '],
      total_rows: " ",
    };
  }

  addRow = () => {
    // console.log(this.state)
    let info = "";
    // let rows_on_one_page = this.handelPageChange(1);
    if (this.state.flag)
      info = this.state.info.slice();
    else
      info = this.state.sortedInfo.slice();
    let rows = info.map((comp) => <OneRow name={comp.name} gender={comp.gender} height={comp.height} homeworld={comp.homeworld} birth_year={comp.birth_year} />);
    this.setState({
      rows: rows,
      rows_on_one_page: this.handelPageChange(1)
    })
    console.log(this.handelPageChange(1))
  }

  handleSortBy = () => {
    let sort_by_option = window.location;
    setTimeout(function () { //Start the timer
      sort_by_option = sort_by_option.hash.slice(-1);
      let info = this.state.info.slice();
      let array_to_sort = info.map((comp) =>
        ((sort_by_option == 1 ? comp.name : comp.height) + "-" + comp.id)
      );
      array_to_sort = ((sort_by_option == 1) ? array_to_sort.sort() : array_to_sort.sort(function (a, b) { return ((b.split('-'))[0] - (a.split('-'))[0]) }));
      let sortedInfo = [];
      array_to_sort.map((array_to_sort_comp) => {
        let id = array_to_sort_comp.split('-')[1];
        info.map((info_comp) => {
          if (info_comp.id == id) {
            sortedInfo.push(info_comp);
            return;
          }
        })
      })
      this.setState({
        sortedInfo: sortedInfo,
        flag: false,
        render: true
      })
      this.addRow();
      console.log(window.location, this.state, array_to_sort);
    }.bind(this), 0.1)
    return;
  }

  handelPageChange = (number) => {
    let rows_on_one_page = [];
    const number_of_rows_on_one_page = 4;
    rows_on_one_page = this.state.rows.slice(((number - 1) * number_of_rows_on_one_page), (number * number_of_rows_on_one_page));
    this.setState({
      rows_on_one_page: rows_on_one_page,
      page_number: number
    })
    return;
  }

  numberOfPages = () => {
    let items;
    items =
      <Pagination.Item key={this.state.page_number} active={this.state.active_page} onClick={() => this.handelPageChange(this.state.page_numbe)}>
        {this.state.page_number}
      </Pagination.Item>
    return items;
  }

  componentWillMount() {
    console.log("component will mount");
    let info = [];
    let inc = 0;
    const url = "https://swapi.co/api/people/?page=";
    for (let i = 1; i <= 9; ++i) {
      axios.get(url + i)
        .then(function (response) {
          response.data.results.map((comp) => {
            info.push(comp)
            comp.id = inc;
            ++inc;
            return comp.id
          });
        })
        .then(() => {
          this.setState({
            info: info,
            sortedInfo: info,
          })
          this.addRow();
        })
    }
  }

  render() {
    return (
      <>
        <img
          src={starwars}
          style={{ position: 'fixed', filter: "brightness(50%)", top: '0', left: '0' }}
        />
        <Container fluid="true">
          <Row noGutters="true">
            <Col md={3}>
              <SortingAndSearching handleSortBy={this.handleSortBy} />
            </Col>
            <Col md={9}>
              {this.state.rows_on_one_page}
            </Col>
          </Row>
        </Container>
        <Pagination>
          <Pagination.First onClick={() => this.setState({ page_number: 1 })} />
          <Pagination.Prev onClick={() => this.handelPageChange(this.state.page_number - 1 <= 0 ? 1 : this.state.page_number - 1)} />
          {this.numberOfPages()}
          <Pagination.Next onClick={() => this.handelPageChange(this.state.page_number + 1 > 22 ? 22 : this.state.page_number + 1)} />
          <Pagination.Last onClick={() => this.setState({ page_number: 22 })} />
        </Pagination>
      </>
    );
  }
}

export default Table;
