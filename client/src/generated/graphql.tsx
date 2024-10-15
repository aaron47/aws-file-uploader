import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  getUserByEmail?: Maybe<UserDocument>;
  getUserFiles: Array<RetreiveFileResponseDto>;
  getUsers: Array<UserDocument>;
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};

export type RetreiveFileResponseDto = {
  __typename?: 'RetreiveFileResponseDto';
  base64: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
};

export type UserDocument = {
  __typename?: 'UserDocument';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  files?: Maybe<Array<Scalars['String']['output']>>;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'UserDocument', _id: string, email: string }> };

export type GetUserFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFilesQuery = { __typename?: 'Query', getUserFiles: Array<{ __typename?: 'RetreiveFileResponseDto', contentType: string, fileName: string, base64: string }> };


export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    _id
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserFilesDocument = gql`
    query GetUserFiles {
  getUserFiles {
    contentType
    fileName
    base64
  }
}
    `;

/**
 * __useGetUserFilesQuery__
 *
 * To run a query within a React component, call `useGetUserFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserFilesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFilesQuery, GetUserFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFilesQuery, GetUserFilesQueryVariables>(GetUserFilesDocument, options);
      }
export function useGetUserFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFilesQuery, GetUserFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFilesQuery, GetUserFilesQueryVariables>(GetUserFilesDocument, options);
        }
export function useGetUserFilesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserFilesQuery, GetUserFilesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFilesQuery, GetUserFilesQueryVariables>(GetUserFilesDocument, options);
        }
export type GetUserFilesQueryHookResult = ReturnType<typeof useGetUserFilesQuery>;
export type GetUserFilesLazyQueryHookResult = ReturnType<typeof useGetUserFilesLazyQuery>;
export type GetUserFilesSuspenseQueryHookResult = ReturnType<typeof useGetUserFilesSuspenseQuery>;
export type GetUserFilesQueryResult = Apollo.QueryResult<GetUserFilesQuery, GetUserFilesQueryVariables>;