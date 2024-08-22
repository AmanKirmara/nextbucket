import path from 'path';
import { fileURLToPath } from 'url';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getDirectorySize, getDiskUsage } from '../utils/storageUtils.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const systemStorage = asyncHandler(async (req, res) => {
    const userId = "a69sd95fg5s93ba67342057sd64f5fe1";

    try {
        const uploadsDir = path.join(__dirname, `../../public/uploads/${userId}`);
        console.log(`Uploads directory path: ${uploadsDir}`);

        const dirSize = await getDirectorySize(uploadsDir);
        const { total, free } = await getDiskUsage();
        
        console.log(`Total size of files in directory: ${dirSize / (1024 * 1024)} MB`);
        console.log(`Total disk space: ${total} GB`);
        console.log(`Free disk space: ${free} GB`);

        return res.status(200).json(
            new ApiResponse(
                200,
                { dirSize: `${(dirSize / (1024 * 1024)).toFixed(2)} MB`, totalDiskSpace: `${total} GB`, freeDiskSpace: `${free} GB` },
                'System storage information retrieved successfully',
            )
        );
    } catch (err) {
        console.error(`Error retrieving system storage information: ${err.message}`);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                'Error retrieving system storage information',
            )
        );
    }
});

export { systemStorage };
