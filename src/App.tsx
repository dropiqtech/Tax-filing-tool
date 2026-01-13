import React from 'react';
import Button from '@atlaskit/button';
import { token } from '@atlaskit/tokens';
import TaxConversation from './TaxConversation';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="app-header">
          <div className="app-header-meta">
            <span className="app-brand">Tax Companion</span>
            <span className="app-tagline">Smart tax helper for growing businesses</span>
          </div>
          <Button appearance="primary" spacing="compact">
            Save Progress
          </Button>
        </header>

        <main className="app-main">
          <TaxConversation />
        </main>

        <footer className="app-footer">
          <span>Built for small &amp; medium businesses • Not legal or tax advice</span>
        </footer>
      </div>
      <div
        className="app-background"
        style={{
          background: `radial-gradient(circle at top, ${token(
            'color.background.selected.bold.blue',
            '#0C66E4'
          )} 0, transparent 60%)`
        }}
      />
    </div>
  );
};

export default App;

