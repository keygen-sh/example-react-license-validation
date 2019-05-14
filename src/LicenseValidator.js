import React, { Component } from 'react'
import styles from './LicenseValidator.scss'

const {
  KEYGEN_ACCOUNT_ID
} = process.env

export default class LicenseValidator extends Component {
  statuses = {
    NOT_ATTEMPTED: 'NOT_ATTEMPTED',
    IN_PROGRESS: 'IN_PROGRESS',
    FAIL: 'FAIL',
    NOT_VALID: 'NOT_VALID',
    VALID: 'VALID'
  }

  constructor(props) {
    super(props)

    this.state = {
      status: this.statuses.NOT_ATTEMPTED,
      errors: [],
      data: null,
      meta: null,
      key: ''
    }
  }

  handleLicenseKeyChange = event => {
    this.setState({ key: event.target.value })
  }

  handleLicenseKeySubmit = async event => {
    event.preventDefault()

    const { status, key } = this.state
    if (status !== this.statuses.NOT_ATTEMPTED) {
      return;
    }

    this.setState({ status: this.statuses.IN_PROGRESS })

    const res = await fetch(`https://api.keygen.sh/v1/accounts/${KEYGEN_ACCOUNT_ID}/licenses/actions/validate-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        meta: {
          key
        }
      })
    })

    const { meta, data, errors } = await res.json()
    if (errors) {
      this.setState({ status: this.statuses.FAIL, errors })

      return
    }

    this.setState({
      status: meta.valid ? this.statuses.VALID : this.statuses.NOT_VALID,
      meta,
      data
    })
  }

  handleReset = event => {
    event.preventDefault()

    this.setState({ status: this.statuses.NOT_ATTEMPTED })
  }

  render() {
    let content
    let button
    const {
      meta,
      data,
      errors,
      status,
      key
    } = this.state

    switch (status) {
      case this.statuses.NOT_ATTEMPTED:
        content = (
          <div>
            <p>
              Please enter your license key below
            </p>
            <form onSubmit={this.handleLicenseKeySubmit}>
              <input type='text' value={key} onChange={this.handleLicenseKeyChange} />
              <p>
                <small>Press enter to continue</small>
              </p>
            </form>
          </div>
        )

        break
      case this.statuses.IN_PROGRESS:
        content = (
          <div>
            <p>
              License validation in progress…
            </p>
          </div>
        )

        break
      case this.statuses.FAIL:
        content = (
          <div>
            <p>
              Failed to validate license due to one or more errors: {errors.map(e => e.detail).join(', ')}
            </p>
          </div>
        )

        button = (
          <button type='button' onClick={this.handleReset}>
            Back
          </button>
        )

        break
      case this.statuses.NOT_VALID:
        content = (
          <div>
            <p>
              Your license key {meta.detail}.
            </p>
          </div>
        )

        button = (
          <button type='button' onClick={this.handleReset}>
            Back
          </button>
        )

        break
      case this.statuses.VALID:
        content = (
          <div>
            <p>
              Your license key is valid!
            </p>
          </div>
        )

        break
    }

    return (
      <div className={styles.LicenseValidator}>
        <main>
          <h1>
            React License Validator
          </h1>
          {content}
          {button}
        </main>
      </div>
    )
  }
}