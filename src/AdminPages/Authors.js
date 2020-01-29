import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Layout from "../adminComponents/Layout"

import "../adminComponents/style/authors.scss"

import Catalog from "../adminComponents/Catalog"

const AuthorsPage = () => {

    return (
        <Layout>
            <section className="authors">

            <Catalog subject="authors"/>
            
            </section>
        </Layout>
    );
};

export default AuthorsPage