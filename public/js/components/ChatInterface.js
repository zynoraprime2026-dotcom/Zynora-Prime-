// Chat Interface Component
const ChatInterface = ({ user, onLogout }) => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState('AI Online');
    const [expandedAgent, setExpandedAgent] = React.useState(null);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);
        setStatus('Thinking...');

        try {
            const response = await chatAPI.sendMessage(userMessage);
            const { response: aiResponse, agent, memoryCount } = response.data;

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: aiResponse,
                    agent,
                    memoryCount,
                },
            ]);
            setStatus('AI Online');
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
            ]);
            setStatus('AI Online');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Zynora AI Engine</h2>
                <div style={styles.userInfo}>
                    <p style={styles.userEmail}>{user?.email}</p>
                    <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
                </div>
                <div style={styles.chatHistorySection}>
                    <h3 style={styles.chatHistoryTitle}>Chat History</h3>
                    <p style={styles.chatHistoryEmpty}>Start a new conversation</p>
                </div>
            </div>

            {/* Main Chat Area */}
            <div style={styles.mainArea}>
                {/* Top Status Bar */}
                <div style={styles.statusBar}>
                    <div style={styles.statusIndicator}>
                        <span style={styles.statusDot}></span>
                        <span>{status}</span>
                    </div>
                </div>

                {/* Messages Container */}
                <div style={styles.messagesContainer}>
                    {messages.length === 0 ? (
                        <div style={styles.emptyState}>
                            <h2>Welcome to Zynora AI</h2>
                            <p>Start a conversation by typing your message below</p>
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} style={msg.role === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper}>
                                <div style={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}>
                                    <p>{msg.content}</p>
                                </div>
                                {msg.role === 'assistant' && msg.agent && (
                                    <div style={styles.agentInfo}>
                                        <button
                                            onClick={() => setExpandedAgent(expandedAgent === idx ? null : idx)}
                                            style={styles.agentButton}
                                        >
                                            🤖 {msg.agent.name} {expandedAgent === idx ? '▼' : '▶'}
                                        </button>
                                        {expandedAgent === idx && (
                                            <div style={styles.agentDetails}>
                                                <p><strong>Role:</strong> {msg.agent.role}</p>
                                                <p><strong>Skills:</strong> {msg.agent.skills.join(', ')}</p>
                                                <p><strong>Tone:</strong> {msg.agent.tone}</p>
                                                <p><strong>Confidence:</strong> {msg.agent.confidence?.toFixed(1)}%</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {msg.role === 'assistant' && msg.memoryCount !== undefined && (
                                    <p style={styles.memoryCount}>📝 Memory: {msg.memoryCount} messages</p>
                                )}
                            </div>
                        ))
                    )}
                    {loading && (
                        <div style={styles.assistantMessageWrapper}>
                            <div style={styles.assistantMessage}>
                                <p>Thinking<span style={styles.typingDots}>...</span></p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} style={styles.inputArea}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        style={styles.input}
                    />
                    <button type="submit" disabled={loading || !input.trim()} style={styles.sendButton}>
                        {loading ? '⏳' : '➤'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        background: '#0f0f0f',
    },
    sidebar: {
        width: '260px',
        background: '#1a1a1a',
        borderRight: '1px solid #2a2a2a',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    sidebarTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#00d9ff',
        marginBottom: '20px',
    },
    userInfo: {
        borderBottom: '1px solid #2a2a2a',
        paddingBottom: '15px',
        marginBottom: '20px',
    },
    userEmail: {
        fontSize: '12px',
        color: '#888',
        marginBottom: '10px',
        wordBreak: 'break-all',
    },
    logoutButton: {
        padding: '8px 12px',
        border: '1px solid #ff4444',
        borderRadius: '4px',
        background: 'transparent',
        color: '#ff4444',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'all 0.3s',
    },
    chatHistorySection: {
        flex: 1,
        overflow: 'hidden',
    },
    chatHistoryTitle: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '10px',
    },
    chatHistoryEmpty: {
        fontSize: '12px',
        color: '#666',
    },
    mainArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    statusBar: {
        padding: '15px 20px',
        background: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
    },
    statusIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#00d9ff',
    },
    statusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#00d9ff',
        animation: 'pulse 2s infinite',
    },
    messagesContainer: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: '#666',
    },
    userMessageWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    userMessage: {
        maxWidth: '70%',
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
        color: '#000',
        borderRadius: '12px',
        fontSize: '14px',
        wordWrap: 'break-word',
    },
    assistantMessageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    assistantMessage: {
        maxWidth: '70%',
        padding: '12px 16px',
        background: '#2a2a2a',
        color: '#fff',
        borderRadius: '12px',
        fontSize: '14px',
        wordWrap: 'break-word',
    },
    agentInfo: {
        maxWidth: '70%',
    },
    agentButton: {
        padding: '8px 12px',
        background: '#1a3a3a',
        color: '#00d9ff',
        border: '1px solid #00d9ff',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'all 0.3s',
    },
    agentDetails: {
        marginTop: '8px',
        padding: '12px',
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#888',
    },
    memoryCount: {
        fontSize: '12px',
        color: '#666',
        marginLeft: '12px',
    },
    inputArea: {
        display: 'flex',
        gap: '10px',
        padding: '20px',
        background: '#1a1a1a',
        borderTop: '1px solid #2a2a2a',
    },
    input: {
        flex: 1,
        padding: '12px',
        border: '1px solid #2a2a2a',
        borderRadius: '6px',
        background: '#0f0f0f',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.3s',
    },
    sendButton: {
        padding: '12px 20px',
        border: 'none',
        borderRadius: '6px',
        background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
        color: '#000',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'all 0.3s',
    },
    typingDots: {
        animation: 'blink 1.4s infinite',
    },
};

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    @keyframes blink {
        0%, 20%, 50%, 80%, 100% { opacity: 1; }
        40% { opacity: 0.3; }
        60% { opacity: 0.3; }
    }
`;
document.head.appendChild(styleSheet);
