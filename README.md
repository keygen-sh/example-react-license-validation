# Example React License Validation
This is an example React app for validating a license key. It contains a single [React](https://reactjs.org/)
component which handles a license key input from a user and then validates the key
using [Keygen's software licensing API](https://keygen.sh/docs/api).

> **This example application is not 100% production-ready and only serves as an
> example implementation**, but it should get you 90% of the way there. You may
> need to also add additional logging, error handling, or license validation
> persistence.

![image](https://user-images.githubusercontent.com/6979737/57705857-3f0c8580-762a-11e9-9790-ad9e47a7978a.png)

## Running the example

First up, configure a few environment variables:

```bash
# Your Keygen account ID
export KEYGEN_ACCOUNT_ID="YOUR_KEYGEN_ACCOUNT_ID"
```

You can either run each line above within your terminal session before
starting the app, or you can add the above contents to your `~/.bashrc`
file and then run `source ~/.bashrc` after saving the file.

Next, install dependencies with [`yarn`](https://yarnpkg.comg):

```
yarn
```

Then start the app:

```
yarn start
```

## Testing the app

Visit the following url: http://localhost:8888. Input a license key and it will be
validated against Keygen's licensing API.

## Questions?

Reach out at [support@keygen.sh](mailto:support@keygen.sh) if you have any
questions or concerns!
