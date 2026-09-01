import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { rounds } from './questions.js';
import './styles.css';

const DEFAULT_TEAMS = ['Kopi', 'Tea'];
const reactions = ['Steady lah.', 'Can. Definitely can.', 'Wah, knowledge power.', 'Shiok answer.', 'No blur already.'];

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

function Welcome({ onStart }) {
  const [seconds, setSeconds] = useState(20);
  const [sound, setSound] = useState(true);
  const [teams, setTeams] = useState(DEFAULT_TEAMS);
  const [setup, setSetup] = useState(false);
  const previewAudioRef = useRef(null);

  const updateTeam = (i, value) => setTeams(prev => prev.map((t, n) => n === i ? value : t));
  return <main className="welcome">
    <section className="welcome-title">
      <h1>CAN OR<br/>CANNOT?</h1>
      <div className="showdown">The Singapore Showdown</div>
      <p>8 pick-your-own themes · 160 questions · one very serious fight over kaya toast</p>
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
      <label><span>Auto timer</span><select value={seconds} onChange={e => setSeconds(Number(e.target.value))}>{[10,15,20,30].map(n => <option key={n} value={n}>{n} seconds</option>)}</select></label>
      <label className="sound-label"><input type="checkbox" checked={sound} onChange={e => setSound(e.target.checked)}/> Sound {sound ? 'on' : 'off'}</label>
    </section>
    {setup && <div className="setup-modal" role="dialog" aria-modal="true" aria-labelledby="setup-title">
      <div className="modal-sheet">
        <div className="modal-head"><h2 id="setup-title">Host setup</h2><button onClick={() => setSetup(false)} aria-label="Close">×</button></div>
        <p className="setup-explainer">Two representatives face off. Let the players choose a theme, then you tap it. Read the question; the first player to yell their team name earns the first answer.</p>
        <div className="team-inputs">{teams.map((team, i) => <div className="team-setup" key={i}><label>Team {i + 1}<input value={team} onChange={e => updateTeam(i, e.target.value)} maxLength={22}/></label></div>)}</div>
        <div className="sound-preview"><strong>Game-show sound check</strong><button onClick={() => playGameShowCue(previewAudioRef, 'correct')}>▶ Correct fanfare</button><button onClick={() => playGameShowCue(previewAudioRef, 'wrong')}>▶ Wrong buzzer</button></div>
        <p className="host-note">The countdown starts automatically and pauses on a buzz. Host keys: 1 / 2 register the first team · A / B / C / D enter their answer · Space pauses · R reveals · → next.</p>
        <button className="primary full" onClick={() => setSetup(false)}>Ready, can!</button>
      </div>
    </div>}
  </main>;
}

function ThemeBoard({ completedRounds, teams, scores, onPick, onHome }) {
  return <main className="theme-board">
    <header className="theme-board-head"><div><p>Host-controlled category board</p><h1>Pick a theme</h1><span>Ask the players what they want. You tap their choice.</span></div><div className="theme-score">{teams.map((team, i) => <div key={team + i}><span>{team}</span><strong>{scores[i]}</strong></div>)}</div></header>
    <section className="theme-grid" aria-label="Available themes">{rounds.map((round, i) => {
      const completed = completedRounds.includes(i);
      return <button key={round.title} disabled={completed} onClick={() => onPick(i)} className={completed ? 'theme-card completed' : 'theme-card'}><small>Theme {String(i + 1).padStart(2, '0')}</small><strong>{round.title}</strong><span>{completed ? 'Played ✓' : '20 questions →'}</span></button>;
    })}</section>
    <footer className="theme-board-foot"><span>{completedRounds.length} of {rounds.length} themes played</span><button className="text-button" onClick={onHome}>Back to lobby</button></footer>
  </main>;
}

