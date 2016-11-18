import React from 'react';
import PostsView from './posts-view.jsx';
import ButtonModal from './button-modal.jsx';

export default class AppView extends React.Component {

    render() {
        const appView = (
            <div className="app-view">
                <PostsView />
                <ButtonModal />
            </div>
        );

        return appView;
    }
}