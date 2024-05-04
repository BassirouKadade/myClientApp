import './dashboard.css';
import NavBarTop from "./navbartop/NavBarTop"
import NavBarLeft  from './navbarleft/NavBarLeft'
import { Outlet } from 'react-router-dom';

const styleArticle={
      padding:"0 20px ",
      width: "calc(100% - 310px )"
}
const styleSection={
         padding:0
}
export default function Dashboard() {
  return (
    <section  style={styleSection} className="container-fluid">
      <NavBarLeft />
      <article   style={styleArticle}>
              <NavBarTop />
              <Outlet></Outlet> 
      </article>
    </section>
  );
}
