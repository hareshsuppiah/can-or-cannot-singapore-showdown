import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { performanceCategories, rounds } from './questions.js';
import './styles.css';

const DEFAULT_TEAMS = ['Kopi', 'Tea'];
const THEME_SECONDS = 30;
const TOTAL_QUESTIONS = rounds.reduce((total, round) => total + round.questions.length, 0);
const PERFORMANCE_STORAGE_KEY = 'can-or-cannot-performance-v1';
const PERFORMANCE_SCHEMA_VERSION = 1;
const MAX_SAVED_ATTEMPTS = 1000;
const reactions = ['Steady lah.', 'Can. Definitely can.', 'Wah, knowledge power.', 'Shiok answer.', 'No blur already.'];

function loadSavedAttempts() {
  if (typeof window === 'undefined') return [];
  try {
    const saved = JSON.parse(window.localStorage.getItem(PERFORMANCE_STORAGE_KEY));
    if (saved?.version !== PERFORMANCE_SCHEMA_VERSION || !Array.isArray(saved.attempts)) return [];
    const validCategories = new Set(performanceCategories.map(category => category.id));
    return saved.attempts
      .filter(attempt => validCategories.has(attempt.category) && typeof attempt.correct === 'boolean' && typeof attempt.team === 'string')
      .slice(-MAX_SAVED_ATTEMPTS);
  } catch {
    return [];
  }
}

function accuracy(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}

function performanceLabel(correct, total) {
  if (!total) return 'No data yet';
  const percent = accuracy(correct, total);
  if (percent >= 80) return 'Strong';
  if (percent >= 50) return 'Developing';
  return 'Review this';
}

function audioContextFor(ref) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  const ctx = ref.current || (ref.current = new Ctx());
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function scheduleTone(ctx, { frequency, offset = 0, duration = .16, type = 'triangle', gain = .08, endFrequency = frequency }) {
  const start = ctx.currentTime + .015 + offset;
  const oscillator = ctx.createOscillator();
  const volume = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), start + duration);
  volume.gain.setValueAtTime(.0001, start);
  volume.gain.exponentialRampToValueAtTime(gain, start + .012);
  volume.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(volume).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .02);
}

function playGameShowCue(ref, cue, team = 0) {
  try {
    const ctx = audioContextFor(ref);
    if (!ctx) return;
    if (cue === 'correct') {
      [
        { frequency: 523.25, offset: 0, duration: .18 },
        { frequency: 659.25, offset: .11, duration: .18 },
        { frequency: 783.99, offset: .22, duration: .2 },
        { frequency: 1046.5, offset: .34, duration: .48, gain: .1 },
        { frequency: 659.25, offset: .34, duration: .48, gain: .045, type: 'sine' },
        { frequency: 783.99, offset: .34, duration: .48, gain: .045, type: 'sine' }
      ].forEach(note => scheduleTone(ctx, note));
      return;
    }
    if (cue === 'wrong') {
      scheduleTone(ctx, { frequency: 185, endFrequency: 92, duration: .82, type: 'sawtooth', gain: .105 });
      scheduleTone(ctx, { frequency: 123, endFrequency: 68, offset: .035, duration: .76, type: 'square', gain: .045 });
      return;
    }
    if (cue === 'buzz') {
      const base = team === 0 ? 440 : 554.37;
      scheduleTone(ctx, { frequency: base, duration: .1, type: 'square', gain: .07 });
      scheduleTone(ctx, { frequency: base * 1.5, offset: .1, duration: .18, type: 'triangle', gain: .09 });
      return;
    }
    if (cue === 'tick') {
      scheduleTone(ctx, { frequency: 1100, duration: .045, type: 'square', gain: .035 });
      return;
    }
    if (cue === 'timeout') {
      [220, 185, 146.83].forEach((frequency, i) => scheduleTone(ctx, { frequency, offset: i * .17, duration: .22, type: 'sawtooth', gain: .075 }));
      return;
    }
    if (cue === 'reveal') {
      scheduleTone(ctx, { frequency: 392, duration: .16, gain: .06 });
      scheduleTone(ctx, { frequency: 587.33, offset: .12, duration: .3, gain: .08 });
      return;
    }
    if (cue === 'roundStart') {
      scheduleTone(ctx, { frequency: 329.63, duration: .12, gain: .055 });
      scheduleTone(ctx, { frequency: 493.88, offset: .1, duration: .24, gain: .075 });
    }
  } catch {}
}

