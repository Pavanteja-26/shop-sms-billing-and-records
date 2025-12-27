const { validateBill } = require('../utils/validator');
const { sendBillSMS } = require('../services/smsService');
const {
  createBill,
  getBillById,
  getAllBills,
  updateSMSStatus,
  getBillsByStatus
} = require('../models/billModel');

/**
 * Create a new bill and send SMS
 * POST /api/bills
 */
const createNewBill = async (req, res) => {
  try {
    // Validate request body
    const validation = validateBill(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    const { customer_name, phone, items, total_amount } = validation.data;
    
    // Step 1: Create bill in database with PENDING status
    const billResult = await createBill({
      customer_name,
      phone,
      items,
      total_amount,
      sms_status: 'PENDING'
    });
    
    if (!billResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create bill in database',
        error: billResult.error
      });
    }
    
    const billId = billResult.billId;
    
    // Step 2: Send SMS (non-blocking - don't fail if SMS fails)
    let smsStatus = 'FAILED';
    let smsMessage = 'SMS sending failed';
    
    try {
      const smsResult = await sendBillSMS(customer_name, phone, items, total_amount);
      
      if (smsResult.success) {
        smsStatus = 'SENT';
        smsMessage = 'SMS sent successfully';
        await updateSMSStatus(billId, 'SENT');
      } else {
        smsMessage = smsResult.error || 'SMS sending failed';
        await updateSMSStatus(billId, 'FAILED');
      }
    } catch (smsError) {
      console.error('SMS Error:', smsError.message);
      smsMessage = smsError.message;
      await updateSMSStatus(billId, 'FAILED');
    }
    
    // Step 3: Return response (bill created successfully regardless of SMS status)
    return res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      data: {
        billId,
        customer_name,
        phone,
        total_amount,
        sms_status: smsStatus,
        sms_message: smsMessage
      }
    });
    
  } catch (error) {
    console.error('Create bill error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating bill',
      error: error.message
    });
  }
};

/**
 * Get bill by ID
 * GET /api/bills/:id
 */
const getBill = async (req, res) => {
  try {
    const billId = parseInt(req.params.id);
    
    if (isNaN(billId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bill ID'
      });
    }
    
    const result = await getBillById(billId);
    
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: result.bill
    });
    
  } catch (error) {
    console.error('Get bill error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching bill'
    });
  }
};

/**
 * Get all bills with pagination
 * GET /api/bills?limit=50&offset=0
 */
const getBills = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    
    const result = await getAllBills(limit, offset);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch bills'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: result.bills,
      pagination: {
        limit,
        offset,
        count: result.bills.length
      }
    });
    
  } catch (error) {
    console.error('Get bills error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching bills'
    });
  }
};

/**
 * Get bills by SMS status
 * GET /api/bills/status/:status
 */
const getBillsByStatusEndpoint = async (req, res) => {
  try {
    const status = req.params.status.toUpperCase();
    
    if (!['SENT', 'FAILED', 'PENDING'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be SENT, FAILED, or PENDING'
      });
    }
    
    const result = await getBillsByStatus(status);
    
    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch bills'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: result.bills,
      count: result.bills.length
    });
    
  } catch (error) {
    console.error('Get bills by status error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching bills'
    });
  }
};

/**
 * Retry sending SMS for a failed bill
 * POST /api/bills/:id/retry-sms
 */
const retrySMS = async (req, res) => {
  try {
    const billId = parseInt(req.params.id);
    
    if (isNaN(billId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bill ID'
      });
    }
    
    // Get bill details
    const billResult = await getBillById(billId);
    
    if (!billResult.success) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }
    
    const bill = billResult.bill;
    
    // Retry sending SMS
    const smsResult = await sendBillSMS(
      bill.customer_name,
      bill.phone,
      bill.items,
      bill.total_amount
    );
    
    // Update status
    const newStatus = smsResult.success ? 'SENT' : 'FAILED';
    await updateSMSStatus(billId, newStatus);
    
    return res.status(200).json({
      success: smsResult.success,
      message: smsResult.success ? 'SMS sent successfully' : 'SMS sending failed',
      data: {
        billId,
        sms_status: newStatus,
        error: smsResult.error
      }
    });
    
  } catch (error) {
    console.error('Retry SMS error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while retrying SMS'
    });
  }
};

module.exports = {
  createNewBill,
  getBill,
  getBills,
  getBillsByStatusEndpoint,
  retrySMS
};