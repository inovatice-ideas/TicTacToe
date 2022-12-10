import React from "react"
import "./style.css"
import Cell from "./Cell"
import { nanoid } from "nanoid"

function App() {
    const marker_bg = [{color: "red"},{color: "green"}]
    const [cellValue, setCellValue] = React.useState([])
    const [currentPlayer, setCurrentPlayer] = React.useState("O")
    const [gameOver, setGameOver] = React.useState(false)

    function allNewGame() {
        const cellArray = ["", "", "", "", "", "", "", "", ""]
        setCellValue(cellArray.map(cell => ({
            id: nanoid(),
            value: cell,
            clickable: true
        })))
    }

    React.useEffect(() => {
        allNewGame()
    }, [])

    React.useEffect(() => {
        if(cellValue.length !== 0) {
            let a = 0
            if(cellValue[0].value !== "" && cellValue[1].value !== "" && cellValue[2].value !== "") {
                if(cellValue[0].value === cellValue[1].value && cellValue[1].value === cellValue[2].value) {
                    a = 1;
                }
            }
            if(cellValue[3].value !== "" && cellValue[4].value !== "" && cellValue[5].value !== "") {
                if(cellValue[3].value === cellValue[4].value && cellValue[4].value === cellValue[5].value) {
                    a = 1;
                }
            }
            if(cellValue[6].value !== "" && cellValue[7].value !== "" && cellValue[8].value !== "") {
                if(cellValue[6].value === cellValue[7].value && cellValue[7].value === cellValue[8].value) {
                    a = 1;
                }
            }
            if(cellValue[0].value !== "" && cellValue[3].value !== "" && cellValue[6].value !== "") {
                if(cellValue[0].value === cellValue[3].value && cellValue[3].value === cellValue[6].value) {
                    a = 1;
                }
            }
            if(cellValue[1].value !== "" && cellValue[4].value !== "" && cellValue[7].value !== "") {
                if(cellValue[1].value === cellValue[4].value && cellValue[4].value === cellValue[7].value) {
                    a = 1;
                }
            }
            if(cellValue[2].value !== "" && cellValue[5].value !== "" && cellValue[8].value !== "") {
                if(cellValue[2].value === cellValue[5].value && cellValue[5].value === cellValue[8].value) {
                    a = 1;
                }
            }
            if(cellValue[0].value !== "" && cellValue[4].value !== "" && cellValue[8].value !== "") {
                if(cellValue[0].value === cellValue[4].value && cellValue[4].value === cellValue[8].value) {
                    a = 1;
                }
            }
            if(cellValue[2].value !== "" && cellValue[4].value !== "" && cellValue[6].value !== "") {
                if(cellValue[2].value === cellValue[4].value && cellValue[4].value === cellValue[6].value) {
                    a = 1;
                }
            }
            if(a === 1) {
                setGameOver(true)
            }
            else {
                const allCellMarked = cellValue.every(cell => cell.value !== "")
                if(allCellMarked) {
                    setCurrentPlayer('None')
                    setGameOver(true)
                }
                else {
                    setCurrentPlayer(prevPlayer => (prevPlayer === 'X' ? 'O' : 'X'))
                }
            }
        }
    }, [cellValue])

    const cell_array = cellValue.map(cell => (
        <Cell 
            key={cell.id}
            id={cell.id}
            value={cell.value} 
            style={cell.value==="X"?marker_bg[0]:marker_bg[1]}
            clickable={cell.clickable}
            handleClick={handleClick}
        />
    ))

    function handleReset() {
        setGameOver(false)
        setCurrentPlayer('O')
        allNewGame()
    }

    function handleClick(id) {
        let index = 0
        for(let i=0; i<10; i++) {
            if(cellValue[i].id === id) {
                index = i
                break
            }
        }
        if(!gameOver && cellValue[index].clickable) {
            setCellValue(prevCellValue => (
                prevCellValue.map(cell => (
                    cell.id === id ? {...cell, value: currentPlayer, clickable: false} : cell
                )))
            )
        }
    }

    return (
        <main>
            <div className="game-title">TIC TAC TOE</div>
            <div>
                <div style={currentPlayer === "X" ? marker_bg[0]:marker_bg[1]}><p>{gameOver ? 'Winning Player: ':'Current Player: '}{currentPlayer}</p></div>
            </div>
            <div className="board-design">
                <div className="cell-container">
                    {cell_array}
                </div>
            </div>
            <button onClick={handleReset}>Reset</button>
        </main>
    )
};

export default App;