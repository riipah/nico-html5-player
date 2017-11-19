
declare namespace vdb {

	interface CreateSongContract {
		artists: ArtistForSong[];
		lyrics?: Lyrics[];
		names: LocalizedString[];
		pvUrls?: string[];
		songType: "Original" | "Cover" | "Remix";
		updateNotes?: string;
		webLinks?: WebLink[];
	}

	type ArtistRole = "Composer" | "Arranger" | "Lyricist" | "Mastering" | "Illustrator" | "Vocalist" | "Animator";

	type Language = "Unspecified" | "Japanese" | "Romaji" | "English";

	interface LocalizedString {
		language: Language;
		value: string;
	}

	interface ArtistForSong {
		artist?: Artist;
		isSupport?: boolean;
		name?: string;
		roles?: string;
	}

	interface Artist {
		id?: number;
		name: string;
	}

	interface Lyrics {
		cultureCode?: string;
		source?: string;
		translationType: TranslationType;
		url?: string;
		value: string;
	}

	type TranslationType = "Original" | "Romanized" | "Translation";

	interface WebLink {
		category: WebLinkCategory;
		description?: string;
		url: string;
	}

	type WebLinkCategory = "Official" | "Commercial" | "Reference" | "Other";

}