import React, {Component} from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { addBook } from './../services/book.crud';
import {Link, Redirect} from "react-router-dom";
import DatePicker from "react-datepicker";
import "./../assets/css/datepicker.css";

export default class AddPage extends Component {

    state = {
        redirect: false,
        toDashboard: false,
        isLoading: false,
        searchDateInput: "",
        selectedDate: ""
    };

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

        let bodyFormData = new FormData();
        bodyFormData.set('title', title);
        bodyFormData.set('isbn', isbn);
        bodyFormData.set('genre', genre);
        bodyFormData.set('author', author);
        bodyFormData.set('image', image);
        bodyFormData.set('publisher', publisher);
        bodyFormData.set('description', description);
        bodyFormData.set('published', this.state.searchDateInput);
        addBook(bodyFormData).then(result => {
            if (result.data.success) {
                this.setState({redirect: true, isLoading: false})
            } else {
                alert(result.data.message);
            }
        }).catch(error => {
            this.setState({ toDashboard: true });
            console.log(error);
        });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/index' />
        }
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
                                <li className="breadcrumb-item active">Add</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Book Add</div>
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
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Add Book &nbsp;&nbsp;&nbsp;
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
                                    <span>Copyright © Your Website <div>{(new Date().getFullYear())}</div></span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
