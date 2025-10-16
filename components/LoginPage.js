// Login Component
function LoginPage({ onLoginSuccess }) {
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

    return (
        <div className="login-container">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            SaveUp
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Smart Finance Tracker for Bangladesh
                    </p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="text-4xl">💰</div>
                        <div className="text-4xl">📊</div>
                        <div className="text-4xl">🎯</div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                        Start Your Financial Freedom Journey
                    </h2>
                    <p className="text-gray-600 text-center">
                        Track Expenses • Set Goals • Build Savings
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-3 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="spinner"></div>
                            <span>Signing in...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span>Sign in with Google</span>
                        </>
                    )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-6">
                    By signing in, you agree to our Terms & Privacy Policy
                </p>
            </div>
        </div>
    );
}