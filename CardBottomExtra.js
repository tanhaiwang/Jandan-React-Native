/**
 * Created by Blazers on 2015/12/25.
 * Props
 *  vote: {
 *      liked: boolean
 *      disliked: boolean
 *      favorite: boolean
 * }
 *
 */
'use strict';

import React from 'react-native';
const {
        Component,
        View,
        Text,
        Image,
        StyleSheet,
        TouchableWithoutFeedback,
    } = React;

export class CardBottomExtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: this.props.liked || false,
            disliked: this.props.disliked || false,
            favorite: this.props.favorite || false,
            commentPressed: false
        }
    }

    render() {
        let up = this.state.liked ? require('image!ic_thumb_up_16dp') : require('image!ic_thumb_up_grey600_16dp');
        let down = this.state.disliked ? require('image!ic_thumb_down_16dp') : require('image!ic_thumb_down_grey600_16dp');
        let fav = this.state.favorite ? require('image!ic_favorite_16dp') : require('image!ic_favorite_grey600_16dp');
        let comment = this.state.commentPressed ? require('image!ic_comment_16dp') : require('image!ic_comment_grey600_16dp');
        return (
            <View>
                <View style={styles.divider}/>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <TouchableWithoutFeedback
                            onPressIn={()=>this.setState({liked: true})}
                            onPressOut={()=>this.setState({liked: this.props.liked})}
                            onPress={()=>console.log('pressed')}
                            style={styles.badgeViewTouchable}>
                            <View style={styles.badgeView}>
                                <Image
                                    source={up}
                                    style={styles.image}/>
                                <Text style={[styles.badge, this.state.liked&&{color: '#0f9bf5'}]}>0</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPressIn={()=>this.setState({disliked: true})}
                            onPressOut={()=>this.setState({disliked: this.props.disliked})}
                            style={styles.badgeViewTouchable}>
                        <View style={styles.badgeView}>
                                <Image
                                    source={down}
                                    style={styles.image}/>
                                <Text style={[styles.badge, this.state.disliked&&{color: '#ff3234'}]}>0</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPressIn={()=>this.setState({commentPressed: true})}
                            onPressOut={()=>this.setState({commentPressed: false})}
                            style={styles.badgeViewTouchable}>
                        <View style={styles.badgeView}>
                                <Image
                                    source={comment}
                                    style={styles.image}/>
                                <Text style={[styles.badge, this.state.commentPressed&&{color: '#4bbb59'}]}>0</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback
                        onPressIn={()=>this.setState({favorite: true})}
                        onPressOut={()=>this.setState({favorite: this.props.favorite})}
                        onPress={()=>{this.setFavoriteOrNot()}}>
                        <Image
                            source={fav}
                            style={styles.image}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.divider}/>
            </View>
        )
    }

    setFavoriteOrNot() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        flexDirection: 'row'
    },
    badgeViewTouchable: {
        marginLeft: 4
    },
    badgeView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    badge: {
        fontSize: 12,
        color: '#757575'
    },
    image: {
        width: 16,
        height: 16,
        margin: 12
    },
    divider: {
        height: 0.5,
        backgroundColor: '#e5e7e9'
    }
});
