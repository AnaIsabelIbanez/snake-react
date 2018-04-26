// export default (state = [], action) => {
//   switch (action.type) {
//     case SPAWN_APPLE:
//       return [
//         ...state,
//         {
//           x: action.x,
//           y: action.y
//         }
//       ];
//     case EAT_APPLE:
//       return state.filter(({ x, y }) => (x !== action.x || y !== action.y));
//     case RESET:
//       return [];
//     default:
//       return state;
//   }
// };