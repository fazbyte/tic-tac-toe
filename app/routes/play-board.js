import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return {
            board: Array(9).fill(null),
            nextPlayer: 'X',
            winner: null,
            playerXScore: 0,
            playerOScore: 0,
            boardPosition: [[0,1,2],[3,4,5],[6,7,8]]
        };
      }
});
