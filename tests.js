import { it, describe } from "mocha";
import { expect } from "chai";
import * as gameOfLife from "./code";

describe("gameOfLife test suit", () => {
    describe("Reading", () => {
        describe("take raw input" , () => {
            it("test example", () => { 
                let cmdInput = "Generation 1:\n4 8\n........\n....*...\n...**...\n........";
             expect(gameOfLife.parseRawInput(cmdInput)).to.deep.equal(
                {generation:"Generation 1:",dimensionsLine:"4 8", State:["........","....*...","...**...","........"]})
             })  
            it("test 2x2 0's", () => { 
                let cmdInput = "Generation 1:\n2 2\n..\n..";
             expect(gameOfLife.parseRawInput(cmdInput)).to.deep.equal(
                {generation:"Generation 1:",dimensionsLine:"2 2", State:["..",".."]})
             })  
         });
        describe("parse raw state input" , () => {
            it("test example", () => { 
                let rawState = gameOfLife.parseRawInput("Generation 1:\n4 8\n........\n....*...\n...**...\n........").State;
             expect(gameOfLife.parseRawState(rawState)).to.deep.equal(
                [[0,0,0,0,0,0,0,0],
                [0,0,0,0,1,0,0,0],
                [0,0,0,1,1,0,0,0],
                [0,0,0,0,0,0,0,0]]
             )
             })
        });
        describe("parse raw state input" , () => {
            it("test example", () => { 
                let rawState = gameOfLife.parseRawInput("Generation 1:\n4 8\n........\n....*...\n...**...\n........").State;
             expect(gameOfLife.parseRawState(rawState)).to.deep.equal(
                [[0,0,0,0,0,0,0,0],
                [0,0,0,0,1,0,0,0],
                [0,0,0,1,1,0,0,0],
                [0,0,0,0,0,0,0,0]]
             )
             })
        });
    describe("create game given a raw input" , () => {
            it("test example", () => { 
                let rawInput = "Generation 1:\n4 8\n........\n....*...\n...**...\n........";
             expect(gameOfLife.createGame(rawInput)).to.deep.equal(
                {generation:"Generation 1:",dimensionsLine:"4 8", State:
                [[0,0,0,0,0,0,0,0],
                [0,0,0,0,1,0,0,0],
                [0,0,0,1,1,0,0,0],
                [0,0,0,0,0,0,0,0]]})
            })
             
          
         });
        });
    describe("Pre-Logic of the game: ", () => {
	    describe("given a matrix of 0,1 return a grid of cells", () => {
            it("matrix of 0's", () => {
                let input = [[0,0],[0,0]];
                expect(gameOfLife.toCellGrid(input)).to.deep.equal([[{status:0,neighbors:0},{status:0,neighbors:0}],[{status:0,neighbors:0},{status:0,neighbors:0}]]);
            })
            it("matrix of 1's", () => {
                let input = [[1,1],[1,1]];
                expect(gameOfLife.toCellGrid(input)).to.deep.equal([[{status:1,neighbors:0},{status:1,neighbors:0}],[{status:1,neighbors:0},{status:1,neighbors:0}]]);
            })

        });
        describe("given a grid of cells return a state", () => {
            it("square matrix", () => {
                let input = [[{status:0,neighbors:0},{status:0,neighbors:0}],[{status:0,neighbors:0},{status:0,neighbors:0}]];
                expect(gameOfLife.toState(input)).to.deep.equal({grid:[[{status:0,neighbors:0},{status:0,neighbors:0}],[{status:0,neighbors:0},{status:0,neighbors:0}]], width: 2, height: 2});
            })
            it("rectangular matrix", () => {
                let input = [[{status:0,neighbors:0},{status:0,neighbors:0}],[{status:0,neighbors:0},{status:0,neighbors:0}],[{status:0,neighbors:0},{status:0,neighbors:0}]];
                expect(gameOfLife.toState(input)).to.deep.equal({grid:[[{status:0,neighbors:0},{status:0,neighbors:0}],[{status:0,neighbors:0},{status:0,neighbors:0}],[{status:0,neighbors:0},{status:0,neighbors:0}]], width: 2, height: 3});
            })
        });
        describe("given a cell coordinates find all neighbors", () => {
            it("coordinate 2,5", () => {
                let cellRow = 2,cellColumn=5;
                expect(gameOfLife.findNeighbors(cellRow,cellColumn)).to.deep.equal([{row:1,column:4},
                    {row:1,column:5},
                    {row:1,column:6},
                    {row:2,column:4},
                    {row:2,column:6},
                    {row:3,column:4},
                    {row:3,column:5},
                    {row:3,column:6}]);
            })
        });
        describe("given a cell coordinates ( cellrow, cellcolumn) and relative coordinates of a neighbort return absolute coordinate of the cell neightbor", () => {
            it("cell at 2,5", () => {
                var cellRow =2,cellColumn= 5,relativeRow=-1,relativeColumn=-1;
                expect(gameOfLife.findNeighborAdress(cellRow,cellColumn,relativeRow,relativeColumn)).to.deep.equal({row:1,column:4}
                );
            })
            it("cell at 3,4", () => {
                var cellRow =3,cellColumn= 4,relativeRow=1,relativeColumn=-1;
                expect(gameOfLife.findNeighborAdress(cellRow,cellColumn,relativeRow,relativeColumn)).to.deep.equal({row:4,column:3}
                );
            })
        });
        describe("given an array of neightbors,width and height of the cells grid, return neightbors between grid", () => {
            it("cell at the bootom corner 3x6 matrix", () => {
                var neighborsArray=[{row:1,column:4},
                    {row:1,column:5},
                    {row:1,column:6},
                    {row:2,column:4},
                    {row:2,column:6},
                    {row:3,column:4},
                    {row:3,column:5},
                    {row:3,column:6}],
                    width =6,
                    height=3;
                expect(gameOfLife.checkValidNeighbors(neighborsArray,width,height)).to.deep.equal([{row:1,column:4},
                    {row:1,column:5},
                    {row:2,column:4}]
                );
            })
            it("cell at the top corner 3x6 matrix", () => {
                var neighborsArray=[{row:-1,column:-1},
                    {row:-1,column:0},
                    {row:-1,column:1},
                    {row:0,column:-1},
                    {row:0,column:1},
                    {row:1,column:-1},
                    {row:1,column:0},
                    {row:1,column:1}],
                    width =6,
                    height=3;
                expect(gameOfLife.checkValidNeighbors(neighborsArray,width,height)).to.deep.equal([{row:0,column:1},
                    {row:1,column:0},
                    {row:1,column:1}]
                );
            })
            it("cell at the top near corner", () => {
                var neighborsArray=[{row:-1,column:1},
                    {row:-1,column:3},
                    {row:-1,column:4},
                    {row:0,column:1},
                    {row:0,column:4},
                    {row:1,column:1},
                    {row:1,column:3},
                    {row:1,column:4}],
                    width =5,
                    height=3;
                expect(gameOfLife.checkValidNeighbors(neighborsArray,width,height)).to.deep.equal([{row:0,column:1},
                    {row:0,column:4},
                    {row:1,column:1},
                    {row:1,column:3},
                    {row:1,column:4}]
                );
            })
            it("cell with all valid neighbors ", () => {
                var neighborsArray=[{row:1,column:4},
                    {row:1,column:5},
                    {row:1,column:6},
                    {row:2,column:4},
                    {row:2,column:6},
                    {row:3,column:4},
                    {row:3,column:5},
                    {row:3,column:6}],
                    width =10,
                    height=10;
                expect(gameOfLife.checkValidNeighbors(neighborsArray,width,height)).to.deep.equal([{row:1,column:4},
                    {row:1,column:5},
                    {row:1,column:6},
                    {row:2,column:4},
                    {row:2,column:6},
                    {row:3,column:4},
                    {row:3,column:5},
                    {row:3,column:6}]
                );
            })
        });
      
        describe("given a cell coordinate and a state, return the number of alive neightbors", () => {
            it("none alive", () => {
                let State = gameOfLife.toState(gameOfLife.toCellGrid([[0,0],[0,0]]));
                expect(gameOfLife.countAliveNeighbors(0,0,State)).to.equal(0);
            })
            it("all alive", () => {
                let State = gameOfLife.toState(gameOfLife.toCellGrid([[1,1,1],[1,0,1],[1,1,1]]));
                expect(gameOfLife.countAliveNeighbors(1,1,State)).to.equal(8);
            })
            it("someone alive", () => {
                let State = gameOfLife.toState(gameOfLife.toCellGrid([[1,1,1],[1,0,1],[1,1,1]]));
                expect(gameOfLife.countAliveNeighbors(0,1,State)).to.equal(4);
            })
            

        });
        describe("given a state return a state with right number of alive neighbors for each cell in grid", () => {
            it("none alive", () => {
                let State = gameOfLife.toState(gameOfLife.toCellGrid([[0,0],[0,0]]));
                expect(gameOfLife.updateAliveNeighbors(State)).to.deep.equal({
                    grid:[[{status:0,neighbors:0},{status:0,neighbors:0}],[{status:0,neighbors:0},{status:0,neighbors:0}]],
                    width:2,
                    height:2,});
            })
            it("all alive", () => {
                let State = gameOfLife.toState(gameOfLife.toCellGrid([[1,1],[1,1]]));
                expect(gameOfLife.updateAliveNeighbors(State)).to.deep.equal({
                    grid:[[{status:1,neighbors:3},{status:1,neighbors:3}],[{status:1,neighbors:3},{status:1,neighbors:3}]],
                    width:2,
                    height:2,});
            })
            it("donut case 3x3", () => {
                let State = gameOfLife.toState(gameOfLife.toCellGrid([[1,1,1],[1,0,1],[1,1,1]]));
                expect(gameOfLife.updateAliveNeighbors(State)).to.deep.equal({
                    grid:[[{status:1,neighbors:2},{status:1,neighbors:4},{status:1,neighbors:2}],
                    [{status:1,neighbors:4},{status:0,neighbors:8},{status:1,neighbors:4}],
                    [{status:1,neighbors:2},{status:1,neighbors:4},{status:1,neighbors:2}]],
                    width:3,
                    height:3,});
            })
            it("ll case 3x3", () => {
                let State = gameOfLife.toState(gameOfLife.toCellGrid([[1,0,1],[1,0,1],[1,0,1]]));
                expect(gameOfLife.updateAliveNeighbors(State)).to.deep.equal({
                    grid:[[{status:1,neighbors:1},{status:0,neighbors:4},{status:1,neighbors:1}],
                    [{status:1,neighbors:2},{status:0,neighbors:6},{status:1,neighbors:2}],
                    [{status:1,neighbors:1},{status:0,neighbors:4},{status:1,neighbors:1}]],
                    width:3,
                    height:3,});
            })

        });
    });
    describe("Logic", () => {
        
        describe("given a updated cell return if it must die ", () => {
            it("need to die by underpopulation 0", () => {
                let cell= {status:1,neighbors:0}
                expect(gameOfLife.checkIfCellDied(cell)).to.deep.equal(true)
            })
            it("need to die by underpopulation 1", () => {
                let cell= {status:1,neighbors:1}
                expect(gameOfLife.checkIfCellDied(cell)).to.deep.equal(true)
            })
            it("need to die by overpopulation 4", () => {
                let cell= {status:1,neighbors:4}
                expect(gameOfLife.checkIfCellDied(cell)).to.deep.equal(true)
            })
            it("not die", () => {
                let cell= {status:1,neighbors:2}
                expect(gameOfLife.checkIfCellDied(cell)).to.deep.equal(false)
            })
            it("re die", () => {
                let cell= {status:0,neighbors:0}
                expect(gameOfLife.checkIfCellDied(cell)).to.deep.equal(true)
            })
    
            });
        describe("given a updated cell return if it must born", () => {
            it("must born", () => {
                let cell= {status:0,neighbors:3}
                expect(gameOfLife.checkIfCellBorn(cell)).to.deep.equal(true)
            })
            it("re born", () => {
                let cell= {status:1,neighbors:3}
                expect(gameOfLife.checkIfCellBorn(cell)).to.deep.equal(true)
            })
            it("not born", () => {
                let cell= {status:0,neighbors:2}
                expect(gameOfLife.checkIfCellBorn(cell)).to.deep.equal(false)
            })
  
            });
            describe("given a state return next state  ", () => {
                it("almost everything died 3x3", () => {
                    let State= gameOfLife.updateAliveNeighbors(gameOfLife.toState(gameOfLife.toCellGrid(
                        [[1,0,1],
                        [1,0,1],
                        [1,0,1]])));
                    expect(gameOfLife.updateState(State)).to.deep.equal(gameOfLife.toState(gameOfLife.toCellGrid([[0,0,0],[1,0,1],[0,0,0]])))
                })
                it("all life cells 2x2", () => {
                    let State= gameOfLife.updateAliveNeighbors(gameOfLife.toState(gameOfLife.toCellGrid(
                        [[1,1],
                        [1,1]])));
                    expect(gameOfLife.updateState(State)).to.deep.equal(gameOfLife.toState(gameOfLife.toCellGrid([[1,1],[1,1]])))
                })
                it("all underpopulation cells 2x2", () => {
                    let State= gameOfLife.updateAliveNeighbors(gameOfLife.toState(gameOfLife.toCellGrid(
                        [[0,0],
                        [0,0]])));
                    expect(gameOfLife.updateState(State)).to.deep.equal(gameOfLife.toState(gameOfLife.toCellGrid([[0,0],[0,0]])))
                })
                it("example case 4x8", () => {
                    let State= gameOfLife.updateAliveNeighbors(gameOfLife.toState(gameOfLife.toCellGrid(
                        [[0,0,0,0,0,0,0,0],
                        [0,0,0,0,1,0,0,0],
                        [0,0,0,1,1,0,0,0],
                        [0,0,0,0,0,0,0,0]])));
                    expect(gameOfLife.updateState(State)).to.deep.equal(gameOfLife.toState(gameOfLife.toCellGrid(
                        [
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,1,1,0,0,0],
                        [0,0,0,1,1,0,0,0],
                        [0,0,0,0,0,0,0,0]])))
                })
                it(" died and left newborns 4x8", () => {
                    let State= gameOfLife.updateAliveNeighbors(gameOfLife.toState(gameOfLife.toCellGrid(
                        [[0,0,0,0,0,0,0,0],
                        [0,0,0,1,1,0,0,0],
                        [0,0,0,1,1,1,0,0],
                        [0,0,0,0,0,0,0,0]])));
                    expect(gameOfLife.updateState(State)).to.deep.equal(gameOfLife.toState(gameOfLife.toCellGrid([
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,1,0,1,0,0],
                        [0,0,0,1,0,1,0,0],
                        [0,0,0,0,1,0,0,0]])))
                })
                // it(" a complex one 4x8", () => {
                //     let State= gameOfLife.updateAliveNeighbors(gameOfLife.toState(gameOfLife.toCellGrid([
                //         [0,0,0,0,0,1,0,0],
                //         [1,0,0,1,1,0,0,0],
                //         [1,1,0,1,1,1,0,0],
                //         [0,0,1,0,0,0,0,0]])));
                //     expect(gameOfLife.updateState(State)).to.deep.equal(gameOfLife.toState(gameOfLife.toCellGrid([
                //         [0,0,0,0,1,0,0,0],
                //         [1,1,1,1,0,0,0,0],
                //         [1,1,0,1,0,1,0,0],
                //         [0,1,1,1,1,0,0,0]])))
                // })
        });
    
    });
    describe("Printing", () => { 
        describe("given a state, retun in .* format ", () => {
                it("matrix of 0's 2x2", () => {
                    let State= gameOfLife.toState(gameOfLife.toCellGrid(
                        [[0,0],
                        [0,0]]));
                    expect(gameOfLife.printState(State)).to.equal("..\n..")
                })
                it("matrix of 1's 2x2", () => {
                    let State= gameOfLife.toState(gameOfLife.toCellGrid(
                        [[1,1],
                        [1,1]]));
                    expect(gameOfLife.printState(State)).to.equal("**\n**")
                })
                it("example case 4x8", () => {
                    let State= gameOfLife.toState(gameOfLife.toCellGrid(
                        [[0,0,0,0,0,0,0,0],
                        [0,0,0,0,1,0,0,0],
                        [0,0,0,1,1,0,0,0],
                        [0,0,0,0,0,0,0,0]]));
                    let expected= `........
....*...
...**...
........`
                    expect(gameOfLife.printState(State)).to.equal(expected)
                })
        });
    });
    describe("Playing", () => {
        describe("from raw input to next state" , () => {
            it("test example", () => { 
                let game = gameOfLife.createGame("Generation 1:\n4 8\n........\n....*...\n...**...\n........");
             expect(gameOfLife.playGame(game)).to.deep.equal(
                {generation:"Generation 1:",dimensionsLine:"4 8", State: gameOfLife.toState(gameOfLife.toCellGrid([[0,0,0,0,0,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,0,0,0]]))
                })
                                       
            }) 
        });
    });
});      
