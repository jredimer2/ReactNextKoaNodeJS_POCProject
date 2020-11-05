import React, { useState } from 'react';

import store from 'store-js';


function Index() {

  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get('ids');

  console.log('emptyState = ', emptyState);

  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set('ids', idsFromResources);
    console.log('this is product ids', store.get('ids'));
  }

  return (
    <h1>This is the INDEX page</h1>
  )
}

export default Index;