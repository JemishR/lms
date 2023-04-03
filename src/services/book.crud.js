import axios from 'axios';
import { API_URL } from './../Constants';
const headers = {
    accept: 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
}
export function index(limit, page=0, title='', author='', genre='', isbn='', publishDate='') {
    let url = `${API_URL}books?limit=${limit}`;
    if(page !== 0) {
        url += `&page=${page}`;
    }
    if(title !== '') {
        url += `&title=${title}`;
    }
    if(author !== '') {
        url += `&author=${author}`;
    }
    if(genre !== '') {
        url += `&genre=${genre}`;
    }
    if(isbn !== '') {
        url += `&isbn=${isbn}`;
    }
    if(publishDate !== '') {
        url += `&publishDate=${publishDate}`;
    }
    return axios.get(url, {headers: headers});
}

export function deleteBook(bookId) {
    return axios.delete(`${API_URL}books/${bookId}` , {headers: headers});
}

export function addBook(bodyFormData) {
    return axios.post(`${API_URL}books` , bodyFormData, {headers: headers});
}

export function bookDetail(bookId) {
    return axios.get(`${API_URL}books/${bookId}`, {headers: headers});
}

export function updateBook(bookId, title, isbn, genre, author, image, publisher, description, published) {
    return axios.put(`${API_URL}books/${bookId}` , { 'title':title, 'isbn':isbn, 'genre':genre, 'author':author, 'image':image, 'publisher':publisher, 'description':description, 'published':published }, {headers: headers});
}
