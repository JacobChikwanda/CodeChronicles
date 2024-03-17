"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsData = exports.posts = void 0;
exports.posts = [
    {
        id: 1,
        title: "The Future of Web Development",
        author: "Jane Doe",
        contentSnippet: "Web development is rapidly evolving with new technologies and frameworks. This article explores the future trends and what developers should expect in the coming years...",
        publicationDate: "2024-03-14"
    },
    {
        id: 2,
        title: "Exploring the Depths of Machine Learning",
        author: "John Smith",
        contentSnippet: "Machine learning continues to drive innovation and efficiency across various sectors. From healthcare to finance, learn how machine learning algorithms are transforming industries...",
        publicationDate: "2024-03-10"
    },
    {
        id: 3,
        title: "The Impact of Virtual Reality on Education",
        author: "Alice Johnson",
        contentSnippet: "Virtual reality is not just for gaming. Discover how VR technology is being implemented in educational settings to provide immersive learning experiences...",
        publicationDate: "2024-03-05"
    },
    {
        id: 4,
        title: "Sustainable Technologies for a Greener Tomorrow",
        author: "Bob Brown",
        contentSnippet: "As the world faces environmental challenges, sustainable technologies offer a beacon of hope. This post delves into the innovations leading the way to a greener future...",
        publicationDate: "2024-02-28"
    },
    {
        id: 5,
        title: "The Renaissance of Space Exploration",
        author: "Clara Rodriguez",
        contentSnippet: "With the advent of private space companies, the final frontier is closer than ever. Explore the latest milestones in space exploration and what's on the horizon for humanity among the stars...",
        publicationDate: "2024-02-20"
    }
];
const getPostsData = () => {
    return exports.posts;
};
exports.getPostsData = getPostsData;
