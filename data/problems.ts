import { Problem, ProjectMode } from '@/types';

const SVG_HEADPHONES = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f0f0f0"/>
  <ellipse cx="100" cy="60" rx="70" ry="25" fill="none" stroke="#333" stroke-width="8"/>
  <ellipse cx="40" cy="100" rx="25" ry="35" fill="#666" stroke="#333" stroke-width="3"/>
  <ellipse cx="160" cy="100" rx="25" ry="35" fill="#666" stroke="#333" stroke-width="3"/>
  <circle cx="100" cy="100" r="5" fill="#333"/>
</svg>`);

const SVG_WATCH = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f0f0f0"/>
  <circle cx="100" cy="100" r="70" fill="#333" stroke="#666" stroke-width="5"/>
  <circle cx="100" cy="100" r="60" fill="#fff"/>
  <line x1="100" y1="100" x2="100" y2="55" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="100" y1="100" x2="135" y2="100" stroke="#666" stroke-width="3" stroke-linecap="round"/>
  <circle cx="100" cy="100" r="5" fill="#333"/>
</svg>`);

const SVG_POWERBANK = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f0f0f0"/>
  <rect x="50" y="40" width="100" height="120" rx="10" fill="#444" stroke="#333" stroke-width="3"/>
  <rect x="85" y="30" width="30" height="15" rx="3" fill="#666"/>
  <rect x="65" y="60" width="70" height="20" rx="3" fill="#4CAF50"/>
  <rect x="65" y="90" width="70" height="20" rx="3" fill="#4CAF50"/>
  <rect x="65" y="120" width="70" height="20" rx="3" fill="#888"/>
</svg>`);

const SVG_KEYBOARD = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f0f0f0"/>
  <rect x="20" y="60" width="160" height="80" rx="5" fill="#333"/>
  <g fill="#fff" stroke="#555" stroke-width="1">
    <rect x="30" y="70" width="15" height="15" rx="2"/>
    <rect x="50" y="70" width="15" height="15" rx="2"/>
    <rect x="70" y="70" width="15" height="15" rx="2"/>
    <rect x="90" y="70" width="15" height="15" rx="2"/>
    <rect x="110" y="70" width="15" height="15" rx="2"/>
    <rect x="130" y="70" width="15" height="15" rx="2"/>
    <rect x="150" y="70" width="15" height="15" rx="2"/>
    <rect x="30" y="90" width="15" height="15" rx="2"/>
    <rect x="50" y="90" width="15" height="15" rx="2"/>
    <rect x="70" y="90" width="15" height="15" rx="2"/>
    <rect x="90" y="90" width="15" height="15" rx="2"/>
    <rect x="110" y="90" width="15" height="15" rx="2"/>
    <rect x="130" y="90" width="15" height="15" rx="2"/>
    <rect x="150" y="90" width="15" height="15" rx="2"/>
    <rect x="30" y="110" width="50" height="15" rx="2"/>
    <rect x="85" y="110" width="30" height="15" rx="2"/>
    <rect x="120" y="110" width="50" height="15" rx="2"/>
  </g>
</svg>`);

const SVG_MOUSE = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f0f0f0"/>
  <ellipse cx="100" cy="120" rx="40" ry="50" fill="#333"/>
  <path d="M60 120 Q100 50 140 120" fill="none" stroke="#333" stroke-width="8"/>
  <line x1="100" y1="60" x2="100" y2="100" stroke="#666" stroke-width="3"/>
</svg>`);

const SVG_SUN = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#87CEEB"/>
  <circle cx="100" cy="100" r="50" fill="#FFD700"/>
  <g stroke="#FFD700" stroke-width="6">
    <line x1="100" y1="20" x2="100" y2="40"/>
    <line x1="100" y1="160" x2="100" y2="180"/>
    <line x1="20" y1="100" x2="40" y2="100"/>
    <line x1="160" y1="100" x2="180" y2="100"/>
  </g>
</svg>`);

const SVG_CLOUD = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#87CEEB"/>
  <ellipse cx="100" cy="110" rx="60" ry="40" fill="#fff"/>
  <circle cx="60" cy="110" r="35" fill="#fff"/>
  <circle cx="140" cy="110" r="35" fill="#fff"/>
  <circle cx="80" cy="85" r="30" fill="#fff"/>
  <circle cx="120" cy="85" r="30" fill="#fff"/>
</svg>`);

const SVG_RAIN = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#607D8B"/>
  <ellipse cx="100" cy="70" rx="60" ry="40" fill="#555"/>
  <circle cx="60" cy="70" r="35" fill="#555"/>
  <circle cx="140" cy="70" r="35" fill="#555"/>
  <g stroke="#4FC3F7" stroke-width="3">
    <line x1="60" y1="120" x2="55" y2="150"/>
    <line x1="90" y1="130" x2="85" y2="160"/>
    <line x1="120" y1="120" x2="115" y2="150"/>
  </g>
</svg>`);

const SVG_AVATAR1 = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e3f2fd"/>
  <circle cx="100" cy="100" r="80" fill="#ffcc80"/>
  <circle cx="100" cy="70" r="45" fill="#ffcc80"/>
  <circle cx="80" cy="65" r="8" fill="#333"/>
  <circle cx="120" cy="65" r="8" fill="#333"/>
  <path d="M85 90 Q100 105 115 90" fill="none" stroke="#333" stroke-width="3"/>
  <ellipse cx="100" cy="130" rx="35" ry="40" fill="#2196F3"/>
</svg>`);

const SVG_AVATAR2 = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#fce4ec"/>
  <circle cx="100" cy="100" r="80" fill="#d7ccc8"/>
  <circle cx="100" cy="70" r="45" fill="#d7ccc8"/>
  <ellipse cx="100" cy="35" rx="40" ry="20" fill="#5d4037"/>
  <circle cx="80" cy="65" r="8" fill="#333"/>
  <circle cx="120" cy="65" r="8" fill="#333"/>
  <path d="M85 95 Q100 100 115 95" fill="none" stroke="#333" stroke-width="3"/>
  <ellipse cx="100" cy="130" rx="35" ry="40" fill="#E91E63"/>
</svg>`);

const SVG_AVATAR3 = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e8f5e9"/>
  <circle cx="100" cy="100" r="80" fill="#bcaaa4"/>
  <circle cx="100" cy="70" r="45" fill="#bcaaa4"/>
  <circle cx="100" cy="40" r="35" fill="#333"/>
  <circle cx="80" cy="65" r="8" fill="#333"/>
  <circle cx="120" cy="65" r="8" fill="#333"/>
  <ellipse cx="100" cy="130" rx="35" ry="40" fill="#4CAF50"/>
