import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { ToastProvider } from '../components/Toast';
import ErrorBoundary from '../components/ErrorBoundary';

export default function AdminApp() {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));

  if (!token) {
    return (
      <ToastProvider>
        <ErrorBoundary>
          <Login onLogin={(t) => setToken(t)} />
        </ErrorBoundary>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <ErrorBoundary>
        <Dashboard onLogout={() => setToken(null)} />
      </ErrorBoundary>
    </ToastProvider>
  );
}
