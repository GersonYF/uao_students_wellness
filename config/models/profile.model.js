const fs = require('fs');
const { promisify } = require('util');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');


module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isUrl: true
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Profile.prototype.generate_random_image = async () => {
    const color = Jimp.rgbaToInt(
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      255
    );
    const image = new Jimp(100, 100, color);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    const filename = `${uuidv4()}.jpg`;
    const path = `uploads/${filename}`;
    await promisify(fs.writeFile)(path, buffer);
    return path;
  };

  return Profile;
};
