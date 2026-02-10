
import React, { useState, useEffect } from 'react';
import ChatView from './views/ChatView';
import ItineraryView from './views/ItineraryView';
import GuardianView from './views/GuardianView';
import DiscoveryView from './views/DiscoveryView';
import NegotiatorView from './views/NegotiatorView';
import AdminDashboard from './views/AdminDashboard';
import LoginView from './views/LoginView';
import SplashScreen from './components/SplashScreen';

type ViewType = 'chat' | 'itinerary' | 'discovery' | 'guardian' | 'negotiate' | 'admin';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('chat');
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // High-level functional bridge: Discovery can trigger "View Itinerary"
  const navigateTo = (view: ViewType) => setActiveView(view);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  if (!isLoggedIn) {
    return <LoginView onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'chat': return <ChatView />;
      case 'itinerary': return <ItineraryView />;
      case 'discovery': return <DiscoveryView onSelectTrip={() => setActiveView('itinerary')} />;
      case 'guardian': return <GuardianView />;
      case 'negotiate': return <NegotiatorView onAccept={() => setActiveView('chat')} />;
      case 'admin': return <AdminDashboard />;
      default: return <ChatView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark overflow-hidden animate-reveal">
      <div className="flex-1 overflow-hidden relative">
        {renderView()}
      </div>

      <nav className="flex-none bg-background-dark/95 backdrop-blur-lg border-t border-white/10 px-6 py-3 safe-bottom z-50">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <NavItem 
            icon="chat_spark" 
            label="Agent" 
            isActive={activeView === 'chat'} 
            onClick={() => setActiveView('chat')} 
          />
          <NavItem 
            icon="calendar_month" 
            label="Trip" 
            isActive={activeView === 'itinerary'} 
            onClick={() => setActiveView('itinerary')} 
          />
          <NavItem 
            icon="explore" 
            label="Explore" 
            isActive={activeView === 'discovery'} 
            onClick={() => setActiveView('discovery')} 
          />
          <NavItem 
            icon="shield_person" 
            label="Safety" 
            isActive={activeView === 'guardian'} 
            onClick={() => setActiveView('guardian')} 
          />
          <NavItem 
            icon="dashboard" 
            label="System" 
            isActive={activeView === 'admin'} 
            onClick={() => setActiveView('admin')} 
          />
        </div>
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ 
  icon: string; 
  label: string; 
  isActive: boolean; 
  onClick: () => void 
}> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${
      isActive ? 'text-primary scale-110' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    <span className={`material-symbols-outlined text-2xl ${isActive ? 'filled' : ''}`}>
      {icon}
    </span>
    <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
  </button>
);

export default App;
