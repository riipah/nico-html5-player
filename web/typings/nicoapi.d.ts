declare namespace nico {

	export interface NicoPlayerFactory {
		create(element: HTMLElement, watchId: string): Promise<NicoPlayer>;
	}

	export interface PlayerEvent {
		data: EventData;
	}

	export interface EventData {
		data: EventDataData;
		eventName: EventName;
	}

	type EventName = "playerMetadataChange" | "playerStatusChange";

	export interface EventDataData {
		playerStatus: PlayerStatus;
	}

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