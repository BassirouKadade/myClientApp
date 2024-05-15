import { IoMdSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import './indexTop.css'
import Avatar from '@mui/material/Avatar';

export default function NavBarTop() {

  return (
    <div className="info-profile-nav">
      <div className="">
        <CiSearch />
      </div>
      <div className="notification-settings-user-icons">
        <IoIosNotifications className="profile-icon notification" />
        <IoMdSettings className="profile-icon setting" />
        <Avatar sx={{    margin:"0 5px",width:35, height: 35,fontSize:15 }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </div>
    </div>
  )
}






