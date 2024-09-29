import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (
  filePath: string,
  fileName: string
): Promise<string> => {
  // Read the file from the local filesystem
  const fileContent = fs.readFileSync(filePath);

  // Set the S3 upload parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `${uuidv4()}-${fileName}`,
    Body: fileContent,
    ContentType: "image/jpeg",
  };

  // Create a command to upload the file to S3
  const command = new PutObjectCommand(params);

  // Upload the file
  const uploadResult = await s3.send(command);

  // Return the public URL of the uploaded file (if the bucket is public)
  return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
};
