import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  FormControl,
  InputAdornment,
  ListItemIcon,
  ListSubheader,
  OutlinedInput,
  Slide,
  Tooltip,
  useScrollTrigger,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, Theme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import withRouter from 'next/dist/client/with-router';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyIcon from '@material-ui/icons/Money';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Container from '@material-ui/core/Container';
import { withTheme } from '@material-ui/styles';
import { withSnackbar } from 'notistack';

class TemplateProvider extends React.Component<any, any> {
  state = {
    isOpen: false,
    isMobile: false,
    isVertical: false,
    innerWidth: 1600,
    innerHeight: 800,
    isIOS: false,
    open: false,
  };

  componentDidMount(): void {
    this.setState({
      isMobile: window.innerWidth <= 860,
      isVertical: window.innerWidth <= 1320,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      isIOS: process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent),
    });
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

const drawerWidth = 260;

const style = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },

  appBar: {
    marginLeft: theme.spacing(9),
    width: `calc(100% - ${theme.spacing(9) + 1}px)`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: `rgb(184, 184, 184, 0.35)`,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: `rgb(184, 184, 184, 0.35)`,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    overflowY: 'hidden',
    msOverflowX: 'hidden',
    msOverflowY: 'hidden',

    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },

    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

// @ts-ignore
export default withStyles(style)(
  withTheme(withSnackbar<any>(withRouter(TemplateProvider))),
);
