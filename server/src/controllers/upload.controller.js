"use strict";

const { BadRequestError } = require("../core/error.response");
const { CREATED, OK } = require("../core/success.response");
const path = require('path');
const fs = require('fs');
class UploadController {
    static async uploadFile(req, res) {
        new CREATED({
            message: 'File uploaded successfully',
            data: {
                filePath: `/uploads/${req.file.filename}`,
                fileName: req.file.filename
            }
        }).send(res)
    }
    static async deleteFile(req, res) {
        const { filename } = req.params;
        const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
        const filePath = path.join(uploadsPath, filename);
        if (!fs.existsSync(filePath)) {
            return new OK({
                message: 'File not found',
                data: {
                    filePath: `/uploads/${filename}`,
                    fileName: filename
                }
            }).send(res);
        }
        try {
            await fs.promises.unlink(filePath);
            return new OK({
                message: 'File deleted successfully',
                data: {
                    filePath: `/uploads/${filename}`,
                    fileName: filename
                }
            }).send(res);
        } catch (error) {
            throw new BadRequestError('Failed to delete file');
        }

    }
}
module.exports = UploadController