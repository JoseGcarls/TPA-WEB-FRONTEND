import {gql} from '@apollo/client'

export const GET_FULL_DATA = gql`
query getFullData($token : String!){
  getUserData(token: $token){
    id
    email
    fullname
    username
    google    
  }
  getUserDetailData(token : $token){
    description
    picture
    post
    follower
    following
  }
  getPostData(token : $token){
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

export const GET_SAVE_DATA = gql`
query getSaveData($userid: String!){
  getSaveData(userid: $userid){
    id
    post_id
    user_id
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
  }
}
`

export const DETAIL_DATA = gql`
query getDetailData($id: String!){
  getDetailData(id: $id){
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
  	Comment{
      id
      post_id
      comment
      user_id
      User{
        id
        username
      }
      LikeComment{
        id
      }
      ReplyComment{
        id
        ReplyLikeComment{
          id
        }
      }
    }
    Like{
      id
    }
    User{
      id
      username
      Userdetail{
        picture
      }
    }
  }
}
`