</svg>`);

const SVG_CHECK = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e8f5e9"/>
  <circle cx="100" cy="100" r="70" fill="#4CAF50"/>
  <path d="M60 100 L85 125 L140 70" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);

const SVG_ERROR = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#ffebee"/>
  <circle cx="100" cy="100" r="70" fill="#f44336"/>
  <line x1="60" y1="60" x2="140" y2="140" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
  <line x1="140" y1="60" x2="60" y2="140" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
</svg>`);

const SVG_EMAIL = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e3f2fd"/>
  <rect x="30" y="60" width="140" height="100" rx="5" fill="#fff" stroke="#2196F3" stroke-width="3"/>
  <path d="M30 60 L100 110 L170 60" fill="none" stroke="#2196F3" stroke-width="3"/>
  <line x1="30" y1="160" x2="100" y2="110" stroke="#2196F3" stroke-width="3"/>
  <line x1="170" y1="160" x2="100" y2="110" stroke="#2196F3" stroke-width="3"/>
</svg>`);

const SVG_TASK = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#fff9c4"/>
  <rect x="40" y="70" width="120" height="50" rx="8" fill="#fff" stroke="#FFC107" stroke-width="3"/>
  <circle cx="65" cy="95" r="12" fill="none" stroke="#FFC107" stroke-width="3"/>
  <line x1="85" y1="90" x2="140" y2="90" stroke="#333" stroke-width="2"/>
  <line x1="85" y1="102" x2="130" y2="102" stroke="#999" stroke-width="2"/>
</svg>`);

const SVG_DELETE = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#ffebee"/>
  <circle cx="100" cy="100" r="60" fill="#ff6b6b"/>
  <rect x="80" y="75" width="40" height="10" rx="3" fill="#fff"/>
  <rect x="88" y="85" width="24" height="45" rx="3" fill="#fff"/>
  <rect x="92" y="105" width="16" height="25" rx="2" fill="#ff6b6b"/>
</svg>`);

const SVG_EDIT = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e8eaf6"/>
  <path d="M130 60 L150 80 L90 140 L70 120 Z" fill="#3F51B5"/>
  <path d="M145 55 L155 65 L135 85 L125 75 Z" fill="#7986CB"/>
  <path d="M68 122 L58 148 L84 138 Z" fill="#3F51B5"/>
</svg>`);

const SVG_SETTINGS = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#eceff1"/>
  <circle cx="100" cy="100" r="35" fill="#607D8B"/>
  <circle cx="100" cy="100" r="15" fill="#fff"/>
  <g fill="#607D8B">
    <rect x="93" y="35" width="14" height="20" rx="3"/>
    <rect x="93" y="145" width="14" height="20" rx="3"/>
    <rect x="35" y="93" width="20" height="14" rx="3"/>
    <rect x="145" y="93" width="20" height="14" rx="3"/>
  </g>
</svg>`);

const SVG_CALCULATOR = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f5f5f5"/>
  <rect x="30" y="20" width="140" height="160" rx="15" fill="#333"/>
  <rect x="45" y="35" width="110" height="35" rx="5" fill="#a5d6a7"/>
  <text x="140" y="62" font-size="28" font-family="Arial" fill="#333" text-anchor="end">123</text>
  <g>
    <rect x="45" y="85" width="22" height="22" rx="4" fill="#666"/>
    <rect x="73" y="85" width="22" height="22" rx="4" fill="#666"/>
    <rect x="101" y="85" width="22" height="22" rx="4" fill="#666"/>
    <rect x="129" y="85" width="26" height="22" rx="4" fill="#ff9800"/>
    <rect x="45" y="113" width="22" height="22" rx="4" fill="#666"/>
    <rect x="73" y="113" width="22" height="22" rx="4" fill="#666"/>
    <rect x="101" y="113" width="22" height="22" rx="4" fill="#666"/>
    <rect x="129" y="113" width="26" height="22" rx="4" fill="#ff9800"/>
    <rect x="45" y="141" width="50" height="22" rx="4" fill="#666"/>
    <rect x="101" y="141" width="22" height="22" rx="4" fill="#666"/>
    <rect x="129" y="141" width="26" height="22" rx="4" fill="#4CAF50"/>
  </g>
</svg>`);

const SVG_NUMBER = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e1f5fe"/>
  <text x="100" y="130" font-size="120" font-family="Arial, sans-serif" font-weight="bold" fill="#0277BD" text-anchor="middle">7</text>
</svg>`);

const SVG_OPERATOR = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#fff3e0"/>
  <text x="50" y="70" font-size="48" font-family="Arial" font-weight="bold" fill="#E65100" text-anchor="middle">+</text>
  <text x="150" y="70" font-size="48" font-family="Arial" font-weight="bold" fill="#E65100" text-anchor="middle">-</text>
  <text x="50" y="150" font-size="48" font-family="Arial" font-weight="bold" fill="#E65100" text-anchor="middle">*</text>
  <text x="150" y="150" font-size="48" font-family="Arial" font-weight="bold" fill="#E65100" text-anchor="middle">/</text>
</svg>`);

const SVG_INPUT = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#fafafa"/>
  <rect x="30" y="80" width="140" height="40" rx="5" fill="#fff" stroke="#ccc" stroke-width="2"/>
  <text x="45" y="107" font-size="18" fill="#999" font-family="Arial">Input...</text>
  <line x1="170" y1="90" x2="170" y2="110" stroke="#999" stroke-width="2"/>
</svg>`);

const SVG_PASSWORD = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#fafafa"/>
  <rect x="30" y="80" width="140" height="40" rx="5" fill="#fff" stroke="#ccc" stroke-width="2"/>
  <g fill="#333">
    <circle cx="55" cy="100" r="5"/>
    <circle cx="75" cy="100" r="5"/>
    <circle cx="95" cy="100" r="5"/>
    <circle cx="115" cy="100" r="5"/>
    <circle cx="135" cy="100" r="5"/>
  </g>
  <circle cx="165" cy="100" r="8" fill="none" stroke="#999" stroke-width="2"/>
</svg>`);

const SVG_CART = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#fce4ec"/>
  <path d="M50 60 L65 120 L155 120 L170 70 L60 70 Z" fill="#E91E63" stroke="#C2185B" stroke-width="3"/>
  <circle cx="80" cy="140" r="12" fill="#333"/>
  <circle cx="140" cy="140" r="12" fill="#333"/>
  <line x1="40" y1="70" x2="60" y2="70" stroke="#333" stroke-width="4"/>
  <circle cx="145" cy="55" r="15" fill="#f44336"/>
  <text x="145" y="62" font-size="16" fill="#fff" font-weight="bold" text-anchor="middle">3</text>
