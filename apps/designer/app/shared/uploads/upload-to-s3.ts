import * as db from "~/shared/db";

export const uploadToS3 = async ({
  formData,
  projectId,
}: {
  formData: FormData;
  projectId: string;
}) => {
  const imagesInfo = formData.getAll("image") as Array<string>;
  const allInfo = imagesInfo.map(async (image) => {
    const uploadedImage = JSON.parse(image);
    const newAsset = await db.assets.createFromS3(projectId, uploadedImage);
    return newAsset;
  });
  await Promise.all(allInfo);
};
