"use client";
import React from "react";

function MainComponent() {
  const [activeTab, setActiveTab] = React.useState("All Display");
  const [collapsed, setCollapsed] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "fa-home" },
    { name: "Monitoring Settings", icon: "fa-cog" },
    { name: "Alert Log", icon: "fa-bell", notifications: 2 },
    { name: "Log and Report", icon: "fa-chart-bar" },
    { name: "Maintenance Management", icon: "fa-toolbox" },
    { name: "Camera Footage Link", icon: "fa-video" },
    { name: "Meteorological Data Link", icon: "fa-cloud" },
  ];

  const locations = [
    {
      name: "百合湖_2312",
      tilt: "+2.4",
      waterLevel: "+3.2",
      image: "/yurikoLocation.jpg",
    },
    {
      name: "檜子湖_2401",
      tilt: "-1.8",
      waterLevel: "+4.5",
      image: "/hinokikoLocation.jpg",
    },
    {
      name: "櫻湖_2312",
      tilt: "+0.9",
      waterLevel: "+2.8",
      image: "/sakurakoLocation.jpg",
    },
    {
      name: "蓬山_2312",
      tilt: "+3.1",
      waterLevel: "-1.2",
      image: "/houyamaLocation.jpg",
    },
  ];

  const handleMenuItemClick = (item) => setCurrentPage(item.name);
  const handleTabClick = (tab) => setActiveTab(tab);
  const handleSearch = (e) => {
    if (e.key === "Enter") console.log(`Searching for: ${e.target.value}`);
  };

  const NavItem = ({ item }) => (
    <div
      className={`mb-4 flex items-center cursor-pointer transition-all duration-300 hover:bg-blue-800 rounded p-2 ${
        currentPage === item.name ? "bg-blue-700" : ""
      }`}
      onClick={() => handleMenuItemClick(item)}
    >
      <i className={`fas ${item.icon} mr-3 text-xl`}></i>
      {!collapsed && <span className="text-sm">{item.name}</span>}
      {!collapsed && item.notifications && (
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {item.notifications}
        </span>
      )}
    </div>
  );

  const LocationCard = ({ location }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-lg font-bold mb-2">{location.name}</h3>
      <img
        src={location.image}
        alt={`Monitoring location ${location.name}`}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div className="flex justify-between mb-4">
        <DataDisplay
          label="Tilt"
          value={location.tilt}
          unit="cm"
          threshold={2}
        />
        <DataDisplay
          label="Water Level"
          value={location.waterLevel}
          unit="cm"
          threshold={3}
        />
      </div>
      <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
      <div className="flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Alert Log
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
          Detailed Data
        </button>
      </div>
    </div>
  );

  const DataDisplay = ({ label, value, unit, threshold }) => (
    <div className="text-center">
      <p className="text-sm text-gray-600">{label}</p>
      <div
        className={`text-lg font-bold ${
          parseFloat(value) > threshold ? "text-red-500" : "text-green-500"
        }`}
      >
        {value} {unit}
      </div>
    </div>
  );

  const TabButton = ({ tab }) => (
    <button
      onClick={() => handleTabClick(tab)}
      className={`text-white px-4 py-2 rounded-t-lg transition-all duration-300 ${
        activeTab === tab
          ? "bg-white bg-opacity-20"
          : "hover:bg-white hover:bg-opacity-10"
      }`}
    >
      {tab === "All Display"
        ? "全体表示"
        : tab === "Solar Panels"
        ? "ソーラーパネル"
        : tab === "Water Level"
        ? "水位計"
        : "地滑り"}
    </button>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location, index) => (
        <LocationCard key={index} location={location} />
      ))}
    </div>
  );

  const renderPage = () => {
    if (currentPage === "Dashboard") {
      return renderDashboard();
    } else {
      return <div className="p-4">{currentPage} Page</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <nav
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-gradient-to-b from-black to-blue-900 text-white transition-all duration-300`}
      >
        <div className="p-4">
          {menuItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-r transition-all duration-300 hover:bg-gray-200"
        >
          <i
            className={`fas ${
              collapsed ? "fa-chevron-right" : "fa-chevron-left"
            }`}
          ></i>
        </button>
      </nav>

      <div className="flex-1">
        <header className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                onKeyPress={handleSearch}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div className="flex space-x-4">
            {["All Display", "Solar Panels", "Water Level", "Landslide"].map(
              (tab) => (
                <TabButton key={tab} tab={tab} />
              )
            )}
          </div>
        </header>

        <main className="p-8">{renderPage()}</main>
      </div>
    </div>
  );
}

export default MainComponent;