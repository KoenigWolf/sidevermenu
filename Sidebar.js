"use client";

import { useState } from 'react';
import { FaHome, FaCog, FaBell, FaFileAlt, FaTools, FaCamera, FaCloudSun, FaChevronLeft } from 'react-icons/fa';

const icons = {
  dashboard: <FaHome />,
  settings: <FaCog />,
  alerts: <FaBell />,
  reports: <FaFileAlt />,
  maintenance: <FaTools />,
  camera: <FaCamera />,
  weather: <FaCloudSun />,
  toggle: <FaChevronLeft />,
};

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: icons.dashboard, id: 'dashboard' },
    { name: 'Monitoring Settings', icon: icons.settings, id: 'settings' },
    { name: 'Alert Log', icon: icons.alerts, id: 'alerts' }, // badgeプロパティを削除
    { name: 'Log and Report', icon: icons.reports, id: 'reports' },
    { name: 'Maintenance Management', icon: icons.maintenance, id: 'maintenance' },
    { name: 'Camera Footage Link', icon: icons.camera, id: 'camera' },
    { name: 'Meteorological Data Link', icon: icons.weather, id: 'weather' },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="toggle-button" onClick={() => setIsCollapsed(!isCollapsed)}>
        {icons.toggle}
      </div>
      {menuItems.map(item => (
        <div
          key={item.id}
          className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => setActiveItem(item.id)}
        >
          <div className="icon">{item.icon}</div>
          {!isCollapsed && <span>{item.name}</span>}
        </div>
      ))}
    </div>
  );
}
