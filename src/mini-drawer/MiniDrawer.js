
import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {Link} from 'react-router-dom';

import EuroSymbol from '@material-ui/icons/EuroSymbol';
import DateRange from '@material-ui/icons/DateRange';
import Add from '@material-ui/icons/Add';

import Login from '../login/Login';
import {useSelector} from 'react-redux';
import {userSelector} from '../redux/userState';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
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
    },
    link: {
      color: 'inherit', 
      textDecoration: 'inherit',
    },
    loginPopup: {
      position: 'absolute',
      right: '2rem',
      top: '5rem',
      zIndex: '1',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: '4rem',
    },
  }),
);

const links = [
    {
        text: 'Expenses',
        to: '/expenses',
        icon: <EuroSymbol/>,
    },
    {
        text: 'Historic expenses',
        to: '/historic',
        icon: <DateRange/>,
    },
    {
        text: 'Add expenses',
        to: '/expenses/add',
        icon: <Add/>,
    },
];


export default function MiniDrawer({title, children}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector(userSelector);
  
  const handleDrawerOpen = () => {setOpen(true)};
  const handleDrawerClose = () => {setOpen(false)};
  const handleLoginToogle = () => {setShowLogin((open) => !open)};
  const onLoginCallback = () => {setShowLogin(false)};

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="u-flex-row u-space-between">
          <div className="u-flex-row u-align-items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
          </div>
          <div className="u-flex-row u-align-items-center">
          {user.uid ?
            <React.Fragment> 
              <Typography variant="body1" noWrap>
                {user.displayName}
              </Typography>
              <Avatar style={{marginLeft: '1rem'}} alt={`${user.displayName}'s photo`} src={user.photoURL} /> 
            </React.Fragment>: 
            <Button className={classes.link} onClick={handleLoginToogle}>Log In</Button>}
          </div>
        </Toolbar>
      </AppBar>
      <Login className={clsx(classes.loginPopup, {
              [classes.hide]: !showLogin,
            })}
            onLoginCallback={onLoginCallback}
            />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {links.map(({text, to, icon}, i) => (
            <Link key={i} className={classes.link} to={to}>
              <ListItem button key={text}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}