const initState = {
  data: '',
  comment: '',
  created: '',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PHOTO':
      console.log('created photo', action.photo);
      return state;
    default:
      return state;
  }
};

export default reducer;
