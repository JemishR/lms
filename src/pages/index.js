import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from 'react-router-dom';
import { index, deleteBook } from './../services/book.crud';
import ReactPaginate from 'react-paginate';
import DatePicker from "react-datepicker";
import "./../assets/css/datepicker.css";

export default class Index extends Component {
    state = {
        books: [],
        toDashboard: false,
        isLoading: false,
        itemOffset: 0,
        pageCount: 0,
        perPage: 10,
        searchTitleInput: "",
        searchAuthorInput: "",
        searchGenreInput: "",
        searchIsbnInput: "",
        searchDateInput: "",
        selectedDate: "",
        currentPage: 0
    };

    componentDidMount() {
        index(this.state.perPage).then(response => {
            const books = response.data.data;
            this.setState({ books: books, pageCount: Math.ceil(response.data.total / this.state.perPage)  }); 
        }).catch(error => {
            this.setState({ toDashboard: true });
            console.log(error);
        });
    }

    handleClickDelete = event => {
        deleteBook(event.target.value).then(response => {
            this.componentDidMount();
            this.setState({ isLoading: true})
        }).catch( error => {
            console.log(error.toString());
            this.setState({ toDashboard: true });
        });
    };

    // Invoke when user click to request another page.
    handlePageClick = event => {
        index(this.state.perPage, event.selected + 1).then(response => {
            const books = response.data.data;
            this.setState({ books: books, currentPage:  event.selected}); 
        }).catch(error => {
            this.setState({ toDashboard: true });
            console.log(error);
        });
    };

    handleFilter = () => {
        if(this.state.searchTitleInput || this.state.searchAuthorInput || this.state.searchGenreInput || this.state.searchIsbnInput || this.state.searchDateInput) {
            index(this.state.perPage, 0, this.state.searchTitleInput, this.state.searchAuthorInput, this.state.searchGenreInput, this.state.searchIsbnInput, this.state.searchDateInput).then(response => {
                const books = response.data.data;
                this.setState({ books: books }); 
            }).catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
        }
        return;
    };

    handleDateChange = (date) => {
        if(date) {
            this.setState({ selectedDate: date });
            const event = new Date(date);
            const mnth = ("0" + (event.getMonth() + 1)).slice(-2);
            const day = ("0" + event.getDate()).slice(-2);
            this.setState({ searchDateInput: [event.getFullYear(), mnth, day].join("-") });
        }
    }
    render() {
        if(!localStorage.getItem('token'))
        {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Books</li>
                                {localStorage.getItem('role') && localStorage.getItem('role') === '1' && 
                                <li className="ml-auto"><Link to={'add'}>Add Book</Link></li>}
                            </ol>
                            <input
                            type="text"
                            placeholder="Search tittle..."
                            onChange={(event) => this.setState({ searchTitleInput: event.target.value })}
                            value={this.state.searchTitleInput} />
                            <input
                            type="text"
                            placeholder="Search author..."
                            onChange={(event) => this.setState({ searchAuthorInput: event.target.value })}
                            value={this.state.searchAuthorInput} />
                            <input
                            type="text"
                            placeholder="Search genre..."
                            onChange={(event) => this.setState({ searchGenreInput: event.target.value })}
                            value={this.state.searchGenreInput} />
                            <input
                            type="text"
                            placeholder="Search isbn..."
                            onChange={(event) => this.setState({ searchIsbnInput: event.target.value })}
                            value={this.state.searchIsbnInput} />
                            <h5>Select published date to filter</h5>
                            <DatePicker selected={this.state.selectedDate} onChange={(date) => this.handleDateChange(date)} />
                            <button onClick={this.handleFilter}>Search</button>
                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Book List
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Genre</th>
                                            <th>Description</th>
                                            <th>ISBN</th>
                                            <th>Image</th>
                                            <th>Published</th>
                                            <th>Publisher</th>
                                            {localStorage.getItem('role') && localStorage.getItem('role') === '1' && 
                                            <th className="text-center">Action</th>}
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.books.map((books , index)=>
                                                <tr key={books.id}>
                                                    <td>{index + 1}</td>
                                                    <td><Link to={{ pathname: 'show', search: '?id=' + books.id }}>{books.title}</Link></td>
                                                    <td>{books.author}</td>
                                                    <td>{books.genre}</td>
                                                    <td>{books.description}</td>
                                                    <td>{books.isbn}</td>
                                                    <td><img src={`${books.image}`} alt="" style={{width: "50px", height: "50px"}}></img></td>
                                                    <td>{books.published}</td>
                                                    <td>{books.publisher}</td>
                                                    {localStorage.getItem('role') && localStorage.getItem('role') === '1' && 
                                                    <td className="text-center">
                                                        <Link className="btn btn-sm btn-info" to={{ pathname: 'edit', search: '?id=' + books.id }}>Edit</Link>
                                                        &nbsp; | &nbsp;
                                                        <button value={books.id} className="btn btn-sm btn-danger" onClick={this.handleClickDelete} >Delete</button>
                                                    </td>}
                                                </tr>)
                                            }
                                        </tbody>
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="next >"
                                            onPageChange={this.handlePageClick}
                                            pageRangeDisplayed={this.state.perPage}
                                            pageCount={this.state.pageCount}
                                            previousLabel="< previous"
                                            renderOnZeroPageCount={null}
                                        />
                                    </table>
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>
                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2019</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
