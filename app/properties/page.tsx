import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import getListings from '../actions/getListings';
import ClientOnly from '../components/ClientOnly';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return(
        <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />;
   </ClientOnly>
    )}

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return(
        <ClientOnly>
            <EmptyState title="No properties found" subtitle="Looks like you don't have properties " />;
        </ClientOnly>
    )
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;