import { struct, u8, Layout } from 'buffer-layout';
import { bool, i64, publicKey, u64 as borshU64 } from '@project-serum/borsh';
import { PublicKey } from '@solana/web3.js';
import { u64 } from '@solana/spl-token';
import BN from 'bn.js';

export interface Registrar {
  initialized: boolean;
  authority: PublicKey;
  nonce: number;
  rewardActivationThreshold: BN;
  maxStakePerEntity: BN;
  withdrawalTimelock: BN;
  deactivationTimelock: BN;
  rewardEventQueue: PublicKey;
  vault: PublicKey;
  megaVault: PublicKey;
  poolVault: PublicKey;
  poolVaultMega: PublicKey;
	poolMint: PublicKey;
	poolMintMega: PublicKey;
}

const REGISTRAR_LAYOUT: Layout<Registrar> = struct([
  bool('initialized'),
  publicKey('authority'),
  u8('nonce'),
  borshU64('rewardActivationThreshold'),
  borshU64('maxStakePerEntity'),
  i64('withdrawalTimelock'),
  i64('deactivationTimelock'),
  publicKey('rewardEventQueue'),
  publicKey('vault'),
  publicKey('megaVault'),
  publicKey('poolVault'),
  publicKey('poolVaultMega'),
	publicKey('poolMint'),
	publicKey('poolMintMega'),
]);

export function decode(data: Buffer): Registrar {
  return REGISTRAR_LAYOUT.decode(data);
}

export function encode(r: Registrar): Buffer {
  const buffer = Buffer.alloc(1000); // TODO: use a tighter buffer.
  const len = REGISTRAR_LAYOUT.encode(r, buffer);
  return buffer.slice(0, len);
}

export const SIZE: number = encode({
  initialized: false,
  authority: new PublicKey(Buffer.alloc(32)),
  nonce: 0,
  rewardActivationThreshold: new u64(0),
  maxStakePerEntity: new u64(0),
  withdrawalTimelock: new u64(0),
  deactivationTimelock: new u64(0),
  rewardEventQueue: new PublicKey(Buffer.alloc(32)),
  vault: new PublicKey(Buffer.alloc(32)),
  megaVault: new PublicKey(Buffer.alloc(32)),
  poolVault: new PublicKey(Buffer.alloc(32)),
  poolMint: new PublicKey(Buffer.alloc(32)),
  poolMintMega: new PublicKey(Buffer.alloc(32)),
  poolVaultMega: new PublicKey(Buffer.alloc(32)),
}).length;

export const STAKE_POOL_NAME = '';
export const MEGA_STAKE_POOL_NAME = '';
