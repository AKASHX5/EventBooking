import React from "react";
import withRoot from "./withRoot";
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'
import App from './pages/App'
import Profile from './pages/Profile'
import Header from './components/Shared/Header'

// import EventCalendar from './EventCalendar/EventCalendar'



import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EventCalendar from "./components/EventCalendar/EventCalendar";

const Root = () => (
    <Query query = {GET_EVENTS_QUERY}>
        {({data, loading, error})=>{
            if(loading) return <div>Loading</div>
            if(error) return <div>error</div>

            // return <div>{JSON.stringify(data)}</div>

            return (
                <Router>
                    <>
                    <Header/>
                    <Switch>
                    <Route exact path='/' component = {App}/>
                    <Route path='/profile/:id' component = {Profile}/>
                    <Route path='/calendar' component = {EventCalendar}/>
                    </Switch>
                    </>
                    
                </Router>
            )



        }}

    </Query>
)

const GET_EVENTS_QUERY = gql`
{
   events {
       id 
       name
       time 
   }
}
`

// const ME_QUERY = gql`

//     me {
//         email
//         id
//         password
//         username
//     }
// `


export default withRoot(Root);
