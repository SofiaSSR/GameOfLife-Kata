//this script are goint to receive naturals n*m after that n rows of m parameters , . for dead cells and * for alife cells
//It will return the next state of the cells based on the rules of the Game of Life by Jhon Conway.
// -----------------------read input-------------------------------
function parseRawInput(rawInput) {
rawInput= rawInput.split("\n")
return {
  generation: rawInput[0],
  dimensionsLine: rawInput[1],
  State: rawInput.splice(2)
}
}
function parseRawState(rawState){
  return rawState.map(row => {
    return row.split("").map(status => {
      if(status=="*") return 1
      return 0
    })
  });
}

function createGame(rawInput){
  let game =parseRawInput(rawInput)
  game.State = parseRawState(game.State)
  return game
}
//--------------process-input-----------------------

function toState(cellsGrid) {
  return {
    grid: cellsGrid,
    width: cellsGrid[0].length,
    height: cellsGrid.length,
  };
}

function toCellGrid(matrix) {
  return matrix.map((row) => row.map((status) => Cell(status)));
}

function Cell(status) {
  return {
    status: status,
    neighbors: 0,
  }}

//----------------checking rules----------------------------

function updateAliveNeighbors(State) {
  State.grid = State.grid.map((row, cellRow) =>
    row.map((cell, cellColumn) => {
      return {
        status: cell.status,
        neighbors: countAliveNeighbors(cellRow, cellColumn, State),
      };
    })
  );
  return State;
}
function countAliveNeighbors(cellRow, cellColumn, State) {
  const validNeightbors = checkValidNeighbors(
    findNeighbors(cellRow, cellColumn),
    State.width,
    State.height
  );
  let count = 0;
  validNeightbors.forEach((neighbor) => {
    count += State.grid[neighbor.row][neighbor.column].status;
  });
  return count;
}

function checkValidNeighbors(neighborsArray, gridWidth, gridHeight) {
  return neighborsArray.filter((neighbor) => {
    if (neighbor.row < 0 || neighbor.row >= gridHeight) return false;
    if (neighbor.column < 0 || neighbor.column >= gridWidth) return false;
    return true;
  });
}

function findNeighbors(cellRow, cellColumn) {
  const neighborsRelativeAdress = [
    { row: -1, column: -1 },
    { row: -1, column: 0 },
    { row: -1, column: 1 },
    { row: 0, column: -1 },
    { row: 0, column: 1 },
    { row: 1, column: -1 },
    { row: 1, column: 0 },
    { row: 1, column: 1 },
  ];
  return neighborsRelativeAdress.map((relativeNeighborAdress) =>
    findNeighborAdress(
      cellRow,
      cellColumn,
      relativeNeighborAdress.row,
      relativeNeighborAdress.column
    )
  );
}

function findNeighborAdress(
  cellRow,
  cellColumn,
  relativeNeighborRow,
  relativeNeighborColumn
) {
  return {
    row: relativeNeighborRow + cellRow,
    column: relativeNeighborColumn + cellColumn,
  };
}

function checkIfCellDied(cell) {
  return cell.neighbors < 2 || cell.neighbors > 3;
}

function checkIfCellBorn(cell) {
  return cell.neighbors == 3;
}

function updateState(State) {
  State.grid = State.grid.map((row) =>
    row.map((cell) => {
      if (checkIfCellDied(cell)) {
        return Cell(0);
      }
      if (checkIfCellBorn(cell)) {
        return Cell(1);
      }
      return Cell(cell.status);
    })
  );
  return State;
}

//---------------printing State--------------

function printState(State) {
  State.grid = parceRows(parceCells(State.grid));
  console.log(State.grid.join("\n"));
  return State.grid.join("\n");
}

function parceCells(cellGrid) {
  return cellGrid.map((row) =>
    row.map((cell) => {
      if (cell.status == 1) return "*";
      return ".";
    })
  );
}

function parceRows(parcedCellGrid) {
  return parcedCellGrid.map((row) => row.join(""));
}

function parceResults(dimensionsLine, State) {
  return `Generation 2:\n${dimensionsLine}\n${printState(State)}`;
}
//--------------- playing--------------
function playState(state){
  return updateState(updateAliveNeighbors(toState(toCellGrid(state))));
}
function playGame(game){
  game.State = playState(game.State);
  return game
}
export {
  toCellGrid,
  countAliveNeighbors,
  toState,
  findNeighbors,
  findNeighborAdress,
  checkValidNeighbors,
  updateAliveNeighbors,
  checkIfCellDied,
  checkIfCellBorn,
  updateState,
  printState,
  parceResults,
  parseRawInput,
  parseRawState,
  createGame,
  playGame,
};

//think into the desition
// think 'bout the response
