import { useState } from 'react';

const STEPS = [
  {
    title: 'Welcome, Harsh Kumar!',
    subtitle: 'ModelSuite Talent Assessment Portal',
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-[14px] text-text-muted leading-relaxed">
          Congratulations on being shortlisted for the <strong className="text-white font-semibold">PAID FULL-STACK MERN DEVELOPER INTERNSHIP</strong>!
        </p>
        <p className="text-[14px] text-text-muted leading-relaxed">
          This portal allows you to browse, claim, and submit the tasks assigned to you. Let's take a quick 1-minute tour to help you ace your assignment!
        </p>
        <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-xl mt-2">
          <span className="text-[20px] shrink-0">⏳</span>
          <p className="text-[12.5px] text-primary font-medium leading-normal">
            Deadline: July 21, 2026 (7 days left). Let's make every second count!
          </p>
        </div>
      </div>
    ),
    illustration: (
      <svg className="w-16 h-16 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Claiming Tasks',
    subtitle: 'Browse and Assign Work',
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-[14px] text-text-muted leading-relaxed">
          On your dashboard, check out the <strong className="text-white">Available Tasks</strong> section. These are the bugs and features assigned to you.
        </p>
        <p className="text-[14px] text-text-muted leading-relaxed">
          Click <strong className="text-primary font-semibold">Claim Task</strong> to lock the task to your account. We have implemented atomic locks to guarantee that once you claim a task, no other candidate can claim it!
        </p>
      </div>
    ),
    illustration: (
      <svg className="w-16 h-16 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Submitting Your Work',
    subtitle: 'File Upload & Security',
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-[14px] text-text-muted leading-relaxed">
          Under <strong className="text-white">My Tasks</strong>, you can submit your progress. Write notes for the reviewer and attach your document, PDF, or zip file.
        </p>
        <p className="text-[14px] text-text-muted leading-relaxed">
          ⚠️ <strong className="text-red-400">Security Warning:</strong> Executable files (like <code className="bg-red-500/10 text-red-400 px-1 rounded">.exe</code>, <code className="bg-red-500/10 text-red-400 px-1 rounded">.js</code>, <code className="bg-red-500/10 text-red-400 px-1 rounded">.sh</code>, etc.) are strictly blocked by our file filters to secure the system.
        </p>
      </div>
    ),
    illustration: (
      <svg className="w-16 h-16 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    title: 'Submission History Timeline',
    subtitle: 'Real-time Review Tracking',
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-[14px] text-text-muted leading-relaxed">
          Navigate to the <strong className="text-white">Submission History</strong> tab in the sidebar to view a beautiful chronological timeline of your submissions.
        </p>
        <p className="text-[14px] text-text-muted leading-relaxed">
          You can track review status (Pending, Approved, or Rejected) and click on links to view submitted files directly. Keep your project flow aligned!
        </p>
      </div>
    ),
    illustration: (
      <svg className="w-16 h-16 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Final PR Guidelines',
    subtitle: 'Git & Submission Requirements',
    content: (
      <div className="flex flex-col gap-3">
        <p className="text-[13.5px] text-text-muted leading-relaxed">
          Make sure your submission complies with these git rules to pass qualification automatically:
        </p>
        <ul className="text-[12.5px] text-text-muted list-disc pl-5 flex flex-col gap-1">
          <li>Create a branch named exactly: <code className="bg-white/10 px-1 rounded text-white font-mono">168-19-15-10-5-4-harsh-kumar</code></li>
          <li>Reference all 6 issues in your PR description: <span className="text-primary font-mono">"Closes #5, Closes #10, ..."</span></li>
          <li>Record a public walk-through screen share video and upload to Google Drive.</li>
          <li>Submit both the PR link and video link on your ModelSuite page.</li>
        </ul>
      </div>
    ),
    illustration: (
      <svg className="w-16 h-16 text-primary mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="6" y1="9" x2="6" y2="15" />
        <path d="M9 18h3a3 3 0 0 0 3-3V9" />
      </svg>
    ),
  },
];

const OnboardingWizard = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onClose();
  };

  const step = STEPS[currentStep];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[999] p-6">
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.9)] flex flex-col transition-all duration-300">
        
        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-[3px]">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Card Body */}
        <div className="p-7 flex flex-col gap-5 text-center">
          
          {/* Close/Skip Button (Top Right) */}
          <div className="flex justify-end">
            <button
              onClick={handleComplete}
              className="text-[12px] text-text-faint hover:text-white transition-colors cursor-pointer bg-transparent border-none">
              Skip Tour
            </button>
          </div>

          {/* Illustration Container */}
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            {step.illustration}
          </div>

          {/* Titles */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-primary">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <h2 className="text-[20px] font-bold text-white tracking-tight mt-1.5 font-sans">
              {step.title}
            </h2>
            <p className="text-[12.5px] text-text-faint mt-0.5 font-medium">
              {step.subtitle}
            </p>
          </div>

          {/* Dynamic Content */}
          <div className="text-left bg-white/[0.01] border border-white/5 p-4 rounded-xl min-h-[160px] flex items-center justify-center">
            {step.content}
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex justify-center gap-1.5 mt-2">
            {STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'bg-primary w-4' : 'bg-white/20 w-1.5'}`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-white/10 pt-4 mt-2">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold cursor-pointer border border-white/10 transition-all font-sans active:scale-95">
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-2.5 btn-gradient text-white rounded-lg text-sm font-bold cursor-pointer border-none transition-all font-sans active:scale-95 hover:shadow-[0_4px_16px_rgba(59,130,246,0.3)]">
              {currentStep === STEPS.length - 1 ? 'Get Started!' : 'Continue'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OnboardingWizard;
