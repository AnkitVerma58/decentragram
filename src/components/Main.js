import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h2>Share Image</h2>
              <form onSubmit={(event)=>{
                event.preventDefault()
                const description=this.imageDescriptionValue
                this.props.uploadImage(description)
              }}>
                <input type='file' accept=".jpg,.jpeg,.pgn,.gif" onChange={this.props.captureFile}></input>
                <div  className="form-group mr-sm-2">
                  <br></br>
                  <input
                  id="imageDescription"
                  type="text"
                  ref={(input) =>  {this.imageDescription =input}}
                  className="form-control"
                  placeholder='image description..'
                  required/>
                <button type="submit" class='btn btn-primary btn-block btn-lg'>Upload!</button>
                </div>
              </form>
                

            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;