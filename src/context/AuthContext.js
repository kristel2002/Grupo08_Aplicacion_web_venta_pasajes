import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Función auxiliar para formatear nombres
const formatUserName = (email, fullName = '') => {
  if (fullName && fullName.trim() !== '') {
    return fullName.trim();
  }
  const username = email.split('@')[0];
  return username
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Base de datos simulada de usuarios registrados (CLIENTES)
const simulatedUsersDB = [
  {
    email: 'maria.garcia@email.com',
    password: 'Password123!',
    fullName: 'María García López'
  },
  {
    email: 'carlos.rodriguez@email.com',
    password: 'Password123!',
    fullName: 'Carlos Rodríguez'
  }
];

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay usuario al cargar la aplicación
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const findUserInDB = (email, password) => {
    return simulatedUsersDB.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
  };

  const checkUserExists = (email) => {
    return simulatedUsersDB.some(u => 
      u.email.toLowerCase() === email.toLowerCase()
    );
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // --- AQUÍ ESTÁN TUS CUENTAS DE STAFF ---
      const adminUsers = [
        { 
          email: 'admin@tourest.com', 
          password: 'Admin123!', 
          role: 'admin', 
          name: 'Administrador Principal',
          id: 1
        },
        // --- CUENTA NUEVA PARA EL EMPLEADO ---
        { 
          email: 'empleado@tourest.com', 
          password: 'Tourest2025!', 
          role: 'admin', // Le damos rol admin para que entre al Dashboard de Staff
          name: 'Agente de Ventas',
          id: 3
        }
      ];

      // Buscar si es staff
      const adminUser = adminUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (adminUser) {
        const userData = {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
          displayName: adminUser.name
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, role: 'admin', user: userData };
      }

      // Buscar en clientes registrados
      const registeredUser = findUserInDB(email, password);
      if (registeredUser) {
        const userData = {
          id: Date.now(),
          email: registeredUser.email,
          name: registeredUser.fullName,
          role: 'user',
          displayName: registeredUser.fullName
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, role: 'user', user: userData };
      }

      // Login automático para nuevos usuarios (Demo)
      if (checkUserExists(email)) {
        return { 
          success: false, 
          error: 'Contraseña incorrecta. Por favor, intenta de nuevo.' 
        };
      }

      const newUserData = {
        id: Date.now(),
        email: email,
        name: formatUserName(email),
        role: 'user',
        displayName: formatUserName(email),
        isNewUser: true
      };
      
      setUser(newUserData);
      localStorage.setItem('user', JSON.stringify(newUserData));
      
      return { 
        success: true, 
        role: 'user', 
        user: newUserData,
        isNewUser: true 
      };

    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (checkUserExists(userData.email)) {
        return { success: false, error: 'Ya existe una cuenta con este email.' };
      }
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.nombre,
        role: 'user',
        displayName: userData.nombre,
        isNewUser: false
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, user: newUser, message: '¡Cuenta creada exitosamente!' };
    } catch (error) {
      return { success: false, error: 'Error al registrar usuario.' };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Error al actualizar perfil' };
    }
  };

  const value = {
    user, login, logout, register, updateProfile, loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    userDisplayName: user?.displayName || user?.name || 'Usuario'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;