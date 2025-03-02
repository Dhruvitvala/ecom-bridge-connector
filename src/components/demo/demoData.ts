
export const platforms = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'opencart', label: 'OpenCart' }
];

export const endpoints = [
  { value: 'discount', label: 'Apply Discount' },
  { value: 'order', label: 'Create Order' },
  { value: 'customer', label: 'Customer Data' }
];

export const requestSamples = {
  shopify: {
    discount: {
      shop_id: "shop_123456",
      discount_code: "SUMMER2023",
      value: 15,
      value_type: "percentage",
      target_selection: "all",
      customer_selection: "all",
    },
    order: {
      order_number: "1001",
      financial_status: "paid",
      total_price: "99.95",
      customer: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com"
      },
      line_items: [
        {
          title: "Premium Widget",
          price: "19.99",
          quantity: 2
        }
      ]
    }
  },
  woocommerce: {
    discount: {
      code: "SALE20",
      discount_type: "percent",
      amount: "20",
      individual_use: true,
      exclude_sale_items: true,
    },
    order: {
      payment_method: "stripe",
      payment_method_title: "Credit Card",
      status: "processing",
      customer_id: 5,
      billing: {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com"
      },
      line_items: [
        {
          product_id: 93,
          quantity: 2
        }
      ]
    }
  },
  opencart: {
    discount: {
      coupon_id: "5623",
      name: "Holiday Special",
      code: "HOLIDAY15",
      type: "P",
      discount: "15.0000",
    },
    order: {
      store_id: 0,
      customer_id: 5,
      firstname: "Alex",
      lastname: "Johnson",
      email: "alex.johnson@example.com",
      payment_method: "cod",
      products: [
        {
          product_id: "2345",
          name: "Basic Widget",
          quantity: 1
        }
      ]
    }
  }
};

export const transformedSamples = {
  shopify: {
    discount: {
      coupon: {
        primary_coupon_id: null,
        code: "SUMMER2023",
        discount_amount: 15,
        discount_type: "percent",
        is_active: true,
        apply_to_shipping: false
      }
    },
    order: {
      entity: {
        increment_id: "1001",
        customer_email: "john.doe@example.com",
        customer_firstname: "John",
        customer_lastname: "Doe",
        grand_total: 99.95,
        items: [
          {
            sku: "premium-widget",
            name: "Premium Widget",
            price: 19.99,
            qty_ordered: 2
          }
        ]
      }
    }
  },
  woocommerce: {
    discount: {
      coupon: {
        primary_coupon_id: null,
        code: "SALE20",
        discount_amount: 20,
        discount_type: "percent",
        is_active: true,
        applies_to_all: true
      }
    },
    order: {
      entity: {
        status: "processing",
        customer_id: 5,
        customer_email: "jane.smith@example.com",
        customer_firstname: "Jane",
        customer_lastname: "Smith",
        payment_method: "stripe",
        items: [
          {
            product_id: 93,
            qty_ordered: 2
          }
        ]
      }
    }
  },
  opencart: {
    discount: {
      coupon: {
        primary_coupon_id: 5623,
        code: "HOLIDAY15",
        discount_amount: 15,
        discount_type: "percent",
        is_active: true
      }
    },
    order: {
      entity: {
        store_id: 0,
        customer_id: 5,
        customer_email: "alex.johnson@example.com",
        customer_firstname: "Alex",
        customer_lastname: "Johnson",
        payment_method: "cod",
        items: [
          {
            product_id: "2345",
            name: "Basic Widget",
            qty_ordered: 1
          }
        ]
      }
    }
  }
};

export const responseSamples = {
  shopify: {
    discount: {
      discount: {
        id: "disc_123456",
        code: "SUMMER2023",
        value: 15,
        value_type: "percentage",
        status: "active",
        created_at: new Date().toISOString()
      },
      status: "success"
    },
    order: {
      order: {
        id: "order_789012",
        order_number: 1001,
        financial_status: "paid",
        total_price: "99.95",
        customer: {
          id: "cust_345678",
          email: "john.doe@example.com"
        },
        line_items: [
          {
            id: "line_901234",
            title: "Premium Widget",
            price: "19.99",
            quantity: 2
          }
        ]
      },
      status: "success"
    }
  },
  woocommerce: {
    discount: {
      coupon: {
        id: 56,
        code: "SALE20",
        discount_type: "percent",
        amount: "20",
        individual_use: true,
        date_created: new Date().toISOString(),
        status: "publish"
      }
    },
    order: {
      id: 741,
      status: "processing",
      payment_method: "stripe",
      payment_method_title: "Credit Card",
      customer_id: 5,
      line_items: [
        {
          id: 315,
          product_id: 93,
          quantity: 2
        }
      ]
    }
  },
  opencart: {
    discount: {
      success: true,
      coupon_id: "5623",
      name: "Holiday Special",
      code: "HOLIDAY15",
      type: "P",
      discount: "15.0000",
    },
    order: {
      success: true,
      order_id: "12345",
      order_status_id: "1",
      customer_id: "5",
      email: "alex.johnson@example.com",
      products: [
        {
          product_id: "2345",
          name: "Basic Widget",
          quantity: 1
        }
      ]
    }
  }
};
