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
3. **Backend Setup:**
   ```
   cd BlockchainSimulation
   python -m venv venv
   source venv/bin/activate  # (Use venv\Scripts\activate on Windows)
   pip install -r requirements.txt
   python app.py
   ```
---

**How to Use**

Open the app in your browser.
Click "Run Simulation" to start.
Watch states turn red or blue on the map as votes are processed.
Use the speed controls to adjust the simulation speed.
Scroll through the vote log to see detailed blockchain transactions for each state.
Reset the simulation with the "Reset" button to start over.

---

**File Structure**
```
us-2024-election-sim/
├── VotingSimulation/          # Frontend React application
│   ├── public/                # Static assets
│   ├── src/                   # React components and logic
│   └── package.json           # npm configuration
├── BlockchainSimulation/      # Backend Flask application
│   ├── app.py                 # Main backend logic
│   ├── requirements.txt       # Python dependencies
│   └── blockchain/            # Blockchain logic and utilities
└── README.md                  # Project documentation
```

---

**Contributing**

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request for review.

---

**Contact**

For questions or suggestions, feel free to reach out:
Email: qendrim@ualberta.ca
GitHub: qbeka
