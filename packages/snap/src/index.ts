import {
  OnRpcRequestHandler,
  OnTransactionHandler,
  OnCronjobHandler,
} from '@metamask/snaps-types';
import {
  buildHandlersChain,
  // handleKeyringRequest,
} from '@metamask/keyring-api';

import { rpcErrors } from '@metamask/rpc-errors';
import { heading, panel, copyable, divider, text } from '@metamask/snaps-ui';

import { clearState, getState, setState } from './utils';
// import { getState as getKeyringState } from './stateManagement';
import { SetStateParams } from './types';
// import { SimpleKeyring } from './keyring';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */

// let keyring: SimpleKeyring;

const getColor = (result: number) => {
  switch (result) {
    case 3:
      return '🟩';
    case 2:
      return '🟧';
    default:
      return '🟥';
  }
};

// /**
//  * Handle keyring requests.
//  *
//  * @param args - Request arguments.
//  * @param args.request - Request to execute.
//  * @returns The execution result.
//  */
// const keyringHandler: OnRpcRequestHandler = async ({ request }) => {
//   if (!keyring) {
//     const keyringState = await getKeyringState();
//     if (!keyring) {
//       keyring = new SimpleKeyring(keyringState);
//     }
//   }
//   return await handleKeyringRequest(keyring, request);
// };



export const subscriptionsHandler: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'setState': {
      const params = request.params as SetStateParams;
      const state = await getState();

      await setState({ ...state, ...params });
      return true;
    }

    case 'getState':
      return await getState();

    case 'clearState':
      await clearState();
      return true;

    default:
      throw rpcErrors.methodNotFound({
        data: {
          method: request.method,
        },
      });
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    // alerts for contracts user has subscribed to
    case 'alert':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            heading('Potential attack alert'),
            text('**Risk:** 🟥 High Risk'),
            text('**Network**: Ethereum Mainnet'),
            text('You received this alert because this attack may interact with contract you subscribed to: **Aave WETH V3**'),
            copyable('https://etherscan.io/address/0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8'),
            divider(),
            text('**deploy transaction:**'),
            copyable('https://etherscan.io/tx/0x085b1b935061003bfaccdee76eab0644f16a1dea2d332ab685c605854abf3ea0'),
            text('**Malicious contract:**'),
            copyable('https://etherscan.io/address/0xa21a2b59d80dc42d332f778cbb9ea127100e5d75'),
            text('**Deployer:**'),
            copyable('https://etherscan.io/address/0x5f4c21c9bb73c8b4a296cc256c0cde324db146df')
          ]),
        },
      });
    // notifications about all exploits
    case 'notify':
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          // message: `Potential attack alert:
          // - High risk
          // - Ethereum Mainnet
          // - Contract: 0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8 (Aave WETH V3)`,
          message: 'Potential attack alert: @attackdetectorbot'
        },
      });
    default:
      throw rpcErrors.methodNotFound({
        data: {
          method: request.method,
        },
      });
  }
};

export const onTransaction: OnTransactionHandler = async ({transaction}) => {
  const targetContractAddress = transaction.to;

  let riskScore;

  if (targetContractAddress === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') {
    riskScore = 0;
  } else if (
    targetContractAddress === '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9'
  ) {
    riskScore = 2;
  } else {
    riskScore = 3;
  }

  // const spotterResponse = await fetch(
  //   `https://thoqaobf86.execute-api.us-east-2.amazonaws.com/v0/snap?addr=${targetContractAddress}`,
  // );
  //
  // const spotterResponseJSON = await spotterResponse.json();
  return {
    content: panel([
      heading(`${getColor(riskScore)} security`),
      text(`targetContractAddress: ${targetContractAddress}`),
      // text(`Response from Spooter: ${spotterResponseJSON}`),
      text(
        `You are about to sign contract with ${getColor(riskScore)} security`,
      ),
    ]),
  };
};

export const onRpcRequest: OnRpcRequestHandler = buildHandlersChain(
  // keyringHandler,
  subscriptionsHandler,
);
