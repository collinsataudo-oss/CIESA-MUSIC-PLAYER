/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, ReactNode } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Search, 
  Heart, 
  Music2, 
  Volume2, 
  Repeat, 
  Shuffle, 
  ListMusic, 
  Mic2,
  Home,
  Compass,
  Library,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GOSPEL_SONGS, CATEGORIES } from './constants';
import { Song } from './types';

export default function App() {
  const [currentSong, setCurrentSong] = useState<Song>(GOSPEL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [volume, setVolume] = useState(80);

  const filteredSongs = useMemo(() => {
    return GOSPEL_SONGS.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || song.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="flex h-screen bg-secondary text-accent overflow-hidden select-none" id="app-root">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col p-6 hidden md:flex" id="sidebar">
        <div className="flex items-center gap-2 mb-12" id="logo-container">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black" id="logo-icon">
            <Music2 size={24} />
          </div>
          <h1 className="font-serif font-bold text-xl tracking-tight text-white" id="app-title">CIESA</h1>
        </div>

        <nav className="flex-1 space-y-8" id="navigation">
          <div className="space-y-4" id="nav-main">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#555]" id="menu-label-main">Sanctuary</h2>
            <NavItem icon={<Home size={20} />} label="Home" active />
            <NavItem icon={<Compass size={20} />} label="Discover" />
            <NavItem icon={<Library size={20} />} label="My Library" />
          </div>

          <div className="space-y-4" id="nav-playlists">
            <div className="flex items-center justify-between" id="playlist-header">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#555]" id="menu-label-playlists">Your Library</h2>
              <button className="p-1 hover:bg-white/5 rounded-full transition-colors text-[#555]" id="add-playlist-btn">
                <Plus size={16} />
              </button>
            </div>
            <NavItem icon={<ListMusic size={20} />} label="Sunday Service" />
            <NavItem icon={<ListMusic size={20} />} label="Hymnal Classics" />
            <NavItem icon={<Heart size={20} />} label="Favorites" counter={favorites.length} />
          </div>
        </nav>

        <div className="mt-auto p-4 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A]" id="sidebar-promo">
          <p className="text-[10px] text-primary uppercase font-bold mb-1" id="promo-label">Verse of the Day</p>
          <p className="text-xs text-[#AAA] italic leading-relaxed" id="promo-text">"Sing to the Lord a new song; sing to the Lord, all the earth."</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-secondary" id="main-content">
        {/* Header */}
        <header className="p-6 h-24 flex items-center justify-between sticky top-0 z-10 bg-secondary/80 backdrop-blur-md border-b border-border" id="header">
          <div className="relative w-full max-w-md" id="search-container">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
            <input 
              type="text" 
              placeholder="Search for hymns, artists, or sermons..." 
              className="w-full bg-[#181818] border border-border pl-10 pr-4 py-2.5 rounded-full text-sm outline-none focus:border-primary/50 transition-colors text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
          </div>

          <div className="flex items-center gap-4" id="user-actions">
            <button className="flex items-center gap-2 text-sm font-medium hover:bg-white/5 p-2 px-4 rounded-lg transition-colors text-[#888] hover:text-white" id="lyrics-btn">
              <Mic2 size={18} />
              <span>Lyrics</span>
            </button>
            <div className="w-10 h-10 bg-[#222] rounded-full border border-[#333] flex items-center justify-center overflow-hidden text-primary font-serif italic text-lg" id="user-avatar">
              J
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-10 pb-32 pt-8" id="scrollable-content">
          <section className="mb-12" id="hero-section">
            <div className="relative h-64 rounded-[2rem] overflow-hidden group bg-gradient-to-br from-[#1A1812] to-[#0A0A0A] border border-[#221F18] flex items-center" id="featured-banner">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #FDE68A 0%, transparent 60%)' }}></div>
              <div className="pl-12 w-2/3 z-10" id="banner-content">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold" id="banner-badge">Weekly Feature</span>
                <h2 className="text-white font-serif text-4xl mt-2 mb-6 leading-tight italic" id="banner-title">Morning Praise:<br/>Reflections on Grace</h2>
                <button className="bg-primary hover:bg-amber-100 text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-105" id="banner-play-btn">
                  Listen Now
                </button>
              </div>
              <div className="flex-1 flex justify-center items-center opacity-20 pr-12" id="banner-decorative">
                <Music2 size={160} strokeWidth={0.5} className="text-primary" />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-12" id="categories-section">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none" id="categories-list">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                    activeCategory === cat 
                    ? 'bg-primary text-black border-primary shadow-lg shadow-primary/10' 
                    : 'bg-card text-[#888] hover:text-white border-border hover:border-[#333]'
                  }`}
                  id={`cat-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Song List */}
          <section id="songs-section">
            <div className="flex justify-between items-end mb-8" id="section-header">
              <h3 className="font-serif text-2xl text-white italic" id="section-title">Sacred Collections</h3>
              <button className="text-xs text-primary border-b border-primary uppercase font-bold tracking-widest pb-0.5" id="view-all-songs">View All</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="song-grid">
              <AnimatePresence mode="popLayout">
                {filteredSongs.map((song, index) => (
                  <motion.div
                    key={song.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-card p-5 rounded-2xl border border-border hover:border-[#333] transition-all cursor-pointer relative"
                    onClick={() => handlePlaySong(song)}
                    id={`song-card-${song.id}`}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-5 bg-gradient-to-tr from-[#1E1B10] to-[#2D2D2D] flex items-center justify-center" id={`song-thumb-container-${song.id}`}>
                      {song.thumbnail ? (
                        <img 
                          src={song.thumbnail} 
                          alt={song.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-4xl">🕊️</span>
                      )}
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" id={`song-hover-overlay-${song.id}`}>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black transform scale-90 group-hover:scale-100 transition-transform" id={`song-play-icon-${song.id}`}>
                          {currentSong.id === song.id && isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(song.id);
                        }}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                          favorites.includes(song.id) ? 'bg-primary text-black' : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        id={`song-fav-btn-${song.id}`}
                      >
                        <Heart size={14} fill={favorites.includes(song.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="px-1">
                      <h4 className="font-bold text-sm text-white truncate mb-1.5" id={`song-title-${song.id}`}>{song.title}</h4>
                      <p className="text-xs text-[#666] truncate font-medium" id={`song-artist-${song.id}`}>{song.artist}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>

        {/* Player Bar */}
        <AnimatePresence>
          {currentSong && (
            <motion.footer 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-0 left-0 right-0 h-24 bg-[#0F0F0F] border-t border-border px-8 flex items-center justify-between z-50"
              id="player-bar"
            >
              {/* Current Track Info */}
              <div className="flex items-center gap-4 w-1/4" id="player-track-info">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#222] border border-[#333] flex items-center justify-center shadow-lg" id="player-thumb">
                  <img src={currentSong.thumbnail} alt={currentSong.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="overflow-hidden" id="player-meta">
                  <h5 className="font-bold text-sm text-white truncate" id="player-title">{currentSong.title}</h5>
                  <p className="text-xs text-[#666] truncate mt-0.5" id="player-artist">{currentSong.artist}</p>
                </div>
                <button 
                  onClick={() => toggleFavorite(currentSong.id)}
                  className={`ml-2 transition-colors ${favorites.includes(currentSong.id) ? 'text-primary' : 'text-[#444] hover:text-[#666]'}`}
                  id="player-fav-btn"
                >
                  <Heart size={18} fill={favorites.includes(currentSong.id) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center gap-2.5 max-w-xl w-1/2" id="player-controls-container">
                <div className="flex items-center gap-8" id="player-buttons">
                  <button className="text-[#444] hover:text-primary transition-colors" id="shuffle-btn">
                    <Shuffle size={16} />
                  </button>
                  <button className="text-[#E0E0E0]/60 hover:text-white transition-colors" id="prev-btn">
                    <SkipBack size={20} fill="currentColor" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-all"
                    id="play-pause-btn"
                  >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                  </button>
                  <button className="text-[#E0E0E0]/60 hover:text-white transition-colors" id="next-btn">
                    <SkipForward size={20} fill="currentColor" />
                  </button>
                  <button className="text-[#444] hover:text-primary transition-colors" id="repeat-btn">
                    <Repeat size={16} />
                  </button>
                </div>
                
                {/* Progress Bar (Mock) */}
                <div className="w-full flex items-center gap-3" id="player-progress">
                  <span className="text-[10px] font-bold text-[#444]" id="progress-current">1:24</span>
                  <div className="flex-1 h-1 bg-[#222] rounded-full overflow-hidden group cursor-pointer relative" id="progress-bar">
                    <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all w-[35%]" id="progress-fill"></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#444]" id="progress-total">{currentSong.duration}</span>
                </div>
              </div>

              {/* Extras */}
              <div className="flex items-center justify-end gap-6 w-1/4" id="player-extras">
                <div className="flex items-center gap-3 w-32" id="volume-container">
                  <Volume2 size={16} className="text-[#555]" />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-[#222] rounded-full appearance-none cursor-pointer"
                    id="volume-slider"
                  />
                </div>
                <button className="text-[#555] hover:text-white transition-colors" id="lyrics-drawer-btn">
                  <ListMusic size={18} />
                </button>
              </div>
            </motion.footer>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, counter }: { icon: ReactNode, label: string, active?: boolean, counter?: number }) {
  return (
    <button className={`flex items-center justify-between w-full p-2.5 rounded-xl text-sm font-medium transition-all ${
      active ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-[#888] hover:bg-white/5 hover:text-white'
    }`} id={`nav-item-${label.toLowerCase().replace(' ', '-')}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      {counter !== undefined && counter > 0 && (
        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${active ? 'bg-black/20' : 'bg-primary/10 text-primary'}`}>
          {counter}
        </span>
      )}
    </button>
  );
}
