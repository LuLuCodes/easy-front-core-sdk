export class MediaId {
  private media_id: string

  constructor(mediaId: string) {
    this.media_id = mediaId
  }

  public set mediaId(mediaId: string) {
    this.media_id = mediaId
  }

  public get mediaId(): string {
    return this.media_id
  }
}
