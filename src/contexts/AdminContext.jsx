import React, { createContext, useContext, useReducer } from 'react';

const AdminContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  isAdminPanelOpen: false
};

function adminReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case 'TOGGLE_ADMIN_PANEL':
      return {
        ...state,
        isAdminPanelOpen: !state.isAdminPanelOpen
      };
    case 'OPEN_ADMIN_PANEL':
      return {
        ...state,
        isAdminPanelOpen: true
      };
    case 'CLOSE_ADMIN_PANEL':
      return {
        ...state,
        isAdminPanelOpen: false
      };
    default:
      return state;
  }
}

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const login = (userData) => {
    // In a real implementation, this would validate credentials against your backend
    // For now, we'll simulate authentication
    dispatch({ type: 'LOGIN', payload: userData });
    localStorage.setItem('adminUser', JSON.stringify(userData));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('adminUser');
  };

  const toggleAdminPanel = () => {
    dispatch({ type: 'TOGGLE_ADMIN_PANEL' });
  };

  const openAdminPanel = () => {
    dispatch({ type: 'OPEN_ADMIN_PANEL' });
  };

  const closeAdminPanel = () => {
    dispatch({ type: 'CLOSE_ADMIN_PANEL' });
  };

  // Check if user is already logged in on initial load
  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('adminUser'));
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: storedUser });
    }
  }, []);

  return (
    <AdminContext.Provider value={{
      ...state,
      login,
      logout,
      toggleAdminPanel,
      openAdminPanel,
      closeAdminPanel
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
