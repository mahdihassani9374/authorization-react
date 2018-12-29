import React, { Component } from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import ReactWOW from 'react-wow';
import ajaxImage from '../../images/ajax-loader.gif';

export default class Main extends Component {
    constructor(props) {
        super(props)
        console.log('welcome to main');
        this.state = {
            products:[],
            nextPage:1,
            hasMore:true,
        }
    }
    
    loadFunc () {
        axios.get(`http://roocket.org/api/products?page=${this.state.nextPage}`)
        .then((response)=> {
            const {last_page , current_page , data} = response.data.data;
            setTimeout(() => {
                this.setState(prevState => ({
                    products:[...prevState.products , ...data],
                    hasMore : current_page == last_page ? false : true ,
                    nextPage :  current_page + 1
                }));
            }, 1000);
            console.log(this.state.hasMore);
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <ReactWOW animation='fadeIn'>
                    <div className="jumbotron">
                        <h1 className="text-right">فروشگاه اینترنتی با ری اکت</h1>
                        <p className="text-right">
                            فروشگاه نوشته شده با ری اکت <br />
                            اولین پروژه تستی با ری اکت جی اس 
                        </p> 
                    </div>
                </ReactWOW>
                <div>
                    <InfiniteScroll className="row"
                        pageStart={this.state.nextPage}
                        loadMore={this.loadFunc.bind(this)}
                        hasMore={this.state.hasMore}
                        loader={<div className="text-center" style={{width:'100%'}} key={0}>
                            <img src={ajaxImage} className="img-loader" />
                        </div>}
                    >
                        {
                            this.state.products.map((row,key)=>
                                <ReactWOW animation='fadeIn' key={key}>
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="card">
                                            <img className="card-img-top" src={row.image} alt="Card image cap"></img>
                                            <div className="card-body">
                                                <h5 className="card-title text-right">{row.title}</h5>
                                                <p className="card-text text-right">{row.body.slice(0,100)} ......</p>
                                                <Link to={`/product/${row.id}`} className="btn btn-outline-danger float-right">جزيیات بیشتر </Link>
                                            </div>
                                        </div>
                                    </div>
                                </ReactWOW>
                            )
                        }
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}
