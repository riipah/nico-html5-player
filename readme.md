# Demo for Nico Nico Douga HTML5 player with controls

[Demo site here](https://vocaloid.eu/vocaloid/nico-player/).

## Overview

Nico Nico Douga (NND) is a video streaming service. Recently NND added a new HTML5-based embeddable player. The player comes with a JavaScript API library. I couldn't find English documentation for the player, so I made a demo site that shows how it's used.

## Features
* Dynamic loading of player
* Controls: play, pause
* Progress reporting

## Notes

The JavaScript API is available at https://embed.res.nimg.jp/js/api.js.
After the API is loaded, global callback method ```onNicoPlayerFactoryReady``` is called and the player factory is provided as parameter.

```
window.onNicoPlayerFactoryReady = factory => {
    this.playerFactory = factory; // Save player factory
};
```            

After this, the player can be initialized by calling ```create``` method on the player factory.
Container element and video ID are provided as parameters. The method returns a promise which contains
the actual player object.

```
const player = await this.playerFactory.create(this.element, videoId);
```

Video playback is started by calling ```play``` method on the player object.
Player status is observed by listening to global events of type "message".
			
```
window.addEventListener("message", (e: nico.PlayerEvent) => {
	switch (e.data.eventName) {
		case "playerMetadataChange": {
			...
```