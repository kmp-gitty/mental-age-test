import React, { useState, useEffect, useRef } from 'react';
import youthfulImg from './assets/Youthful.png';
import matureYouthfulImg from './assets/Mature-Youthful.png';
import cynicMatureImg from './assets/Cynic-Mature.png';
import cynicImg from './assets/Cynic.png';

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const quizData = [
    { question: "Is a hotdog a sandwich?", optionA: "Sandwich", optionB: "Not a Sandwich" },
    { question: "If I wanted to, I could change my appearance.", optionA: "Yes", optionB: "No" },
    { question: "I believe an old dog can learn new tricks.", optionA: "Yes", optionB: "No" },
    { question: "I cry when sad enough.", optionA: "Yes", optionB: "No" },
    { question: "A comforting lie or a hard truth?", optionA: "Hard Truth", optionB: "Comforting Lie" },
    { question: "I can recognize all of my neighbors' faces.", optionA: "Yes", optionB: "No" },
    { question: "I always know who and what is around me.", optionA: "Yes", optionB: "No" },
    { question: "I can recall the last time I felt guilty about my actions.", optionA: "Yes", optionB: "No" },
    { question: "Sock-sock-shoe-shoe or sock-shoe-sock-shoe?", optionA: "Sock-sock-shoe-shoe", optionB: "Sock-shoe-sock-shoe" },
    { question: "I easily get upset at a cashier taking too long to scan my things.", optionA: "Yes", optionB: "No" },
    { question: "It's hard for me to look past other people's mistakes.", optionA: "Yes", optionB: "No" },
    { question: "I never make mistakes.", optionA: "Yes", optionB: "No" },
    { question: "Believing is seeing, seeing is believing", optionA: "Believe when I see", optionB: "See when I believe" },
    { question: "I like to figure out how something works.", optionA: "Yes", optionB: "No" },
    { question: "I play harmless pranks on friends and family.", optionA: "Yes", optionB: "No" },
    { question: "I've winged a presentation, proposal, speech or something similar before.", optionA: "Yes", optionB: "No" },
    { question: "Personal chef or Daily cleaners?", optionA: "Chef", optionB: "Cleaners" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const answersRef = useRef(answers);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnswer = (choice) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = choice;
    setAnswers(updatedAnswers);
    answersRef.current = updatedAnswers;

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitted(true);
      setResultData(null);
      setTimeout(() => {
        const { total, result, image, description } = calculateScore(updatedAnswers);
        setResultData({ total, result, image, description });
      }, 6000);
    }
  };

  const calculateScore = (answersOverride = answers) => {
    const baseScore = answersOverride.filter(ans => ans === 'B').length;
    const groupScore = (indexes) => {
      const count = indexes.filter(i => answersOverride[i] === 'A').length;
      const bonusMap = [3, 2, 1, 0];
      return bonusMap[count] ?? 0;
    };
    const groupScore5 = (indexes) => {
      const count = indexes.filter(i => answersOverride[i] === 'A').length;
      if (count <= 1) return 3;
      if (count === 2) return 2;
      if (count === 3) return 1;
      return 0;
    };

    const bonus =
      groupScore([1, 2, 3]) +
      groupScore([5, 6, 7]) +
      groupScore([9, 10, 11]) +
      groupScore([13, 14, 15]) +
      groupScore5([0, 4, 8, 12, 16]);

    const total = baseScore + bonus;

    let result = '', image = null, description = '';
    if (total <= 5) {
      result = 'Youthful';
      image = youthfulImg;
      description = "Your mind is bright, curious, and full of life—always ready for the next idea, the next laugh, or the next adventure. You approach the world with open arms and a big heart, often bringing warmth and optimism wherever you go. Sure, there are moments when your trust may land in the wrong hands, but that's more a reflection of your belief in the good than a flaw in judgment. Deep down, you're a light presence—joyful, open, and refreshingly unjaded.";
    } else if (total <= 14) {
      result = 'Mature + Youthful';
      image = matureYouthfulImg;
      description = "You carry wisdom beyond your years, yet still manage to hold onto a spark of fun and curiosity. You're the kind of person who can give sound advice one moment and suggest a spontaneous adventure the next. Sometimes, others might not know which version of you they’re going to get—especially if they mistake your playfulness for indecision. But in truth, you’re just well-rounded, balancing insight with spirit.";
    } else if (total <= 24) {
      result = 'Cynic + Mature';
      image = cynicMatureImg;
      description = "You’ve seen enough to know better—and you’re not afraid to say so. With a sharp eye for nonsense and a no-frills attitude, your maturity shines through in your grounded thinking and practical approach to life. Occasionally, people may find your bluntness a bit... much, though it’s really just your way of being honest and protective. At your core, you're steady and dependable, someone who others turn to when they need real answers.";
    } else {
      result = 'Cynic';
      image = cynicImg;
      description = "You don’t sugarcoat the world—and why should you? You have a mind that's tired of fluff and is focused on what matters. You value peace, predictability, and people who don’t waste your time. If you sometimes come across as impatient or overly skeptical, it's only because you’ve learned the hard way not to trust blindly. But beneath the grumble, there’s a caring heart and a fierce loyalty that only a lucky few get to see.";
    }

    return { total, result, image, description };
  };

  return (
    <div className="bg-white">
      {!quizOpen && (
        <>
        {/* Ads */}
<div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-50">
  {/* 728x90 Orange Rectangle (No text) */}
  <div className="w-[728px] h-[90px] bg-[#ef6c00] border rounded" />

  {/* 300x250 Image Banner */}
  <div className="w-[300px] h-[250px] border rounded overflow-hidden">
    <img
      src="./assets/resized_brains_banner_300x250.png"
      alt="Brain Banner"
      className="w-full h-full object-cover"
    />
  </div>
</div>
          {/* Hero Section */}
          <div className="text-center px-6 pt-10 pb-6">
            <h1 className="text-4xl font-bold text-gray-800">Mental Age Test: What Is My Mental Age?</h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Curious to discover how old your mind is? This mental age test helps reveal whether your psychological age aligns with your chronological age. Through a series of thought-provoking questions, you'll assess your emotional intelligence, decision-making patterns, and overall maturity. The mental age test is designed to reveal how you think, feel, and interact with the world. Are you wise beyond your years or still young at heart? As you explore themes like self-awareness, you may uncover surprising insights into your cognitive ability. This isn't about IQ—it's about how your personality expresses itself in daily life. So, are you ready to find out if your mental age really matches the number on your birth certificate?
            </p>
          </div>

          {/* Launch Button + Side Ad */}
          <div className="flex justify-center items-center gap-6 bg-gray-50 p-6">
            <button
              onClick={() => setQuizOpen(true)}
              className={`w-[300px] h-[600px] bg-orange-400 hover:bg-orange-500 transition-all duration-500 text-white font-semibold rounded-lg flex items-start justify-center ${
                scrolled ? 'pt-[300px]' : 'pt-[150px]'
              }`}
            >
              Start Quiz
            </button>
            <div className="w-[300px] h-[600px] bg-[#4db6ac] border rounded">
  {/* Empty cyan block with no text */}
</div>
          </div>

          {/* SEO Content Sections */}
          <section className="bg-white px-6 py-12 space-y-10 text-gray-800 leading-relaxed max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-2">🧠 Chronological Age vs. Psychological Age (Mental Age)</h2>
              <p>Chronological age refers to the actual time a person has been alive, measured in years after birth. Mental age assesses an individual's cognitive abilities and emotional maturity relative to others at a specific chronological age. For instance, someone might be 30 years old but exhibit the cognitive and emotional characteristics typical of a 25-year-old, indicating a younger mental age.</p>
              <p className="mt-2">Understanding the distinction between these two concepts is crucial, as it highlights that age is not solely a measure of time but also encompasses mental and emotional development within that time.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">🔬 The Science Behind Personality and Its Evolution</h2>
              <h3 className="text-lg font-semibold mt-4 mb-1">Can Personality Change?</h3>
              <p>Yes, personality is not fixed and can evolve over time. Research indicates that individuals often experience increases in traits like agreeableness and conscientiousness as they age, while traits such as neuroticism may decrease.</p>
              <h3 className="text-lg font-semibold mt-6 mb-1">How Does Personality Typically Change?</h3>
              <p>Personality changes can result from various factors, including life experiences, social roles, and intentional efforts. For example, engaging in new social activities or adopting different responsibilities can lead to shifts in personality traits.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">🧪 How Does the Mental Age Test Work?</h2>
              <p>This Mental Age Test evaluates your responses to a series of questions designed to assess your attitudes, preferences, and behaviors. Also your empathy, social awareness and thinking strategy. By analyzing these responses, the test estimates your mental age, providing insight into how your cognitive and emotional maturity compares to your chronological age.</p>
              <h3 className="text-lg font-semibold mt-6 mb-1">How Best to Take the Test?</h3>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Be Honest:</strong> Answer questions truthfully to obtain an accurate assessment.</li>
                <li><strong>Stay Focused:</strong> Choose a quiet environment to minimize distractions.</li>
                <li><strong>Reflect:</strong> Consider your typical behaviors and feelings when responding.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">🕰️ History of Mental Age Tests and Perspectives on Age Differences</h2>
              <p>The concept of mental age was introduced by French psychologist Alfred Binet in 1905. Binet developed the first intelligence test to identify children who required additional academic support. This test laid the foundation for modern IQ testing.</p>
              <p className="mt-2">Over time, the understanding of intelligence and mental age has evolved, recognizing the complexity of cognitive and emotional development across different individuals.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">🧩 Breaking Down Personality and Its Association with Mental Age</h2>
              <p>Personality traits, such as openness, conscientiousness, and emotional stability, play a significant role in determining one's mental age. For instance, individuals with high openness may exhibit behaviors associated with a younger mental age, reflecting curiosity and adaptability. Conversely, high conscientiousness might align with traits typical of an older mental age, such as responsibility and organization.</p>
              <p className="mt-2">Understanding these associations can provide deeper insights into one's behavior and cognitive patterns.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">📈 What Do My Test Results Mean?</h2>
              <p>Your mental age result offers a perspective on your cognitive and emotional maturity relative to your chronological age. A mental age lower than your actual age might indicate a youthful outlook and adaptability, while a higher mental age could reflect wisdom and experience.</p>
              <p className="mt-2">It's important to interpret these results as a tool for self-reflection rather than a definitive measure of intelligence or capability. Embracing the insights can guide personal growth and self-awareness.</p>
            </div>

            <div>
  <h2 className="text-2xl font-bold mb-2">🧠 Sources for This Mental Age Test</h2>
  <p>
    Disclaimer: This test should not be used as a clinical or professional diagnosis, but a fun (yet still science-based) test to reveal things about your personality for thought and reflection.
  </p>

  <p className="mt-2">
    The basis of our quiz is the <a
      href="https://pubmed.ncbi.nlm.nih.gov/38799493/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >SAFE model</a> — Self-Awareness, Autonomy, Flexibility, and Ego Resilience — offers a framework for understanding psychological maturity. The linked study validates this model, which aligns with our quiz's focus areas, providing a structured approach to assessing aspects of mental age.
  </p>

  <p className="mt-2">
    Some <a
      href="https://www.nature.com/articles/s41598-024-74488-0?utm_source=chatgpt.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >professional studies argue</a> the validity of mental age tests and making definitive claims, when different tests measure different constructs. It is always good to <a
      href="https://aftermathbehavioralhealth.com/articles/understanding-mental-age-tests/?utm_source=chatgpt.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >understand the biases of tests online</a> and within ourselves, and know that a fun online test cannot (and does not) define who you are.
  </p>
</div>

          </section>
        </>
      )}

      {/* Quiz Mode */}
      {quizOpen && (
  <div className="flex bg-white p-6 border-t border-gray-300 relative max-w-7xl mx-auto mt-10">
    {/* Quiz Side */}
    <div className="w-2/3 flex flex-col justify-between items-center space-y-6 bg-orange-50 p-6 border rounded-lg relative">

            <div
              style={{ position: 'absolute', top: '16px', right: '16px' }}
              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer z-50"
              onClick={() => setQuizOpen(false)}
            >
              ✕
            </div>

            <div
              style={{ position: 'absolute', top: '16px', left: '16px' }}
              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer z-50"
              onClick={() => {
                setAnswers(Array(quizData.length).fill(null));
                setCurrentQuestionIndex(0);
                setIsSubmitted(false);
                setResultData(null);
              }}
            >
              ⟲
            </div>

            {isSubmitted ? (
              resultData ? (
                <div className="text-center text-xl text-gray-800 mt-[100px]">
                  <div className="text-sm text-gray-700 mb-6 text-center px-4 max-w-[80%] mx-auto">
                    {resultData.description}
                  </div>
                  <p className="mb-2">Your Total: {resultData.total}</p>
                  <p className="text-2xl font-bold mb-4">Mental Age Group: {resultData.result}</p>
                  {resultData.image && (
                    <div className="relative w-[300px] h-[500px] mx-auto rounded overflow-hidden">
                      <img
                        src={resultData.image}
                        alt={resultData.result}
                        className="mx-auto w-[300px] h-[500px] object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-xl text-gray-800 mt-[150px]">
                  Calculating results...
                </div>
              )
            ) : (
              <>
                <div className="text-center text-xl text-gray-800 pt-[150px]">
                  {quizData[currentQuestionIndex].question}
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <button
                    onClick={() => handleAnswer('A')}
                    className="px-6 py-3 bg-orange-300 rounded w-full"
                  >
                    {quizData[currentQuestionIndex].optionA}
                  </button>
                  <button
                    onClick={() => handleAnswer('B')}
                    className="px-6 py-3 bg-orange-300 rounded w-full"
                  >
                    {quizData[currentQuestionIndex].optionB}
                  </button>
                </div>
              </>
            )}

            {!isSubmitted && (
              <div className="flex justify-center gap-6 mt-8">
                <button
                  className={`w-10 h-10 rounded-full bg-cyan-200 text-black flex items-center justify-center ${currentQuestionIndex === 0 ? 'opacity-50' : ''}`}
                  onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)}
                >
                  ←
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-cyan-200 text-black flex items-center justify-center"
                  onClick={() => {
                    if (currentQuestionIndex < quizData.length - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    } else {
                      setIsSubmitted(true);
                      setResultData(null);
                      setTimeout(() => {
                        const { total, result, image, description } = calculateScore();
                        setResultData({ total, result, image, description });
                      }, 2000);
                    }
                  }}
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Ad Side */}
          <div className="w-1/3 flex justify-center items-center p-6">
  <div className="w-[300px] h-[600px] bg-[#4db6ac] border rounded" />
</div>
        </div>
      )}
    </div>
  );
}