function Icon({ name }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'square', strokeLinejoin: 'miter', 'aria-hidden': true };
  if (name === 'play') return <svg {...common}><path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none"/></svg>;
  if (name === 'pause') return <svg {...common}><path d="M7 4v16M17 4v16" strokeWidth="4"/></svg>;
  if (name === 'eye') return <svg {...common}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg>;
  if (name === 'next') return <svg {...common}><path d="M4 12h15M14 6l6 6-6 6"/></svg>;
  if (name === 'reset') return <svg {...common}><path d="M4 4v6h6M5 9a8 8 0 1 1 1 8"/></svg>;
  return null;
}

function PerformanceDashboard({ attempts, onClose, onClear }) {
  const report = useMemo(() => {
    const categories = performanceCategories.map(category => {
      const categoryAttempts = attempts.filter(attempt => attempt.category === category.id);
      const correct = categoryAttempts.filter(attempt => attempt.correct).length;
      return { ...category, attempts: categoryAttempts.length, correct };
    });
    const teamNames = [...new Set(attempts.map(attempt => attempt.team))];
    const teams = teamNames.map(team => {
      const teamAttempts = attempts.filter(attempt => attempt.team === team);
      const correct = teamAttempts.filter(attempt => attempt.correct).length;
      return { team, attempts: teamAttempts.length, correct };
    });
    const correct = attempts.filter(attempt => attempt.correct).length;
    const steals = attempts.filter(attempt => attempt.stage === 'steal');
    return {
      categories,
      teams,
      correct,
      stealWins: steals.filter(attempt => attempt.correct).length,
      steals: steals.length,
      lastUpdated: attempts.at(-1)?.answeredAt
    };
  }, [attempts]);

  const total = attempts.length;
  return <div className="performance-overlay" role="dialog" aria-modal="true" aria-labelledby="performance-title">
    <section className="performance-sheet">
      <header className="performance-head">
        <div><p>Host settings · teacher view</p><h2 id="performance-title">Class performance</h2></div>
        <button onClick={onClose} aria-label="Close class performance">×</button>
      </header>
      <div className="performance-scroll">
        <p className="performance-intro">See where the group is strong and what may need another round. Results are saved on this browser until you clear them.</p>
        {!total ? <div className="performance-empty"><strong>No answers recorded yet.</strong><span>Start a game and enter a team’s A, B, C or D answer. This dashboard will update immediately.</span></div> : <>
          <section className="performance-summary" aria-label="Performance summary">
            <div><span>Answer attempts</span><strong>{total}</strong></div>
            <div><span>Correct</span><strong>{report.correct}</strong></div>
            <div><span>Overall accuracy</span><strong>{accuracy(report.correct, total)}%</strong></div>
            <div><span>Successful steals</span><strong>{report.stealWins}<small> / {report.steals}</small></strong></div>
          </section>
          <section className="performance-section">
            <div className="performance-section-head"><div><p>Learning areas</p><h3>Strengths and gaps</h3></div><div className="performance-key"><span><i className="key-correct"/>Correct</span><span><i className="key-wrong"/>Incorrect</span></div></div>
            <div className="category-results">{report.categories.map(category => {
              const percent = accuracy(category.correct, category.attempts);
              return <article className={`category-result ${category.attempts ? '' : 'no-data'}`} key={category.id}>
                <div className="category-result-label"><strong>{category.label}</strong><span>{performanceLabel(category.correct, category.attempts)}</span></div>
                <div className="performance-bar" style={{ '--correct': `${percent}%` }} aria-label={category.attempts ? `${category.label}: ${percent}% correct` : `${category.label}: no data`}><span/></div>
                <div className="category-result-score"><strong>{category.attempts ? `${percent}%` : '—'}</strong><span>{category.attempts ? `${category.correct} of ${category.attempts}` : '0 attempts'}</span></div>
              </article>;
            })}</div>
          </section>
          {!!report.teams.length && <section className="performance-section">
            <div className="performance-section-head"><div><p>Team comparison</p><h3>Who knew what?</h3></div></div>
            <div className="team-performance">{report.teams.map(team => <div key={team.team}><span>{team.team}</span><strong>{accuracy(team.correct, team.attempts)}%</strong><small>{team.correct} correct · {team.attempts} attempts</small></div>)}</div>
          </section>}
        </>}
        <p className="performance-method">Every submitted A–D answer counts as one attempt. A steal is a second attempt; reveals and skipped questions are not counted.{report.lastUpdated ? ` Last updated ${new Date(report.lastUpdated).toLocaleString()}.` : ''}</p>
      </div>
      <footer className="performance-actions">
        <button className="clear-performance" onClick={onClear} disabled={!total}><Icon name="reset"/>Start new group · clear results</button>
        <button className="primary" onClick={onClose}>Done</button>
      </footer>
    </section>
  </div>;
}

