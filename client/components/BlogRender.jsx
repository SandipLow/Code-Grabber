import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import mdStyle from "../../styles/mdstyles.module.css";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable as syntax_style } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { BannerPost } from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function BlogRender({ data, user }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(data.likes);

  useEffect(() => {
    const checkLike = async () => {
      const res = await fetch(`/api/blogs/get-user-liked-blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(localStorage.getItem("user")).authtoken,
        },
      });

      if (res.status === 200) {
        const resJson = await res.json();
        const liked = resJson.find((blog) => blog.slug === data.slug);
        setLiked(liked ? true : false);
      }
    };

    if (user) checkLike();
  }, [data, user]);

  const handleLike = async (e) => {
    const res = await fetch(`/api/blogs/likeblog/${data.slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": JSON.parse(localStorage.getItem("user")).authtoken,
      },
    });

    if (res.status === 200) {
      const resJson = await res.json();
      setLiked(resJson.message === "liked");
      setLikes(resJson.likes);
    }
  };

  return (
    <>
      <BannerPost
        title={data.title}
        img={data.img}
        description={data.description}
        tags={data.tags}
      />

      {/* Author Section */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-full shadow-md">
          <span className="text-cdek-blue font-semibold">{data.user?.displayName}</span>
          {/* Updated Image to Next/Image */}
          <Image
            src={data.user?.profilePic}
            alt="profile"
            width={40}
            height={40}
            className="object-cover rounded-full shadow-lg"
          />
        </div>
      </div>

      {/* Blog Content */}
      <div className="prose lg:prose-lg max-w-4xl mx-auto mt-12">
        <MarkDownContent content={data.content} />
      </div>

      {/* Like Button */}
      {user ? (
        <div className="flex justify-center items-center mt-10">
          <div className="flex items-center space-x-4 border bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition duration-300">
            <button
              onClick={handleLike}
              className={`p-3 rounded-full text-white transition-all duration-300 ${
                liked ? 'bg-cdek-blue' : 'bg-gray-200 hover:bg-cdek-blue'
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="h-6 w-6" />
            </button>
            <span className="text-lg font-semibold text-gray-700">{likes}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}

export const MarkDownContent = ({ content }) => {
  return (
    <article className={`prose lg:prose-lg max-w-4xl mx-auto ${mdStyle.md}`}>
      <ReactMarkdown
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter style={syntax_style} language={match[1]} {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};
