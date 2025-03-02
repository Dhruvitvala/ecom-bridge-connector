
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// You can replace this with your actual logo URL
const LOGO_URL = "https://placehold.co/200x200/7c3aed/ffffff?text=EB";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
      scrolled ? 'bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-sm' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src={LOGO_URL} 
            alt="Ecom Bridge Logo" 
            className="h-8 w-auto rounded-lg" 
            onError={(e) => {
              // Fallback to the colored div if image fails to load
              e.currentTarget.style.display = 'none';
              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = 'h-8 w-8 rounded-lg bg-primary';
              e.currentTarget.parentNode?.insertBefore(fallbackDiv, e.currentTarget);
            }}
          />
          <span className="font-medium text-lg">Ecom Bridge</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('how-it-works');
            }}
          >
            How It Works
          </a>
          <a 
            href="#demo" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('demo');
            }}
          >
            Demo
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => window.open('/documentation', '_blank')}>
            Documentation
          </Button>
          <Button size="sm" onClick={() => window.open('/get-started', '_blank')}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
