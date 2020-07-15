import React from 'react';
import './Feed.css';
import CreatePost from './CreatePost';
import Comments from './Comments/Comments';
import Footer from '../Footer/Footer';
import { Container } from 'reactstrap';
import { Card } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import { stringify } from 'querystring';

type acceptedProps = {
    setUserName: string | any;
    // setImage: string | any;
    // setText: string | any;
    // setLink: string | any;
    setComments: any;
    token: any;
}

type valueTypes = {
    username: string | any;
    image: string;
    text: string;
    link: string; 
    comment: string;
    dataTable: []
}

export default class FeedIndex extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: '',
            image: '',
            text: '',
            link: '',
            comment: '',
            dataTable: []
        }
    }
    //GET FOR ALL USER INFO
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
        console.log('Fetching all feed posts.')
        fetch('http://localhost:3000/feed', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: this.props.token
            }
        })
        .then((response) => response.json())
        .then((userData)=> {
            console.log("Feed Data:", userData);
            this.setState({
                dataTable: userData.feed
            })
            console.log("FEEDS:", this.state.dataTable)
        })
    }

    deleteFeed = ( feed: any) => {
        fetch(`http://localhost:3000/feed/${feed.id}`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json', 'Authorization': this.props.token}),

        }).then(() => this.fetchFeeds())
    }

    feedMapper = () => {
        return this.state.dataTable.map((feeds: any, index) => {
            return(
                <div>
                    <Card
                        key={index}
                        id='postCard'
                        hoverable
                        cover={<img id='postImage' style={{ width: 300, height: 350 }} alt="user posted image" src={feeds.image} />}
                    >
                        <p id='cardUname'>{feeds.userName}</p>
                        <p id='cardText'>{feeds.text}</p>
                        <p id='cardlink'><a target='blank'>{feeds.link}</a></p>
                        
                        <Comments setUsername={this.props.setUserName} setComments={this.state.comment} token={this.props.token} fetchUsers={this.fetchUsers}/>
                        
                    </Card>
                    
                </div>
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
                <Container id='feedContainer'>
                    {this.feedMapper()}
                </Container>
                <Footer />
            </div>    
        )
    }
}