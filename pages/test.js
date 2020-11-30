import React, { useState } from 'react';
import { Page, Card } from '@shopify/polaris';
import Merchants from '../components/Merchants'
import Users from '../components/Users'

function Test(props) {

  return (
    <Page title="Multiple queries to a page">
      <Card>
        <Merchants jsonResponse={props} />
      </Card>
      <Card>
        <Users jsonResponse={props} />
      </Card>
    </Page>

  )
}

// This is to query Merchants list
Test.getInitialProps = async function () {
  const res = await fetch(`http://localhost:3001/merchants`)
  const data = await res.json()
  return { data }
}

// Question: How do I query Users list? there's only one getInitialProps()

export default Test;