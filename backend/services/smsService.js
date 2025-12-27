const axios = require('axios');
require('dotenv').config();

/**
 * Format items for SMS message
 */
const formatItems = (items) => {
  return items.map(item => `${item.name} ₹${item.price}`).join(', ');
};

/**
 * Generate SMS message content
 */
const generateSMSMessage = (customerName, items, totalAmount) => {
  const shopName = process.env.SHOP_NAME || 'Our Shop';
  const website = process.env.SHOP_WEBSITE || 'https://yourshop.com';
  const itemsText = formatItems(items);
  
  return `Thank you for shopping at ${shopName}!
Items: ${itemsText}
Total: ₹${totalAmount}
Defective return within 24 hrs only with bill.
Details: ${website}`;
};

/**
 * Send SMS via MSG91
 */
const sendViaMSG91 = async (phone, message) => {
  try {
    const apiKey = process.env.SMS_API_KEY;
    const senderId = process.env.SMS_SENDER_ID || 'SHOPNA';
    const route = process.env.SMS_ROUTE || '4';
    
    if (!apiKey) {
      throw new Error('SMS_API_KEY not configured');
    }
    
    const url = 'https://api.msg91.com/api/sendhttp.php';
    
    const params = {
      authkey: apiKey,
      mobiles: phone,
      message: message,
      sender: senderId,
      route: route,
      country: '91'
    };
    
    const response = await axios.get(url, { params, timeout: 10000 });
    
    if (response.data && response.data.type === 'success') {
      return {
        success: true,
        messageId: response.data.message || 'SMS_SENT',
        provider: 'MSG91'
      };
    } else {
      throw new Error(response.data?.message || 'SMS sending failed');
    }
  } catch (error) {
    console.error('MSG91 SMS Error:', error.message);
    return {
      success: false,
      error: error.message,
      provider: 'MSG91'
    };
  }
};

/**
 * Send SMS via Fast2SMS (Alternative)
 */
const sendViaFast2SMS = async (phone, message) => {
  try {
    const apiKey = process.env.FAST2SMS_API_KEY;
    
    if (!apiKey) {
      throw new Error('FAST2SMS_API_KEY not configured');
    }
    
    const url = 'https://www.fast2sms.com/dev/bulkV2';
    
    const response = await axios.post(
      url,
      {
        route: 'q',
        message: message,
        language: 'english',
        flash: 0,
        numbers: phone
      },
      {
        headers: {
          authorization: apiKey
        },
        timeout: 10000
      }
    );
    
    if (response.data && response.data.return === true) {
      return {
        success: true,
        messageId: response.data.message_id || 'SMS_SENT',
        provider: 'Fast2SMS'
      };
    } else {
      throw new Error(response.data?.message || 'SMS sending failed');
    }
  } catch (error) {
    console.error('Fast2SMS Error:', error.message);
    return {
      success: false,
      error: error.message,
      provider: 'Fast2SMS'
    };
  }
};

/**
 * Main function to send SMS
 */
const sendBillSMS = async (customerName, phone, items, totalAmount) => {
  try {
    const message = generateSMSMessage(customerName, items, totalAmount);
    
    const provider = process.env.SMS_PROVIDER || 'msg91';
    
    let result;
    if (provider.toLowerCase() === 'fast2sms') {
      result = await sendViaFast2SMS(phone, message);
    } else {
      result = await sendViaMSG91(phone, message);
    }
    
    if (result.success) {
      console.log(`✅ SMS sent successfully to ${phone} via ${result.provider}`);
    } else {
      console.error(`❌ SMS failed for ${phone}: ${result.error}`);
    }
    
    return result;
  } catch (error) {
    console.error('SMS Service Error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  sendBillSMS,
  generateSMSMessage
};