import { store } from "../context/main.js";

export const getLinks = () => {
  const isAuth = !!store.user._id;

  return [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Races",
      href: "/races",
      extraLinks: [
        { title: "Schedule", href: "/races" },
        { title: "Next Race", href: "/next-race" },
        { title: "Ratings", href: "/ratings" },
      ],
    },
    {
      title: "News",
      href: "/news",
    },
    {
      title: "Events",
      href: "/events",
    },
    {
      title: "Fans",
      href: "/fans",
    },
    {
      title: "Contacts",
      href: "/contacts",
    },
    {
      title: "Users",
      href: isAuth ? "/users" : "",
      isBtn: !isAuth,
    },
    {
      title: "Profile",
      isBtn: !isAuth,
      href: isAuth ? `/user/${store.user._id}` : "",
    },
  ];
};
