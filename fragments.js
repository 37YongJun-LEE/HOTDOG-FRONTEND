import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
    fragment PhotoFragment on postdb {
        id
        post_content
        post_images
        post_likes_cnt
        post_comments_cnt
        isLiked
    }
`;

export const COMMENT_FRAGMET = gql`
    fragment CommentFragment on commentdb {
        id
        userdb {
            user_name
        }
        content
        isMine
    }
`;

export const USER_FRAGMENT = gql`
    fragment UserFragment on userdb {
        id
        user_name
    }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhoto on postdb {
    ...PhotoFragment
    userdb {
      id
      user_name
    }
    post_content
  }
  ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on chatroomdb {
    id
    unreadTotal
    userdb {
      user_name
    }
  }
`;