function RoundIntro({ roundIndex, completedCount, teams, onBegin, onBack, onHome }) {
  const r = rounds[roundIndex];
  const [reps, setReps] = useState(['Representative 1', 'Representative 2']);
  return <main className="round-intro">
    <div className="round-number">{String(roundIndex + 1).padStart(2, '0')}</div>
    <div className="round-intro-copy">
      <p>Chosen theme · {completedCount + 1} of 8 to play</p>
      <h1>{r.title}</h1>
      <div className="round-rule"/>
      <p className="round-desc">{r.description}</p>
      <div className="rep-call"><strong>Send up one representative per team</strong>{teams.map((team,i) => <label key={team}>{team}<input value={reps[i]} onChange={e => setReps(v => v.map((x,n) => n === i ? e.target.value : x))}/></label>)}</div>
      <button className="primary" onClick={() => onBegin(reps)}>Start round <Icon name="play"/></button>
      <button className="text-button" onClick={onBack}>Pick another theme</button>
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

function Scoreboard({ teams, reps, scores }) {
  return <aside className="scoreboard"><div className="score-title">Score</div>{teams.map((team, i) => <div className="score-team" key={team + i}>
    <span>{team}</span><em>{reps[i]} · yell “{team.toUpperCase()}”</em><strong>{scores[i]}</strong>
  </div>)}</aside>;
}

function Quiz({ config, onHome }) {
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
  const resetQuestionState = () => { setTime(config.seconds); setRunning(true); setRevealed(false); setSelected(null); setAwarded([]); setBuzzed(null); setDenied([]); setWrongChoices([]); };
  const chooseRound = index => { if (completedRounds.includes(index)) return; setRoundIndex(index); setQuestionIndex(-1); setRunning(false); };
  const startRound = nextReps => { setReps(nextReps); setQuestionIndex(0); resetQuestionState(); if (config.sound) playGameShowCue(audioRef, 'roundStart'); };
  const reveal = () => { if (!question) return; setRevealed(true); setRunning(false); if (config.sound) playGameShowCue(audioRef, 'reveal'); };
  const next = () => {
    if (!question) return;
    if (questionIndex < 19) { setQuestionIndex(i => i + 1); resetQuestionState(); return; }
    const nextCompleted = completedRounds.includes(roundIndex) ? completedRounds : [...completedRounds, roundIndex];
    setCompletedRounds(nextCompleted);
    setQuestionIndex(-1);
    setRunning(false);
    if (nextCompleted.length === rounds.length) setFinished(true);
    else setRoundIndex(null);
  };
  const award = i => { if (i >= config.teams.length || awarded.includes(i)) return; setScores(s => s.map((v, n) => n === i ? v + 100 : v)); setAwarded(a => [...a, i]); if (config.sound) playGameShowCue(audioRef, 'correct'); };
  const registerBuzz = i => { if (buzzed !== null || denied.includes(i) || revealed) return; setBuzzed(i); setRunning(false); if (config.sound) playGameShowCue(audioRef, 'buzz', i); };
  const handleAnswer = choice => {
    if (!question || buzzed === null || revealed || wrongChoices.includes(choice)) return;
    const answeringTeam = buzzed;
    setSelected(choice);
    setRunning(false);
    if (choice === question.answer) {
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
    return <main className="finale"><p>Final shiokdown complete</p><h1>{winners.join(' & ')}<br/><span>win{winners.length > 1 ? '' : 's'}!</span></h1><div className="final-score">{max} points</div><p>{reactions[max / 100 % reactions.length | 0]} Everyone else: can try again.</p><button className="primary" onClick={onHome}>Play again <Icon name="reset"/></button></main>;
  }
  if (roundIndex === null) return <ThemeBoard completedRounds={completedRounds} teams={config.teams} scores={scores} onPick={chooseRound} onHome={onHome}/>;
  if (questionIndex < 0) return <RoundIntro roundIndex={roundIndex} completedCount={completedRounds.length} teams={config.teams} onBegin={startRound} onBack={() => setRoundIndex(null)} onHome={onHome}/>;

  return <main className="game-shell">
    <section className="game-main">
      <header className="game-header"><div>Round {roundIndex + 1} · {rounds[roundIndex].title}</div><strong>{String(questionIndex + 1).padStart(2,'0')} / 20</strong></header>
      <div className="question-top"><div className="brand-small">Can or Cannot?<span>— The Singapore Showdown</span></div><Timer time={time} total={config.seconds} running={running}/></div>
      <section className="question-area" aria-live="polite"><h1>{question.q}</h1>
        <div className="buzz-zone" aria-label="Host buzz controls">{config.teams.map((team,i) => {
          const isActive = buzzed === i;
          const isDenied = denied.includes(i);
          const isSteal = isActive && denied.length > 0;
          return <button key={team} disabled={buzzed !== null || isDenied || revealed} onClick={() => registerBuzz(i)} className={isActive ? `buzzed ${isSteal ? 'steal' : ''}` : isDenied ? 'denied' : ''}><small>{reps[i]} · {team}</small><strong>{isSteal ? 'STEAL' : isActive ? 'BUZZED FIRST' : team.toUpperCase()}</strong><span>{isActive ? 'Say A, B, C or D' : isDenied ? 'Wrong answer' : `Host: press ${i + 1}`}</span></button>;
        })}</div>
        {!revealed && <div className={`answer-status ${denied.length ? 'steal-status' : ''}`}>{buzzed === null ? `Waiting for ${config.teams[0]} or ${config.teams[1]} to yell their team name…` : denied.length ? `${config.teams[denied[0]]} was wrong — ${config.teams[buzzed]} gets the steal.` : `${config.teams[buzzed]} buzzed first — choose A, B, C or D.`}</div>}
        <div className="answers">{question.options.map((option, i) => <button key={option} disabled={buzzed === null || revealed || wrongChoices.includes(i)} onClick={() => handleAnswer(i)} className={`${selected === i ? 'selected' : ''} ${revealed && i === question.answer ? 'correct-auto' : ''} ${wrongChoices.includes(i) ? 'wrong-auto' : ''}`}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div>
        {revealed && <div className="reveal"><strong>{String.fromCharCode(65 + question.answer)} · {question.options[question.answer]}</strong><p>{question.explain}</p><a href={question.source} target="_blank" rel="noreferrer">Check the source ↗</a></div>}
      </section>
    </section>
    <Scoreboard teams={config.teams} reps={reps} scores={scores}/>
    <footer className="host-controls"><button onClick={toggleTimer}><Icon name={running ? 'pause' : 'play'}/>{running ? 'Pause countdown' : time <= 0 ? `Restart ${config.seconds}s` : 'Resume countdown'}</button><button onClick={reveal} disabled={revealed}><Icon name="eye"/>Reveal answer</button><button onClick={next}>{questionIndex === 19 ? (completedRounds.length === rounds.length - 1 ? 'Finish game' : 'Choose next theme') : 'Next'}<Icon name="next"/></button><button className="reset-button" onClick={reset} aria-label="Reset game"><Icon name="reset"/></button></footer>
  </main>;
}

function App() {
  const [config, setConfig] = useState(null);
  return config ? <Quiz config={config} onHome={() => setConfig(null)}/> : <Welcome onStart={setConfig}/>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
