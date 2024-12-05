import {create} from 'zustand';

interface WalletStore {
  walletAddress: string | null;
  network: string | null;
  setWalletDetails: (address: string, network: string) => void;
}

const useWalletStore = create<WalletStore>((set) => ({
  walletAddress: null,
  network: null,
  setWalletDetails: (address, network) => set({ walletAddress: address, network }),
}));

export default useWalletStore;
