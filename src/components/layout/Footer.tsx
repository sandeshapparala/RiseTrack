'use client';

import Link from 'next/link';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} RiseTrack OS</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500" /> for personal growth
            </span>
          </div>

          {/* Center Section - Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link 
              href="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="/help" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Help
            </Link>
          </div>

          {/* Right Section - Social Links */}
          <div className="flex items-center gap-3">
            <Link 
              href="https://github.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link 
              href="https://twitter.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link 
              href="mailto:support@risetrack.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section - Status */}
        <div className="mt-4 pt-4 border-t text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
            <span>•</span>
            <span>Version 1.0.0-beta</span>
            <span>•</span>
            <span>Phase 1 - Foundation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
