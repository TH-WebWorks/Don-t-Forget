import { useState } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [mentalSpaceInput, setMentalSpaceInput] = useState('');

  const nextScreen = () => {
    if (currentScreen < 4) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const skipScreen = () => {
    nextScreen();
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center p-6">
      {/* Mobile container */}
      <div className="w-full max-w-sm">
        
        {/* Screen 1: Welcome */}
        {currentScreen === 1 && (
          <div className="flex flex-col items-center text-center min-h-[600px] justify-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl tracking-tight text-[#2B2B2B]">
                  Don't Forget
                </h1>
                <p className="text-lg text-[#6B6B6B] leading-relaxed">
                  A quiet place to think clearly.
                </p>
                <p className="text-sm text-[#9B9B9B] mt-6">
                  There's nothing to set up.
                </p>
              </div>
              
              <button
                onClick={nextScreen}
                className="mt-16 w-full bg-[#3A3A3A] text-[#F9F7F4] py-4 px-8 rounded-lg text-base hover:bg-[#4A4A4A] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Screen 2: What This Is */}
        {currentScreen === 2 && (
          <div className="flex flex-col justify-between min-h-[600px] py-12">
            <div className="space-y-8">
              <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">
                This isn't a productivity app.
              </h2>
              
              <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
                <p>
                  Don't Forget is a place to pause before the day runs away from you.
                </p>
                
                <div className="space-y-3 text-[#6B6B6B]">
                  <p>You don't need a plan.</p>
                  <p>You don't need motivation.</p>
                  <p>You don't need to explain everything.</p>
                </div>
                
                <p className="pt-4">
                  We'll help you find one clear thing to hold onto today.
                </p>
              </div>
            </div>
            
            <button
              onClick={nextScreen}
              className="w-full bg-[#3A3A3A] text-[#F9F7F4] py-4 px-8 rounded-lg text-base hover:bg-[#4A4A4A] transition-colors"
            >
              That sounds good
            </button>
          </div>
        )}

        {/* Screen 3: Gentle Context Capture */}
        {currentScreen === 3 && (
          <div className="flex flex-col justify-between min-h-[600px] py-12">
            <div className="space-y-8">
              <div className="space-y-3">
                <label 
                  htmlFor="mental-space"
                  className="block text-xl text-[#2B2B2B] leading-relaxed"
                >
                  What's been taking up the most mental space lately?
                </label>
                <p className="text-sm text-[#9B9B9B]">
                  One sentence is enough. You can be vague.
                </p>
              </div>
              
              <textarea
                id="mental-space"
                value={mentalSpaceInput}
                onChange={(e) => setMentalSpaceInput(e.target.value)}
                placeholder="Something unfinished&#10;A decision I keep circling&#10;A goal that feels fuzzy&#10;Honestly, just a lot"
                className="w-full h-40 bg-white border border-[#E5E5E5] rounded-lg p-4 text-[#2B2B2B] placeholder:text-[#CACACA] focus:outline-none focus:border-[#9B9B9B] resize-none leading-relaxed"
              />
            </div>
            
            <div className="space-y-4">
              <button
                onClick={nextScreen}
                className="w-full bg-[#3A3A3A] text-[#F9F7F4] py-4 px-8 rounded-lg text-base hover:bg-[#4A4A4A] transition-colors"
              >
                Continue
              </button>
              
              <button
                onClick={skipScreen}
                className="w-full text-[#9B9B9B] py-2 text-sm hover:text-[#6B6B6B] transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Screen 4: First Daily Orientation */}
        {currentScreen === 4 && (
          <div className="flex flex-col justify-between min-h-[600px] py-12">
            <div className="space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl tracking-tight text-[#2B2B2B] leading-snug">
                  Today, let's keep it simple.
                </h2>
                <p className="text-sm text-[#9B9B9B]">
                  Clarity counts, even on low-energy days.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-xs tracking-wider text-[#9B9B9B] uppercase">
                    Focus
                  </p>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    One thing that would make today feel lighter
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs tracking-wider text-[#9B9B9B] uppercase">
                    Next Step
                  </p>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    A small, concrete action
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs tracking-wider text-[#9B9B9B] uppercase">
                    Boundary
                  </p>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    One reminder to not overload the day
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => alert('Onboarding complete!')}
                className="w-full bg-[#3A3A3A] text-[#F9F7F4] py-4 px-8 rounded-lg text-base hover:bg-[#4A4A4A] transition-colors"
              >
                That feels right
              </button>
              <p className="text-center text-sm text-[#CACACA]">
                You can change this later.
              </p>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
