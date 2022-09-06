import { Request, Response } from 'express';
import busboy from 'busboy';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import createVideo from './video.service';
import { Video } from './video.model';

const MIME_TYPES = ['video/mp4'];

const getPath = ({
  videoId,
  extension,
}: {
  videoId: Video['videoId'];
  extension: Video['extension'];
}) => `${process.cwd()}/videos/${videoId}.${extension}`;

const uploadVideoHandler = async (req: Request, res: Response) => {
  const bb = busboy({ headers: req.headers });
  const { user } = res.locals;
  // eslint-disable-next-line no-underscore-dangle
  const video = await createVideo({ owner: user._id });

  // eslint-disable-next-line consistent-return
  bb.on('file', async (_, file, info) => {
    if (!MIME_TYPES.includes(info.mimeType)) {
      return res
        .status(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
        .send('Unsupported file type');
    }
    const extension = info.mimeType.split('/')[1];
    const filePath = getPath({ videoId: video.videoId, extension });
    video.extension = extension;
    await video.save();
    // eslint-disable-next-line no-undef
    file.pipe(fs.createWriteStream(filePath));
  });

  bb.on('close', () => {
    res.writeHead(StatusCodes.CREATED, {
      Connection: 'close',
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(video));
    res.end();
  });
  return req.pipe(bb);
};

export default uploadVideoHandler;
