'use client';

import React, { useEffect, useState } from 'react';

/**
 * Custom hook to handle hydration safely for Zustand stores with persistence
 * This prevents hydration mismatches between server and client
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // This will only run on the client side after hydration
    setHydrated(true);
  }, []);

  return hydrated;
}

/**
 * Higher-order component to wrap components that use persisted Zustand stores
 * This ensures the component only renders after hydration is complete
 */
export function withHydration<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  const WrappedComponent: React.ComponentType<T> = (props: T) => {
    const hydrated = useHydration();
    
    if (!hydrated) {
      return null; // or a loading skeleton
    }
    
    return React.createElement(Component, props);
  };
  
  WrappedComponent.displayName = `withHydration(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