</svg>`);

const SVG_PRODUCT = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#f3e5f5"/>
  <rect x="50" y="50" width="100" height="100" rx="10" fill="#fff" stroke="#9C27B0" stroke-width="3"/>
  <circle cx="100" cy="90" r="25" fill="#E1BEE7"/>
  <text x="100" y="140" font-size="16" fill="#9C27B0" text-anchor="middle" font-family="Arial">Product</text>
  <rect x="60" y="160" width="80" height="25" rx="5" fill="#9C27B0"/>
  <text x="100" y="178" font-size="14" fill="#fff" text-anchor="middle" font-family="Arial">$99</text>
</svg>`);

const SVG_COUPON = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#fff8e1"/>
  <rect x="30" y="60" width="140" height="80" rx="5" fill="#FF9800" stroke="#F57C00" stroke-width="2" stroke-dasharray="5,3"/>
  <circle cx="30" cy="100" r="12" fill="#fff8e1"/>
  <circle cx="170" cy="100" r="12" fill="#fff8e1"/>
  <text x="100" y="95" font-size="32" fill="#fff" font-weight="bold" text-anchor="middle" font-family="Arial">$50</text>
  <text x="100" y="120" font-size="12" fill="#fff" text-anchor="middle" font-family="Arial">Coupon</text>
</svg>`);

const SVG_STATE_TREE = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e0f2f1"/>
  <rect x="75" y="20" width="50" height="30" rx="5" fill="#009688"/>
  <text x="100" y="42" font-size="12" fill="#fff" text-anchor="middle">Store</text>
  <line x1="100" y1="50" x2="50" y2="90" stroke="#009688" stroke-width="2"/>
  <line x1="100" y1="50" x2="150" y2="90" stroke="#009688" stroke-width="2"/>
  <rect x="25" y="90" width="50" height="30" rx="5" fill="#4DB6AC"/>
  <text x="50" y="112" font-size="11" fill="#fff" text-anchor="middle">State A</text>
  <rect x="125" y="90" width="50" height="30" rx="5" fill="#4DB6AC"/>
  <text x="150" y="112" font-size="11" fill="#fff" text-anchor="middle">State B</text>
  <line x1="50" y1="120" x2="50" y2="150" stroke="#4DB6AC" stroke-width="2"/>
  <line x1="150" y1="120" x2="150" y2="150" stroke="#4DB6AC" stroke-width="2"/>
  <rect x="25" y="150" width="50" height="30" rx="5" fill="#80CBC4"/>
  <text x="50" y="172" font-size="10" fill="#fff" text-anchor="middle">Data</text>
  <rect x="125" y="150" width="50" height="30" rx="5" fill="#80CBC4"/>
  <text x="150" y="172" font-size="10" fill="#fff" text-anchor="middle">UI</text>
</svg>`);

const SVG_DATA_FLOW = 'data:image/svg+xml;base64,' + btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#e8eaf6"/>
  <rect x="20" y="80" width="50" height="40" rx="5" fill="#3F51B5"/>
  <text x="45" y="106" font-size="11" fill="#fff" text-anchor="middle">Action</text>
  <polygon points="100,100 130,80 130,120" fill="#3F51B5"/>
  <rect x="140" y="80" width="50" height="40" rx="5" fill="#5C6BC0"/>
  <text x="165" y="106" font-size="11" fill="#fff" text-anchor="middle">Reducer</text>
  <line x1="165" y1="120" x2="165" y2="160" stroke="#5C6BC0" stroke-width="2"/>
  <rect x="140" y="160" width="50" height="30" rx="5" fill="#7986CB"/>
  <text x="165" y="181" font-size="10" fill="#fff" text-anchor="middle">State</text>
</svg>`);

export const problems: Problem[] = [
  {
    id: 'beginner-1',
    title: '电商商品搜索与库存高亮',
    level: 'beginner',
    duration: 20,
    description: '给电商商品列表页实现搜索过滤+库存高亮功能',
    requirements: `产品经理说：用户需要能够快速搜索商品，并且一眼看出哪些商品库存紧张。请实现一个商品列表页面，支持按名称搜索商品，并对库存少于10件的商品进行高亮显示。

