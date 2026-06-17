// Updated Main App Component with Agent Builder
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(tokenUtils.isAuthenticated());
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState('login');
    const [showAgentBuilder, setShowAgentBuilder] = React.useState(false);

    React.useEffect(() => {
        checkAuth();
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page') || 'login';
        setCurrentPage(page);
    }, []);

    const checkAuth = async () => {
        if (tokenUtils.isAuthenticated()) {
            try {
                const response = await authAPI.getMe();
                setUser(response.data);
                setIsAuthenticated(true);
                setCurrentPage('chat');
            } catch (error) {
                tokenUtils.removeToken();
                setIsAuthenticated(false);
                setCurrentPage('login');
            }
        }
        setLoading(false);
    };

    const handleLoginSuccess = async () => {
        await checkAuth();
    };

    const handleRegisterSuccess = async () => {
        await checkAuth();
    };

    const handleLogout = () => {
        tokenUtils.removeToken();
        setIsAuthenticated(false);
        setUser(null);
        setCurrentPage('login');
        window.location.href = '/?page=login';
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f0f0f' }}>
                <p style={{ color: '#00d9ff' }}>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return currentPage === 'register' ? (
            <RegisterPage onRegisterSuccess={handleRegisterSuccess} />
        ) : (
            <LoginPage onLoginSuccess={handleLoginSuccess} />
        );
    }

    if (showAgentBuilder) {
        return <AgentBuilder user={user} onClose={() => setShowAgentBuilder(false)} />;
    }

    return <ChatInterface user={user} onLogout={handleLogout} onOpenAgentBuilder={() => setShowAgentBuilder(true)} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
