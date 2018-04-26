export default (state = 'MENU', action) => {
  switch (action.type) {
    case 'PLAY':
      return 'PLAYING';
    case 'GAME_OVER':
      return 'GAME_OVER';
    default:
      return state;
  }
};
