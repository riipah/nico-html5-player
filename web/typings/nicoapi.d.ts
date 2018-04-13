declare namespace nico {

	/** Player factory */
	export interface NicoPlayerFactory {
		/**
		 * Create a player.
		 * @param element - Container HTML element.
		 * @param watchId - Video being loaded, for example "sm1234567".
		 * @return Promise containing the player object.
		 */
		create(element: HTMLElement, watchId: string): Promise<NicoPlayer>;
	}

	export interface PlayerEvent {
		data: EventData;
	}

	/** Player status has changed, for example playback has started or ended. */
	export interface StatusEvent {
		eventName: "playerStatusChange";
		data: {
			playerStatus: PlayerStatus;
		};
	}

	/** Playback metadata has changed. This includes current position and total duration. */
	export interface MetadataEvent {
		eventName: "playerMetadataChange";
		data: {
			/** Current position in milliseconds */
			currentTime: number;
			/** Total video duration in milliseconds */
			duration: number;
		};	
	}

	export interface LoadCompleteEvent {
		eventName: "loadComplete",
		data: {
			videoInfo: {
				watchId: string
			}
		}
	}

	/** Playback error has occurred. */
	export interface ErrorEvent {
		eventName: "error";
		data: {
			message: string;
		};
	}

	type EventData = StatusEvent | MetadataEvent | LoadCompleteEvent | ErrorEvent;

	/** Nico Nico player object */
	export interface NicoPlayer {
		/** Start playing current video */
		play(): void;
		/** Pause playback */
		pause(): void;
	}

	export const enum PlayerStatus {
		Play = 2,
		Pause = 3,
		End = 4
	}

}

interface Window {
	onNicoPlayerFactoryReady: (callback: nico.NicoPlayerFactory) => void;
}