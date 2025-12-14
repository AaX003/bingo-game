import { useEffect, useState, useRef } from 'react'
import "../css/App.css"; // css file

// images
import orangeCat from "../images/orange-cat.png";
import orangeCatYawn from "../images/orange-cat-yawn.png";
import orangeCatSatisfied from "../images/orange-cat-satisfied.png";
import orangeCatWBlush from "../images/orange-cat-wblush.png";
import orangeCatYawnWBlush from "../images/orange-cat-yawn-wblush.png";


function Bingo() {
  // B Values
  const [bValues, setBValues] = useState(() => {
    const B_VAL = new Set();

    while (B_VAL.size < 5) {
      B_VAL.add(Math.floor(Math.random() * 15) + 1); // inclusively
    }
    return [...B_VAL];
  });

  // I Values
  const [iValues, setIValues] = useState(() => {
    const I_VAL = new Set();

    while (I_VAL.size < 5) {
      I_VAL.add(Math.floor(Math.random() * 15) + 16); // inclusively
    }
    return [...I_VAL];
  });

  // N Values
  const [nValues, setNValues] = useState(() => {
    const N_VAL = new Set();

    while (N_VAL.size < 5) {
      N_VAL.add(Math.floor(Math.random() * 15) + 31); // inclusively
    }
    return [...N_VAL];
  });

  // G Values
  const [gValues, setGValues] = useState(() => {
    const G_VAL = new Set();

    while (G_VAL.size < 5) {
      G_VAL.add(Math.floor(Math.random() * 15) + 46); // inclusively
    }
    return [...G_VAL];
  });

  // O Values
  const [oValues, setOValues] = useState(() => {
    const O_VAL = new Set();

    while (O_VAL.size < 5) {
      O_VAL.add(Math.floor(Math.random() * 15) + 61);// inclusively 
    }
    return [...O_VAL];
  });

  // stamping for 25 cells - cell 12 is FREE space
  const [stamped, setStamped] = useState(() => {
    const stampedArr = Array(25).fill(false); stampedArr[12] = true; return stampedArr;
  });

  // a set for already picked *called* numbers
  const pickedNumbers = useRef(new Set());

  // randomly generated value
  const [randVal, setRandVal] = useState(null); // starts off as null first

  // winner + game over states
  const [hasWon, setHasWon] = useState(null); // winner state
  const [isGameOver, setIsGameOver] = useState(false);

  const [msg, setMsg] = useState(""); // empty message

  // winning combinations
  const winningCombos = [
    // rows
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],

    // columns
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],

    // diagonals
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];

  const intervalRef = useRef(null); // time interval helper

  // useEffect for generating random number
  useEffect(() => {
    if (hasWon || isGameOver) return; // if either outcome state occurred, stop the interval

    intervalRef.current = setInterval(() => {
      if (pickedNumbers.current.size >= 75) {
        clearInterval(intervalRef.current);
        setMsg("No more numbers!");
        setIsGameOver(true);
        return;
      }

      let nextNumber = Math.floor((Math.random() * 75) + 1);

      while (pickedNumbers.current.has(nextNumber)) {
        nextNumber = Math.floor(Math.random() * 75) + 1;
      }

      pickedNumbers.current.add(nextNumber);
      setRandVal(nextNumber);
    }, 4200)
    return () => clearInterval(intervalRef.current);
  }, [hasWon, isGameOver]) // add values to dependency array

  // places stamp
  const PlaceStamp = (i, bv) => {
    if (stamped[i]) return; // if already stamped, don't re-stamp
    if (hasWon) return; // if won, disallow stamping
    if (randVal !== bv) return; // if random value doesn't equal to a column val, disallow stamping

    const updated = [...stamped]; // copies data
    updated[i] = true;
    setStamped(updated);

    // checks if user won
    const result = CheckWinner(updated);
    if (result) {
      clearInterval(intervalRef.current); // clears interval
      setHasWon(true); // set HasWon as true
      setIsGameOver(true); // set isGameOver as true since user won
      setMsg("You Won!"); // prints message
    }
  }

  // checks for a winner
  const CheckWinner = (updated) => {
    for (let combo of winningCombos) {
      const [a, b, c, d, e] = combo;

      if (
        updated[a] && updated[b] && updated[c] 
        && updated[d] && updated[e]
      ) {
        return true; // if a winning combo exists, return true
      }
    }
    return null; // otherwise, return null
  }

  // resets the game
  const ResetGame = () => {

    // reset B Values
    setBValues(() => {
      const B_VAL = new Set();

      while (B_VAL.size < 5) {
        B_VAL.add(Math.floor(Math.random() * 15) + 1);
      }
      return [...B_VAL];
    });

    // reset I Values
    setIValues(() => {
      const I_VAL = new Set();

      while (I_VAL.size < 5) {
        I_VAL.add(Math.floor(Math.random() * 15) + 16);
      }
      return [...I_VAL];
    });

    // reset N Values
    setNValues(() => {
      const N_VAL = new Set();

      while (N_VAL.size < 5) {
        N_VAL.add(Math.floor(Math.random() * 15) + 31);
      }
      return [...N_VAL];
    });

    // reset G Values
    setGValues(() => {
      const G_VAL = new Set();

      while (G_VAL.size < 5) {
        G_VAL.add(Math.floor(Math.random() * 15) + 46);
      }
      return [...G_VAL];
    });

    // reset O Values
    setOValues(() => {
      const O_VAL = new Set();

      while (O_VAL.size < 5) {
        O_VAL.add(Math.floor(Math.random() * 15) + 61);
      }
      return [...O_VAL];
    });

    // reset stamping
    setStamped(() => {
      const stampedArr = Array(25).fill(false); stampedArr[12] = true; return stampedArr;
    });

    // reset outcome states
    setHasWon(null);
    setIsGameOver(false);

    // reset message
    setMsg("");

    // reset picked numbers
    pickedNumbers.current.clear(); // - this prevents the picked numbers from saving

    // reset random value
    setRandVal(null);
  }

  // calls letter in conjunction to the number - like traditional bingo
  const GetLetter = (l) => {
    if (l >= 1 && l <= 15) return "B";
    if (l >= 16 && l <= 30) return "I";
    if (l >= 31 && l <= 45) return "N";
    if (l >= 46 && l <= 60) return "G";
    if (l >= 61 && l <= 75) return "O";
  } 
  // if random value exists, get the corresponding letter or nothing
  const letter = randVal ? GetLetter(randVal) : ""; 


  return (
    <div className="container">
      <div className="game">
        {/* VALUE DISPLAY */}
        <div className="random-value-display-wrapper" style={{ display: randVal === null ? "none" : "grid"}}>
          <div className="random-value-display">
            {randVal ? `${letter}\n ${randVal}` : ""}
          </div>
        </div>
        <div className="grid">
          {/* GRID TITLE */}
        <div className="grid-title">
          <h2 className="title">
            BINGO
          </h2>
        </div>
        {/* B COL */}
        <div className="grid-b-col">
          {bValues.map((bv, i) => (
            <button key={i} className={`cell ${stamped[i * 5 + 0] ? "is-stamped" : ""}`} onClick={() => PlaceStamp(i * 5 + 0, bv)} disabled={hasWon}>
              <span className="cell-num">{bv}</span>
              {/* Cat Stamps */}
              {stamped[i * 5 + 0] && <span className="stamp"><img src={orangeCat} alt="Orange Cat Image" className="img" /></span>}
            </button>
          ))}
        </div>
        {/* I COL */}
        <div className="grid-i-col">
          {iValues.map((iv, i) => (
            <button key={i} className={`cell ${stamped[i * 5 + 1] ? "is-stamped" : ""}`} onClick={() => PlaceStamp(i * 5 + 1, iv)} disabled={hasWon}>
              <span className="cell-num">{iv}</span>
              {/* Cat Stamp */}
              {stamped[i * 5 + 1] && <span className="stamp"><img src={orangeCatYawn} alt="Yawning Orange Cat Image" className="img" /></span>}
            </button>
          ))}
        </div>
        {/* N COL */}
        <div className="grid-n-col">
          {nValues.map((nv, i) => (
            <button key={nv} className={`cell ${stamped[i * 5 + 2] ? "is-stamped" : ""}`} onClick={() => PlaceStamp(i * 5 + 2, nv)} disabled={hasWon}>
              {/* FREE SPACE */}
              {i === 2 ? (
                <span className="cell-num free">FREE</span>
              ) : (
                <span className="cell-num">{nv}</span>
              )}
              {/* Cat Stamp */}
              {stamped[i * 5 + 2] && <span className="stamp"><img src={orangeCatSatisfied} alt="Orange Satisfied Cat Image" className="img" /></span>}
            </button>
          ))}
        </div>
        {/* G COL */}
        <div className="grid-g-col">
            {gValues.map((gv, i) => (
            <button key={i} className={`cell ${stamped[i * 5 + 3] ? "is-stamped" : ""}`} onClick={() => PlaceStamp(i * 5 + 3, gv)} disabled={hasWon}>
              <span className="cell-num">{gv}</span>
              {stamped[i * 5 + 3] && <span className="stamp"><img src={orangeCatWBlush} alt="Cat Image" className="img"/></span>}
            </button>
          ))}
        </div>
        {/* O COL */}
        <div className="grid-o-col">
            {oValues.map((ov, i) => (
            <button key={i} className={`cell ${stamped[i * 5 + 4] ? "is-stamped" : ""}`} onClick={() => PlaceStamp(i * 5 + 4, ov)} disabled={hasWon}>
              <span className="cell-num">{ov}</span>
              {stamped[i * 5 + 4] && <span className="stamp"><img src={orangeCatYawnWBlush} alt="Cat Image" className="img"/></span>}
            </button>
          ))}
        </div>
      </div>
      {/* MESSAGE */}
      {msg && (
        <div className="backdrop">
        <div className="msg-wrapper">
          <span className="msg">
            {msg}
          </span>
          <div className="btn-wrapper">
            <button className="reset-btn" onClick={ResetGame} disabled={!(hasWon || isGameOver)}>Reset</button>
          </div>
        </div>
        </div>
      )}
        </div>
    </div>
  );
}

export default Bingo