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
  // Si tenemos un nombre completo, lo usamos
  if (fullName && fullName.trim() !== '') {
    return fullName.trim();
  }
  
  // Si no, generamos un nombre a partir del email
  const username = email.split('@')[0];
  
  // Convertir a formato nombre propio (capitalizar primera letra)
  const formattedName = username
    .replace(/[._-]/g, ' ') // Reemplazar puntos, guiones bajos y guiones con espacios
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return formattedName;
};

// Base de datos simulada de usuarios registrados
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
  },
  {
    email: 'ana.martinez@email.com', 
    password: 'Password123!',
    fullName: 'Ana Martínez'
  },
  {
    email: 'javier.lopez@email.com',
    password: 'Password123!',
    fullName: 'Javier López'
  },
  {
    email: 'laura.hernandez@email.com',
    password: 'Password123!',
    fullName: 'Laura Hernández'
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

  // Función para buscar usuario en la base de datos simulada
  const findUserInDB = (email, password) => {
    return simulatedUsersDB.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
  };

  // Función para verificar si el usuario ya existe
  const checkUserExists = (email) => {
    return simulatedUsersDB.some(u => 
      u.email.toLowerCase() === email.toLowerCase()
    );
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      // Simulamos una petición a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Credenciales de administrador (en producción esto vendría de una API)
      const adminUsers = [
        { 
          email: 'admin@tourest.com', 
          password: 'Admin123!', 
          role: 'admin', 
          name: 'Administrador Principal',
          id: 1
        },
        { 
          email: 'superadmin@tourest.com', 
          password: 'SuperAdmin123!', 
          role: 'admin', 
          name: 'Super Administrador',
          id: 2
        }
      ];

      // Buscar si es un administrador
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

      // Buscar en usuarios registrados
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

      // Usuario nuevo (login automático sin registro)
      // Verificar si el email ya existe pero la contraseña es incorrecta
      if (checkUserExists(email)) {
        return { 
          success: false, 
          error: 'Contraseña incorrecta. Por favor, intenta de nuevo.' 
        };
      }

      // Nuevo usuario - crear cuenta automáticamente
      const newUserData = {
        id: Date.now(),
        email: email,
        name: formatUserName(email),
        role: 'user',
        displayName: formatUserName(email),
        isNewUser: true // Marcar como usuario nuevo
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

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Función para registrar usuario
  const register = async (userData) => {
    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar si el usuario ya existe
      if (checkUserExists(userData.email)) {
        return { 
          success: false, 
          error: 'Ya existe una cuenta con este email. Por favor, inicia sesión.' 
        };
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
      
      return { 
        success: true, 
        user: newUser,
        message: '¡Cuenta creada exitosamente!'
      };
    } catch (error) {
      return { 
        success: false, 
        error: 'Error al registrar usuario. Por favor, intenta de nuevo.' 
      };
    }
  };

  // Función para actualizar perfil de usuario
  const updateProfile = async (profileData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        name: profileData.name || user.name,
        displayName: profileData.name || user.displayName,
        phone: profileData.phone || user.phone
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Error al actualizar perfil' };
    }
  };

  // Valor del contexto
  const value = {
    user,
    login,
    logout,
    register,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    userDisplayName: user?.displayName || user?.name || 'Usuario'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;