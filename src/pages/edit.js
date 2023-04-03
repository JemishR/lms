import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { bookDetail, updateBook } from './../services/book.crud';
import DatePicker from "react-datepicker";
import "./../assets/css/datepicker.css";
import queryString from 'query-string';

export default class EditPage extends Component {

    state = {
        id: '',
        redirect: false,
        isLoading: false,
        searchDateInput: "",
        selectedDate: ""
    };

    componentDidMount() {
        const idObj = queryString.parse(this.props.location.search);
        const id = idObj.id;
        bookDetail(id).then(response => {
            const book = response.data.data;
            this.setState({id: book.id });
            document.getElementById('inputTitle').value = book.title;
            document.getElementById('inputIsbn').value = book.isbn;
            document.getElementById('inputGenre').value = book.genre;
            document.getElementById('inputAuthor').value = book.author;
            document.getElementById('inputImage').value = book.image;
            document.getElementById('inputPublisher').value = book.publisher;
            document.getElementById('inputDesc').value = book.description;
            this.setState({ selectedDate: new Date(book.published) });
        }).catch(error => {
            this.setState({ redirect: true });
            console.log(error);
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const title = document.getElementById('inputTitle').value;
        const isbn = document.getElementById('inputIsbn').value;
        const genre = document.getElementById('inputGenre').value;
        const author = document.getElementById('inputAuthor').value;
        const image = document.getElementById('inputImage').value;
        const publisher = document.getElementById('inputPublisher').value;
        const description = document.getElementById('inputDesc').value;
        updateBook(this.state.id, title, isbn, genre, author, image, publisher, description, this.state.searchDateInput).then(result => {
            if (result.data.success) {
                this.setState({redirect: true, isLoading: false})
            }
        }).catch(error => {
            this.setState({ redirect: true });
            console.log(error);
        });
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

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/index' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        if(!localStorage.getItem('token'))
        {
            return <Redirect to='/' />
        }else if(localStorage.getItem('role') !== '1') {
            return <Redirect to='/index' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Edit</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Book Edit</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputTitle" className="form-control" placeholder="Enter title" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputTitle">Enter title</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputIsbn" className="form-control" placeholder="Enter ISBN" required="required" />
                                                        <label htmlFor="inputIsbn">Enter ISBN</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputAuthor" className="form-control" placeholder="Enter Author" required="required" />
                                                        <label htmlFor="inputAuthor">Enter Author</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputGenre" className="form-control" placeholder="Enter Genre" required="required"/>
                                                        <label htmlFor="inputGenre">Enter Genre</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputImage" className="form-control" placeholder="Enter Image url" required="required" />
                                                        <label htmlFor="inputImage">Enter Image</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputPublisher" className="form-control" placeholder="Enter Publisher" required="required"/>
                                                        <label htmlFor="inputPublisher">Enter Publisher</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div>
                                                        <label htmlFor="inputDesc">Enter Description</label>
                                                    </div>
                                                    <textarea id="inputDesc" className="form-control" 
                                                    required="required" />
                                                </div>
                                                <div className="col-md-6">
                                                    <div>
                                                        <label htmlFor="inputPublishDate">Select Publish Date</label>
                                                    </div>
                                                    <DatePicker selected={this.state.selectedDate} onChange={(date) => this.handleDateChange(date)} />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Update Book &nbsp;&nbsp;&nbsp;
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </button>
                                    </form>
                                    {this.renderRedirect()}
                                </div>
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


