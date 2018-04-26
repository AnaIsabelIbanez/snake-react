// export default (state = [{ x: 1, y: 1 }], action) => {
//   switch (action.type) {
//     case MOVE:
//       const { direction } = action;
//       const head = {
//         x: wrap(state[0].x + direction.x),
//         y: wrap(state[0].y + direction.y)
//       };
//       state = state.slice(0, -1);
//       state.unshift(head);
//       return state;
//     case EAT_APPLE:
//       return [
//         ...state,
//         state[state.length - 1]
//       ];
//     case RESET:
//       return [{ x: 1, y: 1 }];
//     default:
//       return state;
//   }
// };