class Piece {
  constructor(type, color) {
    this.type = type;
    this.color = color;
    this.symbol = this.getSymbol();
  }

  getSymbol() {
    const symbols = {
      white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
      black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' }
    };
    return symbols[this.color][this.type] || '';
  }
}