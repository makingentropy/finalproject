# Flowtracker

## Summary (including stretch goals)
A site devoted to user review of media of the spoken or sung word, and secondarily instrumentals meant for vocal accompaniment.
--------------
A user can post a link to a media file (i.e. embedded youtube or mp3).  This creates a "thread" where all users may post reviews on the track in discussion threads. On creation, the user chooses the category (e.g. "Video", "Audio-only", "Instrumentals"). The main thread inherits the title of the video.  Side-threads (i.e. "sidebar") are discussed below:

All users may post to a discussion thread per media file:
Discussion will have a bespoke method of organization that is partially policed by community rule than admins:
Any user may sidebar their own post, which puts their post in a side thread hidden to non-members. They may choose to join an existing sidebar or move it to their own, which they may title and moderate (mute other members from the sidebar or boot posts to unnamed sidebars--the author of the offending post may reassign it to another thread or title it as the start of a new one.  The offending post is cleared of downvotes).
If a post gets enough boot votes, it is kicked out of that thread (main or sidebars), and the boot vote records (i.e. :boot_ids) are cleared.

## DATA

Backend repo:  https://github.com/makingentropy/finalproject_backend
Frontend repo: https://github.com/makingentropy/finalproject
Heroku frontend repo: https://flowtracker-frontend/herokuapp.com
Heroku backend repo: https://flowtracker-backend/herokuapp.com

Live site:

## Planning:
day-to-day: https://trello.com/b/L6qnLuaR/flowtracker

Experience flow:
![ScreenShot](/#.jpg)

## Backend Structure (with stretch goals):
User {
  :required[:user_id, :email, :username, :password, :special_classes [admin, reviewer, artist, music industry        professional, etc]],
  :user_settings[:subscribed_threads, :subscribed_tags],
  :profile[:narrative, :badges, :peer_upvotes, :peer_downvotes, :threads_authored, :last_wheel_date, :wheeled_today :wheels_remaining]]
}

Media {
  :required[:media_id, :url, :media_name, :media_type, genre: ,:date_posted, :author_id, :author_name, :talent[:artist, :features["not_required"], :production["not_required"]]],
  :rankings[:Avg_stars, :1s, :2s, :3s, :4s, :5s],
  :sticky, :wheels, :tags,
}

Thread{:thread_id, :posts[:post[:post_id, :author_id, :author_name, :body, :upvote_ids, :downvote_ids, :boot_ids, :sidebar[:sidebar_id, :sidebar_title, :sidebar_owner]]], :Category, :Sub_Category}

##Approach
Code.

##Struggles
Got sick for a few days. Struggled a lot with the Ruby/Rails end of things and learning to mess with Heroku dynos. My heroku rake console dyno got stuck a lot, so I got to learn about heroku ps and heroku ps:stop <dyno>. My previous teammate did most of the Ruby/Rails implementation last time (while I handled most of the front end), so this was my first time being totally responsible for that, as well as for JWT Authorization, which I had never been responsible for either.  Reading over instructor notes and watching old videos on Ruby/Rails ate up a good chunk of time in the beginning until I felt comfortable tackling the build.  After completing JWT Authorization (from the instructor notes), I ran into the issue of not being able to create a new user, though I could authorize one. I was stuck on this for the better part of a day until Dan showed me I was missing one key from user_params in a rails controller. Aside from getting sick, the finicky complexity of rails was my biggest hurdle.  Rails is definitely still a huge weakspot but I feel like I can conquer it if I force myself to use it more. I will do so as I expand out my site to meet my stretch goals after class ends.  Other timesink besides Rails and being sick were heroku issues and getting a youtube link to play.

## Stretch Goals
Admin rights to move or delete threads, posts, and users.
Admin rights to mute users from posting to the community, users may still read and upvote (no downvote).
User rights to mute other users from their own feed, users may still read and upvote (no downvote)..
Admin rights to suspend users for X days from posting.
Users post comments.
Make site size-responsive (the requirements only say that the portfolio has to be).

## Technology Used
- trello.com for day-to-day planning.
      +++ruby / rails / postgresql
      +++jwt authentication
- postman
- heroku
- node / express / javascript / body-parser / json / angular / html / css
- bootstrap for glyphs only
- filter forge
- google fonts
