
const init = (m, n, gameDiv) => {

	const _CONSTANTS = {
		DIV: "div",
		CLASS: "class",
		CLICK: "click",
		ID: "id",
		WAIT: 1000,
		EMPTY: "",
		ZERO: 0,
		SRC: "src",
		HEIGHT: "height",
		IMG: "img",
		INIT_CLASS: "card",
		SELECTED_CLASS: "dotted",
		MATCHED_CLASS: "white",
		IMG_NAME: "logo.png",
		IMG_HEIGHT: "35px",
		SCORE_BOARD: "score_borad",
		SCORE_BOARD_CLASS: "score",
		SCORE_BOARD_INIT_TEXT: "Exercise your Memory"
	}

	let score = 0;
	let moves = 0;
	let lastVal = _CONSTANTS.ZERO
	let lastCard = _CONSTANTS.EMPTY;
	let lastId = _CONSTANTS.EMPTY;
	let inPrgress = false;

	const generateID = (i, j) => _CONSTANTS.ID + i + j;

	const getImage = () => {
		var img = document.createElement(_CONSTANTS.IMG);
		img.setAttribute(_CONSTANTS.SRC, _CONSTANTS.IMG_NAME);
		img.setAttribute(_CONSTANTS.HEIGHT, _CONSTANTS.IMG_HEIGHT);
		return img;
	}
	const clearCard = (divId) => {
		const cardToClear = document.getElementById(divId);
		cardToClear.classList.remove(_CONSTANTS.SELECTED_CLASS);
		cardToClear.innerText = _CONSTANTS.EMPTY;
		cardToClear.appendChild(getImage());
	}

	const updateScoreBoard = (moves, score) => {
		const score_borad = document.getElementById(_CONSTANTS.SCORE_BOARD);
		score_borad.innerHTML = `Moves: ${moves} | Score: ${score}`;
	}

	const countPoint = (lastId, curId) => {
		const lastCard = document.getElementById(lastId);
		const curCard = document.getElementById(curId);
		curCard.classList.remove(_CONSTANTS.SELECTED_CLASS);
		curCard.classList.add(_CONSTANTS.MATCHED_CLASS);
		lastCard.classList.remove(_CONSTANTS.SELECTED_CLASS);
		lastCard.classList.add(_CONSTANTS.MATCHED_CLASS);
		score++;
		moves++;
		updateScoreBoard(moves, score);
	}

	const callBack = (e, i, j, divId, gameGrid, m, n) => {
		const cardClicked = document.getElementById(divId);
		const stateSelected = cardClicked.classList.contains(_CONSTANTS.SELECTED_CLASS);
		const stateMatched = cardClicked.classList.contains(_CONSTANTS.MATCHED_CLASS);
		if (stateMatched) return 0;
		if (inPrgress) return 0;
		if (divId === lastId && stateSelected) return 0;
		const cardIndex = (i * n) + j;
		cardClicked.innerText = gameGrid[cardIndex];
		cardClicked.classList.add(_CONSTANTS.SELECTED_CLASS);
		if (lastVal == 1) {
			if (lastCard !== gameGrid[cardIndex]) {
				inPrgress = true;
				setTimeout(() => {
					clearCard(lastId);
					clearCard(divId);
					lastCard = gameGrid[cardIndex];
					lastId = divId;
					inPrgress = false;
					moves++;
					updateScoreBoard(moves, score);
				}, _CONSTANTS.WAIT);
			} else {
				countPoint(lastId, divId);
			}
			lastVal = _CONSTANTS.ZERO;
			lastCard = _CONSTANTS.EMPTY;
		} else {
			lastCard = gameGrid[cardIndex];
			lastId = divId;
			lastVal++;
		}
	};

	const initGrid = (m, n) => {
		const valuGrid = [];
		for (let i = _CONSTANTS.ZERO; i < m * n; i++) {
			valuGrid.push(_CONSTANTS.ZERO);
		}
		return valuGrid;
	}
	
    //Not generating random numbers/cards we can, if we want.
	const makeGameGrid = (m, n) => {
		const totalCards = m * n;
		const pairs = totalCards / 2;
		let pairCount = 1; 
		let count = _CONSTANTS.ZERO;
		const grid = initGrid();
		var arr = []
		while (arr.length < totalCards) {
			var r = Math.floor(Math.random() * (totalCards));
			if (arr.indexOf(r) === -1) {
				arr.push(r);
				if (count == 2) {
					pairCount++;
					count = _CONSTANTS.ZERO;
				}
				grid[r] = pairCount;
				count++;
			}
		}
		return grid;
	}

	(() => {
		var scoreDiv = document.createElement(_CONSTANTS.DIV);
		scoreDiv.setAttribute(_CONSTANTS.ID, _CONSTANTS.SCORE_BOARD);
		scoreDiv.setAttribute(_CONSTANTS.CLASS, _CONSTANTS.SCORE_BOARD_CLASS);
		scoreDiv.innerHTML = _CONSTANTS.SCORE_BOARD_INIT_TEXT;
		document.body.appendChild(scoreDiv);
	})();

	((callBack, m, n, divId) => {
		const gameGrid = makeGameGrid(m, n);
		const gameArray = [];
		const gameDiv = document.getElementById(divId);
		for (let i = 0; i < m; i++) {
			var row = document.createElement(_CONSTANTS.DIV);
			gameDiv.appendChild(row);
			const singleArray = [];
			for (let j = 0; j < n; j++) {
				singleArray.push(j);
				var div = document.createElement(_CONSTANTS.DIV);
				div.setAttribute(_CONSTANTS.ID, generateID(i, j));
				div.setAttribute(_CONSTANTS.CLASS, _CONSTANTS.INIT_CLASS);
				div.appendChild(getImage());
				div.addEventListener(_CONSTANTS.CLICK, (e) => {
					callBack(e, i, j, generateID(i, j), gameGrid, m, n);
				});
				row.appendChild(div);
			}
			gameArray.push(singleArray);
		}
	})(callBack, m, n, gameDiv);

}
const _G_A_M_E_ = init;