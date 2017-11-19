declare namespace nico {

	export interface NicoPlayerFactory {
		create(element: HTMLElement, watchId: string): Promise<NicoPlayer>;
	}

	export interface NicoPlayer {
		play(): void;
		pause(): void;
	}

	export enum PlayerStatus {
		Play = 2,
		Pause = 3,
		End = 4
	}

}