# Spotter snap

Spotter Snap is a proactive alert and protection system against crypto exploits inside Metamask

Spotter Snap notifies and proactively protects Metamask users from crypto hacks using [Pessimistic Spotter API](https://spotter.pessimistic.io/), which is a predictive monitoring service that can prevent the hack before it even happens.


## Installation

```shell
yarn install && yarn start
```

## Main features

**Real-time alerts** about new hacks happening to the contracts a user is subscribed to.

**Real-time notifications** about all exploits detected by Pessimistic Spotter.

**Transaction insights**, which can warn the user if he will interact with a contract that is highly likely under attack.

**Backup account**. If the contract is under attack and the user holds funds in it, Spotter Snap can extract these funds from the contract on the user's behalf and store them in an account controlled by Snap. This feature uses Snaps Keyring API and was not fully implemented during the hackathon

## Next steps:

- [ ]  Finish Backup account feature
- [ ]  Finish implementation of automatic fund withdrawal using Snap or as a standalone service
- [ ]  Integrate Snap with popular DeFi automation tools like DeFi Saver.
- [ ]  Improve the UI using new Snaps UI components.
