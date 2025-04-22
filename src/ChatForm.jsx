import React, { useState } from 'react';

const ChatForm = () => {
    const [chat, setChat] = useState('');
    const [history, setHistory] = useState([])
    const [isSending, setIsSending] = useState(false);
    const [vraag, setVraag] = useState('')
    const [antwoord, setAntwoord] = useState('');
    const [feedback, setFeedback] = useState('');
    const [somType, setSomType] = useState('');
    const [groep, setGroep] = useState('');
    const [firstQuestion, setFirstQuestion] = useState(false)
    const handleInputChange = (event) => {
        setChat(event.target.value);
    };
    const handleAntwoordChange = (e) => {
        setAntwoord(e.target.value);
    };

    const handleSubmit = (e) => {
        setFeedback('');
        e.preventDefault();
        getAnswer()
    };

    const handleNieuweVraag = () => {
        setVraag('')
        setAntwoord('');
        getQuestion()

    };

    async function getQuestion() {
        setFirstQuestion(false)
        setIsSending(true); // disable knop
        try {
            const response = await fetch('http://145.24.223.18:8000/question', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group: groep,
                    type: somType,}),
            });
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;
            let fullResponse = '';
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunk = decoder.decode(value);
                fullResponse += chunk;
                setVraag(prev => prev + chunk); // live opbouw in UI
            }
            setHistory(prev => [...prev, {ai: fullResponse}]);

        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        } finally {
            setIsSending(false);
            setFirstQuestion(true)
        }
    }

    async function getAnswer() {
        setFirstQuestion(false)
        setIsSending(true); // disable knop
        console.log(history)

        try {
            const response = await fetch('http://145.24.223.18:8000/check', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answer: antwoord,
                    history: history,
                    question: vraag,
                }),
            });
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;
            let fullResponse = '';
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                const chunk = decoder.decode(value);
                fullResponse += chunk;
                setFeedback(prev => prev + chunk); // live opbouw in UI
                done = doneReading;
            }
            // Voeg toe aan geschiedenis als hele antwoord binnen is
            setHistory(prev => [...prev, {human: antwoord},{ai: fullResponse}]);
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        } finally {
            setIsSending(false);
            setFirstQuestion(true)

        }
    }




    return (
        <div
            className=" w-full h-screen bg-gradient-to-b from-yellow-100 to-pink-100 text-gray-800 font-sans flex flex-col items-center px-4 py-6">
            <h1 className="text-4xl font-bold mb-6 text-pink-600 drop-shadow-md">🎲 Verhaaltjessommen</h1>

            {/* Somtype */}
            <div className="w-full flex flex-wrap justify-center gap-4 mb-4">
                {['Bewerkingen',
                    'Getalbegrip',
                    'Kommagetallen',
                    'Breuken',
                    'Procenten',
                    'Verhoudingen',
                    'Meten',
                    'Geld'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setSomType(type)}
                        className={`px-5 py-3 rounded-full text-sm font-bold shadow-md transition-all w-full sm:w-auto ${
                            somType === type
                                ? 'bg-pink-500 text-white'
                                : 'bg-white hover:bg-pink-200 border border-pink-400'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Groep */}
            <div className="w-full max-w-4xl flex flex-wrap justify-center gap-4 mb-6">
                {[3, 4, 5, 6, 7, 8].map((g) => (
                    <button
                        key={g}
                        onClick={() => setGroep(g)}
                        className={`px-5 py-3 rounded-full text-sm font-bold shadow-md transition-all w-full sm:w-auto ${
                            groep === g
                                ? 'bg-green-500 text-white'
                                : 'bg-white hover:bg-green-200 border border-green-400'
                        }`}
                    >
                        Groep {g}
                    </button>
                ))}
            </div>
            <button
                onClick={handleNieuweVraag}
                disabled={isSending}
                className={`m-6 py-3 px-8 rounded-full transition font-bold shadow-md
        ${isSending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-400 cursor-pointer'}
    `}
            >
                ➕ Genereer nieuwe vraag
            </button>

            {/* Vraagkaart */}
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 border-4 border-yellow-300 text-lg">
                <p className="mb-4">🐶 <strong>Vraag:</strong> {vraag}</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={antwoord}
                        onChange={handleAntwoordChange}
                        placeholder="Typ hier je antwoord..."
                        className="p-3 rounded-xl bg-yellow-100 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full text-lg"
                    />
                    <button
                        type="submit"
                        disabled={!firstQuestion}
                        className={`py-3 px-6 rounded-full font-bold transition w-full sm:w-fit
        ${firstQuestion
                            ? 'bg-pink-500 text-white hover:bg-pink-400 cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
    `}
                    >
                        Controleer je antwoord
                    </button>

                </form>

                {feedback && (
                    <p className="mt-4 text-green-600 font-bold">{feedback}</p>
                )}
            </div>

            {/* Nieuwe vraag knop */}

        </div>
    );

};

export default ChatForm;
