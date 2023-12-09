"use client";

import React from "react";
import "./globals.css";
import Image from "next/image";
import anotherf8 from "@/assets/images/another-f8.jpg";
import { useTranslation } from "next-i18next";
import { regexPhoneNumber, regexURL, regexMail } from "@/utilities/regex";

const Body = () => {
  const { t } = useTranslation();
  return (
    <main className="main-body">
      <h1 className="title">{t("home-title")}</h1>

      <div className="content-container">
        <div className="left-side-content">
          <div className="avatar-container">
            <Image
              className="avatar"
              src={anotherf8}
              priority={true}
              alt="F88"
              style={{
                maxWidth: 260,
                height: "auto",
              }}
            />
            <h4>Front-end developer</h4>
          </div>
          <h2>{t("my-skills")}</h2>
          <p>
            <b>{t("skills-1")}</b>: REST API, React.js, Next.js, Redux, Context,
            CSS3, HTML5, UI/UX, Figma, Photoshop...
          </p>
          <hr />
          <p>
            <b>{t("skills-2")}</b>: Relatively good research and search skills.
            Working thinking, good teamwork skills compared to age.
          </p>
          <h2>{t("histories")}</h2>
          <p>2016: {t("2016")}</p>
          <hr />
          <p>2017-2019: {t("2017-2019")}</p>
          <hr />
          <p>2019-2021: {t("2019-2021")}</p>
          <hr />
          <p>2022-2023: {t("2022-2023")}</p>
        </div>
        <div className="right-side-content">
          <div className="upper-container">
            <h2>{t("contact")}</h2>
            <p>
              Phone:{" "}
              {regexPhoneNumber("0987654321") ? (
                <a href={`tel:${"0987654321"}`}>0987654321</a>
              ) : null}
            </p>
            <p>
              Zalo:{" "}
              {regexURL("https://zalo.me") ? (
                <a href={"https://zalo.me"} target="_blank">
                  https://zalo.me
                </a>
              ) : null}
            </p>
            <p>
              Email:{" "}
              {regexMail("contact@fullstack.edu.vn") ? (
                <a
                  href={`mailto:${"contact@fullstack.edu.vn"}`}
                  target="_blank"
                >
                  contact@fullstack.edu.vn
                </a>
              ) : null}
            </p>
            <p>
              Facebook:{" "}
              {regexURL("https://www.facebook.com/groups/f8official") ? (
                <a
                  href={"https://www.facebook.com/groups/f8official"}
                  target="_blank"
                >
                  https://www.facebook.com/groups/f8official
                </a>
              ) : null}
            </p>
            <p>
              Youtube:{" "}
              {regexURL("https://www.youtube.com/c/f8vnofficial") ? (
                <a
                  href={"https://www.youtube.com/c/f8vnofficial"}
                  target="_blank"
                >
                  https://www.youtube.com/c/f8vnofficial
                </a>
              ) : null}
            </p>
            <hr />
          </div>
          <div className="lower-container">
            <h2>{t("project")}</h2>
            <div>
              <h3>Project Code snippet</h3>
              <p>{t("code-snippet-1")}</p>
              <p>{t("code-snippet-2")}</p>
              <a href="/">Demo</a>
              <a href="/">Code</a>
            </div>
            <hr />
            <div>
              <h3>Project blog</h3>
              <p>{t("blog-1")}</p>
              <p>{t("blog-2")}</p>
              <a href="/">Demo</a>
              <a href="/">Code</a>
            </div>
            <hr />
            <div>
              <h3>Project 20f8</h3>
              <p>{t("20f8-1")}</p>
              <p>{t("20f8-2")}</p>
              <a href="/">Demo</a>
              <a href="/">Code</a>
            </div>
            <hr />
            <a href="https://github.com/suspiciously36">
              https://github.com/suspiciously36
            </a>
          </div>
          <div className="hobbies-container">
            <h2>{t("my-hobbies")}</h2>
            <ul>
              <li>{t("my-hobbies-1")}</li>
              <li>{t("my-hobbies-2")}</li>
              <li>{t("my-hobbies-3")}</li>
            </ul>
          </div>
          <div className="footer">
            <p>{t("footer")}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Body;
