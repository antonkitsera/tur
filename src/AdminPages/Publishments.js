import React from 'react';

import Layout from "../adminComponents/Layout"

import "../adminComponents/style/publishments.scss"

import Catalog from "../adminComponents/Catalog"

const PublishmentsPage = () => {

    return (
        <Layout>
            <section className="publishments">

            <Catalog subject="publishments"/>
            
            </section>
        </Layout>
    );
};

export default PublishmentsPage