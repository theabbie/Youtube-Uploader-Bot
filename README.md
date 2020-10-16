# Youtube Uploader Bot

![How to Build a YouTube Uploader Bot Using Google Apps Script](https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)Whenever you hear the word 'Bot' you probably imagine a robot like they show in the movies. They are bots too, rather smart ones. But we are referring to a different kind of bot here.

We can define a bot as a script that can be used to automate certain tasks which are either tedious or difficult for humans. There are good bots and bad bots, and there is a very fine line between them.

Before we start, let me tell you one thing, This tutorial only discusses the part which involves uploading videos to YouTube. We will be using a sample video here.

If you create a bot which uploads video regularly (like Webdriver Torso, which we will talk more about at the end of the article) you need a source for the video.

**Also, a warning**: make sure you check the copyrights of all videos you upload. The version of the bot I first created uploaded others' videos to YouTube â€“ and you won't believe what happened. I got series of copyright claims and strikes and my channel was ultimately deleted.

So in this tutorial I'll show you how it's done. But if you want to implement it, first find a good source of videos that you can upload without copyright issues.

## **Why Google Apps Script?**

[Google Apps Script](https://www.google.com/script/start/)Â is a scripting platform developed by google for running light-weight applications. Its syntax is based on JavaScript. If you already know Javascript you will find it really easy.

The reason we are using Google Apps Script is because it makes it really easy to build this bot. It has in-built support for most Google products like Gmail, Sheets, Forms, and Youtube. And it's free.

## **Overview of Google Apps Script**

Google Apps Script has an online editor and filesystem. It doesn't need any deployment, you just have to save your code and it's running.

If you open the Apps Script editor, it will look something like this:

![](https://www.freecodecamp.org/news/content/images/2020/08/Screenshot--13-.png)Just like any other text editor, it has a sidebar with list of files, a menu, and space for writing code. The code files have a .gs extension (probably for Google script). And most important, all the code must be inside some function â€“ anonymous code won't be executed.

There are two special functions,Â `doPost()`Â andÂ `doGet()`. As the name suggests, they are used for handling POST and GET requests, respectively. We won't be using them here, but if you want to create this bot like an API that can be called using HTTP requests, it would be useful.

## **Getting Started**

Unlike other tutorials, I won't tell you to clone a GitHub repository. First, because I want you to learn and code along with me. Second, the code isn't that big, and you need to understand how it works.

This is the function that uploads a given video to a YouTube channel:

`function upload(url, title, description, topics) { try { var video = UrlFetchApp.fetch(url); YouTube.Videos.insert({ snippet: { title: title, description: description, tags: topics }, status: { privacyStatus: "public", }, }, "snippet,status", video); return ContentService.createTextOutput("done") } catch (err) { return ContentService.createTextOutput(err.message) } }`

## **Enabling YouTube API**

Before you run this function, you have to enable YouTube Data API V3. You must be familiar with what an API is, so let me try to explain that with an example.

Google Maps is a great service. It has lots of amazing tools. Suppose you want to use those features in your app, let's say for building a smart digital invitation card with an embedded map.

Normally, to do this you need the source code of Maps. But that code is not open-source. And it would be foolish to give someone source code just because they want to use some feature. That's where an API comes handy.

APIs or Application Programming Interfaces, are a way for developers to allow others to use your app's features without disclosing the source code.

In this case, YouTube's API allows developers to use YouTube's features in their apps, or to control some YouTube channel after authentication. If you have an idea of what an API is, let's continue.

To enable the YouTube Data API, navigate toÂ **Resources > Advanced Google Services**. You will see something like the below. It may ask you to accept Google Cloud's terms before proceeding if you don't have a project already set up. If asked, accept the terms.

![](https://www.freecodecamp.org/news/content/images/2020/08/image-73.png)Scroll to the bottom. You will see YouTube Data API V3. Usually, you need to create a Google Cloud Project to use it. But App Script creates a project for itself, so you don't need to create something separate. Enable it and close the popup. Now you are good to go.

## **Running the function**

You have to paste the code given below (same as above) into the text editor and save it from theÂ **File > Save**Â menu.

`function upload(url, title, description, topics) { try { var video = UrlFetchApp.fetch(url); YouTube.Videos.insert({ snippet: { title: title, description: description, tags: topics }, status: { privacyStatus: "public", }, }, "snippet,status", video); return ContentService.createTextOutput("done") } catch (err) { return ContentService.createTextOutput(err.message) } }`

After saving it, you have to navigate to theÂ **Run > Run function > Upload**Â menu. It will look something like this:

![](https://www.freecodecamp.org/news/content/images/2020/08/Screenshot--11--1.png)On clicking the upload button, you will receive a popup like this:

![](https://www.freecodecamp.org/news/content/images/2020/08/image-74.png)Now this is where the usefulness of App Script becomes apparent. Here, you can give it permission to upload videos to your account. It will show you warnings that the app is not verified â€“ but don't worry, that's a security step Google takes to prevent malicious apps.

![](https://www.freecodecamp.org/news/content/images/2020/08/image-75.png)But here, you are the developer, so you can ignore the warning and give permission from the Advanced button on the bottom left. It will ask you for two permissions, as shown:

![](https://www.freecodecamp.org/news/content/images/2020/08/Capture-1.PNG)Permission to manage your YouTube account is a serious permission. Though it's safe in this particular instance, never give this permission to any app you don't trust. It will give the app complete access to your YouTube account.

And this isn't just the case for YouTube. You should be extra careful before you allow sensitive scopes on any platform, like Twitter, Facebook, GitHub and other social sign-in methods.

After you give that permission, the function will be executed. But nothing will happen as we didn't specify what should be uploaded.

Here, you need to give values to the URL, title, description, and tags variables. Let us take a sample video for our use (remember those copyright issues?).

This is the modifiedÂ `upload()`Â function:

`function upload() { try { var video = UrlFetchApp.fetch("https://www.w3schools.com/html/mov_bbb.mp4"); YouTube.Videos.insert({ snippet: { title: "Big Buck Funny", description: "This Is The Description", tags: ["funny"] }, status: { privacyStatus: "public", }, }, "snippet,status", video); return ContentService.createTextOutput("done") } catch (err) { return ContentService.createTextOutput(err.message) } }`

You can Save it and Run the function again. You can see that we changed the URL to a video URL, the title and description were set, and the tags are also set as an array. You can also set privacyStatus to private for testing.

Let's see the results:

![](https://www.freecodecamp.org/news/content/images/2020/08/image-78.png)As I told you at the start of the tutorial, copyright infringement is a big deal. The above video was removed by YouTube within minutes of uploading.

So, find a good video source first. If you want to generate videos programatically, there are libraries likeÂ `ffmpeg`, but let's not discuss that here. The aim of this article was to create a bot and we did.

## **Bot that regularly uploads videos**

Suppose you find a source for videos and want your bot to regularly upload videos. Google Apps Script has an inbuilt Cron service which will execute your function at regular intervals, like daily, or once a week. You can create a trigger from the dashboard:

![](https://www.freecodecamp.org/news/content/images/2020/08/image-79.png)You will get an option to add a trigger on the bottom right. The options will look something like this:

![](https://www.freecodecamp.org/news/content/images/2020/08/image-80.png)You can set the function to be called, the frequency, and other options. Thus we have successfully created aÂ **YouTube Uploader Bot.**

This was just one use of Google Apps script â€“ you can use it for other tasks like:

* Modifying Google Forms

* Creating extensions for Google Sheets

* Creating Blogger posts programatically

You may try other projects too, There is a lot you can do with it.

## **Webdriver Torso**

You may not have heard about it, but this bot (or maybe a superhuman) has uploaded more than 70,000 videos on its youtube channel over a relatively short period of time. And although they are procedurally generated videos, it's still very cool.

These are the most viewed videos on this channel:

![](https://www.freecodecamp.org/news/content/images/2020/08/image-81.png)You can see that the Eiffel Tower at night video (which is illegal) has the most views. There are conspiracy theories that this channel is owned by YouTube for testing purposes.

Either way, don't get inspired â€“ if you upload this many videos, YouTube will most probably suspend you.
