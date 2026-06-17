// Register Page Component
const RegisterPage = ({ onRegisterSuccess }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await authAPI.register(email, password);
            tokenUtils.setToken(response.data.token);
            onRegisterSuccess();
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.title}>Zynora AI Engine</h1>
                <p style={styles.subtitle}>Create your account</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                    />

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p style={styles.switchText}>
                    Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = '/?page=login'; }} style={styles.link}>Login</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        background: '#0f0f0f',
        borderRadius: '10px',
        border: '1px solid #2a2a2a',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#00d9ff',
    },
    subtitle: {
        fontSize: '14px',
        color: '#888',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        border: '1px solid #2a2a2a',
        borderRadius: '5px',
        background: '#1a1a1a',
        color: '#fff',
        fontSize: '14px',
        transition: 'all 0.3s',
        outline: 'none',
    },
    button: {
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
    error: {
        color: '#ff4444',
        fontSize: '12px',
        marginTop: '-10px',
    },
    switchText: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '14px',
        color: '#888',
    },
    link: {
        color: '#00d9ff',
        textDecoration: 'none',
        cursor: 'pointer',
    },
};
