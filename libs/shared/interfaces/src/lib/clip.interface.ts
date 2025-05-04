export interface Clip {
    id: number;
    displayText: string | null;
    offensive: boolean;
    clipCreationTime: string;
    fileName: string;
    hasOverlay: boolean;
    hasThumbnail: boolean;
    has720Video: boolean;
    isArchived: boolean;
    thumbnailExt: string;
    sessionId: number | null;
    url: string;
    thumbnail: string;
}
  