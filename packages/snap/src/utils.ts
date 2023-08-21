import { JsonTx } from '@ethereumjs/tx';
import type { Json } from '@metamask/utils';

import { Wallet } from './keyring';
import {
  InternalMethod,
  RequestMethods,
  SnapKeyringMethod,
} from './permissions';

export type State = {
  contracts: string[];
};

/**
 * The default state of the snap. This is returned by the {@link getState}
 * function if the state has not been set yet.
 */
const DEFAULT_STATE = {
  contracts: [],
};

/**
 * Get the current state of the snap. If the snap does not have state, the
 * {@link DEFAULT_STATE} is returned instead.
 *
 * This uses the `snap_manageState` JSON-RPC method to get the state.
 *
 * @returns The current state of the snap.
 * @see https://docs.metamask.io/snaps/reference/rpc-api/#snap_managestate
 */
export async function getState(): Promise<State> {
  const state = await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  });

  // If the snap does not have state, `state` will be `null`. Instead, we return
  // the default state.
  return (state as State | null) ?? DEFAULT_STATE;
}

/**
 * Set the state of the snap. This will overwrite the current state.
 *
 * This uses the `snap_manageState` JSON-RPC method to set the state. The state
 * is encrypted with the user's secret recovery phrase and stored in the user's
 * browser.
 *
 * @param newState - The new state of the snap.
 * @see https://docs.metamask.io/snaps/reference/rpc-api/#snap_managestate
 */
export async function setState(newState: State) {
  await snap.request({
    method: 'snap_manageState',
    params: { operation: 'update', newState },
  });
}

/**
 * Clear the state of the snap. This will set the state to the
 * {@link DEFAULT_STATE}.
 *
 * This uses the `snap_manageState` JSON-RPC method to clear the state.
 *
 * @see https://docs.metamask.io/snaps/reference/rpc-api/#snap_managestate
 */
export async function clearState() {
  await snap.request({
    method: 'snap_manageState',
    params: { operation: 'clear' },
  });
}

/**
 * Logs a request with the specified request method and payload.
 *
 * @param requestMethod - The request method.
 * @param payload - The payload of the request.
 */
export function logRequest(
  requestMethod: SnapKeyringMethod | RequestMethods | InternalMethod,
  payload: any,
): void {
  console.log(`[Snap] ${requestMethod} Payload: ${JSON.stringify(payload)}`);
}

/**
 * Serializes a transaction by removing undefined properties and converting them to null.
 *
 * @param tx - The transaction object.
 * @param type - The type of the transaction.
 * @returns The serialized transaction.
 */
export function serializeTransaction(tx: JsonTx, type: number): Json {
  const serializableSignedTx: Record<string, any> = {
    ...tx,
    type,
  };
  // Make tx serializable
  // toJSON does not remove undefined or convert undefined to null
  Object.entries(serializableSignedTx).forEach(([key, _]) => {
    if (serializableSignedTx[key] === undefined) {
      delete serializableSignedTx[key];
    }
  });

  return serializableSignedTx;
}

/**
 * Validates whether there are no duplicate names in the provided array of wallets.
 *
 * @param name - The name to validate for duplication.
 * @param wallets - The array of wallets to search for duplicate names.
 * @returns Returns true if no duplicate names are found, otherwise false.
 */
export function isUniqueAccountName(name: string, wallets: Wallet[]): boolean {
  return !wallets.find((wallet) => wallet.account.name === name);
}

/**
 * Determines whether the given CAIP-2 chain ID represents an EVM-based chain.
 *
 * @param caip2ChainId - The CAIP-2 chain ID to check.
 * @returns Returns true if the chain is EVM-based, otherwise false.
 */
export function isEvmChain(caip2ChainId: string): boolean {
  return caip2ChainId.startsWith('eip155:');
}
