import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Typography from "@material-ui/core/Typography";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const EventList = () => (
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
 events {
     id 
     name
      startTime
      endTime
      bookingStatus

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


const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  details: {
    alignItems: "center"
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      color: "black"
    }
  }
};

export default withStyles(styles)(EventList);
