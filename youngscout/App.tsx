import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { PlayerList } from './components/PlayerList';
import { FilterBar } from './components/FilterBar';
import { PlayerModal } from './components/PlayerModal';
import { VideoUploadModal } from './components/VideoUploadModal';
import { Auth } from './components/Auth';
import { CreateProfileModal } from './components/CreateProfileModal';
import { ContactModal } from './components/ContactModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CookieConsent } from './components/CookieConsent'; // YENİ
import { Player, Position, UserSession, UserRole } from './types';
import { PLAYERS_DATA } from './constants';

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('authToken'));
  
  const [userSession, setUserSession] = useState<UserSession>(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole || UserRole.Talent;
    return {
      role: savedRole,
      consented: true, 
    };
  });
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<Position | 'all'>('all');
  const [ageRange, setAgeRange] = useState<[number, number]>([6, 17]);
  
  const [playerToContact, setPlayerToContact] = useState<Player | null>(null);
  const [contactedPlayerIds, setContactedPlayerIds] = useState<Set<number>>(new Set());
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showCookieBanner, setShowCookieBanner] = useState(false); // YENİ


  useEffect(() => {
    setPlayers(PLAYERS_DATA);
    // YENİ: Çerez onay durumunu kontrol et
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
        setShowCookieBanner(true);
    }
  }, []);

  const applyFilters = useCallback(() => {
    let result = players;

    // YÖNETİCİ OLMAYAN KULLANICILAR SADECE AKTİF PROFİLLERİ GÖRÜR
    if (userSession.role !== UserRole.Admin) {
        result = result.filter(player => player.status === 'active');
    }

    if (searchTerm) {
      result = result.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (positionFilter !== 'all') {
      result = result.filter(player => player.position === positionFilter);
    }

    result = result.filter(
      player => player.age >= ageRange[0] && player.age <= ageRange[1]
    );

    setFilteredPlayers(result);
  }, [players, searchTerm, positionFilter, ageRange, userSession.role]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  const handleOpenUploadModal = () => {
    setUploadModalOpen(true);
  };
  
  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
  };

  const handleUploadComplete = (videoUrl: string) => {
    console.log(`Video başarıyla yüklendi: ${videoUrl}. Oyuncu güncelleniyor...`);
    if (selectedPlayer) {
        const updatedPlayer = { ...selectedPlayer, videoUrl: videoUrl };
        handleUpdatePlayer(updatedPlayer);
    }
    setUploadModalOpen(false);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    const updatedPlayers = players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p);
    setPlayers(updatedPlayers);
    setSelectedPlayer(updatedPlayer);
  };
  
  const handleOpenCreateModal = () => setCreateModalOpen(true);
  const handleCloseCreateModal = () => setCreateModalOpen(false);

  const handleCreatePlayer = (newProfileData: Omit<Player, 'id' | 'videoUrl' | 'profileImageUrl' | 'talentScore' | 'tags' | 'status'>) => {
      const newPlayer: Player = {
          ...newProfileData,
          id: Date.now(),
          videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4',
          profileImageUrl: `https://i.pravatar.cc/400?u=${Date.now()}`,
          talentScore: Math.floor(Math.random() * 30) + 40,
          tags: [],
          status: 'active',
      };
      setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
      handleCloseCreateModal();
  };


  const handleLoginSuccess = (role: UserRole) => {
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('userRole', role);
    
    setUserSession({ role, consented: true });
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    const role = UserRole.Talent; 
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('userRole', role);
    setUserSession({ role, consented: true });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userConsented');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserSession({ role: UserRole.Talent, consented: false });
    setContactedPlayerIds(new Set()); 
    setNotifications([]);
  };

  const handleInitiateContact = (player: Player) => {
    setPlayerToContact(player);
  };

  const handleSendMessage = (message: string) => {
    if (playerToContact) {
      console.log(`Mesaj "${playerToContact.name}" adlı oyuncuya gönderildi: "${message}"`);
      setContactedPlayerIds(prev => new Set(prev).add(playerToContact.id));
      setNotifications(prev => [...prev, `Gözlemci'den yeni bir mesaj aldın: "${playerToContact.name}" hakkında.`]);
    }
    setPlayerToContact(null);
  };

  const handleShowNotifications = () => {
      if (notifications.length > 0) {
          alert(`Yeni Bildirimler:\n- ${notifications.join('\n- ')}`);
          setNotifications([]);
      } else {
          alert("Yeni bildiriminiz yok.");
      }
  };
  
  // YÖNETİCİ FONKSİYONLARI
  const handleSuspendPlayer = (playerId: number) => {
    setPlayers(players.map(p => 
        p.id === playerId 
        ? { ...p, status: p.status === 'active' ? 'suspended' : 'active' }
        : p
    ));
  };

  const handleDeletePlayer = (playerId: number) => {
      if (window.confirm("Bu oyuncu profilini kalıcı olarak silmek istediğinizden emin misiniz?")) {
        setPlayers(players.filter(p => p.id !== playerId));
      }
  };

  // YENİ: Çerez onayı işleyicileri
  const handleAcceptCookies = () => {
      localStorage.setItem('cookie_consent', 'true');
      setShowCookieBanner(false);
      console.log('Kullanıcı temel ve analitik çerezleri kabul etti.');
  };

  const handleDeclineCookies = () => {
      localStorage.setItem('cookie_consent', 'false');
      setShowCookieBanner(false);
      console.log('Kullanıcı sadece temel çerezleri kabul etti.');
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLoginSuccess} onRegister={handleRegisterSuccess} />;
  }
  
  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans">
      <Header 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
        userRole={userSession.role}
        onOpenCreateProfileModal={handleOpenCreateModal}
        notificationsCount={notifications.length}
        onShowNotifications={handleShowNotifications}
      />
      <main className="container mx-auto px-4 py-8">
        {userSession.role === UserRole.Admin ? (
            <AdminDashboard
                players={players}
                onSuspendPlayer={handleSuspendPlayer}
                onDeletePlayer={handleDeletePlayer}
            />
        ) : (
            <>
                <FilterBar
                  searchTerm={searchTerm}
                  onSearchTermChange={setSearchTerm}
                  positionFilter={positionFilter}
                  onPositionFilterChange={setPositionFilter}
                  ageRange={ageRange}
                  onAgeRangeChange={setAgeRange}
                />
                {filteredPlayers.length > 0 ? (
                  <PlayerList players={filteredPlayers} onSelectPlayer={handleSelectPlayer} />
                ) : (
                  <div className="text-center py-20">
                      {userSession.role === UserRole.Talent ? (
                         <>
                            <p className="text-2xl text-gray-400">Henüz oyuncu profili oluşturulmadı.</p>
                            <p className="text-gray-500 mt-2">Kendi profilini oluşturarak başlayabilirsin.</p>
                            <button
                                onClick={handleOpenCreateModal}
                                className="mt-8 inline-flex items-center justify-center bg-brand-primary text-white font-bold py-3 px-6 rounded-lg transition-colors hover:bg-green-500 text-base shadow-lg hover:shadow-green-500/50"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Yeni Profil Oluştur
                            </button>
                         </>
                      ) : (
                         <p className="text-2xl text-gray-400">Filtre kriterlerine uygun oyuncu bulunamadı.</p>
                      )}
                  </div>
                )}
            </>
        )}
      </main>
      {selectedPlayer && (
        <PlayerModal 
            player={selectedPlayer} 
            onClose={handleCloseModal}
            onOpenUploadModal={handleOpenUploadModal} 
            onUpdatePlayer={handleUpdatePlayer}
            userRole={userSession.role}
            onInitiateContact={handleInitiateContact}
            isContacted={contactedPlayerIds.has(selectedPlayer.id)}
        />
      )}
      {isUploadModalOpen && selectedPlayer && (
        <VideoUploadModal 
            player={selectedPlayer}
            onClose={handleCloseUploadModal}
            onUploadComplete={handleUploadComplete}
        />
      )}
      {isCreateModalOpen && (
        <CreateProfileModal
            onClose={handleCloseCreateModal}
            onCreatePlayer={handleCreatePlayer}
        />
      )}
      {playerToContact && (
        <ContactModal 
            player={playerToContact}
            onClose={() => setPlayerToContact(null)}
            onSendMessage={handleSendMessage}
        />
      )}
      {showCookieBanner && (
        <CookieConsent onAccept={handleAcceptCookies} onDecline={handleDeclineCookies} />
      )}
    </div>
  );
};

export default App;