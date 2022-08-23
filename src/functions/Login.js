import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import store from "../redux/store";


const Login = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [CONFIG, SET_CONFIG] = useState({
    TOKEN_ADDRESS: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
  });

  const fetchDataRequest = () => {
    return {
      type: "CHECK_DATA_REQUEST",
    };
  };

  const fetchDataSuccess = (payload) => {
    return {
      type: "CHECK_DATA_SUCCESS",
      payload: payload,
    };
  };

  const fetchData = () => {
    return async (dispatch) => {
      dispatch(fetchDataRequest());
        let balanceOf = await store
          .getState()
          .blockchain.smartContract.methods.balanceOf(blockchain.account)
          .call();
        // let cost = await store
        //   .getState()
        //   .blockchain.smartContract.methods.cost()
        //   .call();
  
        dispatch(
          fetchDataSuccess({
            balanceOf,
            // cost,
          })
        );
    };
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };


  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  const kan = data.balanceOf / 1000000000000000000 ;


  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);


  return (
      <div>
        {blockchain.account === "" ||
    blockchain.smartContract === null ? (
        <button className="loginBtn" style={{marginBottom: 5, padding: 5, paddingLeft: 20, paddingRight: 20}} onClick={() => {dispatch(connect())}}>Connect w/ MetaMask</button>
        ) : (
          <>
        <p style={{ color: "black", textAlign: "center", marginTop: 7 }}><b>CONNECTED!</b>
        </p>
        </>
    )}
                {blockchain.errorMsg !== "" ? (
          <>
              <p style={{textAlign: 'center', color: 'black'}}><b> {blockchain.errorMsg}</b></p>
          </>
        ) : null}

      </div>
  );
}

export default Login;
