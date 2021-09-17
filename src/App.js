import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json"
import { Toggle } from './components/Toggle.js'
import styled, { ThemeProvider } from "styled-components";
import { useDarkMode } from "./themes.js"
import { GlobalStyles, lightTheme, darkTheme } from './globalStyle.js'

const StyledApp = styled.div`
    max-width: 50%;
    margin: 8rem auto 0;
`;



export default function App() {
  const [currentAccount, setCurrentAccount] = React.useState("")
  const [theme, toggleTheme] = useDarkMode(); 

  const [count, setCount] = React.useState(undefined);
  const [waveLoading, setWaveLoading] = React.useState(false);
  const [msgValue, setMsgValue] = React.useState("");

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  
  const contractAddress = "0x75504ae9A236Ab41aa10d1157114A866979413c9"
  const contractABI = abi.abi

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have metamask!")
      return
    } else {
      console.log("We have the ethereum object", ethereum)
    }

    ethereum.request({ method: 'eth_accounts' }).then(accounts => {
      console.log(accounts)
      if(accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authrorised account: ", account) 
        
        setCurrentAccount(account);
        getAllWaves();
      } else {
        console.log("No authorized account found")
      }
    })
  }
  const connectWallet = () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get metamask!")
    }

    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      console.log("Connected", accounts[0])
      setCurrentAccount(accounts[0])
    }).catch(err => console.log(err));
  }

  const wave = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const waveportalContract = new ethers.Contract(contractAddress, contractABI, signer);

    let count = await waveportalContract.getTotalWaves();
    setCount(count.toNumber());
    console.log("Retreived total wave count...", count.toNumber())

    setWaveLoading(true);
    const waveTxn = await waveportalContract.wave(msgValue, { gasLimit:300000,
    });
    console.log("Mining...", waveTxn.hash)
    await waveTxn.wait()
    console.log("WaveTxn -- ", waveTxn.hash)

    setWaveLoading(false);

    setMsgValue("");
    count = await waveportalContract.getTotalWaves()
    setCount(count.toNumber());
    console.log("Retreived total wave count...", count.toNumber())
  }
  const [allWaves, setAllWaves] = React.useState([])
  async function getAllWaves() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const waveportalContract = new ethers.Contract(
      contractAddress, 
      contractABI, 
      signer
    );

    let waves = await waveportalContract.getAllWaves()

    let wavesCleaned = []
    waves.forEach(wave => {
      console.log("wave", wave)
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message
      })
    })
    console.log("cleaned", wavesCleaned)
    setAllWaves(wavesCleaned)

    waveportalContract.on("NewWave", (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message)
      setAllWaves(oldArray => [...oldArray, {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message: message
      }])
    })
  }

  const handleInputChange = (event) => {
    setMsgValue(event.target.value);
  };

React.useEffect(() => {
  checkIfWalletIsConnected()
}, [])
  
return (
  <ThemeProvider theme={themeMode}>
  <StyledApp>
 <GlobalStyles />
  <Toggle theme={theme} toggleTheme={toggleTheme}/>
  <useDarkMode/>
    <div className="mainContainer">
     <div className="dataContainer">
        <div className="header">
         gm 🥱
        </div>

        <div className="bio">
        i'm <a href={'https://twitter.com/0xmigi'} target={'_blank'}>0xmigi</a> and here you can send me some anime recommendations or your favorite frontend tutorial IN A SMART CONTRACT
        </div>

        <div className="bio2">
        <p> i don't know front end stuff yet 🤦, planning to update this as i work through freecodecamp.org </p>

        <div> 
          {currentAccount && (
            <TextInputArea
              value={msgValue}
              handleInputChange={handleInputChange}
              />
          )}
        </div>  
        
        
        <br></br>
        </div>
        <button className="waveButton" onClick={wave}>
          press to send  
        </button>

        <br></br>
        
      
        {currentAccount ? null : (
          <button className="waveButton" onClick={connectWallet}>
          Connect Wallet
          </button>
        )}
        {allWaves.map((wave, index) => {
          return (
           <p>
            <div className="messageBoxes">
            <div>Address: {wave.address}</div>
            <div>Time: {wave.timestamp.toString()}</div>
            <div>Message:{wave.message}</div>
          </div>
         </p>  
          )
        })}
      </div>
    </div>
   </StyledApp>
  </ThemeProvider>
  );
}

const TextInputArea = (props) => (
    <input
      className="inputElement"
      value={props.value}
      onChange={props.handleInputChange}
      placeholder="type that alpha here"
      size="lg"
      border="1px"
      borderColor="#808A91"
      rounded="md"
      outline="none"
      bgColor={ props.colorMode==="light" ? "white" : "#1A202C" }
      resize="none"
    />
);


