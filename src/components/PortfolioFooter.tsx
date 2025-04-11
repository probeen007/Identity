
import React from 'react';

interface PortfolioFooterProps {
  showTerminal: boolean;
}

const PortfolioFooter: React.FC<PortfolioFooterProps> = ({ showTerminal }) => {
  return (
    <footer className="p-4 text-center text-terminal-accent text-sm z-10 relative mt-auto">
      <p className="glitch-effect">
        {showTerminal ? "Type 'help' for available commands" : "Click Open Terminal to begin"}
      </p>
      <div className="text-terminal-accent/70 text-sm mt-2">
        © {new Date().getFullYear()} All Rights Reserved
      </div>
    </footer>
  );
};

export default PortfolioFooter;
