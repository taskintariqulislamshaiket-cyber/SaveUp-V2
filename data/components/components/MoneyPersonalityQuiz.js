// Money Personality Quiz Component - Register globally
window.MoneyPersonalityQuiz = function({ onComplete }) {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [answers, setAnswers] = React.useState([]);
    
    const quizQuestions = window.quizQuestions; // Use global

    const handleAnswer = (personality) => {
        const newAnswers = [...answers, personality];
        setAnswers(newAnswers);

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const counts = newAnswers.reduce((acc, p) => {
                acc[p] = (acc[p] || 0) + 1;
                return acc;
            }, {});
            const winner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            onComplete(winner);
        }
    };

    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    return React.createElement(
        'div',
        { className: 'min-h-screen gradient-bg flex items-center justify-center p-4' },
        React.createElement(
            'div',
            { className: 'bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full' },
            React.createElement(
                'div',
                { className: 'mb-8' },
                React.createElement('h2', { className: 'text-3xl font-bold text-center mb-4' }, "What's Your Money Personality?"),
                React.createElement(
                    'div',
                    { className: 'w-full bg-gray-200 rounded-full h-3' },
                    React.createElement('div', {
                        className: 'bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300',
                        style: { width: `${progress}%` }
                    })
                ),
                React.createElement('p', { className: 'text-center text-gray-600 mt-2' }, `Question ${currentQuestion + 1} of ${quizQuestions.length}`)
            ),
            React.createElement(
                'div',
                { className: 'mb-8' },
                React.createElement('h3', { className: 'text-2xl font-bold mb-6 text-center' }, quizQuestions[currentQuestion].question),
                React.createElement(
                    'div',
                    { className: 'space-y-3' },
                    quizQuestions[currentQuestion].options.map((option, index) =>
                        React.createElement(
                            'button',
                            {
                                key: index,
                                onClick: () => handleAnswer(option.personality),
                                className: 'w-full text-left p-4 border-2 border-gray-300 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all duration-200 font-semibold'
                            },
                            option.text
                        )
                    )
                )
            )
        )
    );
};