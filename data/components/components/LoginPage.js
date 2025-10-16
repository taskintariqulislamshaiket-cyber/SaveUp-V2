// Login Component - Register globally
window.LoginPage = function({ onLoginSuccess }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");
        
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            
            const result = await auth.signInWithPopup(provider);
            console.log("Login successful!", result.user.email);
            
            const user = result.user;
            
            await db.collection('users').doc(user.uid).set({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            
            console.log("User saved to Firestore");
            onLoginSuccess(user);
            
        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
            
            if (error.code === 'auth/popup-blocked') {
                setError("Popup was blocked. Please allow popups for this site in your browser settings.");
            } else if (error.code === 'auth/popup-closed-by-user') {
                setError("Login cancelled. Please try again.");
            } else if (error.code === 'auth/cancelled-popup-request') {
                setError("");
            } else {
                setError(`Login failed: ${error.message}`);
            }
        }
    };

    return React.createElement(
        'div',
        { className: 'login-container' },
        React.createElement(
            'div',
            { className: 'bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 fade-in' },
            React.createElement(
                'div',
                { className: 'text-center mb-8' },
                React.createElement(
                    'h1',
                    { className: 'text-5xl font-bold mb-2' },
                    React.createElement(
                        'span',
                        { className: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' },
                        'SaveUp'
                    )
                ),
                React.createElement('p', { className: 'text-gray-600 text-lg' }, 'Smart Finance Tracker for Bangladesh')
            ),
            React.createElement(
                'div',
                { className: 'mb-8' },
                React.createElement(
                    'div',
                    { className: 'flex items-center justify-center space-x-4 mb-6' },
                    React.createElement('div', { className: 'text-4xl' }, '💰'),
                    React.createElement('div', { className: 'text-4xl' }, '📊'),
                    React.createElement('div', { className: 'text-4xl' }, '🎯')
                ),
                React.createElement('h2', { className: 'text-2xl font-bold text-gray-800 mb-3 text-center' }, 'Start Your Financial Freedom Journey'),
                React.createElement('p', { className: 'text-gray-600 text-center' }, 'Track Expenses • Set Goals • Build Savings')
            ),
            error && React.createElement(
                'div',
                { className: 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm' },
                error
            ),
            React.createElement(
                'button',
                {
                    onClick: handleGoogleLogin,
                    disabled: loading,
                    className: 'w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-3 shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
                },
                loading ? [
                    React.createElement('div', { key: 'spinner', className: 'spinner' }),
                    React.createElement('span', { key: 'text' }, 'Signing in...')
                ] : [
                    React.createElement('svg', { key: 'icon', className: 'w-6 h-6', viewBox: '0 0 24 24' },
                        React.createElement('path', { fill: '#4285F4', d: 'M