#  WednesdayApp
This is a basic app written in React Native which fetches frog images from Facebook's Graph API from a popular meme page.

# Setup
This app requires a Facebook Graph API app token to be placed in a .env file. Since this page is publicly accessible you can generate your own here: 

https://developers.facebook.com/docs/apps/register/

After following the instructions for "Create new Facebook App" define a .env file with two variables, APPID and APPSECRET.

Since I am not an administrator for this page I can not guarantee the contents of what images may be fetched. This project exists more or less a testing ground to try out new React methods and stay current in React's ever-changing ecosystem.

# Structure
In this app I manage state using React 16's new context API. From the top level I maintain a global context and wrap each component which might need shared state from siblings using a higher order component (contextWrap). The contextWrap HOC works to provide a context prop onto any single input component. From that point any changes to my global context's state should trigger componentWillRecieveProps (soon to be deprecated) at which point I call setState within the child component causing a re-render.

This app has been through many iterations as I work towards improving it's structure and adding new features. Currently it can be deployed to iOS and Android (lightly tested), however I have been also making efforts to create a progressive web app version and see how much of the business logic could be shared.

# Future Goals
I would eventually like this app to contain easter eggs, mini games, and other hidden functionality. I would like to link iOS Game Center and add achievements for any tiny insignificant action for an over the top experience. This project is a way for me to improve my coding abilities so I would like to make it as light hearted an fun as possible. As always I am open to suggestions and eager to accept any help from fellow programmers. Feel free to leave any thoughts in the issues tab.
