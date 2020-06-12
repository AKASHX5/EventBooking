import React from "react";
import withRoot from "./withRoot";
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'

const Root = () => (
    <Query query = {GET_EVENTS_QUERY}>
        {({data, loading, error})=>{
            if(loading) return <div>Loading</div>
            if(error) return <div>error</div>

            return <div>{JSON.stringify(data)}</div>

        }}

    </Query>
)

const GET_EVENTS_QUERY = gql`
{
    events{
        id
        name
        time
        
    }
}
`
export default withRoot(Root);
