function createGamefield(scale) {
    // Generates a 2D filed randomly filed with 0's & 1's
    let gamefield = [];
    for (let x = 0; x < scale; x++) {
        let row = [];
        for (let y = 0; y < scale; y++) {
            row.push(Math.floor(Math.random() * 2))
        }
        gamefield.push(row);
    }
    return gamefield;
}


function joinGamefield(gamefield) {
    // Joinds contents of 2D field into a single string
    let scale = gamefield.length;
    let output = "";
    for (let x = 0; x < scale; x++) {
        output += gamefield[x].join("")
    }
    return output;
}


function calcNeighbours(gamefield) {
    // Returns a 2D field with neighbours counts
    let scale = gamefield.length;
    let neighboursfield = [];
    for (let x = 0; x < scale; x++) {
        let row = [];
        for (let y = 0; y < scale; y++) {
            let count = 0;
            // 3*3 search field + skipping the middle cell
            for (let a = -1; a < 2; a++) {
                for (let b = -1; b < 2; b++) {
                    if (a == 0 && b == 0) {
                        continue;
                    } else if (x + a > -1 && x + a < scale && y + b > -1 && y + b < scale) {
                        if (gamefield[x + a][y + b] == 1) {
                            count++;
                        }
                    }
                }
            }
            row.push(count);
        }
        neighboursfield.push(row)
    }
    return neighboursfield;
}


function regenField(gamefield, neighboursfield) {
    // By the rules of CGOL modifies current gamefield
    let scale = gamefield.length;
    for (let x = 0; x < scale; x++) {
        for (let y = 0; y < scale; y++) {
            let cell = gamefield[x][y];
            let count = neighboursfield[x][y];
            if (cell == 1 && count < 2) {
                gamefield[x][y] = 0;
                continue;
            } else if (cell == 1 && count > 3) {
                gamefield[x][y] = 0;
                continue;
            } else if (cell == 0 && count == 3) {
                gamefield[x][y] = 1;
                continue;
            }
        }
    }
}


function drawgamefield(gamefield, scale) {
    // Visualize the gamefield via <div> field
    var fieldvalues = joinGamefield(gamefield);
    var fielddiv = document.getElementById("gamefield");
    for (let i = 0; i < Math.pow(scale, 2); i++) {
        let mydiv = document.createElement("div");
        if (fieldvalues[i] == 1) {
            mydiv.id = "blockon";
        } else {
            mydiv.id = "blockoff";
        }
        fielddiv.appendChild(mydiv);
    }
}


function runGame(scale) {
    //Main loop
    var myfield = createGamefield(scale);
    setInterval(function() {
        document.getElementById("gamefield").innerHTML = '';
        drawgamefield(myfield, scale);
        regenField(myfield, calcNeighbours(myfield));
    }, 100);
}
