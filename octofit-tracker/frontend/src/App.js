import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <header className="app-hero py-4">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3 text-start">
              <img
                src="/octofitapp-small.png"
                alt="OctoFit logo"
                className="app-logo rounded-3"
              />
              <div>
                <h1 className="display-6 fw-semibold mb-1 app-heading">OctoFit Tracker</h1>
              <p className="mb-0 text-secondary">Track activity, teams, and performance in one dashboard.</p>
              </div>
            </div>
            <a
              className="btn btn-outline-dark"
              href="https://github.com/lkunitskaya-sketch/skills-build-applications-w-copilot-agent-mode"
              target="_blank"
              rel="noreferrer"
            >
              Project Link
            </a>
          </div>
        </div>
      </header>

      <nav className="navbar navbar-expand bg-white border-bottom sticky-top shadow-sm mb-4">
        <div className="container">
          <ul className="navbar-nav flex-row flex-wrap gap-2">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active fw-semibold' : ''}`}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/activities" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active fw-semibold' : ''}`}>Activities</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/leaderboard" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active fw-semibold' : ''}`}>Leaderboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/teams" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active fw-semibold' : ''}`}>Teams</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active fw-semibold' : ''}`}>Users</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/workouts" className={({ isActive }) => `nav-link px-3 rounded-pill ${isActive ? 'active fw-semibold' : ''}`}>Workouts</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container pb-5">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="/"
            element={(
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4 p-md-5">
                  <h2 className="h3 mb-3">Welcome to your fitness dashboard</h2>
                  <p className="text-secondary mb-4">
                    Use the navigation above to explore activities, users, teams, workouts, and leaderboard data from the backend API.
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    <NavLink to="/activities" className="btn btn-primary">View Activities</NavLink>
                    <NavLink to="/leaderboard" className="btn btn-outline-primary">View Leaderboard</NavLink>
                  </div>
                </div>
              </div>
            )}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
