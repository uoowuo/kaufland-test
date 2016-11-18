import React from 'react';
import ReactDOM from 'react-dom';
import AppView from './app-view.jsx';

export default class App {

    constructor(area) {
        this.appArea = area;

        const appView = React.createElement(AppView);
        ReactDOM.render(appView, this.appArea);
    }

    static getJSON(url) {
        const deferred = $.getJSON(url);
        return Promise.resolve(deferred);
    }

}