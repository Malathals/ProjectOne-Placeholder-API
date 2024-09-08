import express, { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const router = express.Router();

export const processImage = async (
  imgName: string,
  width: string,
  height: string,
): Promise<Buffer> => {
  if (!/^[a-zA-Z]+$/.test(imgName)) {
    throw new Error(
      'Invalid filename. Filename should only contain letters without any numbers.',
    );
  }
  const imagePath = path.join(__dirname, '../img', `${imgName}.jpg`);

  if (!fs.existsSync(imagePath)) {
    throw new Error('Image not found');
  }

  let img = sharp(imagePath);

  if (width && height) {
    if (isNaN(parseInt(width)) || parseInt(width) <= 0 || width.match(/\D/)) {
      throw new Error(
        'Invalid width. Width must be a positive integer with only numeric values.',
      );
    }
    if (
      isNaN(parseInt(height)) ||
      parseInt(height) <= 0 ||
      height.match(/\D/)
    ) {
      throw new Error(
        'Invalid height. Height must be a positive integer with only numeric values.',
      );
    }

    const intWidth = convertWidthAndHeight(width);
    const intHeight = convertWidthAndHeight(height);

    img = img.resize(intWidth, intHeight);
  }

  return await img.toBuffer();
};

export const convertWidthAndHeight = (widthOrHeight: string): number => {
  return parseInt(widthOrHeight);
};

router.get('/images', async (req: Request, res: Response) => {
  const imgName = req.query.imgName as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  if (!imgName) {
    return res.status(400).send('Image name is required');
  }

  try {
    const imgInMemory = await processImage(imgName, width, height);
    res.status(200).type('image/jpeg').send(imgInMemory);
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error during image processing', err.message);
      if (err.message === 'Image not found') {
        return res.status(404).send('Image not found');
      } else if (err.message === 'Invalid width or height') {
        return res.status(400).send('Width and height not valid');
      }
    } else {
      console.log('Unknown error during image processing', err);
    }
    res.status(500).send('Server error');
  }
});

export default router;
