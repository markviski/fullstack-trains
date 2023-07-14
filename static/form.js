const mailReg = new RegExp("^[^@]+@(yahoo|gmail)\.(com)$");
const linkReg = new RegExp("(https?:\/\/)?([a-zA-Z0-9_\-]+[.])*[a-zA-Z0-9_\-]+[.]+([a-z]{2,3})$");
const floatReg = new RegExp("^[0-9]*[.]*[0-9]+$");
const exchange = { 'usd': 1, 'eur': 0.91, 'gbp': 0.76, 'ron': 4.51 };

function emailCheck(email) {
    if (!mailReg.test(email)) {
        document.getElementById("email-format-error").style = "display:block; color:red;";
    }
    else {
        document.getElementById("email-format-error").style = "display:none;";
    }
    validateButton();
}

function linkCheck(link) {
    if (!linkReg.test(link)) {
        document.getElementById("link-format-error").style = "display:block; color:red;";
    }
    else {
        document.getElementById("link-format-error").style = "display:none;";
    }
    validateButton();
}

function nameFormatCheck() {
    if (!document.forms.form.inputname.validity.valid) {
        document.getElementById("name-format-error").style = "display:block; color:red;";
    }
    else {
        document.getElementById("name-format-error").style = "display:none;";
    }
    validateButton();
}

//inner logic function for birthdayCheck()
function birthdayUnderLegal(birthday) {
    const birthdayDate = new Date(birthday);
    const todayDate = new Date();
    const todayNum = todayDate.getFullYear() * 10000 + todayDate.getMonth() * 100 + todayDate.getDate();
    const birthdayNum = birthdayDate.getFullYear() * 10000 + birthdayDate.getMonth() * 100 + birthdayDate.getDate();
    if (todayNum - birthdayNum < 180000) {
        return true;
    }
    else {
        return false;
    }
}

function birthdayCheck() {
    const birthday = document.getElementById('birthday').value;
    if (birthdayUnderLegal(birthday)) {
        document.getElementById("birthday-error").style = "display:block; color:red;";
    }
    else {
        document.getElementById("birthday-error").style = "display:none;";
    }
    validateButton();
}

function validateButton() {
    const email = document.getElementById('email').value;
    const link = document.getElementById('link').value;
    const birthday = document.getElementById('birthday').value;
    const money = document.getElementById('money').value;
    if (!mailReg.test(email) || !linkReg.test(link) || !document.forms.form.name.validity.valid
        || !document.forms.form.birthday.validity.valid || birthdayUnderLegal(birthday) || !floatReg.test(money) || money < minimumBet()) {
        document.getElementById('submit').disabled = 'disabled';
    }
    else {
        document.getElementById('submit').disabled = false;
    }
}

(function lastModifiedFunction() {
    const lastModified = document.lastModified;
    document.getElementById("last-modified").innerHTML = lastModified;
    document.getElementById("last-modified-footer").style.textAlign = "center";
})()

//inner function to calculate the minimum starting bet based on exchange rates
function minimumBet() {
    // exchange rates {'usd': 1, 'eur': 0.91, 'gbp': 0.76, 'ron': 4.51};
    const currency = document.getElementById('currency').value;
    const minimum = 10 * exchange[currency];
    return minimum;
}

function moneyCheck() {
    const money = document.getElementById('money').value;
    if (!floatReg.test(money)) {
        document.getElementById("money-format-error").style = "display:block; color:red;";
        document.getElementById("money-error").style = "display:none;";
    }
    else {
        document.getElementById("money-format-error").style = "display:none;";
        if (money < minimumBet()) {
            document.getElementById("money-error").style = "display:block; color:red;";
        }
        else {
            document.getElementById("money-error").style = "display:none;";
        }
    }
    validateButton();
}

//Itt a piros, hol a piros
let gameCurrency;
let currenBalance;
let end = false;
const win = new Image();
win.src = 'images/win.jpg'
const lose = new Image();
lose.src = 'images/lose.png'
const redBall = new Image();
redBall.src = 'images/redball.png'
const whiteBall = new Image();
whiteBall.src = 'images/whiteball.png'
const cup = new Image();
cup.src = 'images/cup.png'
const gameover = new Image();
gameover.src = 'images/gameover.png'

function start() {
    gameCurrency = document.getElementById('currency').value;
    document.getElementById("game").style = "display:block;";
    document.getElementById('show-name').innerHTML = document.getElementById('inputname').value;
    currenBalance = parseFloat(document.getElementById('money').value);
    document.getElementById('current-balance').innerHTML = currenBalance + " " + gameCurrency;
    document.getElementById('gamecanvas').addEventListener('mousedown', chooseCup, false);
    clean();
}

function clean() {
    let context = document.getElementById('gamecanvas').getContext('2d');
    context.drawImage(cup, 0, 50, 155, 205);
    context.drawImage(cup, 200, 50, 155, 205);
    context.drawImage(cup, 400, 50, 155, 205);
}

// exchange rates {'usd': 1, 'eur': 0.91, 'gbp': 0.76, 'ron': 4.51};
function winMoney() {
    currenBalance += 2 * exchange[gameCurrency];
}

function loseMoney() {
    currenBalance -= 4 * exchange[gameCurrency];
}

function updateBoard(ball, winOrLose, xcoord) {
    let context = document.getElementById('gamecanvas').getContext('2d');
    let res = document.getElementById('result').getContext('2d');
    context.drawImage(ball, xcoord, 150, 100, 100);
    res.drawImage(winOrLose, 0, 0, 200, 100);
    setTimeout(clean, 1200);
}

function chooseCup(event) {
    let res = document.getElementById('result').getContext('2d');
    if (!end) {
        let winningCup = Math.floor(Math.random() * 3) + 1;
        let rect = document.getElementById('gamecanvas').getBoundingClientRect();
        let x = event.clientX - rect.left;
        if (x < 200) {
            if (winningCup == 1) {
                updateBoard(redBall, win, 25);
                winMoney();
            } else {
                updateBoard(whiteBall, lose, 25);
                loseMoney();
            }
        } else if (x >= 200 && x < 400) {
            if (winningCup == 2) {
                updateBoard(redBall, win, 225);
                winMoney();
            } else {
                updateBoard(whiteBall, lose, 225);
                loseMoney();
            }
        } else if (x >= 400) {
            if (winningCup == 3) {
                updateBoard(redBall, win, 425);
                winMoney();
            } else {
                updateBoard(whiteBall, lose, 425);
                loseMoney();
            }
        }

        if (currenBalance < 10 * exchange[gameCurrency]) {
            document.getElementById('current-balance').innerHTML = currenBalance + " " + gameCurrency;
            document.getElementById('game-info').innerHTML = 'Insufficient balance, you need at least 10 dollars worth of money. You currently have: ' + currenBalance / exchange[gameCurrency] + ' dollars';
            res.drawImage(gameover, 0, 0, 200, 100);
            end = true;
        }
        else {
            document.getElementById('current-balance').innerHTML = currenBalance + " " + gameCurrency;
        }
    }
}

function endgame() {
    let res = document.getElementById('result').getContext('2d');
    end = true;
    document.getElementById('game-info').innerHTML = 'Game Over!';
    res.drawImage(gameover, 0, 0, 200, 100);
}