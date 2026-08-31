window.smartSwapConfig = {
  chatbot: {
    welcome: 'How can I help you?',
    replies: {
      sell: 'You can sell your phone from our Sell page. Share the model and condition, and we can guide you on the best price and pickup.',
      buy: 'You can browse certified refurbished phones on our Buy page. We have tested and verified devices at great value.',
      repair: 'Tell us the issue — screen, battery, charging, or camera — and we will help you with the repair options.',
      price: 'We can help with a quick price estimate. Please share the phone model and condition, and we will guide you.',
      greeting: 'Hi! I can help with selling, buying, or repairing your phone. What do you need today?',
      contact: 'You can also contact us directly on WhatsApp: +91 9718655625',
      default: 'I can help with buying, selling, and repairs. Tell me what you need and I will guide you.',
      fallback: 'I may not have the exact answer yet. Please contact our team on WhatsApp: +91 9718655625 and we will help you right away.'
    },
    patterns: {
      sell: ['sell', 'sell my', 'sell phone', 'get price', 'price my phone', 'trade in'],
      buy: ['buy', 'purchase', 'want to buy', 'phone price', 'look for phone'],
      repair: ['repair', 'screen', 'battery', 'camera', 'charging', 'problem'],
      price: ['price', 'quote', 'offer', 'valuation'],
      greeting: ['hello', 'hi', 'hey', 'namaste'],
      contact: ['contact', 'call', 'whatsapp', 'number', 'phone number']
    }
  },
  hero: {
    image: 'assets/phones/phone-hero-1.png'
  }
};
