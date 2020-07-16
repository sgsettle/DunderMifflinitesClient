import React from 'react';
import './ProfileFeed.css';
import CreatePost from '../Feed/CreatePost';
import EditPost from './EditPost';
import APIURL from '../../Helpers/environment';
import './ProfileFeed.css';
import { Container } from 'reactstrap';
import { Card } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import EditIcon from '@material-ui/icons/Edit';

type acceptedProps = {
    setUsername: string | any;
    // setImage: string | any;
    // setText: string | any;
    // setLink: string | any;
    token: any;
    setComments: any;
    // updateUsername: string | any;
    // updateImage: string | any;
    // updateText: string | any;
    // updateLink: string | any;
}

type valueTypes = {
    username: string | any;
    image: string;
    text: string;
    link: string; 
    pFeedData: [];
    token: string;
    setUpdateActive: boolean;
    setUpdatePost: {}
    // updateUsername: string;
    // updateImage: string;
    // updateText: string;
    // updateLink: string;
}

export default class ProfileFeed extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: '',
            image: '',
            text: '',
            link: '',
            pFeedData: [],
            token: '',
            setUpdateActive: false,
            setUpdatePost: {},
            // updateUsername: "",
            // updateImage: "",
            // updateText: "",
            // updateLink: "",
        }
    }

    fetchFeeds = () => {
        console.log('Fetching a post by ' + this.state.username);
        fetch(`${APIURL}/feed/${this.props.setUsername}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: this.props.token
            }
        })
        .then((response) => response.json())
        .then((userData)=> {
            console.log("feed data ", userData);
            console.log("checking if right ", userData.feed);
            this.setState({
                pFeedData: userData.feed
            })
            console.log("FEEDS", this.state.pFeedData)
        })
    }

    deleteFeed = ( feed: any) => {
        fetch(`${APIURL}/feed/${feed.id}`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json', 'Authorization': this.props.token}),

        }).then(() => this.fetchFeeds())
    }

    editUpdatePost = (feed: any) => {
        this.setState({ setUpdatePost: feed});
    };

    updateOn = () => {
        this.setState({
            setUpdateActive: true
        })
    }

    updateOff = () => {
        this.setState({
            setUpdateActive: false
        })
    }

    componentDidMount(){
        this.fetchFeeds();
    }

    render() {
        return(
            <div id='feedDiv'>
                <CreatePost setUsername={this.state.username} setImage={this.state.image} setText={this.state.text} setLink={this.state.link} fetchUsers={this.fetchFeeds} token={this.props.token} />
                <Container id='profileFeedContainer'>
                    <div>
                    {/* {this.feedMapper()} */}
                    {this.state.pFeedData.map((feed: any, index) => (
                        <div key={index}>
                        <Card
                        key={index}
                        id='postCard'
                        hoverable
                        cover={<img id='postImage' style={{ width: 300, height: 350 }} alt="user posted image" src={feed.image} />}
                    >
                        <p id='cardUname'>{feed.userName}</p>
                        <p id='cardText'>{feed.text}</p>
                        <p id='cardlink'><a target='blank'>{feed.link}</a></p>
                        
                        <IconButton  style={{backgroundColor: 'white', height: '30px', width: '30px', borderRadius: '50%', marginTop: '7px', outline: 'none'}} title='Delete'>
                            <DeleteOutlineTwoToneIcon onClick={() => {
                                this.deleteFeed(feed)}} /> 
                        </IconButton>
                       <IconButton style={{backgroundColor: 'white', height: '30px', width: '30px', borderRadius: '50%', marginTop: '7px', outline: 'none'}} title='Edit'>
                           <EditIcon onClick={()=> {this.editUpdatePost(feed)
                           this.updateOn()}}/>
                       </IconButton>
                       <EditPost 
                       token={this.props.token}
                        updateOff={this.updateOff}
                        setUpdatePost={this.state.setUpdatePost}
                        fetchFeeds={this.fetchFeeds}/>
                    </Card>
                    </div>
                    ))}
                    </div>
                </Container>
            </div>    
        )
    }
}