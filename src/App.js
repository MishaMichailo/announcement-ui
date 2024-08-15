import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation,Navigate  } from 'react-router-dom';
import AddAnnouncement from './components/AddAnnouncement';
import AnnouncementList from './components/AnnouncementList';
import AnnouncementDetails from './components/AnnouncementDetails';
import EditAnnouncement from './components/EditAnnouncement';
import PNavbar from './components/Navbar';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

function AppContent() {
  const location = useLocation();

  const isNotFoundPage = location.pathname === "*" || location.pathname === "/404";

  return (
    <div className="container">
      {!isNotFoundPage && <h1>Announcement Management</h1>}
      {!isNotFoundPage && <PNavbar />}
      <Routes>
        <Route path="/add" element={<AddAnnouncement />} />
        <Route path="/details/:id" element={<AnnouncementDetails />} />
        <Route path="/edit/:id" element={<EditAnnouncement />} />
        <Route path="/" element={<AnnouncementList />} />
        <Route path="/404" element={ <NotFoundPage /> } />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;