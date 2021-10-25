import PeopleAltIcon  from '@material-ui/icons/PeopleAlt'
import CreateIcon from '@material-ui/icons/Create'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import AppsIcon from '@material-ui/icons/Apps'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import FiberManualRecordIcon  from '@material-ui/icons/FiberManualRecord'
import InsertCommentIcon  from '@material-ui/icons/InsertComment'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import { Add, ExpandLess, ExpandMore } from '@material-ui/icons'
import db from './firebase'
import { useStateValue } from './StateProvider'

function Sidebar() {

    const [channels, setChannels] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        // Run this code ONCE when the sidebar component loads
        db.collection('rooms').onSnapshot((snapshot) => (
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                }))
            )
        ))
    },[])

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <div className='sidebar__info'>
                    <h2>cp bootcamp</h2>
                <h3>
                    <FiberManualRecordIcon />
                    {user?.displayName}
                </h3>
                </div>
                <CreateIcon />
            </div>
                <SidebarOption Icon={InsertCommentIcon} title='Threads' />
                {/* <SidebarOption  title='Youtube' /> */}
                <SidebarOption Icon={InboxIcon} title='Mentions & reactions' />
                <SidebarOption Icon={DraftsIcon} title='Saved items' />
                <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
                <SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
                <SidebarOption Icon={AppsIcon} title='Apps' />
                <SidebarOption Icon={FileCopyIcon} title='File browser' />
                <SidebarOption Icon={ExpandLess} title='Show less' />
                <hr />
                <SidebarOption Icon={ExpandMore} title='Channels' />
                <hr />
                <SidebarOption Icon={Add} addChannelOption  title='Add Channel' />
                
                {/*  Connect to db and list all the channels */}
                {/* SidebarOptions */}
                {channels.map(channel => (
                    <SidebarOption title={channel.name} id={channel.id} key={channel.id}/>
                ))}

        </div>
    )
}

export default Sidebar
