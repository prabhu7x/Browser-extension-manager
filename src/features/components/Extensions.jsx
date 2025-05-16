import React, { useEffect, useState } from 'react'
import logo from '/assets/images/logo.svg'
import icon_sun from '/assets/images/icon-sun.svg'
import icon_moon from '/assets/images/icon-moon.svg'
import Ext_List from './Ext_List'

function Extensions() {
    const [light, setLight] = useState(false)
    const toggleTheme = ()=>{
      setLight(!light)
    }
    useEffect(()=>{
      if(light){
        document.body.style.backgroundColor = 'hsl(217,61%,90%)' }
        else{
        document.body.style.backgroundColor = 'hsl(227,75%,14%)'
        }
    },[light])

    const [Filter, setFilter] = useState('all')

  return (
    <div className={light ? "container light" : "container dark"}>
      <div className="logo">
        <img src={logo} alt="logo" />
        <div className="theme">
          {!light ? (
            <button onClick={toggleTheme}>
              <img src={icon_sun} alt="light" />
            </button>
          ) : (
            <button onClick={toggleTheme}>
              <img src={icon_moon} alt="dark" />
            </button>
          )}
        </div>
      </div>

      <div className="filter">
        <h1>Extensions List</h1>
        <div className="filter-btn-cont">
          <button className={Filter === 'all' ? 'active' : null} onClick={()=>setFilter('all')}>All</button>
          <button className={Filter === 'active' ? 'active' : null}onClick={()=>setFilter('active')}>Active</button>
          <button className={Filter === 'inactive' ? 'active' : null}onClick={()=>setFilter('inactive')}>Inactive</button>
        </div>
      </div>

      <Ext_List Filter={Filter} />
    </div>
  );
}

export default Extensions