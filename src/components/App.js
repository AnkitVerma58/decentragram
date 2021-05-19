import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Decentragram from '../abis/Decentragram.json'
import Navbar from './Navbar'
import Main from './Main'
const ipfsClient= require('ipfs-http-client')
const ipfs=ipfsClient({host:'ipfs.infura.io', port:5001, protocol:"https"})

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
  }


//connect to metamask and reads it into the app using web3
  async loadWeb3() {
    if (window.ethereum) {
      console.log("inside loadWeb 3");
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non etheruem browser detected. You should consider trying to install metamask')
    }
  }


  async loadBlockChainData() {

    const web3 = window.web3
    //load account from metamask
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0] })
    const networkId=await web3.eth.net.getId()
    const networkData= Decentragram.networks[networkId]
    if(networkData){
      const decentragram=web3.eth.Contract(Decentragram.abi,networkData.address)
      this.setState({ decentragram })
      const imageCount= await decentragram.methods.imageCount().call()
      this.setState({imageCount})

      this.setState({loading: false})
    }
    else{
      window.alert("decentragram account not deployead in detected account")
    }

  }
  captureFile = event =>{
    event.preventDefault()
    const file=event.target.files[0]
    const reader=new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend=() => {
      this.setState({buffer: Buffer(reader.result)})
      console.log("buffer" ,this.state.buffer);
    }
  }

  uploadimage= description =>{
    console.log("start ifps  ")

    ipfs.add(this.state.buffer,(error,result) => {
      console.log("ipfs result ", result)
      if(error){
        console.log(error)
        return
      }
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      decentragram: null,
      images:[],
      loading: true

    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            captureFile={this.captureFile}
            />
          }
        
      </div>
    );
  }
}

export default App;