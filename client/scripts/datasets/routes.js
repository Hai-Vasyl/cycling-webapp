import {roles} from "../configs/userRoles.js";
import {store} from "../context/main.js";
import Contacts from "../pages/Contacts.js";
import DetailsEvent from "../pages/DetailsEvent.js";
import DetailsNews from "../pages/DetailsNews.js";
import Events from "../pages/Events.js";
import Fans from "../pages/Fans.js";
import Home from "../pages/Home.js";
import News from "../pages/News.js";
import NextRace from "../pages/NextRace.js";
import Profile from "../pages/Profile.js";
import Races from "../pages/Races.js";
import Ratings from "../pages/Ratings.js";
import Users from "../pages/Users.js";
import ModEvent from "../pages/ModEvent.js";
import ModNews from "../pages/ModNews.js";

const routes = [
  { path: "/", page: Home, title: "Home" },
  { path: "/contacts", page: Contacts, title: "Contacts" },
  { path: "/event-details/:id", page: DetailsEvent, title: "Event Details" },
  { path: "/news-details/:id", page: DetailsNews, title: "News Details" },
  { path: "/events", page: Events, title: "All Events" },
  { path: "/news", page: News, title: "All News" },
  { path: "/fans", page: Fans, title: "Fans" },
  { path: "/next-race", page: NextRace, title: "Next Race" },
  { path: "/races", page: Races, title: "Schedule Of Races" },
  { path: "/ratings", page: Ratings, title: "Ratings" },
];

const routesAdmin = [
  { path: "/edit-news/:id", page: ModNews, title: "Edit News" },
  { path: "/edit-event/:id", page: ModEvent, title: "Edit Event" },
  { path: "/create-news", page: ModNews, title: "Create News" },
  { path: "/create-event", page: ModEvent, title: "Create Event" },
  { path: "/users", page: Users, title: "All Users" },
  { path: "/user/:id", page: Profile, title: "User Profile" },
];

const routesUser = [
  { path: "/users", page: Users, title: "All Users" },
  { path: "/user/:id", page: Profile, title: "User Profile" },
];

export const getRoutes = () => {
  switch (store.user.role) {
    case roles.admin.key:
      return [...routes, ...routesAdmin];
    case roles.user.key:
      return [...routes, ...routesUser];
    default:
      return routes;
  }
};
