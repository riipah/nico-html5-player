namespace nicoplayer {

	export class ViewModel {

		public isInit = ko.observable(false);
		public isLoaded = ko.observable(false);
		public isPlaying = ko.observable(false);
		private playerFactory: nico.NicoPlayerFactory = null;
		private player: nico.NicoPlayer;
		public progress = ko.observable<number>(0);
		public videoId = ko.observable("http://www.nicovideo.jp/watch/sm4124456");
		public error = ko.observable<string>(null);

		constructor(private readonly element: HTMLElement) {
			this.init();
		}	

		public async createPlayer(videoId: string) {
			const player = await this.playerFactory.create(this.element, videoId);			
			return player;
		}

		private getVideoId() {

			// www.nicovideo.jp/watch/sm32280113
			const regex = /(?:http:\/\/)?www.nicovideo.jp\/watch\/(\w+)/g;

			const match = regex.exec(this.videoId());

			if (!match || match.length < 2)
				return null;

			return match[1];

		}

		private async init() {

			window.onNicoPlayerFactoryReady = factory => {
				this.playerFactory = factory;
				this.isInit(true);
			};

			window.addEventListener("message", (e: nico.PlayerEvent) => {
				switch (e.data.eventName) {
					case "playerMetadataChange": {
						if (e.data.data.duration) {
							this.progress(e.data.data.currentTime / e.data.data.duration * 100);							
						}
					}
					break;
					case "playerStatusChange": {
						switch (e.data.data.playerStatus) {
							case nico.PlayerStatus.Pause:
								this.onPause();
								break;
							case nico.PlayerStatus.Play:
								this.onPlay();
								break;
							case nico.PlayerStatus.End:
								this.onEnd();
						}
					}
					break;
					case "error": {
						this.error(e.data.data.message);
					}
				}
			});

			await $.getScript("api.js"); // Originally from https://embed.res.nimg.jp/js/api.js
			
		}

		public async load() {

			const videoId = this.getVideoId();
			this.error(null);

			if (!videoId) {
				this.error("Invalid video");
				return;
			}

			this.element.innerHTML = "";
			this.isPlaying(false);
			this.player = await this.createPlayer(videoId);
			this.isLoaded(true);
			this.play();

		}

		private onEnd = () => {
			this.isPlaying(false);
		}

		private onPlay = () => {
			this.isPlaying(true);
		}

		private onPause = () => {
			this.isPlaying(false);
		}

		public pause() {
			if (this.player)
				this.player.pause();
		}

		public play() {
			if (this.player)
				this.player.play();
		}


	}

}
