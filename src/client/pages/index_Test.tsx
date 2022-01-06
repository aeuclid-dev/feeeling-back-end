import React from 'react';
import TemplateProvider from '../components/TemplateProvider';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Container,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
type IndexProps = {
  query: {
    title: string;
  };
};
const useStyles = makeStyles((theme) => ({
  test: {
    backgroundColor: 'blue',
    width: 150,
    height: 150,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  subsubmit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function Index(props: IndexProps) {
  console.log('index!!!! plz');
  const classes = useStyles();
  return (
    <TemplateProvider>
      <b>HELLO :)</b>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.test}>
          <span>test2</span>
        </div>
        <div className={classes.paper}>
          <span>test22</span>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        </div>
      </Container>
    </TemplateProvider>
  );
}
