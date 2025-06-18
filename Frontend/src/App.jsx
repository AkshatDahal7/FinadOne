import NavBar from '../core/components/common/navbar.jsx'
import SideNav from '../core/components/common/SideNav.jsx'
import Dashboard from '../core/pages/dashboard'
import Sales from '../core/pages/Sales.jsx';
import './App.css';
function App() {
  return (
    <>
      <NavBar />
      <div className="layout-container">
        <SideNav />
        <div className="main-content">
          <Dashboard />
          {/* <Sales/> */}
        </div>
      </div>
    </>
  )
}

export default App
