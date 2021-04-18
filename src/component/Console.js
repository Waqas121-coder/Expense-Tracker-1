import React, {useEffect, useState} from 'react'
import {Button} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import WorkIcon from '@material-ui/icons/Work';
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useTheme from "@material-ui/core/styles/useTheme";
import MenuIcon from '@material-ui/icons/Menu';
import deepPurple from "@material-ui/core/colors/deepPurple";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LockIcon from '@material-ui/icons/Lock';
import CodeIcon from '@material-ui/icons/Code';
import firebase from "firebase/app"
import "firebase/auth"

const drawerWidth = 250;


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    stepperRoot: {
        width: '100%',
    },
    canvasPaper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2,1),
    },
    root1:{
        height:'100%'
    },
    eliminationGrid : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

const Console=props=>{

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menu,setMenu]=useState(1)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;


    const logoutClick=()=>{
        firebase.auth().signOut()
    }



    useEffect(()=>{
        console.log(firebase.auth().currentUser)
    },[])

    const drawer = (
        <div style={{padding:'10px'}}>
            <center>
                <div style={{marginTop:'6px'}}>
                    <Button
                        style={{marginLeft:'5px'}}
                        variant={'outlined'}
                        onClick={logoutClick}
                        startIcon={<ExitToAppIcon/>}
                        color={'secondary'}>
                        Logout
                    </Button>
                </div>
            </center>
            <center>
                <Avatar src={firebase.auth().currentUser.photoURL} style={{width:'80px',height:'80px',marginTop:'20px'}} className={classes.purple}>
                    {firebase.auth().currentUser.displayName.substr(0,1)}
                </Avatar>

            </center>
            <center>
                <div style={{marginTop:'20px',fontSize:'1.2em'}}>
                    {firebase.auth().currentUser.displayName}
                </div>
            </center>
            <List style={{marginTop:'20px'}}>
                <ListItem selected={menu==1} onClick={()=>{setMenu(1)}} button>
                    <ListItemIcon><AccountBoxIcon /> </ListItemIcon>
                    <ListItemText primary={'My Profile'} />
                </ListItem>
                <ListItem selected={menu==2} onClick={()=>{setMenu(2)}} button>
                    <ListItemIcon><EditIcon /> </ListItemIcon>
                    <ListItemText primary={'Edit Profile'} />
                </ListItem>
                <ListItem selected={menu==3} onClick={()=>{setMenu(3)}} button>
                    <ListItemIcon><OfflineBoltIcon /> </ListItemIcon>
                    <ListItemText primary={'Circulars'} />
                </ListItem>
                <ListItem selected={menu==4} onClick={()=>{setMenu(4)}} button>
                    <ListItemIcon><DescriptionIcon /> </ListItemIcon>
                    <ListItemText primary={'My Applications'} />
                </ListItem>
                <ListItem selected={menu==5} onClick={()=>{setMenu(5)}} button>
                    <ListItemIcon><AssignmentTurnedInIcon /> </ListItemIcon>
                    <ListItemText primary={'Admit Card'} />
                </ListItem>
                <ListItem selected={menu==6} onClick={()=>{setMenu(6)}} button>
                    <ListItemIcon><LockIcon /> </ListItemIcon>
                    <ListItemText primary={'My Account'} />
                </ListItem>
            </List>
            <div style={{bottom:0,position:'absolute'}}>
                <List>
                    <ListItem button>
                        <ListItemIcon><CodeIcon/></ListItemIcon>
                        <ListItemText primary={'Developers'} />
                    </ListItem>
                </List>
            </div>
        </div>
    );

    return(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar  style={{backgroundColor:'#0090ff',color:'#ffffff'}}  className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <WorkIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap>
                        Expense Tracker
                    </Typography>
                    <div  style={{position:'absolute',right:'10px',display:'flex'}}>
                        <IconButton
                            onClick={handleClick}
                            color="inherit"
                        >
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={logoutClick}>Logout</MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
                <Divider/>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </div>
    )
}


export default Console
