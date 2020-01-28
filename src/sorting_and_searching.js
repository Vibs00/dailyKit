import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class SortingAndSearching extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card bg="secondary" text="white" style={{ margin: '1rem', width: '18rem', position: 'sticky' }}>
                <Card.Body>
                    <Card.Text>
                        <SearchBy />
                        <br />
                        <SortBy handleSortBy={this.props.handleSortBy} />
                        <br />
                        <FilterBy />
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

function SortBy(props) {
    return (
        <Dropdown style={{ textAlign: 'center' }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Sort By
        </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/1" onClick={props.handleSortBy}>Name</Dropdown.Item>
                <Dropdown.Item href="#/2" onClick={props.handleSortBy}>Height</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function FilterBy() {
    return (
        <>
            <h5>Name</h5><br />
            <h5>Homeword</h5><br />
        </>
    );
}

function SearchBy() {
    return (
        <InputGroup className="mb-3">
            <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
            />
            <InputGroup.Append>
                <Button variant="outline-light">Search</Button>
            </InputGroup.Append>
        </InputGroup>
    );
}

export default SortingAndSearching;