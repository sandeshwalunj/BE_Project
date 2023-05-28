import React, { useEffect, useState } from 'react';  
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';  

import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { USER_TYPES } from '../enum/UsersEnum';

import Profile from '../Profile';

import '../../css/App.css';

/**
 * Header component. Present in every page when user is an authenticated one.
 * 
 * @author syuki
 */
export default function Header({isAuthenticated, userType, drizzle, drizzleState}) {

    const [showProfile, setShowProfile] = useState();
    const [anchorEl, setAnchorEl] = useState();
    const [profilePicture, setProfilePicture] = useState();
    const [profilePicture1,setProfilePicture1]=useState()
    const [profiletext,setProfiletext]=useState('');

    function toggleProfile(event) {
        let profilePicturePath = "/profile-designs/Producer.png";
        if(userType == USER_TYPES[1]){
            profilePicturePath = "/profile-designs/Distributor.png";
        } 
        if(userType == USER_TYPES[2]){
            profilePicturePath = "/profile-designs/Retailer.png";
        } 
        setProfilePicture(profilePicturePath);
        setShowProfile(!showProfile);
        setAnchorEl(event.currentTarget);
    }
    useEffect(() => {
        let profilePicturePath1 = "/profile-designs/Producer.png";
        let profiletxt='Producer';
        if(userType == USER_TYPES[1]){
            profilePicturePath1 = "/profile-designs/Distributor.png";
            profiletxt='Distributor';
        } 
        if(userType == USER_TYPES[2]){
            profilePicturePath1 = "/profile-designs/Retailer.png";
            profiletxt='Retailer';
        } 
        setProfilePicture1(profilePicturePath1);
        setProfiletext(profiletxt)
      }, []);


    if(!isAuthenticated){
        return null;
    } else {
        return(
            <div> 
                <AppBar position="static" color="secondary" elevation={0}>
                    <Toolbar> 
                        <NavLink exact to="/" className="undecorated-links"> 
                            <IconButton color="inherit" >
                                <img src={profilePicture1} style={{border:'2px solid rgba(255, 255, 255, 2)', borderRadius:'50%',margin:'5px' }} alt="logo" id="app-logo-header"/>
                                <Typography variant='h6' style={{textDecoration:'underline',textDecorationColor:'yellow'}} noWrap>{profiletext}</Typography>  
                            </IconButton>
                        </NavLink>
                        <NavLink exact to="/" className="undecorated-links iconbutton"> 
                            <IconButton color="inherit">
                            </IconButton>
                        </NavLink>
                        <IconButton color="inherit" id="right-anchored-menu-item" onClick={toggleProfile}>
                            <AccountCircle style={{ fontSize: 40 }}/> 
                            <ArrowDropDownIcon className="dropdown-arrow-icon" />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {showProfile ? 
                    <Profile 
                        open={showProfile} 
                        close={toggleProfile}
                        userType={userType} 
                        drizzle={drizzle} 
                        drizzleState={drizzleState}
                        anchorEl={anchorEl}
                        profilePicturePath={profilePicture}
                    />
                    : null
                }   
            </div>
        );
    }
};
