import React, { useState, useRef } from 'react';
import USMap from './USMap';
import BlockchainLog from './BlockchainLog';
import './LandingPage.css';

// All 50 states + DC
const ALL_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL",
  "GA","HI","ID","IL","IN","IA","KS","KY","LA","ME",
  "MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
  "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI",
  "SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

// EVs for each
const STATE_EVS = {
  AL: 9,  AK: 3,  AZ: 11, AR: 6,  CA: 54,
  CO: 10, CT: 7,  DE: 3,  DC: 3,  FL: 30,
  GA: 16, HI: 4,  ID: 4,  IL: 19, IN: 11,
  IA: 6,  KS: 6,  KY: 8,  LA: 8,  ME: 4,
  MD: 10, MA: 11, MI: 15, MN: 10, MS: 6,
  MO: 10, MT: 4,  NE: 5,  NV: 6,  NH: 4,
  NJ: 14, NM: 5,  NY: 28, NC: 16, ND: 3,
  OH: 17, OK: 7,  OR: 8,  PA: 19, RI: 4,
  SC: 9,  SD: 3,  TN: 11, TX: 40, UT: 6,
  VT: 3,  VA: 13, WA: 12, WV: 4,  WI: 10,
  WY: 3
};

export default function LandingPage() {
  // Each state's color: { "CA": "blue", ... }
  const [stateColors, setStateColors] = useState({});
  // Tally
  const [harrisEV, setHarrisEV] = useState(0);
  const [trumpEV, setTrumpEV] = useState(0);
  // "Harris", "Trump", or null if not decided
  const [winner, setWinner] = useState(null);
  // Are we running the simulation?
  const [simulationRunning, setSimulationRunning] = useState(false);
  // The array of unselected states
  const [unselectedStates, setUnselectedStates] = useState([...ALL_STATES]);

  // ---------------------------------------------------------------------
  // ADDED: voteLog array to store multiple "votes" per state assignment
  const [voteLog, setVoteLog] = useState([]);
  // We also track a transaction counter for unique IDs
  const transactionCounter = useRef(1);

  // Simple function to produce a minimal [mm:ss] style timestamp
  function getTimestamp() {
    const now = new Date();
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `[${mm}:${ss}]`;
  }
  // ---------------------------------------------------------------------

  const intervalRef = useRef(null);

  function handleRunSimulation() {
    // If it’s running or we have a winner, do nothing
    if (simulationRunning || winner) return;

    // Ensure a fresh run:
    setStateColors({});
    setHarrisEV(0);
    setTrumpEV(0);
    setWinner(null);
    setUnselectedStates([...ALL_STATES]);

    // ---------------------------------------------------------------------
    // Also reset the vote log + transaction IDs
    setVoteLog([]);
    transactionCounter.current = 1;
    // ---------------------------------------------------------------------

    setSimulationRunning(true);

    // Begin interval
    intervalRef.current = setInterval(() => {
      setUnselectedStates(prev => {
        if (winner) {
          clearInterval(intervalRef.current);
          setSimulationRunning(false);
          return prev;
        }

        if (prev.length === 0) {
          // All states assigned => final winner check
          if (!winner) {
            if (harrisEV > trumpEV) {
              setWinner("Harris");
            } else if (trumpEV > harrisEV) {
              setWinner("Trump");
            } else {
              // Force no tie => pick Harris
              setWinner("Harris");
            }
          }
          clearInterval(intervalRef.current);
          setSimulationRunning(false);
          return prev;
        }

        // pick one random from unselected
        const idx = Math.floor(Math.random() * prev.length);
        const chosenState = prev[idx];

        // remove it from array
        const newArray = [...prev];
        newArray.splice(idx, 1);

        // randomly pick color
        const color = Math.random() < 0.5 ? "blue" : "red";

        // assign color
        setStateColors(old => ({
          ...old,
          [chosenState]: color
        }));

        // add ev
        const ev = STATE_EVS[chosenState] || 0;
        if (color === "blue") {
          setHarrisEV(oldEV => {
            const updated = oldEV + ev;
            if (updated >= 270 && !winner) {
              setWinner("Harris");
            }
            return updated;
          });
        } else {
          setTrumpEV(oldEV => {
            const updated = oldEV + ev;
            if (updated >= 270 && !winner) {
              setWinner("Trump");
            }
            return updated;
          });
        }

        // ---------------------------------------------------------------------
        // ADDED: produce multiple logs for that chosen state. e.g. 50 logs
        for (let i = 0; i < 50; i++) {
          const newTxId = transactionCounter.current++;
          setVoteLog(oldLogs => [
            ...oldLogs,
            {
              timestamp: getTimestamp(),
              state: chosenState,
              color,
              transactionId: newTxId
            }
          ]);
        }
        // ---------------------------------------------------------------------

        return newArray;
      });
    }, 1000);
  }

  // We'll provide a reset button if the simulation ended (meaning all states assigned or a winner).
  const showResetButton = !simulationRunning && (winner || unselectedStates.length === 0);

  function handleReset() {
    // Clear all data
    clearInterval(intervalRef.current);
    setSimulationRunning(false);
    setWinner(null);
    setStateColors({});
    setHarrisEV(0);
    setTrumpEV(0);
    setUnselectedStates([...ALL_STATES]);

    // ---------------------------------------------------------------------
    // Reset logs too
    setVoteLog([]);
    transactionCounter.current = 1;
    // ---------------------------------------------------------------------
  }

  // The fill proportions
  const harrisPercent = (harrisEV / 538) * 100;
  const trumpPercent = (trumpEV / 538) * 100;

  return (
    <div className="container">
      <div className="left-column">

        {/* Controls group */}
        <div className="controls-group" style={{ position: 'relative' }}>
          <button className="run-btn" onClick={handleRunSimulation}>
            Run Simulation
          </button>

          <div className="speed-container">
            <div className="speed-title">Simulation Speed</div>
            <div className="speed-button-group">
              <button className="speed-btn minus-btn">-</button>
              <button className="speed-btn plus-btn">+</button>
            </div>
          </div>

          {showResetButton && (
            <button 
              className="reset-btn" 
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>

        {/* Vote bar */}
        <div className="vote-bar" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${harrisPercent}%`,
              backgroundColor: 'rgba(0,0,255,0.3)',
              zIndex: 1
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: `${trumpPercent}%`,
              backgroundColor: 'rgba(255,0,0,0.3)',
              zIndex: 1
            }}
          />

          <div className="vote-bar-content" style={{ position: 'relative', zIndex: 2 }}>
            <span className="candidate-name">Harris {harrisEV}</span>
            <span className="vote-total">538</span>
            <span className="candidate-name">{trumpEV} Trump</span>

            <div className="arrow arrow-top"></div>
            <div className="arrow arrow-bottom"></div>
          </div>
        </div>

        {winner && (
          <div style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>
            {winner} wins!
          </div>
        )}

        <div className="map-area">
          <USMap stateColors={stateColors} />
        </div>
      </div>

      <div className="right-column">
        {/* Pass the dynamic voteLog to BlockchainLog. */}
        <BlockchainLog voteLog={voteLog} />
      </div>
    </div>
  );
}
