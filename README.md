#  Notice: This app is currently broken per FB's Page Public Content Access Policy

#  WednesdayApp
This is a basic app written in React Native which fetches frog images from Facebook's Graph API from a popular meme page.

# Setup
This app requires a Facebook Graph API app token to be placed in a .env file. Since this page is publicly accessible you can generate your own here: 

https://developers.facebook.com/docs/apps/register/

After following the instructions for "Create new Facebook App" define a .env file with two variables, APPID and APPSECRET.

Since I am not an administrator for this page I can not guarantee the contents of what images may be fetched. This project exists more or less a testing ground to try out new React methods and stay current in React's ever-changing ecosystem.

# Structure
In this app I manage state using React 16's new context API. From the top level I maintain a global context and wrap each component which might need shared state from siblings or distant parents using a higher order component (contextWrap). The choice of using context was to avoid "prop drilling" many levels from parent to child as well as avoiding adding extra dependencies such as Redux. The contextWrap HOC spreads the context's state as props onto any single input component. From that point any changes to my global context's state should trigger getDerivedStateFromProps from a child. Meaning I call setState from some context action function within my child component and the child component re-renders as its props detect a change.

This app has been through many iterations as I work towards improving it's structure and adding new features. Currently it can be deployed to iOS and Android (lightly tested), however I have been also making efforts to create a progressive web app version and see how much of the business logic could be shared. That app is built under the OnsenUI framework and full React and can be found here. https://github.com/ethanx94/WednesdayApp-Onsen-PWA

# Future Goals
I would eventually like this app to contain easter eggs, mini games, and other hidden functionality. I would like to link iOS Game Center and add achievements for any tiny insignificant action for an over the top experience. This project is a way for me to improve my coding abilities so I would like to make it as light hearted an fun as possible. As always I am open to suggestions and eager to accept any help from fellow programmers. Feel free to leave any thoughts in the issues tab.

# Screenshots
![Dude](/docs/01-Dude.png)
![Dude](/docs/02-Collection.png)
![Dude](/docs/03-Eggs.png)
![Dude](/docs/04-Achievements.png)
![Dude](/docs/05-Settings.png)
