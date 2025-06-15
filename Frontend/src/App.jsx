import NavBar from '../core/components/common/navbar.jsx'
import SideNav from '../core/components/common/SideNav.jsx'
import Dashboard from '../core/pages/dashboard'
import './App.css';
function App() {
  return (
    <>
      <NavBar />
      <div className="layout-container">
        <SideNav />
        <div className="main-content">
          <Dashboard />
        </div>
      </div>
    </>
  )
}

export default App
