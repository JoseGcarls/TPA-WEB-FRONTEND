import {gql} from '@apollo/client'

export const CREATE_USER = 
gql`
mutation createUser(
    $fullname : String!, 
    $email : String!, 
    $username : String!, 
    $password : String!,
    $verify : Boolean!){
  createUser(input:{
    fullname : $fullname,
  	email : $email,
  	username : $username,
  	password : $password,
    is_verified : $verify})
}
`
export const VERIFY_USER = 
gql`
mutation verifyUser(
		$token : String!,
  	$email : String!){
  verifyUser(token: $token,email: $email)
}
`

export const LOAD_USER = 
gql`
mutation getUsers(
    $email : String!,
    $password : String!){
  getUser(
      email: $email,
      password : $password)
}
`

export const LOGIN_GOOGLE = gql`
  mutation GoogleLogin($accessToken: String!) {
    googleLogin(access_token: $accessToken)
  }
`

export const SEND_TOKEN = gql`
  mutation sendToken($email : String!){
  sendToken(email: $email)
}
`
export const UPDATE_USER = gql`
mutation updateData($id: ID!, $fullname: String!, $username: String!, $email: String!, $description: String!, $google: Boolean!, $image: String!){
  updateUser(id : $id, email : $email, fullname : $fullname, username : $username, description : $description, google : $google, image : $image)
}
`
export const ADD_POST = gql`
mutation postFile($token: String!, $input: addPost!){
  postFile(token : $token, input : $input)
}
`

export const FORGOT_PASSWORD = gql`
mutation forgotPassword($email: String!){
  forgotPassword(email: $email)
}
`

export const CHANGE_PASSWORD = gql`
mutation changePassword($token: String!, $password: String!, $confirmPassword: String!){
  changePassword(token: $token, password: $password, confirmPassword: $confirmPassword)
}
`

export const SEARCH_USERNAME = gql`
mutation searching($username: String!){
  searchUsername(username: $username){
    username
  }
}
`

export const GET_OTHER_DATA = gql`
mutation getOtherData($username: String!){
  getOtherData(username: $username){
    id
    fullname
    email
    username
  }
}
`


export const GET_OTHER_ALL_DATA = gql`
mutation getOtherAllData($email: String!, $id: String!){
  getOtherDetailData(email: $email){
    id
    email
    description
    picture
    post
    follower
    following
  }
  getOtherPostData(id: $id){
    id
    user_id
    caption
    created_at
    postDetail{
      id
      post_id
      file
      type
    }
  }
}
`

export const GET_HOME_DATA = gql`
mutation getHomeData($token : String!){
  getFullDataHomePage(token: $token){
    id
    user_id
    caption
    created_at
    postDetail{
      id
      post_id
      file
      type
    }
    User{
      username
      Userdetail{
        picture
      }
    }
    Comment{
      id
      post_id
      comment
      user_id
      User{
        username
      }
      LikeComment{
        id
      }
    }
    Like{
        id
    }
  }
}
`

export const NEW_COMMENT = gql`
mutation addNewComment($postid: String!, $comment: String!, $userid: String!){
  addNewComment(input: {post_id : $postid, comment: $comment, user_id: $userid})
}
`

export const DELETE_COMMENT = gql`
mutation deleteComment($id: String!){
  deleteComment(id: $id)
}
`

export const EXPLORE_PAGGED = gql`
mutation explorepagged($nextpost: String){
  postExplorepagged(nextpost: $nextpost){
    Post{
      id
      user_id
      caption
      created_at
      postDetail{
        id
        post_id
        file
        type
      }
    }
    post_id
    has_next
  }
}
`

export const HOME_PAGGED = gql`
mutation homepagged($nextpost: String){
  postHomepagged(nextpost: $nextpost){
    Post{
      id
      user_id
      caption
      created_at
      postDetail{
        id
        post_id
        file
        type
      }
      User {
        id
        username
        Userdetail{
          picture
        }
      }
      Comment{
        id
        post_id
        comment
        user_id
        User{
          username
        }
        LikeComment{
          id
        }
        ReplyComment{
          id
          comment_id
          Comments
          user_id
          User{
            username
          }
          Comment{
            LikeComment{
              id
            }
          }
          ReplyLikeComment{
            id
          }
        }
      }
      Like{
        id
      }
    }
    post_id
    has_next
  }
}
`

export const NEW_SAVE = gql`
mutation addNewSave($postid: String!, $userid: String!) {
  addNewSave(postid: $postid, userid: $userid)
}
`

export const DELETE_SAVE = gql`
mutation deleteSave($postid: String!, $userid: String!) {
  deleteSave(postid: $postid, userid: $userid)
}
`

export const CHECK_SAVE = gql`
mutation checkSave($postid: String!, $userid: String!) {
  checkSave(postid: $postid, userid: $userid)
}
`
export const NEW_LIKE = gql`
mutation addDeleteLike($postid: String!, $userid: String!){
  addDeleteLike(postid: $postid, userid: $userid)
}
`
export const CHECK_LIKE = gql`
mutation checkLike($postid: String!, $userid: String!){
  checkLike(postid: $postid, userid: $userid)
}
`
export const NEW_LIKE_COMMENT = gql`
mutation addDeleteLikeComment($commentid: String!, $userid: String!){
  addDeleteLikeComment(commentid: $commentid, userid: $userid)
}
`
export const CHECK_LIKE_COMMENT = gql`
mutation checkLikeComment($commentid: String!, $userid: String!){
  checkLikeComment(commentid: $commentid, userid: $userid)
}
`

export const NEW_REPLY = gql`
mutation addReplyComment($commentid: String!, $comment: String!, $userid: String!){
  addReplyComment(commentid: $commentid, comment: $comment, userid: $userid)
}
`

export const NEW_REPLY_LIKE_COMMENT = gql`
mutation addDeleteReplyLikeComment($replyid: String!, $userid: String!){
  addDeleteReplyLikeComment(replycommentid: $replyid, userid: $userid)
}
`

export const CHECK_REPLY_LIKE_COMMENT = gql`
mutation checkReplyLikeComment($replyid: String!, $userid: String!){
  checkReplyLikeComment(replycommentid: $replyid, userid: $userid)
}
`

export const DELETE_REPLY_COMMENT = gql`
mutation deleteReplyComment($id: String!){
  deleteReplyComment(replyid: $id)
}
`

export const DELETE_POST = gql`
mutation deletePost($id: String!){
  deletePost(id: $id)
}
`