import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { baseUrl } from "../apis/BaseApi";

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortened: [],
      isLoaded: false,
      err: "",
      isLoading: false,
    };

    this.load = this.load.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  async remove(shortObj) {
    if (!shortObj) return;

    let callurl = `${baseUrl}/api/remove/${shortObj.shortId}`;
    let response = await axios.delete(callurl);
    if (response.status === 200) {
      let old = this.state.shortened.slice();
      let index = old.findIndex((a) => a.shortId === shortObj.shortId);
      old.splice(index, 1);

      this.setState({ shortened: old });
    } else {
      this.setState({ err: "Failed to remove error" });
    }
  }

  load() {
    let loadUrl = `${baseUrl}/api/statistic`;

    this.setState({ isLoading: true }, async () => {
      let response = await axios(loadUrl, {
        method: "GET",
      });

      if (response.status === 200 && response.data) {
        console.log("List page response: ", response.data.result);
        this.setState({
          isLoaded: true,
          isLoading: false,
          shortened: response.data.result,
        });
      } else {
        this.setState({
          isLoaded: false,
          isLoading: false,
          err: "Failed to load shortened urls",
        });
      }
    });
  }

  render() {
    const { shortened, err, isLoaded, isLoading } = this.state;

    const renderBody = () => {
      if (isLoading) {
        return <p>Loading shortened urls</p>;
      }

      if (isLoaded && shortened.length === 0) {
        return null;
      }

      let baseUrl = "http://short.est";
      let rendered = shortened.map((val, index) => {
        return (
          <div className='shortened-url' key={index}>
            <div className="item">
              <a href={`${val.original}`} target="_blank" rel="noreferrer">
                {`${baseUrl}/${val.shortId}`}
              </a>
              <button type="button" onClick={() => this.remove(val)}>
                Delete
              </button>
            </div>
          </div>
        );
      });

      return (
        <div className="list">
          <h3>List of Urls</h3>
          <div className="list-items">{rendered}</div>
        </div>
      );
    };

    return (
      <div className="app-page">
        <div className="app-page-content">
          <>
            {err ? (
              <div className="error-section">
                <p className="err">{err}</p>
              </div>
            ) : null}
          </>
          {renderBody()}
        </div>
      </div>
    );
  }
}

export default withRouter(ListPage);
