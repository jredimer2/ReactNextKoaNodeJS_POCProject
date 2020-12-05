import React, { useState } from 'react';
import { Page, Card } from '@shopify/polaris';
import Merchants from '../components/Merchants'
import Users from '../components/Users'
import config from '../config'

function Test(props) {

  // step4: destructure merchants and users and pass them to Merchants and Users Components
  const { merchants, users } = props;

  console.log('>> users = ', users)

  return (
    <Page title="Multiple queries to a page">
      <Card>
        <Users jsonResponse={users} />
      </Card>
    </Page>

  )
}

// This is to query Merchants list
Test.getInitialProps = async function () {
  let merchants = {};
  let users = {};
  
  // step1: get merchants
  /*
  try {
    const res1 = await fetch(`http://localhost:3001/merchants`)
    merchants = await res1.json()
  } catch(err) {
    console.error(err);
  }
*/
  // step2: get users
  try {
    const res2 = await fetch(`${config.dbrootport}/users/?merch_id=${config.merch_id}`)
    users = await res2.json()
  } catch(err) {
    console.error(err);
  }

  // step3: return them both together and in Test function destructure them
  return { merchants, users }
}

// Question: How do I query Users list? there's only one getInitialProps()

export default Test;