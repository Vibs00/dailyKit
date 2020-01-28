import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

export default class paginationBasic extends React.Component {
    constructor(props) {
        super(props);
        let active = 2;
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
    }
    render() {
        return (
            <div>
                <Pagination>{this.items}</Pagination>
                <br />

                <Pagination size="lg">{this.items}</Pagination>
                <br />

                <Pagination size="sm">{this.items}</Pagination>
            </div>
        );
    }
}