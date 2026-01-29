import React, { useState } from 'react';
import { AppView } from './types';
import { FaceMap } from './components/FaceMap';
import { ClinicFinder } from './components/ClinicFinder';
import { BrandSafety } from './components/BrandSafety';
import { Alternatives } from './components/Alternatives';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { Shield, Map, Search, Leaf, Menu, X, Activity, User, LogOut, HeartHandshake } from 'lucide-react';

const MainApp: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { user, logout } = useAuth();

  const NavItem = ({ target, icon: Icon, label }: { target: AppView, icon: any, label: string }) => (
    <button
      onClick={() => {
        setView(target);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        view === target 
          ? 'bg-rose-50 text-rose-700 font-medium' 
          : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50/50'
      }`}
    >
      <Icon className={`w-4 h-4 ${view === target ? 'text-rose-500' : ''}`} />
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900">
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* New Logo Design */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView(AppView.HOME)}>
              <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
                 <div className="absolute inset-0 bg-rose-100 rounded-full opacity-60"></div>
                 <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-rose-500 relative z-10" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="fill-rose-50" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14h6" />
                 </svg>
              </div>
              <div>
                  <span className="font-serif text-2xl font-medium tracking-tight text-slate-800 block leading-none">
                    Aesthetica<span className="text-rose-400">.</span>
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-medium">Safe Beauty Guide</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <NavItem target={AppView.HOME} icon={HeartHandshake} label="Home" />
              <NavItem target={AppView.FACE_MAP} icon={Activity} label="Risk Map" />
              <NavItem target={AppView.CLINICS} icon={Map} label="Safe Clinics" />
              <NavItem target={AppView.BRANDS} icon={Search} label="Verify Brands" />
              <NavItem target={AppView.ALTERNATIVES} icon={Leaf} label="Alternatives" />
            </div>

            {/* User Auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 border-l border-slate-200 pl-6 ml-2">
                  <div className="text-right hidden lg:block">
                    <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                  </div>
                  <div className="w-9 h-9 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 font-bold border border-rose-100">
                    {user.avatar ? <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" /> : user.name.charAt(0)}
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-rose-600 px-4 py-2 transition-colors"
                >
                  <User className="w-4 h-4" /> Log In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-rose-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-2 shadow-xl absolute w-full z-40">
             <NavItem target={AppView.HOME} icon={HeartHandshake} label="Home" />
              <NavItem target={AppView.FACE_MAP} icon={Activity} label="Risk Map" />
              <NavItem target={AppView.CLINICS} icon={Map} label="Safe Clinics" />
              <NavItem target={AppView.BRANDS} icon={Search} label="Verify Brands" />
              <NavItem target={AppView.ALTERNATIVES} icon={Leaf} label="Alternatives" />
              <div className="border-t border-slate-100 pt-4 mt-4">
                 {user ? (
                   <div className="flex items-center justify-between p-2">
                     <span className="font-semibold text-slate-900">{user.name}</span>
                     <button onClick={logout} className="text-rose-500 text-sm">Log Out</button>
                   </div>
                 ) : (
                   <button onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }} className="w-full text-center py-3 bg-rose-50 text-rose-700 font-medium rounded-xl">Log In / Sign Up</button>
                 )}
              </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        
        {view === AppView.HOME && (
          <div className="animate-in fade-in zoom-in duration-700">
            <div className="text-center max-w-4xl mx-auto mt-8 mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                Trusted • Verified • Safe
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-900 mb-8 leading-tight tracking-tight">
                Beauty should never come at a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 italic pr-2">cost.</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
                Your trusted companion for safe aesthetic decisions. Explore our vascular risk map, verify products, and find natural, effective alternatives.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <button 
                  onClick={() => setView(AppView.FACE_MAP)}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Activity className="w-5 h-5 text-rose-300" />
                  Check Risk Zones
                </button>
                <button 
                   onClick={() => setView(AppView.ALTERNATIVES)}
                   className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:bg-rose-50 hover:border-rose-100 transition-all flex items-center justify-center gap-2"
                >
                  <Leaf className="w-5 h-5 text-emerald-500" />
                  See Natural Alternatives
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div 
                 onClick={() => setView(AppView.BRANDS)}
                 className="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all cursor-pointer"
                >
                 <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <Search className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-serif text-slate-900 mb-3 group-hover:text-rose-600 transition-colors">Brand Verifier</h3>
                 <p className="text-slate-500 leading-relaxed">Ensure your practitioner uses FDA-approved, authentic products. Know exactly what's in the syringe.</p>
               </div>

               <div 
                 onClick={() => setView(AppView.FACE_MAP)}
                 className="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all cursor-pointer"
                >
                 <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <Activity className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-serif text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">Safety Map</h3>
                 <p className="text-slate-500 leading-relaxed">Visualise the vascular danger zones of the face. Understand the risks before you book your appointment.</p>
               </div>

               <div 
                 onClick={() => setView(AppView.ALTERNATIVES)}
                 className="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all cursor-pointer"
                >
                 <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                   <Leaf className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-serif text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">Natural Options</h3>
                 <p className="text-slate-500 leading-relaxed">Not ready for fillers? Discover non-invasive, holistic treatments that rejuvenate without needles.</p>
               </div>
            </div>
          </div>
        )}

        {view === AppView.FACE_MAP && <FaceMap onLoginRequest={() => setAuthModalOpen(true)} />}
        {view === AppView.CLINICS && <ClinicFinder />}
        {view === AppView.BRANDS && <BrandSafety onLoginRequest={() => setAuthModalOpen(true)} />}
        {view === AppView.ALTERNATIVES && <Alternatives onLoginRequest={() => setAuthModalOpen(true)} />}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6 opacity-70">
                 <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4 text-rose-400" />
                 </div>
                 <span className="font-serif font-bold text-slate-700">Aesthetica.</span>
            </div>
            <p className="text-slate-400 text-sm mb-2 max-w-md mx-auto">
                <strong>Medical Disclaimer:</strong> This application is for educational purposes only. Always consult with a board-certified medical professional for personal advice.
            </p>
            <div className="mt-8 flex justify-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-rose-200"></span>
               <span className="w-1.5 h-1.5 rounded-full bg-rose-200"></span>
               <span className="w-1.5 h-1.5 rounded-full bg-rose-200"></span>
            </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;