import React, { useState } from 'react';

const SELECT = () => {
    // State to keep track of selected boxes
    const [selectedBoxes, setSelectedBoxes] = useState([]);

    // Number of boxes
    const numberOfBoxes = 3;

    // Function to handle select all
    const handleSelectAll = () => {
        // Generate an array with box numbers [0, 1, 2] and set as selected
        setSelectedBoxes(Array.from({ length: numberOfBoxes }, (_, i) => i));
    };

    // Function to handle box click
    const handleBoxClick = (index) => {
        setSelectedBoxes((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    return (
        <div>
            <button onClick={handleSelectAll}>Select All</button>

            <div className="box-container">
                {Array.from({ length: numberOfBoxes }, (_, i) => (
                    <div
                        key={i}
                        className={`box ${selectedBoxes.includes(i) ? 'selected' : ''}`}
                        onClick={() => handleBoxClick(i)}
                    >
                        Box {i + 1}
                    </div>
                ))}
            </div>

            <style>
                {`
          .box-container {
            display: flex;
            gap: 10px;
          }
          .box {
            width: 100px;
            height: 100px;
            border: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .box.selected {
            background-color: lightblue;
          }
        `}
            </style>
        </div>
    );
};

export default SELECT;