💡 图片使用提示：
左侧文件树的 assets/ 目录下已为你准备了 8 张精美图片（耳机、手表、充电宝等），你可以直接在代码中使用：
• HTML中: <img src="assets/headphones.svg" alt="耳机">
• JS中: { image: 'assets/headphones.svg' }
系统会自动将路径替换为实际图片内容，你只需要确保 src 的值和左侧文件名一致即可。`,
    mode: ProjectMode.SINGLE_FILE,
    template: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>商品列表</title>
</head>
<body>
  <div id="app">
    <input type="text" id="search" placeholder="搜索商品..." />
    <div id="product-list"></div>
  </div>
</body>
</html>`,
      css: `body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.product {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
}
.low-stock {
  background-color: #fff3cd;
  border-color: #ffc107;
}`,
      js: `const products = [
  { id: 1, name: '无线蓝牙耳机', price: 299, stock: 5 },
  { id: 2, name: '智能手表', price: 899, stock: 25 },
  { id: 3, name: '便携式充电宝', price: 129, stock: 8 },
  { id: 4, name: '机械键盘', price: 459, stock: 15 },
  { id: 5, name: '鼠标套装', price: 199, stock: 3 },
];

function renderProducts(productsToRender) {
  const list = document.getElementById('product-list');
  list.innerHTML = productsToRender.map(p => \`
    <div class="product \${p.stock < 10 ? 'low-stock' : ''}">
      <h3>\${p.name}</h3>
      <p>价格: ¥\${p.price}</p>
      <p>库存: \${p.stock}件</p>
    </div>
  \`).join('');
}

renderProducts(products);`
    },
    evaluationPoints: [
      '需求拆解清晰度',
      '基础框架使用熟练度',
      '边界情况容错处理',
      '代码可读性'
    ],
    bonusPoints: [
      '防抖搜索优化',
      '按价格排序功能',
      '响应式布局'
    ],
    scoringCriteria: [
      { name: '需求理解', description: '是否正确理解产品需求，完整实现搜索和高亮功能', maxScore: 10 },
      { name: '代码质量', description: '代码结构清晰，命名规范，逻辑合理', maxScore: 10 },
      { name: '用户体验', description: '搜索响应流畅，高亮效果明显', maxScore: 10 },
      { name: '边界处理', description: '处理空搜索、无结果等边界情况', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['搜索功能实现', '库存高亮逻辑', '用户体验优化'],
      questions: ['你是如何理解这个需求的？', '为什么选择这种实现方式？', '如果要优化性能，你会怎么做？']
    },
    images: [
      { path: 'assets/headphones.svg', content: SVG_HEADPHONES, description: '无线蓝牙耳机图片' },
      { path: 'assets/watch.svg', content: SVG_WATCH, description: '智能手表图片' },
      { path: 'assets/powerbank.svg', content: SVG_POWERBANK, description: '充电宝图片' },
      { path: 'assets/keyboard.svg', content: SVG_KEYBOARD, description: '机械键盘图片' },
      { path: 'assets/mouse.svg', content: SVG_MOUSE, description: '鼠标图片' },
      { path: 'assets/product.svg', content: SVG_PRODUCT, description: '通用商品卡片' },
      { path: 'assets/cart.svg', content: SVG_CART, description: '购物车图标' },
      { path: 'assets/coupon.svg', content: SVG_COUPON, description: '优惠券模板' }
    ]
  },
  {
    id: 'beginner-2',
    title: '待办事项列表',
    level: 'beginner',
    duration: 20,
    description: '实现一个支持添加、删除、完成标记的待办事项列表',
    requirements: `产品经理说：用户需要一个简单的待办事项管理工具，能够添加任务、标记完成、删除任务。请实现这个功能。

💡 图片使用提示：
左侧文件树的 assets/ 目录下已为你准备了 7 张UI素材（任务卡片、勾选标记、编辑/删除按钮等），你可以直接在代码中使用：
• HTML中: <img src="assets/check.svg" alt="完成">
• JS中动态生成: element.innerHTML = '<img src="assets/task.svg">'
系统会自动将路径替换为实际图片内容，让界面更美观！`,
    mode: ProjectMode.SINGLE_FILE,
    template: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>待办事项</title>
</head>
<body>
  <div id="app">
    <h1>待办事项</h1>
    <input type="text" id="new-todo" placeholder="添加新任务..." />
    <button id="add-btn">添加</button>
    <ul id="todo-list"></ul>
  </div>
</body>
</html>`,
      css: `body {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.todo-item {
  padding: 10px;
  margin: 5px 0;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}`,
      js: `let todos = [];

function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = todos.map((todo, index) => \`
    <li class="todo-item \${todo.completed ? 'completed' : ''}">
      <span>\${todo.text}</span>
      <div>
        <button onclick="toggleTodo(\${index})">\${todo.completed ? '取消' : '完成'}</button>
        <button onclick="deleteTodo(\${index})">删除</button>
      </div>
    </li>
  \`).join('');
}

document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('new-todo');
  if (input.value.trim()) {
    todos.push({ text: input.value.trim(), completed: false });
    input.value = '';
    renderTodos();
  }
});

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}`
    },
    evaluationPoints: [
      '基础功能实现',
      '事件处理',
      '状态管理',
      '用户体验'
    ],
    bonusPoints: [
      '本地存储持久化',
      '分类筛选',
      '编辑功能'
    ],
    scoringCriteria: [
      { name: '功能完整度', description: '添加、删除、标记完成功能是否完整', maxScore: 10 },
      { name: '代码结构', description: '代码组织是否清晰合理', maxScore: 10 },
      { name: '用户体验', description: '操作是否流畅直观', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['功能完整性', '代码组织', '用户体验'],
      questions: ['你的实现思路是什么？', '如何优化这个应用？']
    },
    images: [
      { path: 'assets/task.svg', content: SVG_TASK, description: '任务卡片模板' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '完成标记' },
      { path: 'assets/delete.svg', content: SVG_DELETE, description: '删除按钮' },
      { path: 'assets/edit.svg', content: SVG_EDIT, description: '编辑按钮' },
      { path: 'assets/settings.svg', content: SVG_SETTINGS, description: '设置图标' },
      { path: 'assets/avatar1.svg', content: SVG_AVATAR1, description: '用户头像示例' },
      { path: 'assets/email.svg', content: SVG_EMAIL, description: '邮件通知图标' }
    ]
  },
  {
    id: 'beginner-3',
    title: '简单计算器',
    level: 'beginner',
    duration: 20,
    description: '实现一个支持基本四则运算的计算器',
    requirements: `产品经理说：需要一个简单的网页计算器，支持加减乘除运算。请实现这个功能。

💡 图片使用提示：
左侧文件树的 assets/ 目录下已为你准备了 7 张素材（计算器UI参考、数字样式、运算符图标等），你可以直接在代码中使用：
• HTML中: <img src="assets/calculator.svg" alt="计算器">
• CSS背景图: background-image: url('assets/operator.svg')
系统会自动将路径替换为实际图片内容，发挥创意让计算器更炫酷！`,
    mode: ProjectMode.SINGLE_FILE,
    template: {
      html: `<!DOCTYPE html>
<html>
<head>
  <title>计算器</title>
</head>
<body>
  <div id="calculator">
    <div id="display">0</div>
    <div class="buttons">
      <button>7</button><button>8</button><button>9</button><button>/</button>
      <button>4</button><button>5</button><button>6</button><button>*</button>
      <button>1</button><button>2</button><button>3</button><button>-</button>
      <button>0</button><button>.</button><button>=</button><button>+</button>
      <button class="clear">C</button>
    </div>
  </div>
</body>
</html>`,
      css: `#calculator {
  width: 300px;
  margin: 50px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background: #f0f0f0;
}
#display {
  background: #fff;
  padding: 20px;
  text-align: right;
  font-size: 24px;
  margin-bottom: 10px;
  border-radius: 4px;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
button {
  padding: 20px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #e0e0e0;
}
button:hover {
  background: #d0d0d0;
}
.clear {
  grid-column: span 4;
  background: #ff6b6b;
  color: white;
}`,
      js: `let currentInput = '0';
let previousInput = '';
let operation = null;

function updateDisplay() {
  document.getElementById('display').textContent = currentInput;
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (value === 'C') {
      currentInput = '0';
      previousInput = '';
      operation = null;
    } else if (['+', '-', '*', '/'].includes(value)) {
      previousInput = currentInput;
      currentInput = '0';
      operation = value;
    } else if (value === '=') {
      if (operation && previousInput) {
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        switch(operation) {
          case '+': currentInput = String(prev + curr); break;
          case '-': currentInput = String(prev - curr); break;
          case '*': currentInput = String(prev * curr); break;
          case '/': currentInput = curr !== 0 ? String(prev / curr) : 'Error'; break;
        }
        operation = null;
        previousInput = '';
      }
    } else {
      currentInput = currentInput === '0' ? value : currentInput + value;
    }
    updateDisplay();
  });
});`
    },
    evaluationPoints: [
      '逻辑思维',
      '状态管理',
      '用户交互'
    ],
    bonusPoints: [
      '键盘支持',
      '历史记录',
      '科学计算功能'
    ],
    scoringCriteria: [
      { name: '计算正确性', description: '加减乘除运算是否正确', maxScore: 10 },
      { name: '用户体验', description: '输入和显示是否流畅', maxScore: 10 },
      { name: '边界处理', description: '除零等错误处理', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['计算逻辑', '状态管理', '错误处理'],
      questions: ['如何处理计算逻辑？', '有哪些边界情况需要考虑？']
    },
    images: [
      { path: 'assets/calculator.svg', content: SVG_CALCULATOR, description: '计算器UI参考' },
      { path: 'assets/number.svg', content: SVG_NUMBER, description: '数字样式参考' },
      { path: 'assets/operator.svg', content: SVG_OPERATOR, description: '运算符图标' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '确认按钮' },
      { path: 'assets/error.svg', content: SVG_ERROR, description: '错误提示' },
      { path: 'assets/settings.svg', content: SVG_SETTINGS, description: '设置按钮' },
      { path: 'assets/delete.svg', content: SVG_DELETE, description: '清除按钮' }
    ]
  },
  {
    id: 'intermediate-1',
    title: '用户数据表格排序',
    level: 'intermediate',
    duration: 25,
    description: '实现一个支持按多列排序的用户数据表格',
    requirements: `产品经理说：需要一个用户数据表格，能够按不同列进行排序，支持升序和降序。请实现这个功能。

📊 参考数据结构：
你可以使用以下示例数据进行开发：
const users = [
  { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', role: '前端工程师', salary: 25000, joinDate: '2022-03-15' },
  { id: 2, name: '李四', age: 32, email: 'lisi@example.com', role: '后端工程师', salary: 30000, joinDate: '2021-06-20' },
  { id: 3, name: '王五', age: 25, email: 'wangwu@example.com', role: 'UI设计师', salary: 20000, joinDate: '2023-01-10' }
];

💡 提示：支持点击表头切换升序/降序，显示排序方向图标。`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '', css: '', js: '' },
    evaluationPoints: [
      '数据处理能力',
      '排序算法实现',
      '用户交互体验',
      '代码可读性'
    ],
    bonusPoints: [
      '分页功能',
      '搜索过滤',
      '表头固定'
    ],
    scoringCriteria: [
      { name: '数据处理能力', description: '是否正确处理和展示数据', maxScore: 10 },
      { name: '排序算法', description: '排序逻辑是否正确高效', maxScore: 10 },
      { name: '用户交互', description: '交互是否流畅直观', maxScore: 10 },
      { name: '代码质量', description: '代码结构是否清晰', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['数据处理', '排序算法', '用户交互'],
      questions: ['如何优化排序性能？', '如何处理大量数据？']
    },
    images: [
      { path: 'assets/avatar1.svg', content: SVG_AVATAR1, description: '用户头像1' },
      { path: 'assets/avatar2.svg', content: SVG_AVATAR2, description: '用户头像2' },
      { path: 'assets/avatar3.svg', content: SVG_AVATAR3, description: '用户头像3' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '成功标记' },
      { path: 'assets/email.svg', content: SVG_EMAIL, description: '邮件图标' },
      { path: 'assets/edit.svg', content: SVG_EDIT, description: '编辑操作' },
      { path: 'assets/delete.svg', content: SVG_DELETE, description: '删除操作' },
      { path: 'assets/settings.svg', content: SVG_SETTINGS, description: '设置选项' }
    ]
  },
  {
    id: 'intermediate-2',
    title: '表单验证',
    level: 'intermediate',
    duration: 25,
    description: '实现一个包含多种验证规则的表单',
    requirements: '产品经理说：需要一个用户注册表单，包含邮箱、密码、确认密码等字段，需要进行前端验证。请实现这个功能。',
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '', css: '', js: '' },
    evaluationPoints: [
      '表单验证逻辑',
      '用户反馈设计',
      '代码组织',
      '边界情况处理'
    ],
    bonusPoints: [
      '实时验证',
      '密码强度检测',
      '表单提交优化'
    ],
    scoringCriteria: [
      { name: '表单验证', description: '表单验证是否完整有效', maxScore: 10 },
      { name: '用户体验', description: '提交反馈是否及时清晰', maxScore: 10 },
      { name: '代码质量', description: '代码组织是否合理', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['表单验证', '用户反馈', '代码组织'],
      questions: ['如何设计表单验证逻辑？', '如何提升用户体验？']
    },
    images: [
      { path: 'assets/input.svg', content: SVG_INPUT, description: '文本输入框' },
      { path: 'assets/password.svg', content: SVG_PASSWORD, description: '密码输入框' },
      { path: 'assets/email.svg', content: SVG_EMAIL, description: '邮箱输入框' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '验证成功' },
      { path: 'assets/error.svg', content: SVG_ERROR, description: '验证失败' },
      { path: 'assets/avatar1.svg', content: SVG_AVATAR1, description: '用户头像预览' },
      { path: 'assets/task.svg', content: SVG_TASK, description: '任务清单示例' }
    ]
  },
  {
    id: 'intermediate-3',
    title: '天气应用',
    level: 'intermediate',
    duration: 30,
    description: '实现一个调用天气API的应用',
    requirements: `产品经理说：需要一个天气应用，能够根据用户输入的城市获取天气信息并显示。请实现这个功能。

🌤️ 可用API资源：
推荐使用 Open-Meteo 免费 API（无需注册、无限制）：
• 接口: https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current_weather=true
• 文档: https://open-meteo.com/en/docs
• 示例返回: { "current_weather": { "temperature": 25.5, "weathercode": 2, "windspeed": 15.0 } }

💡 提示：你也可以使用 Mock 数据先完成UI开发，再接入真实API。`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '', css: '', js: '' },
    evaluationPoints: [
      'API调用能力',
      '数据处理',
      '错误处理',
      '用户体验'
    ],
    bonusPoints: [
      '城市自动补全',
      '天气图标',
      '多日预报'
    ],
    scoringCriteria: [
      { name: 'API集成', description: '天气API调用是否正确', maxScore: 10 },
      { name: '数据展示', description: '天气信息展示是否清晰', maxScore: 10 },
      { name: '用户体验', description: '交互是否流畅', maxScore: 10 },
      { name: '错误处理', description: '网络错误等情况处理', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['API调用', '数据展示', '错误处理'],
      questions: ['如何处理API调用失败的情况？', '如何优化数据展示？']
    },
    images: [
      { path: 'assets/sunny.svg', content: SVG_SUN, description: '晴天图标' },
      { path: 'assets/cloudy.svg', content: SVG_CLOUD, description: '多云图标' },
      { path: 'assets/rainy.svg', content: SVG_RAIN, description: '下雨图标' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '成功标记' },
      { path: 'assets/error.svg', content: SVG_ERROR, description: '错误标记' },
      { path: 'assets/input.svg', content: SVG_INPUT, description: '城市搜索框' },
      { path: 'assets/settings.svg', content: SVG_SETTINGS, description: '设置选项' }
    ]
  },
  {
    id: 'advanced-1',
    title: '购物车功能',
    level: 'advanced',
    duration: 35,
    description: '实现一个完整的购物车功能',
    requirements: `产品经理说：需要一个购物车功能，能够添加商品、修改数量、删除商品、计算总价。请实现这个功能。

🛒 参考商品数据：
你可以使用以下示例商品数据进行开发：
const products = [
  { id: 1, name: '无线蓝牙耳机', price: 299, image: 'assets/headphones.svg', stock: 50 },
  { id: 2, name: '智能手表', price: 899, image: 'assets/watch.svg', stock: 30 },
  { id: 3, name: '机械键盘', price: 459, image: 'assets/keyboard.svg', stock: 25 }
];

💡 提示：实现添加到购物车、数量增减、删除、实时计算总价和优惠功能。`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '', css: '', js: '' },
    evaluationPoints: [
      '状态管理',
      '数据处理',
      '用户交互',
      '代码质量'
    ],
    bonusPoints: [
      '本地存储',
      '优惠券功能',
      '结算流程'
    ],
    scoringCriteria: [
      { name: '功能完整性', description: '购物车核心功能是否完整', maxScore: 10 },
      { name: '状态管理', description: '购物车状态管理是否合理', maxScore: 10 },
      { name: '用户体验', description: '交互是否流畅直观', maxScore: 10 },
      { name: '代码质量', description: '代码结构是否清晰', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['状态管理', '数据持久化', '用户体验'],
      questions: ['如何管理购物车状态？', '如何实现数据持久化？']
    },
    images: [
      { path: 'assets/cart.svg', content: SVG_CART, description: '购物车UI' },
      { path: 'assets/product.svg', content: SVG_PRODUCT, description: '商品卡片' },
      { path: 'assets/coupon.svg', content: SVG_COUPON, description: '优惠券' },
      { path: 'assets/headphones.svg', content: SVG_HEADPHONES, description: '商品示例1' },
      { path: 'assets/watch.svg', content: SVG_WATCH, description: '商品示例2' },
      { path: 'assets/keyboard.svg', content: SVG_KEYBOARD, description: '商品示例3' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '成功提示' },
      { path: 'assets/edit.svg', content: SVG_EDIT, description: '编辑数量' }
    ]
  },
  {
    id: 'advanced-2',
    title: '状态管理库实现',
    level: 'advanced',
    duration: 40,
    description: '实现一个简易的状态管理库',
    requirements: '产品经理说：需要一个类似Redux的状态管理库，支持状态更新、订阅和中间件。请实现这个功能。',
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '', css: '', js: '' },
    evaluationPoints: [
      '架构设计能力',
      'API设计',
      '工程化思维',
      '可维护性'
    ],
    bonusPoints: [
      '异步Action支持',
      'DevTools',
      '选择器优化',
      '时间旅行'
    ],
    scoringCriteria: [
      { name: '架构设计', description: '状态管理库架构是否合理', maxScore: 10 },
      { name: 'API设计', description: 'API是否简洁易用', maxScore: 10 },
      { name: '功能完整度', description: '状态管理核心功能是否完整', maxScore: 10 },
      { name: '代码质量', description: '实现是否清晰可维护', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['架构设计', 'API设计', '实现思路'],
      questions: ['设计思路是什么？', '与Redux/Zustand比较有什么优缺点？', '如何扩展功能？']
    },
    images: [
      { path: 'assets/state-tree.svg', content: SVG_STATE_TREE, description: '状态树结构图' },
      { path: 'assets/data-flow.svg', content: SVG_DATA_FLOW, description: '数据流示意图' },
      { path: 'assets/settings.svg', content: SVG_SETTINGS, description: '配置中心' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '成功状态' },
      { path: 'assets/error.svg', content: SVG_ERROR, description: '错误处理' },
      { path: 'assets/edit.svg', content: SVG_EDIT, description: '修改状态' },
      { path: 'assets/task.svg', content: SVG_TASK, description: 'Action任务' },
      { path: 'assets/email.svg', content: SVG_EMAIL, description: '通知机制' }
    ]
  },

  // ========== 新增题目：React Hooks专项 ==========
  {
    id: 'beginner-4',
    title: 'React计数器组件',
    level: 'beginner',
    duration: 15,
    description: '使用React Hooks实现一个多功能计数器',
    requirements: `产品经理说：需要一个计数器组件，支持增加、减少、重置功能，并能显示当前计数值的历史记录。

💡 React Hooks使用提示：
你需要使用 useState Hook 来管理状态：
• const [count, setCount] = useState(0);
• 使用 setCount(count + 1) 来更新状态
• 可以保存历史记录到数组中

提示：可以尝试实现步长控制、最大/最小值限制等高级功能。`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '<div id="root"></div>', css: '', js: '' },
    evaluationPoints: [
      'useState基础用法',
      '事件处理',
      '状态更新逻辑',
      '数组操作'
    ],
    bonusPoints: [
      '步长控制',
      '历史记录',
      '撤销/重做',
      '动画效果'
    ],
    scoringCriteria: [
      { name: 'Hooks使用', description: '是否正确使用useState', maxScore: 10 },
      { name: '功能完整度', description: '增减重置功能是否完整', maxScore: 10 },
      { name: '代码质量', description: '代码是否清晰可维护', maxScore: 10 },
      { name: '用户体验', description: '交互体验是否流畅', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['useState原理', '状态不可变性', '函数式更新'],
      questions: ['useState的工作原理是什么？', '为什么不能直接修改state？', '如何优化性能？']
    },
    images: [
      { path: 'assets/counter.svg', content: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="#40414f" width="200" height="200" rx="16"/><text x="100" y="110" font-size="64" fill="#10a37f" text-anchor="middle" font-weight="bold">+1</text></svg>`), description: '计数器UI参考' },
      { path: 'assets/calculator.svg', content: SVG_CALCULATOR, description: '计算器图标' }
    ]
  },
  {
    id: 'beginner-5',
    title: 'Todo List (React版)',
    level: 'beginner',
    duration: 20,
    description: '使用React Hooks重新实现待办事项列表',
    requirements: `产品经理说：需要用React Hooks重构待办事项列表，要求使用useState和useEffect，并支持本地存储持久化。

💡 React Hooks进阶提示：
• useState管理todo数组：const [todos, setTodos] = useState([])
• useEffect处理副作用：useEffect(() => {}, [依赖项])
• localStorage实现持久化：localStorage.getItem/setItem

要求：
1. 添加、删除、完成任务
2. 数据自动保存到localStorage
3. 页面刷新后数据不丢失`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '<div id="root"></div>', css: '', js: '' },
    evaluationPoints: [
      'useState多维状态',
      'useEffect副作用处理',
      'localStorage集成',
      '组件设计'
    ],
    bonusPoints: [
      '筛选功能',
      '批量操作',
      '拖拽排序',
      '分类标签'
    ],
    scoringCriteria: [
      { name: 'Hooks掌握', description: 'useState/useEffect使用是否熟练', maxScore: 10 },
      { name: '数据持久化', description: 'localStorage集成是否正确', maxScore: 10 },
      { name: '功能完整性', description: 'CRUD操作是否完整', maxScore: 10 },
      { name: '代码质量', description: '组件拆分和复用性', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['useEffect执行时机', '依赖数组作用', '闭包陷阱'],
      questions: ['useEffect和componentDidMount的区别？', '依赖数组为空表示什么？', '如何在effect中清理副作用？']
    },
    images: [
      { path: 'assets/task.svg', content: SVG_TASK, description: '任务图标' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '完成标记' },
      { path: 'assets/delete.svg', content: SVG_DELETE, description: '删除按钮' }
    ]
  },

  // ========== 新增题目：API调用与异步处理 ==========
  {
    id: 'intermediate-4',
    title: '用户数据获取与展示',
    level: 'intermediate',
    duration: 30,
    description: '从API获取用户数据并展示，支持加载状态和错误处理',
    requirements: `产品经理说：需要从公开API获取用户数据并在页面展示，要有加载状态、错误处理和空状态处理。

🌤️ 可用API资源：
推荐使用 JSONPlaceholder 免费 API（无需注册）：
• 接口: https://jsonplaceholder.typicode.com/users
• 文档: https://jsonplaceholder.typicode.org/
• 返回格式: [{ id, name, email, phone, website, company }]

💡 提示：
• 使用 async/await 处理异步请求
• 添加 loading 和 error 状态
• 实现错误重试机制
• 考虑请求取消（AbortController）

展示要求：
• 用户卡片列表（头像、姓名、邮箱等）
• 搜索/过滤功能
• 点击查看详情`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '', css: '', js: '' },
    evaluationPoints: [
      'async/async掌握',
      '错误处理策略',
      'Loading状态管理',
      '数据渲染'
    ],
    bonusPoints: [
      '无限滚动',
      '缓存策略',
      '离线支持',
      'Skeleton屏'
    ],
    scoringCriteria: [
      { name: '异步处理', description: 'Promise/async-await使用是否正确', maxScore: 10 },
      { name: '错误处理', description: '异常情况处理是否完善', maxScore: 10 },
      { name: '用户体验', description: 'loading/error/empty状态', maxScore: 10 },
      { name: '代码质量', description: '代码组织和可维护性', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['Promise链 vs async/await', 'Error Boundary', '竞态条件'],
      questions: ['如何处理并发请求？', '错误边界的作用是什么？', '如何避免内存泄漏？']
    },
    images: [
      { path: 'assets/avatar-1.svg', content: SVG_AVATAR1, description: '用户头像1' },
      { path: 'assets/avatar-2.svg', content: SVG_AVATAR2, description: '用户头像2' },
      { path: 'assets/avatar-3.svg', content: SVG_AVATAR3, description: '用户头像3' },
      { path: 'assets/email.svg', content: SVG_EMAIL, description: '邮箱图标' },
      { path: 'assets/settings.svg', content: SVG_SETTINGS, description: '设置图标' }
    ]
  },
  {
    id: 'intermediate-5',
    title: '图片懒加载与预加载',
    level: 'intermediate',
    duration: 25,
    description: '实现图片懒加载和预加载功能，优化页面性能',
    requirements: `产品经理说：页面有很多大图，需要实现懒加载提升首屏性能，同时支持预加载提升用户体验。

💡 技术要点提示：
• Intersection Observer API 实现可视区域检测
• Image() 对象预加载关键图片
• Loading="lazy" 原生懒加载（降级方案）
• 占位图/Skeleton屏优化体验

功能要求：
1. 图片进入视口才加载
2. 关键图片提前预加载
3. 加载中显示占位符或骨架屏
4. 加载失败显示错误占位图
5. 支持取消正在加载的图片`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '', css: '', js: '' },
    evaluationPoints: [
      'Intersection Observer使用',
      '性能优化意识',
      '降级方案设计',
      '用户体验细节'
    ],
    bonusPoints:
      ['虚拟滚动',
       'Web Worker预处理',
       '响应式图片',
       'CDN集成'],
    scoringCriteria: [
      { name: '技术选型', description: '懒加载方案选择是否合理', maxScore: 10 },
      { name: '实现质量', description: '边界情况处理是否完善', maxScore: 10 },
      { name: '性能优化', description: '实际性能提升效果', maxScore: 10 },
      { name: '代码质量', description: '可维护性和扩展性', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['浏览器渲染原理', '性能指标（FCP/LCP）', '资源优先级'],
      questions: ['什么是Critical Rendering Path？', '如何测量和优化性能？', '懒加载对SEO的影响？']
    },
    images: [
      { path: 'assets/image-placeholder.svg', content: 'data:image/svg+xml;base64,' + btoa(`<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect fill="#40414f" width="400" height="300"/><text x="200" y="150" font-size="24" fill="#8e8ea0" text-anchor="middle">Loading...</text></svg>`), description: '占位图示例' },
      { path: 'assets/headphones.svg', content: SVG_HEADPHONES, description: '示例图片1' },
      { path: 'assets/watch.svg', content: SVG_WATCH, description: '示例图片2' }
    ]
  },

  // ========== 新增题目：自定义Hook与架构 ==========
  {
    id: 'advanced-3',
    title: '自定义Hook设计',
    level: 'advanced',
    duration: 35,
    description: '设计和实现一组可复用的自定义Hooks',
    requirements: `技术负责人说：项目中有大量重复的逻辑，需要抽取成自定义Hooks提高复用性。

📚 需要实现的Hooks：
1. useLocalStorage - 持久化状态到localStorage
2. useDebounce - 防抖输入处理
3. useAsync - 统一异步请求管理
4. useToggle - 开关状态管理

💡 设计原则：
• 单一职责原则
• 清晰的API设计
• TypeScript类型安全
• 错误处理和边界情况
• 完整的文档注释

使用场景示例：
• useLocalStorage: 表单数据自动保存
• useDebounce: 搜索框输入防抖
• useAsync: API调用统一封装
• useToggle: Modal/Drawer开关控制`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '<div id="app"></div>', css: '', js: '' },
    evaluationPoints: [
      'Hook设计模式',
      'TypeScript类型定义',
      'API易用性',
      '文档和示例'
    ],
    bonusPoints: [
      '单元测试',
      '性能优化',
      'SSR兼容',
      'DevTools集成'
    ],
    scoringCriteria: [
      { name: '设计能力', description: 'Hook抽象层次是否合理', maxScore: 10 },
      { name: '类型安全', description: 'TypeScript类型定义是否完善', maxScore: 10 },
      { name: '实用性', description: 'API是否简洁易用', maxScore: 10 },
      { name: '健壮性', description: '边界情况处理是否完善', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['Hook规则', '依赖注入', '测试策略'],
      questions: ['Custom Hook的最佳实践？', '如何处理Hook之间的依赖？', '如何测试自定义Hook？']
    },
    images: [
      { path: 'assets/hooks-icon.svg', content: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="90" fill="none" stroke="#a855f7" stroke-width="4"/><path d="M60 100 Q100 60 140 100 T220 100" fill="none" stroke="#a855f7" stroke-width="4"/></svg>`), description: 'Hook概念图' },
      { path: 'assets/settings.svg', content: SVG_SETTINGS, description: '配置' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '验证通过' }
    ]
  },
  {
    id: 'advanced-4',
    title: 'Context API 全局状态管理',
    level: 'advanced',
    duration: 35,
    description: '使用Context API实现主题切换和国际化功能',
    requirements: `架构师说：需要实现一个支持主题切换和多语言的全局状态管理系统。

🎨 功能需求：
1. 主题切换（Light/Dark/Auto）
2. 多语言支持（中文/English）
3. 设置持久化到localStorage
4. 所有子组件能访问全局状态

💡 技术栈：
• React.createContext 创建上下文
• useContext Hook 消费上下文
• useReducer 复杂状态逻辑
• 自定义Hook封装

架构要求：
• Provider组件设计合理
• 性能优化（避免不必要的重渲染）
• 类型安全的Context接口
• 支持嵌套Provider组合`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '<div id="app"></div>', css: '', js: '' },
    evaluationPoints: [
      'Context API掌握',
      '状态管理架构',
      '性能优化',
      'TypeScript集成'
    ],
    bonusPoints: [
      '中间件机制',
      '时间旅行调试',
      '服务端渲染兼容',
      '动态Context'
    ],
    scoringCriteria: [
      { name: '架构设计', description: 'Context分层是否清晰', maxScore: 10 },
      { name: '性能优化', description: '重渲染控制是否到位', maxScore: 10 },
      { name: '类型系统', description: 'TypeScript类型是否完善', maxScore: 10 },
      { name: '可扩展性', description: '是否易于添加新功能', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['Context vs Redux', '性能瓶颈', '最佳实践'],
      questions: ['何时用Context何时用Redux？', '如何解决Context性能问题？', '如何测试Context?']
    },
    images: [
      { path: 'assets/theme-light.svg', content: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="#ffffff" width="200" height="200" rx="12"/><circle cx="100" cy="80" r="30" fill="#fbbf24"/><path d="M60 140 Q100 180 140 140" stroke="#374151" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`), description: '浅色主题' },
      { path: 'assets/theme-dark.svg', content: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="#1f2937" width="200" height="200" rx="12"/><circle cx="100" cy="80" r="30" fill="#fbbf24"/><path d="M60 140 Q100 180 140 140" stroke="#9ca3af" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`), description: '深色主题' },
      { path: 'assets/settings.svg', content: SVG_SETTINGS, description: '设置' }
    ]
  },
  {
    id: 'advanced-5',
    title: '数据结构与算法实战',
    level: 'advanced',
    duration: 45,
    description: '实现常见数据结构和算法，解决实际问题',
    requirements: `技术面试官说：需要考察候选人的数据结构和算法功底，但要在实际业务场景中应用。

🎯 需要实现的算法模块：
1. **数组工具库**
   • 去重、扁平化、分组、排序
   • 查找、过滤、映射组合
   
2. **树形结构处理**
   • JSON数据转树形结构
   • 树的遍历（DFS/BFS）
   • 路径查找
   
3. **缓存系统（LRU）**
   • 最近最少使用淘汰算法
   • get/set/delete操作
   • 最大容量限制

💡 要求：
• 时间复杂度分析
• 空间复杂度优化
• 边界情况处理
• 单元测试用例`,
    mode: ProjectMode.SINGLE_FILE,
    template: { html: '<div id="app"><h1>Algorithm Demo</h1><div id="output"></div></div>', css: 'body{font-family:monospace;padding:20px;background:#1e1e1e;color:#fff;} #output{margin-top:20px;padding:16px;background:#2d2d30;border-radius:8px;}', js: '' },
    evaluationPoints: [
      '算法思维',
      '代码效率',
      '问题分解',
      '测试覆盖'
    ],
    bonusPoints: [
      '可视化演示',
      '性能基准测试',
      'Web Worker加速',
      'TypeScript泛型'
    ],
    scoringCriteria: [
      { name: '正确性', description: '算法实现是否正确无误', maxScore: 10 },
      { name: '效率', description: '时间和空间复杂度是否最优', maxScore: 10 },
      { name: '代码质量', description: '可读性和可维护性', maxScore: 10 },
      { name: '工程化', description: '是否考虑实际应用场景', maxScore: 10 }
    ],
    interviewGuide: {
      keyPoints: ['Big O表示法', '空间换时间', '常用数据结构'],
      questions: ['如何分析算法复杂度？', '什么情况下用递归vs迭代？', '如何选择合适的数据结构？']
    },
    images: [
      { path: 'assets/data-structure.svg', content: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="#40414f" width="200" height="200" rx="12"/><circle cx="50" cy="50" r="20" fill="#10a37f"/><circle cx="150" cy="50" r="20" fill="#10a37f"/><circle cx="100" cy="130" r="20" fill="#a855f7"/><line x1="50" y1="70" x2="100" y2="110" stroke="#8e8ea0" stroke-width="2"/><line x1="150" y1="70" x2="100" y2="110" stroke="#8e8ea0" stroke-width="2"/></svg>`), description: '数据结构示意' },
      { path: 'assets/algorithm.svg', content: 'data:image/svg+xml;base64,' + btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="#444654" width="200" height="200" rx="12"/><text x="100" y="80" font-size="48" fill="#10a37f" text-anchor="middle" font-weight="bold">O(n)</text><text x="100" y="130" font-size="18" fill="#ececf1" text-anchor="middle">Algorithm</text></svg>`), description: '算法标识' },
      { path: 'assets/check.svg', content: SVG_CHECK, description: '验证' }
    ]
  }
];
