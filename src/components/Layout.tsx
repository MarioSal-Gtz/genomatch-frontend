import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

export default function Layout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="gradient-mesh min-h-screen">
      <Sidebar />
      <main className="ml-72 p-8">
        <Outlet />
      </main>
    </div>
  );
}
