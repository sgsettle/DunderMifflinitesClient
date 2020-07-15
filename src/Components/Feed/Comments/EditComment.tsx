import React from 'react';

import { Button, Modal } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

type acceptedProps = {
    setUsername: string;
    setComments: string;
    token: any
}

type valueTypes = {
    username: string;
    comment: string;
    commentData: [];
}
 
export default class ProfileFeed extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);

    }




}