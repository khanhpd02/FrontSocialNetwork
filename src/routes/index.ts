import React from "react";
import Home from "../pages/Home/Home";
const AddPost = React.lazy(() => import("../pages/AddPost/AddPost"))
const AddReels = React.lazy(() => import("../pages/AddReels/AddReels"))
const Public = React.lazy(() => import("../pages/Public"))
const CallGroup = React.lazy(() => import("../pages/CallGroup/CallGroup"))
const Search = React.lazy(() => import("../pages/Search/Search"))
const ListFriend = React.lazy(() => import("../pages/ListFriend/ListFriend"))
const Notifications = React.lazy(() => import("../pages/Notifications/Notifications"))
const PagePostSimp = React.lazy(() => import("../pages/PagePostSimp/PagePostSimp"))
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