function Welcome({ onStart, onOpenPerformance, attemptCount }) {
  const seconds = THEME_SECONDS;
  const [sound, setSound] = useState(true);
  const [teams, setTeams] = useState(DEFAULT_TEAMS);
  const [setup, setSetup] = useState(false);
  const previewAudioRef = useRef(null);

  const updateTeam = (i, value) => setTeams(prev => prev.map((t, n) => n === i ? value : t));
  return <main className="welcome">
    <section className="welcome-title">
      <h1>CAN OR<br/>CANNOT?</h1>
      <div className="showdown">The Singapore Showdown</div>
      <p>{rounds.length} pick-your-own themes · {TOTAL_QUESTIONS} unique questions · 30 seconds per theme</p>
      <div className="welcome-actions">
        <button className="primary" onClick={() => onStart({ teams, seconds, sound })}>Start game <Icon name="next"/></button>
        <button className="secondary" onClick={() => setSetup(v => !v)}>Host setup</button>
      </div>
    </section>
    <section className="round-list" aria-label="Rounds">
      <h2>The rounds</h2>
      {rounds.map((round, i) => <div className="round-row" key={round.title}><strong>{i + 1}</strong><span>{round.title}</span></div>)}
    </section>
    <div className="question-mark" aria-hidden="true">?</div>
    <section className="setup-bar">
      <button onClick={() => setSetup(true)}>2 teams · host-led</button>
      <label><span>Theme timer</span><strong>{seconds} seconds</strong></label>
      <label className="sound-label"><input type="checkbox" checked={sound} onChange={e => setSound(e.target.checked)}/> Sound {sound ? 'on' : 'off'}</label>
    </section>
    {setup && <div className="setup-modal" role="dialog" aria-modal="true" aria-labelledby="setup-title">
      <div className="modal-sheet">
        <div className="modal-head"><h2 id="setup-title">Host setup</h2><button onClick={() => setSetup(false)} aria-label="Close">×</button></div>
        <p className="setup-explainer">Two representatives face off. Let the players choose a theme, then you tap it. Read the question; the first player to yell their team name earns the first answer.</p>
        <div className="team-inputs">{teams.map((team, i) => <div className="team-setup" key={i}><label>Team {i + 1}<input value={team} onChange={e => updateTeam(i, e.target.value)} maxLength={22}/></label></div>)}</div>
        <div className="sound-preview"><strong>Game-show sound check</strong><button onClick={() => playGameShowCue(previewAudioRef, 'correct')}>▶ Correct fanfare</button><button onClick={() => playGameShowCue(previewAudioRef, 'wrong')}>▶ Wrong buzzer</button></div>
        <div className="performance-setting"><div><strong>Class performance</strong><span>{attemptCount ? `${attemptCount} saved answer attempt${attemptCount === 1 ? '' : 's'}` : 'No saved answers yet'}</span></div><button onClick={onOpenPerformance}>View report →</button></div>
        <p className="host-note">Each theme has one 30-second countdown. It starts automatically, pauses on a buzz and resumes with the next question. A wrong answer automatically gives the other team one steal for the same 100 points—no second buzz required. Host keys: 1 / 2 register the first team · A / B / C / D enter their answer · Space pauses · R reveals · → next.</p>
        <button className="primary full" onClick={() => setSetup(false)}>Ready, can!</button>
      </div>
    </div>}
  </main>;
}

