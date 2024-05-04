import { IoMdSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import './indexTop.css'
export default function NavBarTop() {
  return (
    <div className="info-profile">
          <div className="info-profile-1">
            <CiSearch />
          </div>
         <div className="info-profile-2">
                  <IoIosNotifications className="spanProfile" />
                  <IoMdSettings className="spanProfile setting" />
                  <CiUser className="spanProfile" />
                
         </div>
   </div>
  )
}
