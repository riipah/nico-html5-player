declare namespace nico {

	export interface NicoPlayerFactory {
		create(element: HTMLElement, watchId: string): Promise<NicoPlayer>;
	}

	export interface PlayerEvent {
		data: EventData;
	}

	export interface StatusEvent {
		eventName: "playerStatusChange";
		data: {
			playerStatus: PlayerStatus;
		};
	}

	export interface MetadataEvent {
		eventName: "playerMetadataChange";
		data: {
			currentTime: number;
			duration: number;
		};	
	}

	type EventData = StatusEvent | MetadataEvent;

	export interface NicoPlayer {
		play(): void;
		pause(): void;
	}

	export const enum PlayerStatus {
		Play = 2,
		Pause = 3,
		End = 4
	}

}