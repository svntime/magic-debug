import { SolanaExtension } from '@magic-ext/solana';
import { Magic } from '@magic-sdk/react-native-expo';

if (!process.env.EXPO_PUBLIC_MAGIC_PUBLISHABLE_API_KEY) {
  throw new Error('missing EXPO_PUBLIC_MAGIC_PUBLISHABLE_API_KEY');
}

if (!process.env.EXPO_PUBLIC_SOLANA_RPC_NODE_URL) {
  throw new Error('missing EXPO_PUBLIC_SOLANA_RPC_NODE_URL');
}

export const magic = new Magic(process.env.EXPO_PUBLIC_MAGIC_PUBLISHABLE_API_KEY, {
  extensions: [
    new SolanaExtension({
      rpcUrl: process.env.EXPO_PUBLIC_SOLANA_RPC_NODE_URL
    })
  ]
});
