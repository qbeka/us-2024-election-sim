import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import topologyData from '../data/states-10m.json';
import './USMap.css';

const statesData = {
  "01": { abbr: "AL", ev: 9 },
  "02": { abbr: "AK", ev: 3 },
  "04": { abbr: "AZ", ev: 11 },
  "05": { abbr: "AR", ev: 6 },
  "06": { abbr: "CA", ev: 54 },
  "08": { abbr: "CO", ev: 10 },
  "09": { abbr: "CT", ev: 7 },
  "10": { abbr: "DE", ev: 3 },
  "11": { abbr: "DC", ev: 3 },
  "12": { abbr: "FL", ev: 30 },
  "13": { abbr: "GA", ev: 16 },
  "15": { abbr: "HI", ev: 4 },
  "16": { abbr: "ID", ev: 4 },
  "17": { abbr: "IL", ev: 19 },
  "18": { abbr: "IN", ev: 11 },
  "19": { abbr: "IA", ev: 6 },
  "20": { abbr: "KS", ev: 6 },
  "21": { abbr: "KY", ev: 8 },
  "22": { abbr: "LA", ev: 8 },
  "23": { abbr: "ME", ev: 4 },
  "24": { abbr: "MD", ev: 10 },
  "25": { abbr: "MA", ev: 11 },
  "26": { abbr: "MI", ev: 15 },
  "27": { abbr: "MN", ev: 10 },
  "28": { abbr: "MS", ev: 6 },
  "29": { abbr: "MO", ev: 10 },
  "30": { abbr: "MT", ev: 4 },
  "31": { abbr: "NE", ev: 5 },
  "32": { abbr: "NV", ev: 6 },
  "33": { abbr: "NH", ev: 4 },
  "34": { abbr: "NJ", ev: 14 },
  "35": { abbr: "NM", ev: 5 },
  "36": { abbr: "NY", ev: 28 },
  "37": { abbr: "NC", ev: 16 },
  "38": { abbr: "ND", ev: 3 },
  "39": { abbr: "OH", ev: 17 },
  "40": { abbr: "OK", ev: 7 },
  "41": { abbr: "OR", ev: 8 },
  "42": { abbr: "PA", ev: 19 },
  "44": { abbr: "RI", ev: 4 },
  "45": { abbr: "SC", ev: 9 },
  "46": { abbr: "SD", ev: 3 },
  "47": { abbr: "TN", ev: 11 },
  "48": { abbr: "TX", ev: 40 },
  "49": { abbr: "UT", ev: 6 },
  "50": { abbr: "VT", ev: 3 },
  "51": { abbr: "VA", ev: 13 },
  "53": { abbr: "WA", ev: 12 },
  "54": { abbr: "WV", ev: 4 },
  "55": { abbr: "WI", ev: 10 },
  "56": { abbr: "WY", ev: 3 }
};

const labelOffsets = {
  AL: [-1.5, 1.3],
  AK: [-10, 5.5],
  AZ: [-2, 1],
  AR: [-2, 1.3],
  CA: [-1.5, 0],
  CO: [-2, 1.3],
  CT: [0, 0.5],
  DE: [0.3, 1],
  DC: [6.6, 4.0],
  FL: [-0.7, 1.3],
  GA: [-1.5, 1.6],
  HI: [1, -0.7],
  ID: [-1.5, 0],
  IL: [-2, 1.3],
  IN: [-1.8, 1.6],
  IA: [-2, 1.3],
  KS: [-2, 1.3],
  KY: [-2, 1.3],
  LA: [-2, 1.0],
  ME: [-1.2, 1.8],
  MD: [1.3, 0.3],
  MA: [1.5, 1.3],
  MI: [-1, 0.5],
  MN: [-2.3, 1.7],
  MS: [-1.8, 1.9],
  MO: [-2, 1.3],
  MT: [-1.5, 1],
  NE: [-1.5, 1.3],
  NV: [-2, 1],
  NH: [1, 1],
  NJ: [0.5, 1],
  NM: [-2, 1.3],
  NY: [-1, 2],
  NC: [-2, 1.7],
  ND: [-2, 1.3],
  OH: [-2, 1.3],
  OK: [-2, 1.3],
  OR: [-2, 1],
  PA: [-2, 1.7],
  RI: [0, 0.9],
  SC: [-1.6, 1.8],
  SD: [-2, 1.3],
  TN: [-2, 1.5],
  TX: [-2, 1.3],
  UT: [-2, 1],
  VT: [-1.5, 3.5],
  VA: [-1.4, 1.8],
  WA: [-2, 1],
  WV: [-2, 1.6],
  WI: [-2, 1.3],
  WY: [-2, 1.3]
};

