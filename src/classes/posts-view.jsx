import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import App from './app.js';

const postsUrl = "http://jsonplaceholder.typicode.com/posts";

export default class PostsView extends React.Component {

    render() {
        if (!this.state) { this.state = { activePost: {} }; }
        const activePostId = this.state.activePost.id;
        const activePostTitle = this.state.activePost.title;
        const activePostText = this.state.activePost.body;
        const selectHandler = this.getSelectHandler();

        const postsView = (
            <div className="posts-view">
                <PostsDropdown title={activePostTitle} onSelect={selectHandler} />
                <PostContent id={activePostId} postTitle={activePostTitle} postText={activePostText} />
            </div>
        );

        return postsView;
    }

    getSelectHandler(key) { return (key) => {
        const postId = key;
        const postDataToState = (post) => {
            this.setState({ activePost: post })
        }
        this.setState({ activePost: { title: `Loading...` } })
        App.getJSON(`${postsUrl}/${postId}`).then(postDataToState);
    }}
}

export class PostsDropdown extends React.Component {

    constructor(props) {
        super(props);

        const postsDataToState = (posts) => {
            const postTitles = posts.map((post) => { return post.title });
            const postIds = posts.map((post) => { return post.id });
            this.setState({items: postTitles, ids: postIds});
        }

        App.getJSON(postsUrl).then(postsDataToState);
    }

    render() {
        if (!this.state) { return null; }
        const state = this.state;
        const ids = (state.ids && Array.isArray(state.ids)) ? state.ids : undefined;
        const selectHandler = this.getSelectHandler();
        const title = this.props.title || 'Select a post';

        const menuItems = state.items.map((item, index) => {
            const id = (ids && typeof ids[index] !== 'undefined') ? ids[index] : index;
            const menuItem = (
                <MenuItem eventKey={id} key={id}>{item}</MenuItem>
            );
            return menuItem;
        });

        const postsDropdown = (
            <DropdownButton
                className="posts-dropdown" id="posts-dropdown" bsStyle="default" key="1" title={title} onSelect={selectHandler}>
                {menuItems}
            </DropdownButton>
        );

        return postsDropdown;
    }

   getSelectHandler(key) { return (key) => {
       this.props.onSelect(key);
   }}
}

export class PostContent extends React.Component {

    render (props) {
        const postId = this.props.id;
        const postTitle = (this.props.postText) ? this.props.postTitle : '';
        const postText = this.props.postText;

        const postContent = (
            <article className="post-content" id={`post-${postId}`}>
                <h1>{postTitle}</h1>
                <p>{postText}</p>
            </article>
        );

        return postContent;
    }
}