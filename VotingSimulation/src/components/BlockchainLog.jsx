import React, { useEffect, useRef } from 'react';
import './BlockchainLog.css';

export default function BlockchainLog({ voteLog = [] }) {
  // We keep a ref to the log container, so when new entries come in, we can scroll down if we want
  const logRef = useRef(null);

  useEffect(() => {
    // Whenever voteLog changes, scroll to the bottom
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [voteLog]);

  return (
    <div className="blockchain-log" ref={logRef}>
      <h2>Vote Log</h2>
      <p>
        Every vote is recorded as an immutable entry, demonstrating
        transparency, privacy, and security in a decentralized system.
      </p>

      {voteLog.map((entry) => (
        <div key={entry.transactionId} className="log-entry">
          <div className="timestamp">{entry.timestamp}</div>
          <div className="details">
            {entry.state} cast vote for {entry.color === 'blue' ? 'Harris' : 'Trump'}.
            <span className="tx-id">Transaction #{entry.transactionId}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
