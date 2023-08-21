import {useContext, useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
// import { assert } from '@metamask/utils';
import {MetamaskActions, MetaMaskContext} from '../hooks';
import {
  connectSnap,
  getSnap,
  sendHello,
  getState,
  setState,
  clearState,
} from '../utils';
import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  Button,
  Card,
} from '../components';
import {request, useLazyGetAccountsQuery} from '../utils/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: .6rem;
  margin-bottom: 7.6rem;

  ${({theme}) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary.default};
`;

const Subtitle = styled.p`
  font-size: ${({theme}) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;

  ${({theme}) => theme.mediaQueries.small} {
    font-size: ${({theme}) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 95rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
  gap: 10px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`

const TokenSelect = styled.select`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`

const HeadingStyles = styled.h2`
  font-size: ${({theme}) => theme.fontSizes.large};
  margin: 30px 0 10px 0;
`;

const ErrorMessage = styled.div`
  background-color: ${({theme}) => theme.colors.error.muted};
  border: 1px solid ${({theme}) => theme.colors.error.default};
  color: ${({theme}) => theme.colors.error.alternative};
  border-radius: ${({theme}) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  ${({theme}) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Index = () => {
  const [getAccounts, {isLoading: isLoadingAccounts, data: accounts}] =
    useLazyGetAccountsQuery();

  const contractsSelectRef = useRef(null);

  const [state, dispatch] = useContext(MetaMaskContext);

  useEffect(() => {
    getAccounts()
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((accounts) => console.log(`###: accounts`, accounts))
      .catch((e) => console.log(`###: e`, e));

  }, []);

  useEffect(() => {
    async function getContracts() {
      const snapState = await getState();
      const contracts = snapState && snapState.contracts;

      if (contracts && contracts.length > 0 && contractsSelectRef) {
        const options = contractsSelectRef.current.options;
        console.log(options);

        Array.from(options).forEach(option => {
          if (contracts.includes(option.value)) {
            option.selected = true;
          }
        });
      }
    }

    getContracts();
  }, []);

  const handleConnectClick = async () => {
    try {
      await connectSnap();

      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({type: MetamaskActions.SetError, payload: e});
    }
  };


  function handleSendTransaction(contractAddress: string) {
    return function sendTransaction(e) {
      const account = accounts[0];
      // @ts-ignore
      request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: account,
            to: contractAddress,
            value: '0x0',
            data: '0x1',
          },
        ],
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const contractsSelect = e.target.elements["tokens"];
    const contractsToMonitor = Array.from(contractsSelect.selectedOptions, option => option.value);
    await setState({contracts: contractsToMonitor});
  }

  async function getContracts() {
    const snapState = await getState();
    return snapState.contracts;
  }

  async function clearContracts() {
    await clearState();
  }

  // @ts-ignore
  return (
    <Container>
      <Heading>
        Spotter Snap
      </Heading>
      <Subtitle>
        Real-time notifications on potential hacks. Stay secure!
      </Subtitle>
      <CardContainer style={{"max-width": "64.8rem"}}>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        <Card
          content={{
            title: 'Reconnect',
            description:
              'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
            button: (
              <ReconnectButton
                onClick={handleConnectClick}
              />
            ),
          }}
        />
        {!state.isFlask && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton/>,
            }}
            fullWidth
          />
        )}
        {state.installedSnap && (<Card
          content={{
            title: 'Create Backup account',
            description:
              'Create a backup account to transfer funds to in case of attack.',
            button: (
                <Button onClick={handleConnectClick}>Create Backup</Button>
            ),
          }}
        />)}
      </CardContainer>

      <CardContainer style={{"max-width": "64.8rem"}}>
        <form id="token-select" onSubmit={handleSubmit} onReset={clearContracts}>
          <Label htmlFor="tokens">Select tokens on Ethereum Mainnet to be monitored by Spotter Snap:</Label>
          <TokenSelect name="tokens" id="tokens" multiple ref={contractsSelectRef}>
            <option value="0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE8">Aave WETH V3</option>
            <option value="0x95ecdc6caaf7e4805fcef2679a92338351d24297">crvUSD</option>
            <option value="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48">USDC</option>
            <option value="0xdac17f958d2ee523a2206206994597c13d831ec7">USDT</option>
          </TokenSelect>
          <ButtonGroup>
            <Button type="submit">Update</Button>
            {/*<Button type="Button" onClick={getContracts}>Get Contracts</Button>*/}
            <Button type="reset">Clear</Button>
          </ButtonGroup>
        </form>
      </CardContainer>
      <HeadingStyles>Transactions Insights Examples:</HeadingStyles>
      <CardContainer>
        {state.installedSnap && (
          <Card
            background={'red'}
            content={{
              title: 'High Security Risk',
              description:
                'Try high risk contract.',
              button: (
                <Button
                  onClick={handleSendTransaction(
                    `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`,
                  )}
                  disabled={!state.isFlask}
                >Send</Button>
              ),
            }}
            disabled={!state.isFlask}
          />
        )}
        {state.installedSnap && (
          <Card
            background={'orange'}
            content={{
              title: 'Mid Security Risk',
              description: 'Try mid risk contract.',
              button: (
                <Button
                  onClick={handleSendTransaction(
                    `0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9`,
                  )}
                  disabled={!state.isFlask}
                >Send</Button>
              ),
            }}
            disabled={!state.isFlask}
          />
        )}
        {state.installedSnap && (
          <Card
            background={'green'}
            content={{
              title: 'No Security Risk',
              description:
                'Try no security risk contract.',
              button: (
                <Button
                  onClick={handleSendTransaction(
                    `0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE8`,
                  )}
                  disabled={!state.isFlask}
                >Send</Button>
              ),
            }}
            disabled={!state.isFlask}
          />
        )}
      </CardContainer>
    </Container>
  );
};

export default Index;
