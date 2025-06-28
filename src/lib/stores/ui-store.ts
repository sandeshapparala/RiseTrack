import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';
export type SidebarState = 'expanded' | 'collapsed';

interface UIState {
  // Theme
  theme: Theme;
  isDarkMode: boolean;
  
  // Layout
  sidebarState: SidebarState;
  isMobile: boolean;
  
  // Modals and overlays
  modals: {
    createGoal: boolean;
    createTask: boolean;
    editProfile: boolean;
    settings: boolean;
  };
  
  // Loading states
  pageLoading: boolean;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }>;
  
  // Actions
  setTheme: (theme: Theme) => void;
  setIsDarkMode: (isDark: boolean) => void;
  toggleSidebar: () => void;
  setSidebarState: (state: SidebarState) => void;
  setIsMobile: (isMobile: boolean) => void;
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;
  setPageLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  theme: 'system',
  isDarkMode: false,
  sidebarState: 'expanded',
  isMobile: false,
  modals: {
    createGoal: false,
    createTask: false,
    editProfile: false,
    settings: false,
  },
  pageLoading: false,
  notifications: [],
  
  // Actions
  setTheme: (theme) => set({ theme }),
  
  setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
  
  toggleSidebar: () =>
    set((state) => ({
      sidebarState: state.sidebarState === 'expanded' ? 'collapsed' : 'expanded'
    })),
  
  setSidebarState: (sidebarState) => set({ sidebarState }),
  
  setIsMobile: (isMobile) => set({ isMobile }),
  
  openModal: (modal) =>
    set((state) => ({
      modals: { ...state.modals, [modal]: true }
    })),
  
  closeModal: (modal) =>
    set((state) => ({
      modals: { ...state.modals, [modal]: false }
    })),
  
  closeAllModals: () =>
    set({
      modals: {
        createGoal: false,
        createTask: false,
        editProfile: false,
        settings: false,
      }
    }),
  
  setPageLoading: (pageLoading) => set({ pageLoading }),
  
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { ...notification, id };
    
    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }));
    
    // Auto remove notification after duration (default 5 seconds)
    const duration = notification.duration || 5000;
    setTimeout(() => {
      get().removeNotification(id);
    }, duration);
  },
  
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    })),
  
  clearNotifications: () => set({ notifications: [] }),
}));
