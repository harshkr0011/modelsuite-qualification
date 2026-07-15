import { useEffect, useState } from 'react';
import TalentSidebar from '../../components/talent/TalentSidebar';
import { fetchMySubmissions } from '../../api/submissions';

const STATUS_BADGES = {
  Pending: {
    label: 'Pending Review',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.25)',
    dotBg: 'bg-amber-500',
  },
  Approved: {
    label: 'Approved',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.25)',
    dotBg: 'bg-emerald-500',
  },
  Rejected: {
    label: 'Rejected',
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.08)',
    border: 'rgba(239, 68, 68, 0.25)',
    dotBg: 'bg-red-500',
  },
};

const IconFile = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2z"/>
    <path d="M14 6H10V2"/>
  </svg>
);

const fmtDateTime = (raw) => {
  if (!raw) return '—';
  try {
    const d = new Date(raw);
    if (isNaN(d)) return raw;
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch { return raw; }
};

const SubmissionTimeline = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSubmissions = async () => {
    try {
      const { data } = await fetchMySubmissions();
      setSubmissions(data);
    } catch (err) {
      setError('Failed to fetch submission history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  return (
    <div className="flex min-h-screen" style={{ background: '#050505' }}>
      <TalentSidebar />

      <main className="ml-[220px] flex-1 px-8 py-8" style={{ maxWidth: 'calc(100vw - 220px)' }}>
        
        {/* Header */}
        <div className="mb-8 page-section">
          <h1 className="text-[22px] font-semibold tracking-tight"
            style={{ color: '#F0F0F0', fontFamily: 'Poppins, sans-serif' }}>
            Submission History Timeline
          </h1>
          <p className="mt-0.5 text-[13px]" style={{ color: '#6B7280' }}>
            Track the progress, feedback, and review states of all your submitted tasks.
          </p>
        </div>

        {error && (
          <p className="text-[13px] mb-6 px-4 py-3 rounded-lg"
            style={{ color: '#F87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-16 px-6 text-center rounded-xl max-w-xl mx-auto"
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px dashed rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
            }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
              className="mx-auto mb-3 opacity-30" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4l3 3"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            No submission history found. Once you submit a claimed task, your timeline will appear here!
          </div>
        ) : (
          <div className="relative border-l border-white/10 ml-4 pl-8 py-2 flex flex-col gap-8">
            {submissions.map((sub, i) => {
              const task = sub.taskId || {};
              const reviewStatus = sub.reviewStatus || 'Pending';
              const badge = STATUS_BADGES[reviewStatus] || STATUS_BADGES.Pending;

              return (
                <div key={sub._id} className="relative group page-section" style={{ animationDelay: `${i * 0.08}s` }}>
                  
                  {/* Timeline bullet */}
                  <span className={`absolute -left-[38px] top-1.5 flex h-4 h-4 w-4 rounded-full border-4 border-[#050505] ${badge.dotBg} ring-4 ring-white/5 group-hover:scale-125 transition-transform duration-200`}></span>

                  {/* Timeline Card */}
                  <div className="p-5 rounded-xl border border-white/5 transition-all duration-300 hover:border-white/10 hover:translate-x-1"
                    style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
                    
                    {/* Header: Title and Status */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5">
                      <div>
                        <h3 className="text-[15px] font-semibold text-[#E5E2E1] font-sans">
                          {task.title || 'Untitled Task'}
                        </h3>
                        <p className="text-[11.5px] text-text-faint mt-0.5">
                          Submitted on {fmtDateTime(sub.createdAt)}
                        </p>
                      </div>
                      
                      <span className="text-[11px] font-semibold px-2.5 py-[3px] rounded-full border transition-colors"
                        style={{
                          color: badge.color,
                          background: badge.bg,
                          borderColor: badge.border
                        }}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Task Description */}
                    {task.description && (
                      <p className="text-[13px] text-[#9CA3AF] leading-relaxed mb-4">
                        {task.description}
                      </p>
                    )}

                    {/* Talent Notes */}
                    {sub.notes && (
                      <div className="mb-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.6px] text-text-faint mb-1.5">My Notes</p>
                        <p className="text-[13px] text-text-muted bg-[#0D0D0D] border border-white/5 rounded-lg px-3 py-2 leading-relaxed">
                          {sub.notes}
                        </p>
                      </div>
                    )}

                    {/* Attached File */}
                    {sub.fileUrl && (
                      <div className="flex items-center">
                        <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium text-primary hover:text-white border border-white/5 bg-[#0D0D0D] hover:bg-white/5 transition-all">
                          <IconFile />
                          <span className="truncate max-w-[200px] underline underline-offset-2">
                            {sub.fileUrl.split('/').pop()}
                          </span>
                          <span className="text-[10.5px] text-text-faint">↗</span>
                        </a>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default SubmissionTimeline;
