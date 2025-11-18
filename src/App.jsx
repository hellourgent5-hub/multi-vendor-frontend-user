import { BrowserRoutehere
        Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Sidebar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/vendors" element={<Vendors />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
