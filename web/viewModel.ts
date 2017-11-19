namespace nicoplayer {

	export class ViewModel {

		private playerFactory: nico.NicoPlayerFactory;
		private player: nico.NicoPlayer;
		public videoId = ko.observable("");

		constructor(private readonly element: HTMLElement) {

			window.onNicoPlayerFactoryReady = factory => this.playerFactory = factory;

		}	

		public async createPlayer() {
			const player = await this.playerFactory.create(this.element, this.videoId());			
			return player;
		}

		public isPlaying = ko.observable(false);

		public pause() {
			if (!this.player)
				return;
			this.player.pause();
		}

		public async play() {
			this.player = await this.createPlayer();
			this.player.play();
		}


	}

}

interface Window {
	onNicoPlayerFactoryReady: (callback: nico.NicoPlayerFactory) => void;
}