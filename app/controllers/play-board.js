import Controller from '@ember/controller';

function getWinner(board) {
    const winMatrix = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < winMatrix.length; i++) {
        const [a, b, c] = winMatrix[i];
        if (board[a] && board[a] === board[b] 
            && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
}

export default Controller.extend({
    actions: {
        buttonClick(position) {
            const board = this.get('model.board').slice();
            if (this.get('model.winner') || board[position]) {
                return;
            }
            console.log("##################");
            console.log(this.model);
            // const model = this.get('model')
            const nextPlayer = this.get('model.nextPlayer') 
            board[position] = nextPlayer == 'X' ? 'X' : 'O';
            this.set('model.board',board)
            this.set('model.nextPlayer', nextPlayer == 'X' ? 'O' : 'X')
            if (getWinner(board)){
                this.set('model.winner',getWinner(board))
                if (this.get('model.winner') == 'X') {
                    this.set('model.playerXScore', this.get('model.playerXScore')+1)
                } else if (this.get('model.winner') == 'O')  {
                    this.set('model.playerOScore', this.get('model.playerOScore')+1)
                }
            }
        },
        newGame(player) {
            this.set('model.board',Array(9).fill(null))
            this.set('model.nextPlayer',player)
            this.set('model.winner',null)
        },
        reset() {
            this.set('model.board',Array(9).fill(null))
            this.set('model.nextPlayer','')
            this.set('model.winner',null)
            this.set('model.playerXScore',0)
            this.set('model.playerOScore',0)
        }
    }
});
