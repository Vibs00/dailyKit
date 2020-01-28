import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

export default class PaginationBasic extends React.Component {
    constructor(props) {
        super(props);
    }

    numberOfPages = () => {
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === 1}>
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    }

    render() {
        return (
            <Pagination style={{}}>{this.numberOfPages()}</Pagination>
        );
    }
}