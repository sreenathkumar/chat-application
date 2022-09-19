import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import PrivateRoute from './components/PrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';
import Conversation from './pages/Conversation';
import Inbox from './pages/Inbox';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    const authChecked = useAuthCheck();

    return !authChecked ? (
        <div>Loading...</div>
    ) : (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <AuthRoute>
                            <Register />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/inbox"
                    element={
                        <PrivateRoute>
                            <Conversation />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/inbox/:id"
                    element={
                        <PrivateRoute>
                            <Inbox />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
