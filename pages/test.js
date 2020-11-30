import React, { useState } from 'react';
import { Page, Card } from '@shopify/polaris';
import Merchants from '../components/Merchants'
import Users from '../components/Users'

function Test(props) {

  // step4: destructure merchants and users and pass them to Merchants and Users Components
  const { merchants, users } = props;

  return (
    <Page title="Multiple queries to a page">
      <Card>
        <Merchants jsonResponse={merchants} />
      </Card>
      <Card>
        <Users jsonResponse={users} />
      </Card>
    </Page>

  )
}

// This is to query Merchants list
Test.getInitialProps = async function () {
  // step1: get merchants
  const res1 = await fetch(`http://localhost:3001/merchants`)
  const merchants = await res1.json()

  // step2: get users
  const res2 = await fetch(`http://localhost:3001/users`)
  const users = await res2.json()

  // step3: return them both together and in Test function destructure them
  return { merchants, users }
}

// Question: How do I query Users list? there's only one getInitialProps()

export default Test;