function ThemeBoard({ completedRounds, teams, scores, onPick, onHome, onOpenPerformance, attemptCount }) {
  return <main className="theme-board">
    <header className="theme-board-head"><div><p>Host-controlled category board</p><h1>Pick a theme</h1><span>Ask the players what they want. You tap their choice.</span></div><div className="theme-score">{teams.map((team, i) => <div key={team + i}><span>{team}</span><strong>{scores[i]}</strong></div>)}</div></header>
    <section className="theme-grid" aria-label="Available themes">{rounds.map((round, i) => {
      const completed = completedRounds.includes(i);
      return <button key={round.title} disabled={completed} onClick={() => onPick(i)} className={completed ? 'theme-card completed' : 'theme-card'}><small>Theme {String(i + 1).padStart(2, '0')}</small><strong>{round.title}</strong><span>{completed ? 'Played ✓' : '20 questions →'}</span></button>;
    })}</section>
    <footer className="theme-board-foot"><span>{completedRounds.length} of {rounds.length} themes played</span><div><button className="text-button" onClick={onOpenPerformance}>Class performance · {attemptCount}</button><button className="text-button" onClick={onHome}>Back to lobby</button></div></footer>
  </main>;
}

function RoundIntro({ roundIndex, completedCount, teams, onBegin, onBack, onHome, onOpenPerformance }) {
  const r = rounds[roundIndex];
  const [reps, setReps] = useState(['Representative 1', 'Representative 2']);
  return <main className="round-intro">
    <div className="round-number">{String(roundIndex + 1).padStart(2, '0')}</div>
    <div className="round-intro-copy">
      <p>Chosen theme · {completedCount + 1} of {rounds.length} to play</p>
      <h1>{r.title}</h1>
      <div className="round-rule"/>
      <p className="round-desc">{r.description}</p>
      <div className="rep-call"><strong>Send up one representative per team</strong>{teams.map((team,i) => <label key={team}>{team}<input value={reps[i]} onChange={e => setReps(v => v.map((x,n) => n === i ? e.target.value : x))}/></label>)}</div>
      <button className="primary" onClick={() => onBegin(reps)}>Start round <Icon name="play"/></button>
      <button className="text-button" onClick={onBack}>Pick another theme</button>
      <button className="text-button" onClick={onOpenPerformance}>Class performance</button>
      <button className="text-button" onClick={onHome}>Back to lobby</button>
    </div>
  </main>;
}

function Timer({ time, total, running }) {
  const progress = Math.max(0, time / total);
  return <div className={`timer ${time <= 5 ? 'urgent' : ''} ${running ? 'running' : ''}`} style={{'--progress': `${progress * 360}deg`}} aria-label={`${time} seconds remaining`}>
    <div>{time}</div>
    <span>{running ? 'seconds' : 'paused'}</span>
  </div>;
}

