import { Contract,Wallet,WebSocketProvider } from "ethers";
import abi from './Assets/Cert.json' with {type:"json"} ;
import address from './Assets/deployed_addresses.json' with{type:"json"};
import dotenv from 'dotenv'
dotenv.config();

const provider = new WebSocketProvider(`wss://eth-sepolia.g.alchemy.com/v2/${process.env.Sepolia_KEY}`);

const wallet = new Wallet(`${process.env.Private_Key}`, provider);

export const contObject = new Contract(address["CertModuleV#Cert"],  abi.abi, wallet);

