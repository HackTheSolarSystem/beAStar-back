## Be A Star (Backend)

### Addressing the  [Mixed Reality Solar System Challenge](https://github.com/amnh/HackTheSolarSystem/wiki/A-Mixed-Reality-Solar-System)

### Created by the All-Stars
- Vivien Ngo / [@vivngo](@vivngo)
- Peggy Li / [@peggyxli](@peggyxli)
- Anna Leonenko / [@meinou](@meinou)
- Cameron Yick / [@hydrosquall](www.github.com/@hydrosquall)

### Solution Description

This is a cross-platform mobile AR app built on [ViroReact](https://docs.viromedia.com), which can target Android or Apple (iOS) phones. In this AR game, users play as stars that try to grow large enough to steal other players' planets! The game aims to teach players about two main topics from the high school science standards, namely intuitions about gravity, and facts about the lifecycle of a star as it ages and grows.

The frontend counterpart to this repo can be found [here](https://github.com/HackTheSolarSystem/beAStar-front), and that also has context 

### Installation Instructions

You need to set up a `mongodb` instance, which is an unstructured database for your data to live in. Once that is done, update the `url` variable in `index.js` with where your instance is running

```bash
   npm install
   npm start
   # Your app will now be running on localhost port 3000 
```

Now, you need to share your server with a public URL so that the t. We recommend using a tool like `ngrok` to expose port 3000.

```bash
brew cask install ngrok # on Mac
ngrok http 3000
```
