# image2webp

一个简单的 JavaScript 插件，用于将 JPG、PNG 等图片格式转换为 WebP 格式。支持文件上传和 URL 转换两种方式。

## 特性

- 支持多种图片格式转换为 WebP
- 支持文件上传和 URL 两种转换方式
- 可配置输出图片质量和最大尺寸
- 纯浏览器端转换，无需服务器
- 轻量级，无依赖

## 安装

### NPM 安装

```bash
npm install image2webp
```

### CDN 直接引用

```html
<script src="dist/image2webp.min.js"></script>
```

### Vue 项目中使用

#### Vue 3 组件示例

```vue
<template>
  <div>
    <input type="file" @change="handleFileChange" accept="image/*">
    <div v-if="previewUrl">
      <h3>转换结果：</h3>
      <img :src="previewUrl" alt="预览">
      <button @click="downloadWebP">下载WebP</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ImageToWebP from 'image2webp'

const previewUrl = ref('')
const converter = new ImageToWebP({ quality: 0.8 })

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const webpBlob = await converter.convertFileToWebP(file)
    previewUrl.value = URL.createObjectURL(webpBlob)
  } catch (error) {
    console.error('转换失败：', error)
  }
}

const downloadWebP = () => {
  if (previewUrl.value) {
    const a = document.createElement('a')
    a.href = previewUrl.value
    a.download = 'converted.webp'
    a.click()
  }
}
</script>
```

#### Vue 2 组件示例

```vue
<template>
  <div>
    <input type="file" @change="handleFileChange" accept="image/*">
    <div v-if="previewUrl">
      <h3>转换结果：</h3>
      <img :src="previewUrl" alt="预览">
      <button @click="downloadWebP">下载WebP</button>
    </div>
  </div>
</template>

<script>
import ImageToWebP from 'image2webp'

export default {
  name: 'ImageConverter',
  data() {
    return {
      previewUrl: '',
      converter: new ImageToWebP({ quality: 0.8 })
    }
  },
  methods: {
    async handleFileChange(event) {
      const file = event.target.files[0]
      if (!file) return

      try {
        const webpBlob = await this.converter.convertFileToWebP(file)
        this.previewUrl = URL.createObjectURL(webpBlob)
      } catch (error) {
        console.error('转换失败：', error)
      }
    },
    downloadWebP() {
      if (this.previewUrl) {
        const a = document.createElement('a')
        a.href = this.previewUrl
        a.download = 'converted.webp'
        a.click()
      }
    }
  }
}
</script>
```

### React 项目中使用

#### 函数组件示例

```jsx
import React, { useState, useCallback } from 'react';
import ImageToWebP from 'image2webp';

const ImageConverter = () => {
  const [previewUrl, setPreviewUrl] = useState('');
  const converter = new ImageToWebP({ quality: 0.8 });

  const handleFileChange = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const webpBlob = await converter.convertFileToWebP(file);
      setPreviewUrl(URL.createObjectURL(webpBlob));
    } catch (error) {
      console.error('转换失败：', error);
    }
  }, []);

  const downloadWebP = useCallback(() => {
    if (previewUrl) {
      const a = document.createElement('a');
      a.href = previewUrl;
      a.download = 'converted.webp';
      a.click();
    }
  }, [previewUrl]);

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept="image/*" 
      />
      {previewUrl && (
        <div>
          <h3>转换结果：</h3>
          <img src={previewUrl} alt="预览" />
          <button onClick={downloadWebP}>下载WebP</button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
```

#### Class 组件示例

