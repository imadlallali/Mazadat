import React from 'react';

export default class AppErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            message: error?.message || 'Unexpected application error',
        };
    }

    componentDidCatch(error, info) {
        // Keep a detailed trace in dev tools to diagnose blank-screen issues.
        console.error('[AppErrorBoundary] Uncaught render error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#F0F2F5', padding: '16px' }}>
                    <div style={{ maxWidth: '680px', width: '100%', background: '#fff', border: '1px solid #E05252', borderRadius: '12px', padding: '20px' }}>
                        <h2 style={{ margin: 0, color: '#E05252', fontSize: '20px', fontWeight: 700 }}>Application Error</h2>
                        <p style={{ marginTop: '10px', color: '#1A2E2C' }}>
                            A runtime error occurred. Please refresh the page.
                        </p>
                        <pre style={{ marginTop: '10px', background: '#F8F9FA', borderRadius: '8px', padding: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#1A2E2C' }}>
                            {this.state.message}
                        </pre>
                        <button
                            onClick={() => window.location.reload()}
                            style={{ marginTop: '10px', background: '#2A9D8F', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 14px', cursor: 'pointer', fontWeight: 700 }}
                        >
                            Reload
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

