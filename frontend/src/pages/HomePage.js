import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import BaseApi from '../apis/BaseApi';
import { validateUrl } from '../components/Utility';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            err: '',
            hasError: false,
            shortenedUrl: '',
        };
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.shortenUrl = this.shortenUrl.bind(this);
    }

    handleUrlChange(e) {
        let value = e.target.value;
        this.setState({url: value, hasError: false, err: ''});
    }

    async shortenUrl() {
        const {url, hasError} = this.state;

        if(hasError){
            return;
        }

        if(!url){
            this.setState({hasError: true, err: 'Please enter a url'});
            return;
        }

        if(!validateUrl(url)){
            this.setState({hasError: true, err: "Url is not valid"});
            return;
        }


        let obj = {
            url
        };

        let callurl = `/api/encode`;
        let response = await BaseApi.postApi(callurl, obj);
        if(response && response.succeeded){
            let shortenedVersion = `http://short.est/${response.body.shortId}`;
            this.setState({url: '', hasError: 'false', shortenedUrl: shortenedVersion});
        } else {
            this.setState({err: 'Failed to shorten url', hasError})
        }
    }

    render() {
        const {url, err, shortenedUrl} = this.state;

        return (<div className='app-page'>
            <div className='app-page-content'>
                <div className='url-form'>
                    <h3>Enter the url you want to shorten</h3>
                    <div className='form-content'>                        
                        <div className='left'>                            
                            <input type='text' value={url} onChange={this.handleUrlChange} placeholder='Type url to shorten'/>
                        </div>
                        <div className='right'>                            
                            <button type='button' className='shorten-button' onClick={this.shortenUrl}>Shorten</button>
                        </div>
                    </div>
                </div>
                <div className='err-section'>
                    <p>{err}</p>
                </div>
                {shortenedUrl ? (<div className='shortened-url'>
                    <strong>Shortened Url: </strong>
                    <strong>{shortenedUrl}</strong>
                </div>) : null}
            </div>
        </div>);
    }
}

export default withRouter(HomePage);