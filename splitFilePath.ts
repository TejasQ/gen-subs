export function splitFilePath(filePath: string) {
  // Extract the base name (the last part of the path)
  const baseName = filePath.split("/").pop();

  if (!baseName) throw new Error("Invalid file path");

  // Handling cases where there is no extension or the file is hidden
  if (baseName === "" || baseName.startsWith(".") || !baseName.includes(".")) {
    return {
      pathWithoutExtension: filePath,
      extension: "",
      fileName: baseName,
    };
  }

  // Finding the last dot to separate the extension
  const lastDotIndex = baseName.lastIndexOf(".");

  // Extracting the path without extension and the extension
  const pathWithoutExtension =
    filePath.substring(0, filePath.lastIndexOf(".")) ||
    baseName.substring(0, lastDotIndex);
  const extension = baseName.substring(lastDotIndex);

  // Extracting just the file name without the extension
  const fileName = baseName.substring(0, lastDotIndex);

  return { pathWithoutExtension, extension, fileName };
}
