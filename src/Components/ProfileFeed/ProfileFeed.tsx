import React from 'react';
import './ProfileFeed.css';
import CreatePost from '../Feed/CreatePost';
// import EditPost from './EditPost';

import { Container } from 'reactstrap';
import { Card } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

type acceptedProps = {
    setUsername: string | any;
    setImage: string | any;
    setText: string | any;
    setLink: string | any;
    token: any;
    setComments: any;
}

type valueTypes = {
    username: string | any;
    image: string;
    text: string;
    link: string; 
    dataTable: [];
    token: string;
}

export default class ProfileFeed extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: '',
            image: '',
            text: '',
            link: '',
            dataTable: [],
            token: '',
        }
    }

    fetchUsers = (user: any) => {
        fetch(`http://localhost:3000/user/`, {
            method: "GET",
            headers: {
                "Content-type":"application/json"
            }
        })
        .then((res) => res.json())
        .then((userData) => {
            console.log("User data", userData);
            this.setState({
               dataTable: userData.user
            })
            console.log("USERSDATA", this.state.dataTable)
        })
    }


    fetchFeeds = () => {
        console.log('Fetching a post by ' + this.state.username);
        fetch('http://localhost:3000/feed', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: this.props.token
            }
        })
        .then((response) => response.json())
        .then((userData)=> {
            console.log("feed data ", userData);
            this.setState({
                dataTable: userData.feed.userName
            })
            console.log("FEEDS", this.state.dataTable)
        })
    }

    deleteFeed = ( feed: any) => {
        fetch(`http://localhost:3000/feed/${feed.id}`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json', 'Authorization': this.props.token}),

        }).then(() => this.fetchFeeds())
    }

    //PROSPECTIVE TURNARY FOR POST DISPLAY

    feedMapper = () => {
        return this.state.dataTable.map((feeds: any, index) => {
            const { Meta } = Card;
            return(
                //call mapper and use jsx to display
                <Card
                    key={index}
                    id='postCard'
                    hoverable
                    cover={<img id='postImage' style={{ width: 300, height: 350 }} alt="user posted image" src={feeds.image} />}
                >
                    <p id='cardUname'>{feeds.userName}</p>
                    <p id='cardText'>{feeds.text}</p>
                    <p id='cardlink'><a target='blank'>{feeds.link}</a></p>
                    <IconButton  style={{backgroundColor: 'white', height: '30px', width: '30px', borderRadius: '50%', marginTop: '7px', outline: 'none'}} title='Delete'>
                        <DeleteOutlineTwoToneIcon onClick={() => {
                            this.deleteFeed(feeds)}} /> 
                    </IconButton>
                   
                </Card>
            )
        })
    }

    componentDidMount(){
        this.fetchFeeds();
        this.fetchUsers(this.state.dataTable);
    }

    render() {
        return(
            <div id='feedDiv'>
                <CreatePost setUsername={this.state.username} setImage={this.state.image} setText={this.state.text} setLink={this.state.link} fetchUsers={this.fetchFeeds} token={this.props.token} />
                <Container id='profileFeedContainer'>
                    {this.feedMapper()}
                </Container>
            </div>    
        )
    }
}