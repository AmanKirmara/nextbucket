import pkg from 'node-disk-info';
const { getDiskInfoSync } = pkg;

import path from 'path';
import { promises as fs } from 'fs';

// Function to calculate directory size
export async function getDirectorySize(dirPath) {
  let totalSize = 0;

  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileStat = await fs.stat(filePath);

      if (fileStat.isDirectory()) {
        totalSize += await getDirectorySize(filePath); // Recursive call for directories
      } else {
        totalSize += fileStat.size; // Add file size
      }
    }
  } catch (err) {
    console.error(`Error calculating directory size: ${err.message}`);
    throw err;
  }

  return totalSize;
}

// Function to get disk usage
export async function getDiskUsage() {
  try {
    const diskInfo = getDiskInfoSync(); // Synchronous call to get disk info
    const total = diskInfo[0].total / (1024 ** 3); // Convert bytes to GB
    const free = diskInfo[0].available / (1024 ** 3); // Convert bytes to GB

    return {
      total: total.toFixed(2), // Format to 2 decimal places
      free: free.toFixed(2), // Format to 2 decimal places
    };
  } catch (err) {
    console.error(`Error retrieving disk usage information: ${err.message}`);
    throw err;
  }
}