const lineOffsets = {
  HI: { dx: 0, dy: -30 },
  NH: { dx: 40, dy: -5},
  VT: { dx: -10, dy: -30},
  MA: { dx: 40, dy: -10},
  DC: { dx: 55, dy: -8},
  RI: { dx: 40, dy: 0},
  CT: { dx: 30, dy: 20},
  NJ: { dx: 40, dy: 5},
  DE: { dx: 30, dy: 10},
  MD: { dx: 50, dy: 30}
};

const fullNames = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
};

export default function USMap({ stateColors = {} }) {
  const [clickedState, setClickedState] = useState(null);

  const handleStateClick = (geo) => {
    const st = statesData[geo.id];
    if (st) {
      setClickedState({
        name: fullNames[st.abbr] || st.abbr,
        ev: st.ev
      });
    }
  };

  const handleClosePopup = () => {
    setClickedState(null);
  };

  return (
    <div className="usmap-container">
      <ComposableMap
        projection="geoAlbersUsa"
        width={800}
        height={700}
      >
        <Geographies geography={topologyData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const st = statesData[geo.id];
              if (!st) return null;

              let fill = "#c5b999";
              const color = stateColors[st.abbr];
              if (color === "red")  fill = "#ff7f7f";
              if (color === "blue") fill = "#7f7fff";

              // offsets
              const [cx, cy] = geoCentroid(geo);
              const lineData = lineOffsets[st.abbr];

              if (lineData) {
                return (
                  <React.Fragment key={geo.rsmKey}>
                    <Geography
                      geography={geo}
                      fill={fill}
                      stroke="#fff"
                      onClick={() => handleStateClick(geo)}
                      style={{
                        default: { outline: "none" },
                        hover:   { fill: "#999", outline: "none" },
                        pressed: { fill: "#666", outline: "none" }
                      }}
                    />
                    <Annotation
                      subject={[cx, cy]}
                      dx={lineData.dx}
                      dy={lineData.dy}
                      connectorProps={{
                        stroke: "#333",
                        strokeWidth: 0.5,
                        strokeLinecap: "round"
                      }}
                    >
                      <text
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        style={{
                          fill: "#000",
                          fontSize: "0.7rem",
                          fontWeight: "normal"
                        }}
                      >
                        {st.abbr} ({st.ev})
                      </text>
                    </Annotation>
                  </React.Fragment>
                );
              }

              // no line offset => label offset
              const offset = labelOffsets[st.abbr] || [0, 0];
              const finalX = cx + offset[0];
              const finalY = cy + offset[1];

              return (
                <React.Fragment key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    fill={fill}
                    stroke="#fff"
                    onClick={() => handleStateClick(geo)}
                    style={{
                      default: { outline: "none" },
                      hover:   { fill: "#999", outline: "none" },
                      pressed: { fill: "#666", outline: "none" }
                    }}
                  />
                  <Annotation
                    subject={[finalX, finalY]}
                    connectorProps={{ stroke: "none" }}
                  >
                    <text
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      style={{
                        fill: "#000",
                        fontSize: "0.7rem",
                        fontWeight: "normal"
                      }}
                    >
                      {st.abbr} ({st.ev})
                    </text>
                  </Annotation>
                </React.Fragment>
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {clickedState && (
        <div className="state-popup">
          <button className="popup-close-btn" onClick={handleClosePopup}>x</button>
          <strong>{clickedState.name}</strong>
          <div>{clickedState.ev} Electoral Votes</div>
        </div>
      )}
    </div>
  );
}