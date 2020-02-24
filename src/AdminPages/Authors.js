import React from 'react';

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