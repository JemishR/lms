import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { bookDetail } from './../services/book.crud';
import DatePicker from "react-datepicker";
import "./../assets/css/datepicker.css";
import queryString from 'query-string';

export default class DetailPage extends Component {

    state = {
        redirect: false,
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

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/index' />
        }
    };

    render() {
        if(!localStorage.getItem('token'))
        {
            return <Redirect to='/' />
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
                                <li className="breadcrumb-item active">Detail</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Book Detail</div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputTitle" className="form-control" placeholder="Enter title" required="required" autoFocus="autofocus" disabled />
                                                        <label htmlFor="inputTitle">Enter title</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputIsbn" className="form-control" placeholder="Enter ISBN" required="required" disabled />
                                                        <label htmlFor="inputIsbn">Enter ISBN</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputAuthor" className="form-control" placeholder="Enter Author" required="required" disabled />
                                                        <label htmlFor="inputAuthor">Enter Author</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputGenre" className="form-control" placeholder="Enter Genre" required="required" disabled />
                                                        <label htmlFor="inputGenre">Enter Genre</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputImage" className="form-control" placeholder="Enter Image url" required="required" disabled />
                                                        <label htmlFor="inputImage">Enter Image</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputPublisher" className="form-control" placeholder="Enter Publisher" required="required" disabled/>
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
                                                    required="required" disabled/>
                                                </div>
                                                <div className="col-md-6">
                                                    <div>
                                                        <label htmlFor="inputPublishDate">Select Publish Date</label>
                                                    </div>
                                                    <DatePicker selected={this.state.selectedDate} onChange={(date) => this.handleDateChange(date)} disabled />
                                                </div>
                                            </div>
                                        </div>
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


