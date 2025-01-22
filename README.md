US 2024 Election Simulation

A web application that dynamically simulates the 2024 U.S. Presidential Election. Featuring an interactive map, real-time vote logs, and a mock blockchain system, this project demonstrates transparency, privacy, and security in decentralized voting.

---

## Features
- **Interactive Map:** Tracks electoral votes as states turn red or blue during the simulation.
- **Simulation Speed Control:** Adjust how fast the states are processed in real time.
- **Vote Log:** Displays individual voting transactions for each state, with timestamps and transaction IDs.
- **Blockchain Transparency:** Logs are immutable and represent blockchain-based voting.
- **Reset Functionality:** Restart the simulation to explore outcomes with different speeds.

---

## Technologies Used
- **Frontend:**
  - React (`VotingSimulation` directory)
  - `react-simple-maps` for interactive U.S. map
- **Backend:**
  - Python Flask (`BlockchainSimulation` directory)
  - Mock blockchain logic for logging immutable vote entries

---

## Installation

### Prerequisites
- Node.js and npm (for the frontend)
- Python 3.x (for the backend)

### Steps to Run Locally
1. **Clone the Repository:**
   ```
   bash
   git clone https://github.com/YourUsername/us-2024-election-sim.git
   cd us-2024-election-sim
   ```

2. **Frontend Setup:**
   ```
   cd VotingSimulation
   npm install
   npm start
   ```

