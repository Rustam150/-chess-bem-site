class Board {
  constructor(containerId, turnTextId, resetBtnId) {
    this.container = document.getElementById(containerId);
    this.turnText = document.getElementById(turnTextId);
    this.resetBtn = document.getElementById(resetBtnId);
    
    this.boardState = [];
    this.currentTurn = 'white';
    this.selectedCell = null;

    this.init();
  }

  init() {
    this.createBoardState();
    this.render();
    this.addEventListeners();
  }

  createBoardState() {
    this.boardState = Array(8).fill(null).map(() => Array(8).fill(null));
    
    const setupRow = (row, color, types) => {
      types.forEach((type, col) => {
        this.boardState[row][col] = new Piece(type, color);
      });
    };

    const backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    
    setupRow(0, 'black', backRow);
    setupRow(1, 'black', Array(8).fill('pawn'));
    setupRow(6, 'white', Array(8).fill('pawn'));
    setupRow(7, 'white', backRow);
  }

  render() {
    this.container.innerHTML = '';
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cell = document.createElement('div');
        const isBlack = (row + col) % 2 === 1;
        
        cell.className = `cell ${isBlack ? 'cell--black' : 'cell--white'}`;
        cell.dataset.row = row;
        cell.dataset.col = col;

        const piece = this.boardState[row][col];
        if (piece) {
          const span = document.createElement('span');
          span.className = 'piece';
          span.textContent = piece.symbol;
          cell.appendChild(span);
        }

        if (this.selectedCell && this.selectedCell.row === row && this.selectedCell.col === col) {
          cell.classList.add('cell--selected');
        }

        this.container.appendChild(cell);
      }
    }
    this.updateStatus();
  }

  addEventListeners() {
    this.container.addEventListener('click', (e) => {
      const cell = e.target.closest('.cell');
      if (!cell) return;
      
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      
      this.handleCellClick(row, col);
    });

    this.resetBtn.addEventListener('click', () => this.resetGame());
  }

  handleCellClick(row, col) {
    const clickedPiece = this.boardState[row][col];

    if (!this.selectedCell) {
      if (clickedPiece && clickedPiece.color === this.currentTurn) {
        this.selectedCell = { row, col };
        this.render();
      }
      return;
    }

    if (this.selectedCell.row === row && this.selectedCell.col === col) {
      this.selectedCell = null;
      this.render();
      return;
    }

    if (clickedPiece && clickedPiece.color === this.currentTurn) {
      this.selectedCell = { row, col };
      this.render();
      return;
    }

    if (this.isValidMove(this.selectedCell.row, this.selectedCell.col, row, col)) {
      this.movePiece(this.selectedCell.row, this.selectedCell.col, row, col);
    } else {
      this.selectedCell = null;
      this.render();
      alert("Так ходить нельзя!");
    }
  }

  isValidMove(fr, fc, tr, tc) {
    const piece = this.boardState[fr][fc];
    const target = this.boardState[tr][tc];
    
    if (!piece) return false;
    if (target && target.color === piece.color) return false;

    const dr = tr - fr;
    const dc = tc - fc;
    const absDr = Math.abs(dr);
    const absDc = Math.abs(dc);

    switch(piece.type) {
      case 'pawn': {
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        if (dc === 0 && dr === direction && !target) return true;
        if (dc === 0 && fr === startRow && dr === 2 * direction && !target && !this.boardState[fr + direction][fc]) return true;
        if (absDc === 1 && dr === direction && target) return true;
        
        return false;
      }
      case 'rook':
        return (dr === 0 || dc === 0) && this.isPathClear(fr, fc, tr, tc);
      
      case 'bishop':
        return (absDr === absDc) && this.isPathClear(fr, fc, tr, tc);
      
      case 'queen':
        return (dr === 0 || dc === 0 || absDr === absDc) && this.isPathClear(fr, fc, tr, tc);
      
      case 'knight':
        return (absDr === 2 && absDc === 1) || (absDr === 1 && absDc === 2);
      
      case 'king':
        return absDr <= 1 && absDc <= 1;
        
      default:
        return false;
    }
  }

  isPathClear(fr, fc, tr, tc) {
    const stepR = Math.sign(tr - fr);
    const stepC = Math.sign(tc - fc);
    
    let r = fr + stepR;
    let c = fc + stepC;
    
    while (r !== tr || c !== tc) {
      if (this.boardState[r][c]) return false;
      r += stepR;
      c += stepC;
    }
    return true;
  }

  movePiece(fromRow, fromCol, toRow, toCol) {
    this.boardState[toRow][toCol] = this.boardState[fromRow][fromCol];
    this.boardState[fromRow][fromCol] = null;
    
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
    this.selectedCell = null;
    this.render();
  }

  updateStatus() {
    this.turnText.textContent = this.currentTurn === 'white' ? 'Белые' : 'Черные';
    this.turnText.style.color = this.currentTurn === 'white' ? '#27ae60' : '#e74c3c';
  }

  resetGame() {
    this.currentTurn = 'white';
    this.selectedCell = null;
    this.createBoardState();
    this.render();
  }
}