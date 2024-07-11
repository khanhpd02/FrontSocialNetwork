
import Home from "../pages/Home/Home";

import AddPost from "../pages/AddPost/AddPost";
import AddReels from "../pages/AddReels/AddReels";
import Public from "../pages/Public";
import CallGroup from "../pages/CallGroup/CallGroup";
import JoinCallGroup from "../pages/CallGroup/JoinCallGroup";
import Search from "../pages/Search/Search";
import ListFriend from "../pages/ListFriend/ListFriend";
import Notifications from "../pages/Notifications/Notifications";
import PagePostSimp from "../pages/PagePostSimp/PagePostSimp";

const publicRoutes = [
    {
      path: "/",
      component: Home,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/add-post",
      component: AddPost,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/call-group",
      component: JoinCallGroup,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/room/:id",
      component: CallGroup,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/search/:fullName",
      component: Search,
      layout: Public,
      sidebar: null,
    },
   
    // {
    //   path: "/personal",
    //   component: Personal,
    //   layout: Public,
    //   sidebar: null,
    // },
    // {
    //   path: "/personal-user/:id",
    //   component: PersonalFriend,
    //   layout: Public,
    //   sidebar: null,
    // },
    {
      path: "/list-friend",
      component: ListFriend,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/notification",
      component: Notifications,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/post/:id/:cmtid",
      component: PagePostSimp,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/post/:id",
      component: PagePostSimp,
      layout: Public,
      sidebar: null,
    },
    {
      path: "/create-reels",
      component: AddReels,
      layout: Public,
      sidebar: null,
    },
    
]
export { publicRoutes };
