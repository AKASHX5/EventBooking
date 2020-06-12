import React, {useState} from "react";
import {Mutation} from 'react-apollo'
import {gql} from 'apollo-boost'

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
// import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";

const Register = ({ classes }) => {

  const [username,setUsername] = useState(" ")
  const [email,setEmail] = useState(" ")
  const [password,setPassword] = useState(" ")

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel/>
        </Avatar>
        <Typography variant="headline">
          Register
        </Typography>


        <Mutation mutation={REGISTER_MUTATION}>
          {()=>{
            return ( 
              <form className = {classes.form}>
                <FormControl margin = "normal" required fullWidth>
                  <InputLabel htmlFor="username">username</InputLabel>
                  <Input id ="username" onChange={event=>setUsername(event.target.value)}/>
                </FormControl>

                <FormControl margin = "normal" required fullWidth>
                  <InputLabel htmlFor="email">email</InputLabel>
                  <Input id ="email" onChange={event=>setEmail(event.target.value)}/>
                </FormControl>

                <FormControl margin = "normal" required fullWidth>
                   <InputLabel htmlFor="password">Password</InputLabel>
                  <Input id ="password"onChange={event => setPassword(event.target.value)}/>
                </FormControl>

                <Button 
                type = 'submit'
                fullWidth
                variant='contained'
                color = 'secondary'
                >
                  Register
                </Button>
                <Button
                color='primary'
                variant='outlined'
                fullWidth>
                  Previous User? Login to Continue
                

                </Button>

              </form>


             );
          }}

        </Mutation> 

      </Paper>
    </div>
  );

};

const REGISTER_MUTATION = gql `
mutation($username:String!,$email:String!,$password:String!)
{
  createUser(username:$username,email:$email,password:$password)
  {
    user{
      username
      email
    }
  }
}`



const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  }
});

export default withStyles(styles)(Register);
