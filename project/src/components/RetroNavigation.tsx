import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NavigationProps {
  pages: Array<{
    id: string;
    title: string;
    icon: LucideIcon;
  }>;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const RetroNavigation: React.FC<NavigationProps> = ({ pages, currentPage, onPageChange }) => {
  return (
    <nav className="relative z-10 bg-slate-800/50 border-b border-green-500/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {pages.map((page) => {
            const Icon = page.icon;
            const isActive = currentPage === page.id;
            
            return (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 border-b-2 transition-all duration-300
                  ${isActive 
                    ? 'border-green-500 bg-green-500/10 text-green-400' 
                    : 'border-transparent hover:border-green-500/50 hover:bg-green-500/5 text-green-300/70 hover:text-green-400'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wider">{page.title.toUpperCase()}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default RetroNavigation;