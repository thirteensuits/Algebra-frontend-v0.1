const initialState = {
  loading: false,
  walletOfOwner: [],
  totalSupply: "n/a",
  releasable: 0,
  balanceOf: 0,
  hasClaimed: "??",
  cost: 0,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        walletOfOwner: action.payload.walletOfOwner,
        totalSupply: action.payload.totalSupply,
        releasable: action.payload.releasable,
        balanceOf: action.payload.balanceOf,
        hasClaimed: action.payload.hasClaimed,
        // cost: action.payload.cost,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
