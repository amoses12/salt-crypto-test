export default interface UTXO {
  id: string;
  txid: string;
  address: string;
  // postgres returns 64 bit numeric types as a string and js doesn't read 32 bit numerics. must be taken in as a string and converted
  amount: string;
  spent: boolean;
}
