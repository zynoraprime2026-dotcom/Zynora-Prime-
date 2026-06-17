/**
 * Agent Builder UI - React Components
 * Manages AI agent creation and visualization
 */

// Agent Builder Main Component
const AgentBuilder = ({ user, onClose }) => {
    const [agents, setAgents] = React.useState(() => {
        const saved = localStorage.getItem(`agents_${user.id}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [showModal, setShowModal] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterSkill, setFilterSkill] = React.useState('all');

    const saveAgents = (newAgents) => {
        setAgents(newAgents);
        localStorage.setItem(`agents_${user.id}`, JSON.stringify(newAgents));
    };

    const handleCreateAgent = (agentData) => {
        const newAgent = {
            id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...agentData,
            status: 'active',
            createdAt: new Date().toISOString(),
        };
        saveAgents([...agents, newAgent]);
        setShowModal(false);
    };

    const handleToggleStatus = (agentId) => {
        const updated = agents.map((agent) =>
            agent.id === agentId
                ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
                : agent
        );
        saveAgents(updated);
    };

    const handleDeleteAgent = (agentId) => {
        const updated = agents.filter((agent) => agent.id !== agentId);
        saveAgents(updated);
    };

    const filteredAgents = agents.filter((agent) => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSkill = filterSkill === 'all' || agent.skills.includes(filterSkill);
        return matchesSearch && matchesSkill;
    });

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>🤖 AI Agent Builder</h2>
                    <p style={styles.subtitle}>Create and manage your custom AI agents</p>
                </div>
                <button onClick={onClose} style={styles.closeButton}>✕</button>
            </div>

            {/* Controls */}
            <div style={styles.controls}>
                <button onClick={() => setShowModal(true)} style={styles.createButton}>
                    + Create New Agent
                </button>
                <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
                <select
                    value={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.value)}
                    style={styles.filterSelect}
                >
                    <option value="all">All Skills</option>
                    <option value="marketing">Marketing</option>
                    <option value="coding">Coding</option>
                    <option value="business">Business</option>
                    <option value="research">Research</option>
                    <option value="automation">Automation</option>
                </select>
            </div>

            {/* Agents Grid */}
            <div style={styles.agentsGrid}>
                {filteredAgents.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p style={styles.emptyIcon}>🚀</p>
                        <p style={styles.emptyText}>
                            {agents.length === 0 ? 'No agents yet. Create one!' : 'No agents match your filters.'}
                        </p>
                    </div>
                ) : (
                    filteredAgents.map((agent) => (
                        <AgentCard
                            key={agent.id}
                            agent={agent}
                            onToggleStatus={handleToggleStatus}
                            onDelete={handleDeleteAgent}
                        />
                    ))
                )}
            </div>

            {/* Stats */}
            <div style={styles.stats}>
                <p>Total Agents: {agents.length}</p>
                <p>Active: {agents.filter((a) => a.status === 'active').length}</p>
                <p>Paused: {agents.filter((a) => a.status === 'paused').length}</p>
            </div>

            {/* Create Agent Modal */}
            {showModal && (
                <CreateAgentModal
                    onClose={() => setShowModal(false)}
                    onCreateAgent={handleCreateAgent}
                />
            )}
        </div>
    );
};

// Agent Card Component
const AgentCard = ({ agent, onToggleStatus, onDelete }) => {
    return (
        <div style={styles.card}>
            {/* Status Indicator */}
            <div style={styles.cardHeader}>
                <div style={styles.statusBadge}>
                    <span
                        style={{
                            ...styles.statusDot,
                            background: agent.status === 'active' ? '#00d9ff' : '#666',
                        }}
                    />
                    <span style={styles.statusText}>{agent.status}</span>
                </div>
                <button onClick={() => onDelete(agent.id)} style={styles.deleteButton}>
                    🗑️
                </button>
            </div>

            {/* Agent Info */}
            <h3 style={styles.cardTitle}>{agent.name}</h3>
            <p style={styles.cardGoal}>{agent.goal}</p>

            {/* Skills Tags */}
            <div style={styles.skillsTags}>
                {agent.skills.map((skill) => (
                    <span key={skill} style={styles.skillTag}>
                        {skill}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div style={styles.cardFooter}>
                <p style={styles.createdAt}>
                    Created: {new Date(agent.createdAt).toLocaleDateString()}
                </p>
                <button
                    onClick={() => onToggleStatus(agent.id)}
                    style={{
                        ...styles.toggleButton,
                        background: agent.status === 'active' ? '#ff4444' : '#00d9ff',
                    }}
                >
                    {agent.status === 'active' ? 'Pause' : 'Activate'}
                </button>
            </div>
        </div>
    );
};

// Create Agent Modal Component
const CreateAgentModal = ({ onClose, onCreateAgent }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        goal: '',
        skills: [],
    });
    const [error, setError] = React.useState('');

    const allSkills = ['marketing', 'coding', 'business', 'research', 'automation'];

    const handleSkillChange = (skill) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter((s) => s !== skill)
                : [...prev.skills, skill],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim()) {
            setError('Agent name is required');
            return;
        }
        if (!formData.goal.trim()) {
            setError('Agent goal is required');
            return;
        }
        if (formData.skills.length === 0) {
            setError('Select at least one skill');
            return;
        }

        onCreateAgent(formData);
    };

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 style={styles.modalTitle}>Create New AI Agent</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Agent Name */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Agent Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Marketing Expert, Code Assistant"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={styles.formInput}
                        />
                    </div>

                    {/* Agent Goal */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Agent Goal</label>
                        <textarea
                            placeholder="Describe what this agent should do..."
                            value={formData.goal}
                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                            style={styles.formTextarea}
                            rows="4"
                        />
                    </div>

                    {/* Skills Selection */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Select Skills</label>
                        <div style={styles.skillsCheckboxes}>
                            {allSkills.map((skill) => (
                                <label key={skill} style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={formData.skills.includes(skill)}
                                        onChange={() => handleSkillChange(skill)}
                                        style={styles.checkbox}
                                    />
                                    <span style={styles.checkboxText}>{skill}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && <p style={styles.errorMessage}>{error}</p>}

                    {/* Buttons */}
                    <div style={styles.formButtons}>
                        <button type="button" onClick={onClose} style={styles.cancelButton}>
                            Cancel
                        </button>
                        <button type="submit" style={styles.submitButton}>
                            Generate Agent
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#0f0f0f',
        color: '#fff',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        background: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0,
        color: '#00d9ff',
    },
    subtitle: {
        fontSize: '12px',
        color: '#888',
        margin: '5px 0 0 0',
    },
    closeButton: {
        padding: '8px 12px',
        border: 'none',
        background: '#2a2a2a',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    controls: {
        display: 'flex',
        gap: '10px',
        padding: '15px 20px',
        background: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
        flexWrap: 'wrap',
    },
    createButton: {
        padding: '10px 15px',
        background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
        color: '#000',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '12px',
    },
    searchInput: {
        flex: 1,
        padding: '10px',
        background: '#0f0f0f',
        border: '1px solid #2a2a2a',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '12px',
        minWidth: '150px',
    },
    filterSelect: {
        padding: '10px',
        background: '#0f0f0f',
        border: '1px solid #2a2a2a',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '12px',
    },
    agentsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '15px',
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    card: {
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'all 0.3s',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '11px',
        color: '#888',
    },
    statusDot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
    },
    statusText: {
        textTransform: 'uppercase',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
    },
    cardTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        margin: 0,
        color: '#fff',
    },
    cardGoal: {
        fontSize: '12px',
        color: '#888',
        margin: 0,
        lineHeight: '1.4',
    },
    skillsTags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
    },
    skillTag: {
        fontSize: '10px',
        background: '#00d9ff',
        color: '#000',
        padding: '3px 8px',
        borderRadius: '3px',
        fontWeight: 'bold',
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: '1px solid #2a2a2a',
    },
    createdAt: {
        fontSize: '10px',
        color: '#666',
        margin: 0,
    },
    toggleButton: {
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: 'bold',
        transition: 'all 0.3s',
    },
    emptyState: {
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        minHeight: '300px',
    },
    emptyIcon: {
        fontSize: '48px',
        margin: 0,
    },
    emptyText: {
        color: '#666',
        fontSize: '14px',
        margin: 0,
    },
    stats: {
        display: 'flex',
        gap: '20px',
        padding: '15px 20px',
        background: '#1a1a1a',
        borderTop: '1px solid #2a2a2a',
        fontSize: '12px',
        color: '#888',
    },
    // Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        padding: '30px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    modalTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0 0 20px 0',
        color: '#00d9ff',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
    },
    formInput: {
        padding: '10px',
        background: '#0f0f0f',
        border: '1px solid #2a2a2a',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '12px',
        outline: 'none',
    },
    formTextarea: {
        padding: '10px',
        background: '#0f0f0f',
        border: '1px solid #2a2a2a',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '12px',
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'vertical',
    },
    skillsCheckboxes: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '12px',
    },
    checkbox: {
        cursor: 'pointer',
    },
    checkboxText: {
        color: '#fff',
    },
    errorMessage: {
        color: '#ff4444',
        fontSize: '12px',
        margin: 0,
    },
    formButtons: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
    },
    cancelButton: {
        flex: 1,
        padding: '10px',
        background: '#2a2a2a',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    submitButton: {
        flex: 1,
        padding: '10px',
        background: 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
        color: '#000',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
    },
};
