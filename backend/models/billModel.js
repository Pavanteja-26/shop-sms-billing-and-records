const { executeQuery } = require('../config/database');

/**
 * Create a new bill in the database
 */
const createBill = async (billData) => {
  const { customer_name, phone, items, total_amount, sms_status } = billData;
  
  const sql = `
    INSERT INTO bills (customer_name, phone, items_json, total_amount, sms_status)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  const params = [
    customer_name,
    phone,
    JSON.stringify(items),
    total_amount,
    sms_status || 'PENDING'
  ];
  
  const result = await executeQuery(sql, params);
  
  if (result.success) {
    return {
      success: true,
      billId: result.data.insertId
    };
  }
  
  return {
    success: false,
    error: result.error
  };
};

/**
 * Get a bill by ID
 */
const getBillById = async (billId) => {
  const sql = `
    SELECT 
      id,
      customer_name,
      phone,
      items_json,
      total_amount,
      sms_status,
      created_at
    FROM bills
    WHERE id = ?
  `;
  
  const result = await executeQuery(sql, [billId]);
  
  if (result.success && result.data.length > 0) {
    const bill = result.data[0];
    bill.items = JSON.parse(bill.items_json);
    delete bill.items_json;
    
    return {
      success: true,
      bill
    };
  }
  
  return {
    success: false,
    error: result.error || 'Bill not found'
  };
};

/**
 * Get all bills (with pagination)
 */
const getAllBills = async (limit = 50, offset = 0) => {
  const sql = `
    SELECT 
      id,
      customer_name,
      phone,
      items_json,
      total_amount,
      sms_status,
      created_at
    FROM bills
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  
  const result = await executeQuery(sql, [limit, offset]);
  
  if (result.success) {
    const bills = result.data.map(bill => {
      bill.items = JSON.parse(bill.items_json);
      delete bill.items_json;
      return bill;
    });
    
    return {
      success: true,
      bills
    };
  }
  
  return {
    success: false,
    error: result.error
  };
};

/**
 * Update SMS status of a bill
 */
const updateSMSStatus = async (billId, status) => {
  const sql = `
    UPDATE bills
    SET sms_status = ?
    WHERE id = ?
  `;
  
  const result = await executeQuery(sql, [status, billId]);
  
  return {
    success: result.success,
    error: result.error
  };
};

/**
 * Get bills by SMS status
 */
const getBillsByStatus = async (status) => {
  const sql = `
    SELECT 
      id,
      customer_name,
      phone,
      items_json,
      total_amount,
      sms_status,
      created_at
    FROM bills
    WHERE sms_status = ?
    ORDER BY created_at DESC
  `;
  
  const result = await executeQuery(sql, [status]);
  
  if (result.success) {
    const bills = result.data.map(bill => {
      bill.items = JSON.parse(bill.items_json);
      delete bill.items_json;
      return bill;
    });
    
    return {
      success: true,
      bills
    };
  }
  
  return {
    success: false,
    error: result.error
  };
};

module.exports = {
  createBill,
  getBillById,
  getAllBills,
  updateSMSStatus,
  getBillsByStatus
};