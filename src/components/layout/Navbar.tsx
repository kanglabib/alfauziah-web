'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Moon, Sun, UserPlus } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-md border-b border-gray-100 dark:border-gray-800'
          : 'bg-[#0F5E4A] text-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Resmi */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 lg:w-10 lg:h-10 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/logo-alfauziah.png"
                alt="Logo Pondok Pesantren Al Fauziah"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isScrolled
                        ? 'text-gray-700 dark:text-gray-200 hover:text-[#0F5E4A] dark:hover:text-emerald-400 hover:bg-[#0F5E4A]/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isScrolled
                        ? 'text-gray-700 dark:text-gray-200 hover:text-[#0F5E4A] dark:hover:text-emerald-400 hover:bg-[#0F5E4A]/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-[#0F5E4A]/5 hover:text-[#0F5E4A] dark:hover:text-emerald-400 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Tombol CTA PPDB (Desktop Only) */}
            <Link
              href="/ppdb"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#c39e2e] text-[#0F5E4A] font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar PPDB</span>
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg transition-all ${
                isScrolled
                  ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all ${
                isScrolled
                  ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Popup */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-[#0F5E4A]/5 hover:text-[#0F5E4A] transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-gray-500 dark:text-gray-400 hover:text-[#0F5E4A] hover:bg-[#0F5E4A]/5 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Tombol CTA Mobile */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <Link
                href="/ppdb"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 bg-[#D4AF37] text-[#0F5E4A] font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar PPDB Online</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}