import { useState } from 'react';
import { AiOutlineLineChart, AiOutlineDatabase } from 'react-icons/ai';
import '../styles/NavBar.css';

const NavBar = ({ updateAppState }) => {
  const [activePage, setActivePage] = useState('chart');

  const updatePage = (pageState) => {
    setActivePage(pageState);
    updateAppState(pageState);
    console.log('changed state to', pageState);
  }

  return (
    <div className='navbar'>
      {activePage === 'chart' 
        ? (
          <>
            <button className='active-icon' onClick={() => updatePage('chart')}>
              <AiOutlineLineChart size={50} style={{ padding: '3px' }}/>
            </button>
            <button className='inactive-icon' onClick={() => updatePage('database')}>
              <AiOutlineDatabase size={50} style={{ padding: '3px' }}/>
            </button>
          </>
        )
        : (
          <>
            <button className='inactive-icon' onClick={() => updatePage('chart')}>
              <AiOutlineLineChart size={50} style={{ padding: '3px' }} />
            </button>
            <button className='active-icon' onClick={() => updatePage('database')}>
              <AiOutlineDatabase size={50} style={{ padding: '3px' }} />
            </button>
          </>
        )
      }
    </div>
  )
}

export default NavBar;