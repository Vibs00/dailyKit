import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import starwars from "./images/starwars.jpg";
import SortingAndSearching from './sorting_and_searching.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import Info from './info.js';

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
      <Link to={"/info/#/" + this.props.name + "+" + this.props.birth_year + "+" + this.state.homeworld + "+" + this.props.height}>
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
      </Link>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active_page: 1,
      info: [' '],
      page_number: 1,
      render: false,
      rows: " ",
      rows_on_one_page: " ",
      search_sort_flag: false,
      total_rows: " ",
    };
  }

  addRow = () => {
    let info = "";
    info = this.state.info.slice();
    let rows = this.state.info.map((comp) => {
      // let homeworld;
      // axios.get(comp.homeworld)
      //   .then(function (response) {
      //     homeworld = response.data.name;
      //     comp.homeworld = homeworld;
      //     info.push(comp);
      //   })
      //   .then(() => {
      //     this.setState({
      //       info: info
      //     })
      //   })
      return <OneRow name={comp.name} gender={comp.gender} height={comp.height} homeworld={comp.homeworld} birth_year={comp.birth_year} />
    });
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
        info: sortedInfo,
        search_sort_flag: true,
        render: true,
      })
      this.addRow();
      console.log(window.location, this.state, array_to_sort);
    }.bind(this), 0.1)
    return;
  }

  handelSearchBy = () => {
    let search_by_input = window.location;
    setTimeout(function () { //Start the timer
      search_by_input = search_by_input.hash.slice(2, -1) + search_by_input.hash.slice(-1);
      search_by_input = search_by_input.split('+').join(' ');
      // let search_by_regexp = "/" + search_by_input + "/gi";
      // console.log(search_by_regexp);
      let info = this.state.info.slice();
      let array_afer_search = [];
      info.map((comp) => {
        // console.log(comp.homeworld.toUpperCase().split(search_by_input.toUpperCase())[0]);
        if (comp.name.toUpperCase().split(search_by_input.toUpperCase())[1] || comp.name.toUpperCase().split(search_by_input.toUpperCase())[0]=='' || comp.homeworld.toUpperCase().split(search_by_input.toUpperCase())[0]=='')
          array_afer_search.push(comp)
        return;
      })
      this.setState({
        info: array_afer_search,
        render: true,
        search_sort_flag: true,
      })
      this.addRow();
      console.log(array_afer_search)
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

  componentWillMount = () => {
    console.log("component will mount");
    let info = [];
    let inc = 0;
    const url = "https://swapi.co/api/people/?page=";
    for (let i = 1; i <= 9; ++i) {
      axios.get(url + i)
        .then((response) => {
          response.data.results.map((comp) => {
            let homeworld;
            axios.get(comp.homeworld)
              .then((response) => {
                homeworld = response.data.name;
                comp.homeworld = homeworld;
              })
            comp.id = inc;
            ++inc;
            info.push(comp)
            return comp.id
          });
        })
        .then(() => {
          info.map((comp) => {
            console.log(comp.homeworld);
          }
          )
        })
        .then(() => {
          this.setState({
            info: info,
          })
          console.log(this.state.rows, this.state.info)
        })
        .then(() => {
          this.addRow();
        })
    }
    // this.addRow();
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
              <SortingAndSearching handleSortBy={this.handleSortBy} handelSearchBy={this.handelSearchBy} />
            </Col>
            <Col md={9}>
              <Badge pill variant="danger" onClick={() => window.location.reload()} style={this.state.search_sort_flag == true ? { cursor: 'pointer', visibility: "visible" } : { cursor: 'pointer', visibility: "hidden" }}>
                {window.location.hash.slice(2, -1) + window.location.hash.slice(-1) + "  X"}
              </Badge>
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
