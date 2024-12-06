class ImageToWebP {
  constructor(options = {}) {
    this.quality = options.quality || 0.8;
    this.maxWidth = options.maxWidth || null;
    this.maxHeight = options.maxHeight || null;
  }

  /**
   * 将图片文件转换为 WebP
   * @param {File} file - 图片文件
   * @returns {Promise<Blob>} WebP格式的Blob对象
   */
  async convertFileToWebP(file) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Only images are supported.');
    }

    const image = await this._createImage(file);
    return this._convertImageToWebP(image);
  }

  /**
   * 将图片 URL 转换为 WebP
   * @param {string} url - 图片URL
   * @returns {Promise<Blob>} WebP格式的Blob对象
   */
  async convertURLToWebP(url) {
    const image = await this._loadImage(url);
    return this._convertImageToWebP(image);
  }

  /**
   * 创建 Image 对象
   * @private
   */
  _createImage(file) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = URL.createObjectURL(file);
    });
  }

  /**
   * 加载图片
   * @private
   */
  _loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }

  /**
   * 将 Image 对象转换为 WebP
   * @private
   */
  _convertImageToWebP(image) {
    const canvas = document.createElement('canvas');
    let width = image.width;
    let height = image.height;

    // 处理最大尺寸限制
    if (this.maxWidth && width > this.maxWidth) {
      height = (this.maxWidth / width) * height;
      width = this.maxWidth;
    }
    if (this.maxHeight && height > this.maxHeight) {
      width = (this.maxHeight / height) * width;
      height = this.maxHeight;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        'image/webp',
        this.quality
      );
    });
  }
}

export default ImageToWebP; 