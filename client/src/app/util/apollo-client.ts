'use client';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
	uri: 'http://localhost:8080/graphql',
	credentials: 'include',
});

export const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	credentials: 'include',
});