function Scoreboard({ teams, reps, scores, onOpenPerformance, attemptCount }) {
  return <aside className="scoreboard"><div className="score-title">Score</div>{teams.map((team, i) => <div className="score-team" key={team + i}>
    <span>{team}</span><em>{reps[i]} · yell “{team.toUpperCase()}”</em><strong>{scores[i]}</strong>
  </div>)}<button className="performance-link" onClick={onOpenPerformance}><span>Class performance</span><strong>{attemptCount}</strong><small>saved attempts →</small></button></aside>;
}

function Quiz({ config, onHome, onRecordAttempt, onOpenPerformance, attemptCount }) {
  const [roundIndex, setRoundIndex] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [time, setTime] = useState(config.seconds);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [scores, setScores] = useState(() => config.teams.map(() => 0));
  const [awarded, setAwarded] = useState([]);
  const [reps, setReps] = useState(['Representative 1', 'Representative 2']);
  const [buzzed, setBuzzed] = useState(null);
  const [denied, setDenied] = useState([]);
  const [wrongChoices, setWrongChoices] = useState([]);
  const [finished, setFinished] = useState(false);
  const [completedRounds, setCompletedRounds] = useState([]);
  const audioRef = useRef(null);

  const question = roundIndex !== null && questionIndex >= 0 ? rounds[roundIndex].questions[questionIndex] : null;
  useEffect(() => {
    if (!running || revealed || time <= 0) return;
    const id = setTimeout(() => setTime(t => Math.max(0, t - 1)), 1000);
    return () => clearTimeout(id);
  }, [running, revealed, time]);
  useEffect(() => {
    if (!config.sound || !running) return;
    if (time <= 5 && time > 0) playGameShowCue(audioRef, 'tick');
    if (time === 0) { playGameShowCue(audioRef, 'timeout'); setRunning(false); }
  }, [time, running, config.sound]);
  useEffect(() => {
    const key = e => {
      if (e.target instanceof Element && e.target.matches('input, select, textarea, [contenteditable="true"]')) return;
      if (e.code === 'Space' && question) { e.preventDefault(); setRunning(v => !v); }
      if (e.key.toLowerCase() === 'r' && question) reveal();
      if (e.key === 'ArrowRight' && question) next();
      const buzzKey = e.key === '1' || e.code === 'Digit1' || e.code === 'Numpad1' ? 0 : e.key === '2' || e.code === 'Digit2' || e.code === 'Numpad2' ? 1 : null;
      if (buzzKey !== null && question && !revealed) { e.preventDefault(); registerBuzz(buzzKey); }
      const answerKey = ['a', 'b', 'c', 'd'].indexOf(e.key.toLowerCase());
      if (answerKey >= 0 && buzzed !== null && !revealed) { e.preventDefault(); handleAnswer(answerKey); }
    };
    document.addEventListener('keydown', key, true); return () => document.removeEventListener('keydown', key, true);
  });
  const resetQuestionState = () => { setRunning(true); setRevealed(false); setSelected(null); setAwarded([]); setBuzzed(null); setDenied([]); setWrongChoices([]); };
  const chooseRound = index => { if (completedRounds.includes(index)) return; setRoundIndex(index); setQuestionIndex(-1); setRunning(false); };
  const startRound = nextReps => { setReps(nextReps); setQuestionIndex(0); setTime(config.seconds); resetQuestionState(); if (config.sound) playGameShowCue(audioRef, 'roundStart'); };
  const reveal = () => { if (!question) return; setRevealed(true); setRunning(false); if (config.sound) playGameShowCue(audioRef, 'reveal'); };
  const next = () => {
    if (!question) return;
    if (time > 0 && questionIndex < rounds[roundIndex].questions.length - 1) { setQuestionIndex(i => i + 1); resetQuestionState(); return; }
    const nextCompleted = completedRounds.includes(roundIndex) ? completedRounds : [...completedRounds, roundIndex];
    setCompletedRounds(nextCompleted);
    setQuestionIndex(-1);
    setRunning(false);
    if (nextCompleted.length === rounds.length) setFinished(true);
    else setRoundIndex(null);
  };
  const award = i => { if (i >= config.teams.length || awarded.includes(i)) return; setScores(s => s.map((v, n) => n === i ? v + 100 : v)); setAwarded(a => [...a, i]); if (config.sound) playGameShowCue(audioRef, 'correct'); };
  const registerBuzz = i => { if (time <= 0 || buzzed !== null || denied.includes(i) || revealed) return; setBuzzed(i); setRunning(false); if (config.sound) playGameShowCue(audioRef, 'buzz', i); };
  const handleAnswer = choice => {
    if (!question || buzzed === null || revealed || wrongChoices.includes(choice)) return;
    const answeringTeam = buzzed;
    const isCorrect = choice === question.answer;
    onRecordAttempt({
      category: question.category,
      topic: question.topic,
      team: config.teams[answeringTeam],
      correct: isCorrect,
      stage: denied.length ? 'steal' : 'initial',
      answeredAt: new Date().toISOString()
    });
    setSelected(choice);
    setRunning(false);
    if (isCorrect) {
      award(answeringTeam);
      setRevealed(true);
      return;
    }
    const nextDenied = [...denied, answeringTeam];
    setWrongChoices(v => [...v, choice]);
    setDenied(nextDenied);
    const otherTeam = answeringTeam === 0 ? 1 : 0;
    if (!nextDenied.includes(otherTeam)) {
      setBuzzed(otherTeam);
    } else {
      setBuzzed(null);
      setRevealed(true);
    }
    if (config.sound) playGameShowCue(audioRef, 'wrong');
  };
  const toggleTimer = () => { if (time <= 0) { setTime(config.seconds); setRunning(true); } else setRunning(v => !v); };
  const reset = () => { if (confirm('Reset all scores and return to the lobby?')) onHome(); };

  if (finished) {
    const max = Math.max(...scores); const winners = config.teams.filter((_, i) => scores[i] === max);
    return <main className="finale"><p>Final shiokdown complete</p><h1>{winners.join(' & ')}<br/><span>win{winners.length > 1 ? '' : 's'}!</span></h1><div className="final-score">{max} points</div><p>{reactions[max / 100 % reactions.length | 0]} Everyone else: can try again.</p><div><button className="primary" onClick={onHome}>Play again <Icon name="reset"/></button><button className="secondary" onClick={onOpenPerformance}>View class performance</button></div></main>;
  }
  if (roundIndex === null) return <ThemeBoard completedRounds={completedRounds} teams={config.teams} scores={scores} onPick={chooseRound} onHome={onHome} onOpenPerformance={onOpenPerformance} attemptCount={attemptCount}/>;
  if (questionIndex < 0) return <RoundIntro roundIndex={roundIndex} completedCount={completedRounds.length} teams={config.teams} onBegin={startRound} onBack={() => setRoundIndex(null)} onHome={onHome} onOpenPerformance={onOpenPerformance}/>;

  return <main className="game-shell">
    <section className="game-main">
      <header className="game-header"><div>Round {roundIndex + 1} · {rounds[roundIndex].title}</div><strong>{String(questionIndex + 1).padStart(2,'0')} / {rounds[roundIndex].questions.length}</strong></header>
      <div className="question-top"><div className="brand-small">Can or Cannot?<span>— The Singapore Showdown</span></div><Timer time={time} total={config.seconds} running={running}/></div>
      <section className="question-area" aria-live="polite"><h1>{question.q}</h1>
        <div className="buzz-zone" aria-label="Host buzz controls">{config.teams.map((team,i) => {
          const isActive = buzzed === i;
          const isDenied = denied.includes(i);
          const isSteal = isActive && denied.length > 0;
          return <button key={team} disabled={time <= 0 || buzzed !== null || isDenied || revealed} onClick={() => registerBuzz(i)} className={isActive ? `buzzed ${isSteal ? 'steal' : ''}` : isDenied ? 'denied' : ''}><small>{reps[i]} · {team}</small><strong>{isSteal ? 'STEAL FOR 100' : isActive ? 'BUZZED FIRST' : team.toUpperCase()}</strong><span>{isSteal ? 'Host: enter A, B, C or D' : isActive ? 'Say A, B, C or D' : isDenied ? 'Wrong answer' : `Host: press ${i + 1}`}</span></button>;
        })}</div>
        {!revealed && <div className={`answer-status ${denied.length ? 'steal-status' : ''}`}>{time <= 0 ? 'Time’s up — end this theme or restart its 30-second clock.' : buzzed === null ? `Waiting for ${config.teams[0]} or ${config.teams[1]} to yell their team name…` : denied.length ? `Automatic steal for 100 — ${config.teams[buzzed]} can answer A, B, C or D. No second buzz.` : `${config.teams[buzzed]} buzzed first — choose A, B, C or D.`}</div>}
        <div className="answers">{question.options.map((option, i) => <button key={option} disabled={time <= 0 || buzzed === null || revealed || wrongChoices.includes(i)} onClick={() => handleAnswer(i)} className={`${selected === i ? 'selected' : ''} ${revealed && i === question.answer ? 'correct-auto' : ''} ${wrongChoices.includes(i) ? 'wrong-auto' : ''}`}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div>
        {revealed && <div className="reveal"><strong>{String.fromCharCode(65 + question.answer)} · {question.options[question.answer]}</strong><p>{question.explain}</p><a href={question.source} target="_blank" rel="noreferrer">Check the source ↗</a></div>}
      </section>
    </section>
    <Scoreboard teams={config.teams} reps={reps} scores={scores} onOpenPerformance={onOpenPerformance} attemptCount={attemptCount}/>
    <footer className="host-controls"><button onClick={toggleTimer}><Icon name={running ? 'pause' : 'play'}/>{running ? 'Pause countdown' : time <= 0 ? `Restart ${config.seconds}s theme` : 'Resume countdown'}</button><button onClick={reveal} disabled={revealed || time <= 0}><Icon name="eye"/>Reveal answer</button><button onClick={next}>{time <= 0 ? (completedRounds.length === rounds.length - 1 ? 'Finish game' : 'End theme') : questionIndex === rounds[roundIndex].questions.length - 1 ? (completedRounds.length === rounds.length - 1 ? 'Finish game' : 'Choose next theme') : 'Next'}<Icon name="next"/></button><button className="reset-button" onClick={reset} aria-label="Reset game"><Icon name="reset"/></button></footer>
  </main>;
}

function App() {
  const [config, setConfig] = useState(null);
  const [attempts, setAttempts] = useState(loadSavedAttempts);
  const [performanceOpen, setPerformanceOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(PERFORMANCE_STORAGE_KEY, JSON.stringify({ version: PERFORMANCE_SCHEMA_VERSION, attempts }));
    } catch {}
  }, [attempts]);

  const recordAttempt = useCallback(attempt => {
    setAttempts(current => [...current, attempt].slice(-MAX_SAVED_ATTEMPTS));
  }, []);

  const clearPerformance = useCallback(() => {
    if (!window.confirm('Clear all saved class performance results? This cannot be undone.')) return;
    setAttempts([]);
  }, []);

  return <>
    {config
      ? <Quiz config={config} onHome={() => setConfig(null)} onRecordAttempt={recordAttempt} onOpenPerformance={() => setPerformanceOpen(true)} attemptCount={attempts.length}/>
      : <Welcome onStart={setConfig} onOpenPerformance={() => setPerformanceOpen(true)} attemptCount={attempts.length}/>}
    {performanceOpen && <PerformanceDashboard attempts={attempts} onClose={() => setPerformanceOpen(false)} onClear={clearPerformance}/>}
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
