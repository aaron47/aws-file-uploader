export class UploadFileDto {
  constructor(
    public readonly imageId: string,
    public readonly userId: string,
  ) {}
}
