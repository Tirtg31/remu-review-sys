import React, { Component } from "react";

class TakeInput extends Component {
  render() {
    return (
      <header className="my-container">
        <div class="signin">
          <div class="row">
            <form class="col s12">
              <h2>Sign in</h2>
              <div class="input-field inline">
                <input id="email_inline" type="email" class="validate" />
                <label for="email_inline">Email</label>
              </div>

              <div class="row">
                <div class="input-field col s12">
                  <input id="password" type="password" class="validate" />
                  <label for="password">Password</label>
                </div>
              </div>
              <button
                class="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </header>
    );
  }
}
export default TakeInput;
