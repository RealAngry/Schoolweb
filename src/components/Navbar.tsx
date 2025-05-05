import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, PenLine, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleDropdown = (key: string) => {
    if (dropdownOpen === key) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(key);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(null);
  };

  const handleLoginClick = () => {
    navigate('/login');
    closeMenu();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'About',
      path: '/about',
      dropdown: [
        { name: 'History', path: '/about#introduction' },
        { name: 'Our Journey', path: '/about#journey' },
        { name: 'Mission & Vision', path: '/about#mission' },
        { name: 'Leadership', path: '/about#leadership' },
      ],
    },
    { name: 'Faculty', path: '/faculty' },
    {
      name: 'Academics',
      path: '/academics',
      dropdown: [
        { name: 'Programs', path: '/academics#programs' },
        { name: 'Admissions', path: '/academics#admissions' },
        { name: 'Calendar', path: '/academics#calendar' },
        { name: 'Beyond Academics', path: '/beyond-academics' },
        { name: 'Campus & Facilities', path: '/facilities' },
      ],
    },
    { name: 'Gallery', path: '/gallery' },
    { name: 'News & Events', path: '/news' },
    { name: 'Contact', path: '/contact' },
    { 
      name: 'Admission', 
      path: '/admission', 
      isHighlighted: true 
    },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ 
        y: isNavVisible ? 0 : -100,
        scale: isScrolled ? 0.98 : 1
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      style={{
        position: 'fixed',
        width: '100%',
        top: '1rem',
        zIndex: 50,
        perspective: '1000px'
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className={`rounded-xl backdrop-blur-lg ${
            isScrolled 
              ? 'bg-white/90 shadow-lg' 
              : 'bg-white'
          }`}
          animate={{
            rotateX: isScrolled ? 2 : 0,
            translateZ: isScrolled ? -10 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          <div className="flex justify-between items-center py-4 px-6">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.dropdown ? (
                    <div className="flex items-center">
                      <motion.button
                        onClick={() => toggleDropdown(link.name)}
                        className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.name}
                        <ChevronDown size={16} className="ml-1" />
                      </motion.button>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `${link.isHighlighted ? 
                          'flex items-center px-4 py-1.5 bg-primary-600 text-white rounded-md shadow-md hover:bg-primary-700' : 
                          'text-gray-700 hover:text-primary-600'} transition-colors ${
                          isActive && !link.isHighlighted ? 'text-primary-600 font-medium' : ''
                        }`
                      }
                    >
                      <motion.span
                        whileHover={{ scale: 1.05, y: link.isHighlighted ? 0 : -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center"
                      >
                        {link.isHighlighted && <PenLine size={16} className="mr-1" />}
                        {link.name}
                      </motion.span>
                    </NavLink>
                  )}

                  {link.dropdown && (
                    <motion.div 
                      className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                      initial={{ opacity: 0, y: 10, rotateX: -20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        rotateX: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20
                        }
                      }}
                      style={{
                        transformOrigin: "top",
                        perspective: "1000px"
                      }}
                    >
                      {link.dropdown.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          onClick={closeMenu}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        >
                          <motion.span
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {item.name}
                          </motion.span>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {!user && (
                <button
                  onClick={handleLoginClick}
                  className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <motion.span
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center"
                  >
                    <LogIn size={16} className="mr-1" />
                    Login
                  </motion.span>
                </button>
              )}
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Staff Login Button (Mobile) */}
              {!user && (
                <motion.button
                  onClick={handleLoginClick}
                  className="flex items-center text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LogIn size={20} />
                </motion.button>
              )}

              {/* Dashboard Link if logged in (Mobile) */}
              {user && (
                <NavLink
                  to="/dashboard"
                  className="flex items-center text-gray-700"
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LogIn size={20} />
                  </motion.span>
                </NavLink>
              )}

              <motion.button
                className="p-2 text-gray-700 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white z-40 lg:hidden"
          >
            <div className="pt-20 px-8 space-y-4">
              {/* Add Staff Login Button to Mobile Menu */}
              {!user && (
                <motion.button
                  onClick={handleLoginClick}
                  className="w-full flex items-center justify-between py-2 text-gray-700 border-b border-gray-200"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg font-medium flex items-center">
                    <LogIn size={18} className="mr-2" />
                    Staff Login
                  </span>
                </motion.button>
              )}

              {/* Add Dashboard Link to Mobile Menu if logged in */}
              {user && (
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-between py-2 text-gray-700 border-b border-gray-200"
                >
                  <motion.span
                    className="text-lg font-medium flex items-center"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn size={18} className="mr-2" />
                    Dashboard
                  </motion.span>
                </NavLink>
              )}

              {navLinks.map((link) => (
                <div key={link.name} className="py-2">
                  {link.dropdown ? (
                    <div className="space-y-2">
                      <motion.button
                        onClick={() => toggleDropdown(link.name)}
                        className="flex items-center justify-between w-full text-left text-gray-700 py-2"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg font-medium">{link.name}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            dropdownOpen === link.name ? 'rotate-180' : ''
                          }`}
                        />
                      </motion.button>

                      <AnimatePresence>
                        {dropdownOpen === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="pl-4 space-y-2 border-l-2 border-primary-100"
                          >
                            {link.dropdown.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={closeMenu}
                                className="block py-2 text-gray-600 hover:text-primary-600"
                              >
                                {item.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) => 
                        `flex items-center py-2 ${
                          link.isHighlighted 
                            ? 'bg-primary-600 text-white rounded-lg shadow-md px-4 hover:bg-primary-700' 
                            : `text-gray-700 hover:text-primary-600 ${
                                isActive ? 'text-primary-600 font-medium' : ''
                              }`
                        }`
                      }
                    >
                      {link.isHighlighted && <PenLine size={18} className="mr-2" />}
                      <span className={`text-lg ${link.isHighlighted ? 'font-medium' : ''}`}>{link.name}</span>
                    </NavLink>
                  )}
                </div>
              ))}

              {!user && (
                <button
                  onClick={handleLoginClick}
                  className="flex items-center text-gray-700 py-2"
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;