import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import sortBy from 'lodash.sortby';
import { BLOG_DATA } from '../data/blog_data';
import profilePic from '../public/vercel.svg'
import moment from "moment";
import { Navbar, Nav } from "react-bootstrap";

export default function SmartBlogList() {

    const staticBlogPosts = BLOG_DATA.staticBlogPosts;
    const navbarPropsArr = ["NEXTJS BLOG", "Blogs", "Pricing", "Testimonial"];
    const router = useRouter()
    const goToLink = (link) => {
        console.log(`go to ${link.toLowerCase()}`)
        // router.push(`${link.toLowerCase()}`);
    };

    const returnSortedList = (list, key) => {
        try {
            let returnedList;
            if (key === 'NONE') {
                returnedList = list;
                return returnedList;
            };
            if (key === 'DATE') {
                returnedList = sortBy(list, 'created_at').reverse();
                return returnedList;
            };
            if (key === 'TITLE') {
                returnedList = sortBy(list, 'blog_post_title');
                return returnedList;
            };
            return list;
        } catch (err) {
            console.log('log returnSortedLIst');
            console.log(err);
        }
    };

    const Item = ({ blog, index }) => {

        return <>
            <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                    <Image
                        width='100'
                        height='100'
                        className="card-img-top"
                        src={profilePic}
                        alt="Card image cap"
                    />
                    <div className="card-body">
                        <h4
                            style={{ color: 'indigo' }}
                        >{blog.blog_post_title}</h4>
                        {blog.blog_post_body.length > 0 ?
                            blog.blog_post_body.map(txtObj => (
                                <>
                                    {
                                        typeof txtObj === 'object' ?
                                            <p className="card-text">
                                                {txtObj.subtitle}
                                            </p>
                                            :
                                            <small>
                                                {txtObj}
                                            </small>
                                    }
                                </>
                            ))
                            : <></>
                        }
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small className="text-muted">
                                {moment(
                                    blog.created_at
                                ).format("LLL")}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    };

    const List = ({ list }) => {
        // the sort will be use to set the sort key
        const [sortKey2, setSort] = useState('NONE');
        // set function for setting key 
        const handleSort = (sortKey) => {
            setSort(sortKey);
        };
        // pass sort key into SORT object                 
        const sortedList = returnSortedList(list, sortKey2);
        return (
            <>
                <div className="d-flex justify-content-center">
                    <span>
                        <button
                            className="btn btn-outline-primary"
                            type="button" onClick={() => handleSort('TITLE')}>
                            Sort by title
                        </button>
                    </span>
                    <span>
                        <button
                            className="btn btn-outline-success"
                            type="button" onClick={() => handleSort('DATE')}>
                            Sort by date
                        </button>
                    </span>
                </div>

                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {
                                sortedList.map((blog, index) => (
                                    <>
                                        <Item
                                            key={index}
                                            blog={blog}
                                        />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </>
        );
    };

    return <>
        <Head>
            <title>{`A NextJS Blog`}</title>
            <meta name="description" content={staticBlogPosts.map((each, index) => each.blog_post_title + ' ')}></meta>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="/styles.css" />
        </Head>

        <header>
            <Navbar
                fixed="top" bg="light" expand="lg"
                style={{
                    zIndex: '99999',
                    borderBottom: '2px solid #6610f2',
                    padding: "0.5rem"
                }}
            >
                <Navbar.Brand
                    href="#"
                    onClick={() => router.push('/')}
                >

                    <a href="#" className="navbar-brand d-flex align-items-center">
                        <strong>Blog</strong>
                        <svg
                            style={{
                                // stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                            }}
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                    </a>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        // className="mr-auto my-2 my-lg-0"
                        className="me-auto mb-1"
                        style={{
                            // marginBottom: '80px',        
                        }}
                    // navbarScroll
                    >
                        {navbarPropsArr.length > 0 ?
                            navbarPropsArr.map(((name, index) =>
                                <li
                                    key={index}
                                >
                                    <Nav.Link
                                        onClick={() => goToLink(name)}
                                    >{name}</Nav.Link>
                                </li>
                            ))
                            :
                            <></>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>


        <section
            style={{
                height: '12rem',
                backgroundColor: 'indigo',
                color: '#fff'
            }}
            className="jumbotron text-center mb-3 mt-5"
        >
            <div className="container">
                <h1 className="jumbotron-heading">A Bootstrap NextJS Blog</h1>
                <p className="lead">This blog was created with Bootstrap and NextJS.</p>
            </div>
        </section>

        <List list={staticBlogPosts} />

        <footer className="text-muted">
            <div className="container">
                <p className="float-right">
                    <a href="#">Back to top</a>
                </p>
                <p>Album example is &copy; Bootstrap, but please download and customize it for yourself!</p>
                <p>New to Bootstrap? <a href="../../">Visit the homepage</a> or read our <a href="../../getting-started/">getting started guide</a>.</p>
            </div>
        </footer>





    </>
};