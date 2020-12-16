import React, { useState, useCallback, Component } from 'react';
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';
// import testAuthenticator from 'components/SimAuthentication'
// import AuthenticateButton from 'components/AuthenticateButton'

// step 3: use ExampleContext 
import { ExampleContext } from '../contexts/ExampleContext';

class Users extends Component {

  static contextType = ExampleContext;

  //console.log('********** Users  this.props.updatedUsers =', props.updatedUsers)

  /*
    try {
  
      if (props.jsonResponse) {
        
        const [sortedRows, setSortedRows] = useState(null);
    
        var formatted = {
          rows: []
        };
    
        var newRows = props.jsonResponse.map((row) => {
          formatted.rows.push([
            row.firstname,
            row.lastname,
            row.merchant_id
          ])
        })
    
        const rows = sortedRows ? sortedRows : formatted.rows;
        const handleSort = useCallback(
          (index, direction) => setSortedRows(sortCurrency(rows, index, direction)),
          [rows],
        );
  */


  /*
      <Page title="Users 2 List">
        <h1>{props.greeting}</h1>

        <Card>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text'
            ]}
            headings={[
              'First Name',
              'Last Name',
              'Merch Id'
            ]}
            rows={rows}
            totals={['', '', '']}
            sortable={[false, false, true]}
            defaultSortDirection="descending"
            initialSortColumnIndex={4}
            onSort={handleSort}
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
          />
        </Card>

      </Page>

  */
  render() {

    const { users } = this.context;

    return (
      <Page title="Users 2 List">
        {
          users && users.length ? 
          users.map(user => {
            return <div key={user.email}>
              <p>Name: ${user.firstname} ${user.lastname}</p>
              <p>Email: ${user.email}</p>
              <p>Merchant ID: ${user.merchant_id}</p>
              <hr />
            </div>
            
          })
          :
          <h1>User list is empty</h1>
        }
      </Page>
    )

  }
}

export default Users;

//  return (

//   <Page title="Users 2 List">
//     <h1>Empty list. Click on GetToken button first to simulate authentication.</h1>
//   </Page>
// )


/*
function sortCurrency(rows, index, direction) {
  return [...rows].sort((rowA, rowB) => {
    const amountA = parseFloat(rowA[index].substring(1));
    const amountB = parseFloat(rowB[index].substring(1));
    return direction === 'descending' ? amountB - amountA : amountA - amountB;
  });
}
*/