```jsx
import React, { Component } from 'react';
import ImageToWebP from 'image2webp';

class ImageConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewUrl: ''
    };
    this.converter = new ImageToWebP({ quality: 0.8 });
  }

  handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const webpBlob = await this.converter.convertFileToWebP(file);
      this.setState({
        previewUrl: URL.createObjectURL(webpBlob)
      });
    } catch (error) {
      console.error('转换失败：', error);
    }
  };

  downloadWebP = () => {
    const { previewUrl } = this.state;
    if (previewUrl) {
      const a = document.createElement('a');
      a.href = previewUrl;
      a.download = 'converted.webp';
      a.click();
    }
  };

  render() {
    const { previewUrl } = this.state;

    return (
      <div>
        <input 
          type="file" 
          onChange={this.handleFileChange} 
          accept="image/*" 
        />
        {previewUrl && (
          <div>
            <h3>转换结果：</h3>
            <img src={previewUrl} alt="预览" />
            <button onClick={this.downloadWebP}>下载WebP</button>
          </div>
        )}
      </div>
    );
  }
}

export default ImageConverter;
```

## 使用方法

### 基础使用

```javascript
// 创建转换器实例
const converter = new ImageToWebP({
    quality: 0.8,          // 输出图片质量 0-1
    maxWidth: 1920,        // 最大宽度（可选）
    maxHeight: 1080        // 最大高度（可选）
});

// 转换文件（例如：从 input 元素获取）
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    try {
        const webpBlob = await converter.convertFileToWebP(file);
        // 使用转换后的 webpBlob
        const url = URL.createObjectURL(webpBlob);
        // 例如：显示图片
        image.src = url;
        // 或者：下载图片
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.webp';
        a.click();
    } catch (error) {
        console.error('转换失败：', error);
    }
});

// 转换 URL
const imageUrl = 'https://example.com/image.jpg';
try {
    const webpBlob = await converter.convertURLToWebP(imageUrl);
    // 使用转换后的 webpBlob
} catch (error) {
    console.error('转换失败：', error);
}
```

### 配置选项

创建转换器实例时可以传入以下配置选项：

```javascript
const converter = new ImageToWebP({
    quality: 0.8,     // 输出图片质量，范围 0-1，默认 0.8
    maxWidth: 1920,   // 输出图片的最大宽度，可选
    maxHeight: 1080   // 输出图片的最大高度，可选
});
```

### API 说明

#### convertFileToWebP(file)
转换 File 对象为 WebP 格式。

- 参数：
  - file: File 对象，从 input[type="file"] 或拖拽事件中获取
- 返回：Promise<Blob>，解析为 WebP 格式的 Blob 对��

#### convertURLToWebP(url)
转换图片 URL 为 WebP 格式。

- 参数：
  - url: string，图片的 URL 地址
- 返回：Promise<Blob>，解析为 WebP 格式的 Blob 对象

### 完整示例

```html
<!DOCTYPE html>
<html>
<head>
    <title>Image to WebP Demo</title>
</head>
<body>
    <input type="file" id="fileInput" accept="image/*">
    <button onclick="convertImage()">转换为WebP</button>
    <div id="preview"></div>

    <script src="dist/image2webp.min.js"></script>
    <script>
        async function convertImage() {
            const converter = new ImageToWebP({ quality: 0.8 });
            const file = document.getElementById('fileInput').files[0];
            
            try {
                const webpBlob = await converter.convertFileToWebP(file);
                const url = URL.createObjectURL(webpBlob);
                
                // 显示转换后的图片
                document.getElementById('preview').innerHTML = `
                    <img src="${url}">
                    <br>
                    <a href="${url}" download="converted.webp">下载WebP图片</a>
                `;
            } catch (error) {
                alert('转换失败：' + error.message);
            }
        }
    </script>
</body>
</html>
```

## 注意事项

1. 确��浏览器支持 WebP 格式
2. 使用 URL 转换时，需要注意跨域问题，确保图片允许跨域访问
3. 大尺寸图片转换可能需要较长时间，建议添加加载提示
4. 如果设置了 maxWidth 或 maxHeight，图片会等比缩放

## 浏览器兼容性

- Chrome 23+
- Firefox 65+
- Edge 18+
- Safari 14+
- Opera 12.1+

## License

MIT



